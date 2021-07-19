import { Router } from 'express';
import { catchAsync } from './utilities';
import { getAllPermissionLevels, getPermissionById } from '../controller/permission';
import { requireAuth } from '../middleware/jwtAuth';

const permissionRouter = Router();

permissionRouter.get('/permission', catchAsync(getAllPermissionLevels));

permissionRouter.get('/permission/id/:permissionId', catchAsync(getPermissionById));

export default permissionRouter;
