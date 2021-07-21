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
import { requireAuth } from '../middleware/jwtAuth';

const userRouter = Router();

userRouter.get(
  '/user/company/:companyId',
  catchAsync(requireAuth),
  catchAsync(getAllUsersByCompanyId)
);

userRouter.get('/user/email/:userEmail', catchAsync(requireAuth), catchAsync(getUserByEmail));

userRouter.get('/user/:userId', catchAsync(requireAuth), catchAsync(getUserById));

userRouter.post('/user', catchAsync(createUser));

userRouter.patch('/user/:userId', catchAsync(requireAuth), catchAsync(updateUser));

userRouter.delete('/user/:userId', catchAsync(requireAuth), catchAsync(deleteUser));

export default userRouter;
