import { Router } from 'express';
import {
  getAccountById,
  getAccountByEmail,
  getAccountByCompanyName,
  createAccount,
  updateAccount,
  deleteAccount
} from '../controller/accountController';
import { catchAsync } from './utilities';
import { requireAuth } from '../middleware/jwtAuth';

const accountRouter = Router();

// get. The controller will check req.params or req.body itself and then determine what to get

accountRouter.get('/account/:accountId', catchAsync(getAccountById));

accountRouter.get('/account/email/:email', catchAsync(getAccountByEmail));

accountRouter.get('/account/company/:companyName', catchAsync(getAccountByCompanyName));

accountRouter.post('/account', catchAsync(createAccount));

accountRouter.patch('/account/:accountId', catchAsync(updateAccount));

accountRouter.delete('/account/:accountId', catchAsync(deleteAccount));

export default accountRouter;
