import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  getUserByEmail,
  getAllUsersByCompanyId,
  createUser,
  updateUser,
  deleteUser
} from '../controller/user';
import { catchAsync } from './utilities';

const userRouter = Router();

userRouter.get('/user', catchAsync(getAllUsers));

userRouter.get('/user/company_id/:company_id', catchAsync(getAllUsersByCompanyId));

userRouter.get('/user/email/:email', catchAsync(getUserByEmail));

userRouter.get('/user/id/:id', catchAsync(getUserById));

userRouter.post('/user/create', catchAsync(createUser));

userRouter.patch('/user/edit/:id', catchAsync(updateUser));

userRouter.delete('/user/delete/:id', catchAsync(deleteUser));

export default userRouter;
