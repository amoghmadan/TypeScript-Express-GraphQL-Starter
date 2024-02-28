import express from 'express';
import { Request } from 'graphql-http';
import { createHandler } from 'graphql-http/lib/use/express';

import resolvers from './resolvers';
import typeDefs from './typeDefs';

export default createHandler({
  schema: typeDefs,
  rootValue: resolvers,
  context: (req: Request<express.Request, any>): Record<string, unknown> => {
    const { user } = req.raw;
    if (!user) {
      return {};
    }
    return { user };
  },
});
