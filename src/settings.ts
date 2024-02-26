import path from 'path';

import 'dotenv/config';

export const BASE_DIR: string = path.dirname(__filename);

export const GRAPHIQL: boolean = Boolean(process.env.GRAPHIQL);

export const MONGODB_URI: string = String(process.env.MONGODB_URI);
