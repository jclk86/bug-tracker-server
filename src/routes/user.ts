import { Router } from 'express';
import { getAllUsers, getUserByName, getUserById } from '../controller/user';
import catchAsync from './utilities';

const userRouter = Router();

userRouter.get('/user', catchAsync(getAllUsers));

userRouter.get('/user/name/:name', catchAsync(getUserByName));

userRouter.get('/user/id/:id', catchAsync(getUserById));

export default userRouter;
