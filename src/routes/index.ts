import { Router } from 'express';
import companyRouter from './company';
import userRouter from './user';
import permissionRouter from './permission';
import projectRouter from './project';
import ticketRouter from './ticket';
import checklistRouter from './checklist';
import checklistItemRouter from './checklistItem';
import commentRouter from './comment';
import authRouter from './auth';
import adminRouter from './admin';

const router = Router();

router.use(companyRouter);
router.use(userRouter);
router.use(permissionRouter);
router.use(projectRouter);
router.use(ticketRouter);
router.use(checklistRouter);
router.use(checklistItemRouter);
router.use(commentRouter);
router.use(adminRouter);
router.use(authRouter);

export = router;
