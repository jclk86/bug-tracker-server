import { Router } from 'express';
import { getAllUsers, getAllOwners } from '../controller/admin';
import { catchAsync } from './utilities';
import { requireAuthRole } from '../middleware/roleAuth';
import { requireAuth } from '../middleware/jwtAuth';

const adminRouter = Router();

adminRouter.use(catchAsync(requireAuth));

adminRouter.use(requireAuthRole('admin'));

adminRouter.get('/admin/users', catchAsync(getAllUsers));

adminRouter.get('/admin/owners', catchAsync(getAllOwners));

export default adminRouter;
