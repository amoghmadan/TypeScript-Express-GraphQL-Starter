import { Request, Response } from 'express';
import { ValidationError } from 'joi';

import { Detail } from '@/interfaces/user';
import { accountsService } from '@/services';

export default {
  login: async (request: Request, response: Response): Promise<Response> => {
    try {
      const data: { token: string } | null = await accountsService.login(
        request.body
      );
      if (!data) {
        return response.status(401).json({ detail: 'Invalid credentials!' });
      }
      return response.status(201).json(data);
    } catch (err: unknown) {
      if (err instanceof ValidationError) {
        return response.status(400).json(err.details);
      }
      return response.status(500).json(err);
    }
  },
};
