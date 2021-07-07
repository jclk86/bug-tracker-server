import { Router } from 'express';
import {
  getUserById,
  getUserByEmail,
  getAllUsersByCompanyId,
  createUser,
  updateUser,
  deleteUser
} from '../controller/user';
import { catchAsync } from './utilities';
import { requireAuth } from '../middleware/jwt-auth';

const userRouter = Router();

userRouter.get('/user/companyId/:companyId', catchAsync(getAllUsersByCompanyId));

userRouter.get('/user/email/:userEmail', catchAsync(getUserByEmail));

userRouter.get('/user/id/:userId', catchAsync(getUserById));

userRouter.post('/user/create', catchAsync(createUser));

userRouter.patch('/user/edit/:userId', catchAsync(updateUser));

userRouter.delete('/user/delete/:userId', catchAsync(requireAuth), catchAsync(deleteUser));

export default userRouter;
