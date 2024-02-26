import mongoose from 'mongoose';
import supertest, { Response } from 'supertest';
import TestAgent from 'supertest/lib/agent';

import { getRequestListener } from '@/cli/bootstrap';
import { User } from '@/interfaces/user';
import { UserModel } from '@/models';
import { MONGODB_URI } from '@/settings';
import { generateKey } from '@/utils/token';

const LOGIN_URL: string = '/api/accounts/login';
const GRAPHQL_URL: string = '/graphql/';
const KEYWORD: string = 'Token';
const EMAIL: string = 'account.testuser@email.com';
const CREDENTIALS: Record<string, string> = {
  email: EMAIL,
  password: 'foobarbaz',
};

const request: TestAgent = supertest(getRequestListener());

describe('Account API Tests', (): void => {
  beforeAll(async (): Promise<void> => {
    await mongoose.connect(MONGODB_URI);
    await UserModel.create({
      ...CREDENTIALS,
      firstName: 'Account',
      lastName: 'Test User',
    });
  });

  afterAll(async (): Promise<void> => {
    await UserModel.deleteOne({ email: EMAIL });
    await mongoose.connection.close();
  });

  describe(`POST ${LOGIN_URL}`, (): void => {
    it('Incomplete Payload', async (): Promise<void> => {
      const response: Response = await request
        .post(LOGIN_URL)
        .send({ email: EMAIL });
      expect(response.status).toBe(400);
    });

    it('Invalid Credentials', async (): Promise<void> => {
      const response: Response = await request
        .post(LOGIN_URL)
        .send({ email: EMAIL, password: 'foobarba' });
      expect(response.status).toBe(401);
    });

    it('Performs Account Login', async (): Promise<void> => {
      const response: Response = await request
        .post(LOGIN_URL)
        .send(CREDENTIALS);
      expect(response.status).toBe(201);
      expect(response.body.token).toBeDefined();
    });
  });

  describe(`POST ${GRAPHQL_URL}`, (): void => {
    it('Returns 401 if not authorized', async (): Promise<void> => {
      const response: Response = await request.post(GRAPHQL_URL);
      expect(response.status).toBe(401);
    });

    it('Returns 401 if Bearer instead of Token', async (): Promise<void> => {
      const response: Response = await request
        .post(GRAPHQL_URL)
        .set('Authorization', 'Bearer Token');
      expect(response.status).toBe(401);
    });

    it('Returns 401 if more than two value', async (): Promise<void> => {
      const response: Response = await request
        .post(GRAPHQL_URL)
        .set('Authorization', 'This Bearer Token');
      expect(response.status).toBe(401);
    });

    it('Returns 403 if invalid token', async (): Promise<void> => {
      const response: Response = await request
        .post(GRAPHQL_URL)
        .set('Authorization', 'Token 0X1X2X3X4X5X6X7X8X');
      expect(response.status).toBe(403);
    });

    it('Retrieves Account Details', async (): Promise<void> => {
      const user: User | null = await UserModel.findOne({ email: EMAIL });
      if (!user) {
        throw Error('Error: User not found!');
      }
      user.token = { key: generateKey() };
      await user.save();

      const response: Response = await request
        .post(GRAPHQL_URL)
        .send({ query: 'query {user {email}}' })
        .set('Authorization', `${KEYWORD} ${user.token.key}`);
      expect(response.status).toBe(200);
      expect(response.body.email).toBe(user.email);
    });

    it('Performs Account Logout', async (): Promise<void> => {
      const user: User | null = await UserModel.findOne({ email: EMAIL });
      if (!user) {
        throw Error('Error: User not found!');
      }
      user.token = { key: generateKey() };
      await user.save();

      const response: Response = await request
        .post(GRAPHQL_URL)
        .send({ query: 'query {logout}' })
        .set('Authorization', `${KEYWORD} ${user.token.key}`);
      expect(response.status).toBe(200);
    });
  });
});
