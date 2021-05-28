import { Router } from 'express';
import { getAllUsers } from '../controller/user';
import catchAsync from './utilities';

const userRouter = Router();

userRouter.get('/user', catchAsync(getAllUsers));

export default userRouter;
