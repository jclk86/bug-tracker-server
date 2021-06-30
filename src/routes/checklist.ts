import { Router } from 'express';
import { catchAsync } from './utilities';
import {
  getChecklist,
  createChecklist,
  updateChecklist,
  deleteChecklist
} from '../controller/checklist';

const checklistRouter = Router();

checklistRouter.get('/checklist/:checklistId', catchAsync(getChecklist));

checklistRouter.post('/checklist/create', catchAsync(createChecklist));

checklistRouter.patch('/checklist/edit/:checklistId', catchAsync(updateChecklist));

checklistRouter.delete('/checklist/delete/:checklistId', catchAsync(deleteChecklist));

export default checklistRouter;
