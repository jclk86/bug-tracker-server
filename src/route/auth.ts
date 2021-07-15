import { Router } from 'express';
import { catchAsync } from './utilities';
import { signin, postRefreshToken, signOut } from '../controller/auth';
import { requireAuth } from '../middleware/jwt-auth';

const authRouter = Router();

authRouter.post('/login', catchAsync(signin));

authRouter.delete('/logout', catchAsync(signOut));

authRouter.use(catchAsync(requireAuth));

authRouter.post('/refresh', catchAsync(postRefreshToken));

export default authRouter;
