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
// ! you may need to make a new get route for user registration. Depends on how you plan to get the accountId -- invite table via email? Or req.params
userRouter.get('/users/account/:accountId', catchAsync(requireAuth), catchAsync(getUsers));

userRouter.get('/user/email/:userEmail', catchAsync(getUserByEmail));

userRouter.get('/user/:userId', catchAsync(getUserById));

userRouter.post('/user', catchAsync(createUser));

userRouter.patch('/user/:userId', catchAsync(updateUser));

userRouter.delete('/user/:userId', catchAsync(deleteUser));

export default userRouter;
