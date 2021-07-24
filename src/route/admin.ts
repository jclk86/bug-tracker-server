import { Router } from 'express';
import { getUsers, getOwners } from '../controller/admin';
import { catchAsync } from './utilities';
import { requireAuthRole } from '../middleware/roleAuth';
import { requireAuth } from '../middleware/jwtAuth';
import { ROLE } from '../middleware/permission/role';

const adminRouter = Router();

adminRouter.use('/admin', catchAsync(requireAuth), requireAuthRole(ROLE.ADMIN));

adminRouter.get('/admin/users', catchAsync(getUsers));

adminRouter.get('/admin/owners', catchAsync(getOwners));

export default adminRouter;
