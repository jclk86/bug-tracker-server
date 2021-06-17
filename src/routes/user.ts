import { Router } from 'express';
import {
  getAllUsers,
  getUserByName,
  getUserById,
  getUserByEmail,
  getAllUsersByCompanyId,
  createUser,
  updateUser,
  deleteUser
} from '../controller/user';
import { catchAsync } from './utilities';

const userRouter = Router();
// route for admins
userRouter.get('/user', catchAsync(getAllUsers));

// user routes
userRouter.get('/user/company_id/:company_id', catchAsync(getAllUsersByCompanyId));

// might be useless
userRouter.get('/user/name/:name', catchAsync(getUserByName));

userRouter.get('/user/email/:email', catchAsync(getUserByEmail));

userRouter.get('/user/id/:id', catchAsync(getUserById));

userRouter.post('/user/create', catchAsync(createUser));

userRouter.patch('/user/edit/:id', catchAsync(updateUser));

userRouter.delete('/user/delete/:id', catchAsync(deleteUser));

export default userRouter;
