import { Router } from 'express';

import apiRouter from './api';
import graphqlRouter, { GRAPHQL_ROOT } from './graphql';

export default new Map<string, Router>([
  ['/api', apiRouter],
  [GRAPHQL_ROOT, graphqlRouter],
]);
