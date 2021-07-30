import { Router } from 'express';
import { catchAsync } from './utilities';
import {
  getChecklistById,
  getChecklists,
  createChecklist,
  updateChecklist,
  deleteChecklist
} from '../controller/checklistController';
import { requireAuth } from '../middleware/jwtAuth';

const checklistRouter = Router();

// !replace checklistId with setChecklist?

// checklistRouter.use('/checklist', catchAsync(requireAuth));

checklistRouter.get('/checklists/ticket/:ticketId', catchAsync(getChecklists));

checklistRouter.get('/checklist/:checklistId', catchAsync(getChecklistById));

checklistRouter.post('/checklist', catchAsync(createChecklist));

checklistRouter.patch('/checklist/:checklistId', catchAsync(updateChecklist));

checklistRouter.delete('/checklist/:checklistId', catchAsync(deleteChecklist));

export default checklistRouter;
