import { Router } from 'express';
import {
  getAllAccounts,
  getAccountByName,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount
} from '../controller/account';
import { catchAsync } from './utilities';
import { requireAuth } from '../middleware/jwtAuth';

const accountRouter = Router();

accountRouter.use('/account', catchAsync(requireAuth));

accountRouter.get('/account', catchAsync(getAllAccounts));

accountRouter.get('/account/name/:accountName', catchAsync(getAccountByName));

accountRouter.get('/account/:accountId', catchAsync(getAccountById));

accountRouter.post('/account', catchAsync(createAccount));

accountRouter.patch('/account/:accountId', catchAsync(requireAuth), catchAsync(updateAccount));

accountRouter.delete('/account/:accountId', catchAsync(requireAuth), catchAsync(deleteAccount));

export default accountRouter;
