import { Router } from 'express';
import { getAllUsers, getAllOwners } from '../controller/admin';
import { catchAsync } from './utilities';
import { requireAuthRole } from '../middleware/roleAuth';
import { requireAuth } from '../middleware/jwtAuth';
import { ROLE } from '../middleware/permission/role';

const adminRouter = Router();

adminRouter.use('/admin', catchAsync(requireAuth), requireAuthRole(ROLE.ADMIN));

adminRouter.get('/admin/users', catchAsync(getAllUsers));

adminRouter.get('/admin/owners', catchAsync(getAllOwners));

export default adminRouter;
