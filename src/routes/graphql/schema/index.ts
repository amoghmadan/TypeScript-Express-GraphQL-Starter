import express from 'express';
import { Request, createHandler } from 'graphql-http';

import resolvers from './resolvers';
import typeDefs from './typeDefs';
import { User } from '@/interfaces/user';

interface ERequest extends express.Request {
  user: User;
}

export default createHandler({
  schema: typeDefs,
  rootValue: resolvers,
  context: (
    req: Request<ERequest, Record<string, unknown>>
  ): Record<string, unknown> => {
    return { user: req.user };
  },
});
