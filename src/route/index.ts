import { Router } from 'express';
import accountRouter from './account';
import userRouter from './user';
import projectRouter from './project';
import ticketRouter from './ticket';
import checklistRouter from './checklist';
import checklistItemRouter from './checklistItem';
import commentRouter from './comment';
import authRouter from './auth';
import adminRouter from './admin';

const router = Router();

router.use(userRouter);
router.use(accountRouter);
router.use(projectRouter);
router.use(ticketRouter);
router.use(checklistRouter);
router.use(checklistItemRouter);
router.use(commentRouter);
router.use(adminRouter);
router.use(authRouter);

export = router;
