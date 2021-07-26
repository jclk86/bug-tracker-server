import { Router } from 'express';
import { getAccounts, getAccountById, deleteAccount } from '../controller/adminController';
import { catchAsync } from './utilities';
import { requireAuthRole } from '../middleware/roleAuth';
import { requireAuth } from '../middleware/jwtAuth';
import { ROLE } from '../middleware/permission/role';

const adminRouter = Router();

// adminRouter.use('/admin', catchAsync(requireAuth), requireAuthRole(ROLE.ADMIN));

adminRouter.get('/admin/accounts', catchAsync(getAccounts));

adminRouter.get('/admin/accounts/:accountId', catchAsync(getAccountById));

adminRouter.delete('/admin/accounts/:accountId', catchAsync(deleteAccount));

export default adminRouter;
