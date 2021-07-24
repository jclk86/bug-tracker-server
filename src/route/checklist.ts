import { Router } from 'express';
import { catchAsync } from './utilities';
import {
  getChecklistById,
  getChecklists,
  createChecklist,
  updateChecklist,
  deleteChecklist
} from '../controller/checklist';
import { requireAuth } from '../middleware/jwtAuth';

const checklistRouter = Router();

// !replace checklistId with setChecklist?

checklistRouter.use('/checklist', catchAsync(requireAuth));

checklistRouter.get('/checklist/:checklistId', catchAsync(getChecklistById));

checklistRouter.get('/checklist/ticket/:ticketId', catchAsync(getChecklists));

checklistRouter.post('/checklist/create', catchAsync(createChecklist));

checklistRouter.patch('/checklist/:checklistId', catchAsync(updateChecklist));

checklistRouter.delete('/checklist/:checklistId', catchAsync(deleteChecklist));

export default checklistRouter;
