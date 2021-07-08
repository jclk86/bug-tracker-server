import { Router } from 'express';
import { catchAsync } from './utilities';
import { signin } from '../controller/auth';

const authRouter = Router();

authRouter.post('/login', catchAsync(signin));

export default authRouter;
