import { Router } from 'express';

import { accountsController } from '@/controllers';

const accountsRouter = Router();
accountsRouter.route('/login').post(accountsController.login);

export default accountsRouter;
