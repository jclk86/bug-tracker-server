import { Router } from 'express';
import { catchAsync } from './utilities';
import { login, postRefreshToken, logout } from '../controller/auth';
import { requireAuth } from '../middleware/jwtAuth';

const authRouter = Router();

authRouter.post('/login', catchAsync(login));

authRouter.delete('/logout', catchAsync(requireAuth), catchAsync(logout));

authRouter.post('/refresh', catchAsync(requireAuth), catchAsync(postRefreshToken));

export default authRouter;
