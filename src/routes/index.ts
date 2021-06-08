import { Router } from 'express';
import companyRouter from './company';
import userRouter from './user';

const router = Router();

router.use(companyRouter);
router.use(userRouter);

export = router;
