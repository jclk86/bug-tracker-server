import { Router } from 'express';
import {
  getAllUsers,
  getUserByName,
  getUserById,
  getUserByEmail,
  createUser
} from '../controller/user';
import catchAsync from './utilities';

const userRouter = Router();

userRouter.get('/user', catchAsync(getAllUsers));

userRouter.get('/user/name/:name', catchAsync(getUserByName));

userRouter.get('/user/email/:email', catchAsync(getUserByEmail));

userRouter.get('/user/id/:id', catchAsync(getUserById));

userRouter.post('/user/create', catchAsync(createUser));

export default userRouter;
