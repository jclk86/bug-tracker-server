import { Router } from 'express';
import companyRouter from './company';
import userRouter from './user';
import permissionRouter from './permission';
import projectRouter from './project';
import ticketRouter from './ticket';
import checklistRouter from './checklist';

const router = Router();

router.use(companyRouter);
router.use(userRouter);
router.use(permissionRouter);
router.use(projectRouter);
router.use(ticketRouter);
router.use(checklistRouter);

export = router;
