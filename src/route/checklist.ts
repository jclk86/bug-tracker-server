import { Router } from 'express';
import { catchAsync } from './utilities';
import {
  getChecklistById,
  getAllChecklistsByTicketId,
  createChecklist,
  updateChecklist,
  deleteChecklist
} from '../controller/checklist';
import { requireAuth } from '../middleware/jwtAuth';

const checklistRouter = Router();

// !replace checklistId with setChecklist?

checklistRouter.all('/checklist', catchAsync(requireAuth));

checklistRouter.get('/checklist/:checklistId', catchAsync(getChecklistById));

checklistRouter.get('/checklist/ticket/:ticketId', catchAsync(getAllChecklistsByTicketId));

checklistRouter.post('/checklist/create', catchAsync(createChecklist));

checklistRouter.patch('/checklist/:checklistId', catchAsync(updateChecklist));

checklistRouter.delete('/checklist/:checklistId', catchAsync(deleteChecklist));

export default checklistRouter;
