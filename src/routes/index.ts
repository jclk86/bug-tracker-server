import { Router } from 'express';
import companyRouter from './company';
import userRouter from './user';
import permissionRouter from './permission';

const router = Router();

router.use(companyRouter);
router.use(userRouter);
router.use(permissionRouter);

export = router;
