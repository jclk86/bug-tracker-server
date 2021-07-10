import { Router } from 'express';
import { catchAsync } from './utilities';
import { signin, signRefreshToken, signOut } from '../controller/auth';
import { requireAuth } from '../middleware/jwt-auth';

const authRouter = Router();

authRouter.post('/login', catchAsync(signin));

authRouter.patch('/logout', catchAsync(signOut));

authRouter.use(catchAsync(requireAuth));

authRouter.post('/refresh', catchAsync(signRefreshToken));

export default authRouter;
