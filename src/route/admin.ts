import { Router } from 'express';
import { getAllUsers, getAllOwners } from '../controller/admin';
import { catchAsync } from './utilities';

const adminRouter = Router();

adminRouter.get('/admin/users', catchAsync(getAllUsers));

adminRouter.get('/admin/owners', catchAsync(getAllOwners));

export default adminRouter;
