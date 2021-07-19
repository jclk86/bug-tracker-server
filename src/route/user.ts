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

userRouter.post('/user/create', catchAsync(createUser));

userRouter.get(
  '/user/companyId/:companyId',
  catchAsync(requireAuth),
  catchAsync(getAllUsersByCompanyId)
);

userRouter.get('/user/email/:userEmail', catchAsync(requireAuth), catchAsync(getUserByEmail));

userRouter.get('/user/id/:userId', catchAsync(requireAuth), catchAsync(getUserById));

userRouter.patch('/user/edit/:userId', catchAsync(requireAuth), catchAsync(updateUser));

userRouter.delete('/user/delete/:userId', catchAsync(requireAuth), catchAsync(deleteUser));

export default userRouter;
