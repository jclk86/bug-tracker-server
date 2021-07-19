import { Router } from 'express';
import { catchAsync } from './utilities';
import { login, postRefreshToken, logout } from '../controller/auth';
import { requireAuth } from '../middleware/jwtAuth';

const authRouter = Router();

authRouter.post('/login', catchAsync(login));

authRouter.use(catchAsync(requireAuth));

authRouter.delete('/logout', catchAsync(logout));

authRouter.post('/refresh', catchAsync(postRefreshToken));

export default authRouter;
