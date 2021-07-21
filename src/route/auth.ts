import { Router } from 'express';
import { catchAsync } from './utilities';
import { login, postRefreshToken, logout } from '../controller/auth';
import { requireAuth } from '../middleware/jwtAuth';

const authRouter = Router();

authRouter.post('/login', catchAsync(login));

authRouter.post('/refresh', catchAsync(requireAuth), catchAsync(postRefreshToken));

authRouter.delete('/logout', catchAsync(requireAuth), catchAsync(logout));

export default authRouter;
