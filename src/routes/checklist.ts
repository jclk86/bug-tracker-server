import { Router } from 'express';
import { catchAsync } from './utilities';
import { getChecklist, createChecklist } from '../controller/checklist';

const checklistRouter = Router();

checklistRouter.get('/checklist/:checklistId', catchAsync(getChecklist));

checklistRouter.post('/checklist/create', catchAsync(createChecklist));

export default checklistRouter;
