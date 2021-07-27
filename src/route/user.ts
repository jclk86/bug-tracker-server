import { Router } from 'express';
import {
  getUserById,
  getUserByEmail,
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from '../controller/userController';
import { catchAsync } from './utilities';
import { requireAuth } from '../middleware/jwtAuth';

const userRouter = Router();

userRouter.get('/user/account/:accountId', catchAsync(getUsers));

userRouter.get('/user/email/:userEmail', catchAsync(getUserByEmail));

userRouter.get('/user/:userId', catchAsync(getUserById));

userRouter.post('/user', catchAsync(createUser));

userRouter.patch('/user/:userId', catchAsync(updateUser));

userRouter.delete('/user/:userId', catchAsync(deleteUser));

export default userRouter;
