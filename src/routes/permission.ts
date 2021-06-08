import { Router } from 'express';
import catchAsync from './utilities';
import { getAllPermissionLevels, getPermissionById } from '../controller/permission';

const permissionRouter = Router();

permissionRouter.get('/permission', catchAsync(getAllPermissionLevels));

permissionRouter.get('/permission/:id', catchAsync(getPermissionById));

export default permissionRouter;
