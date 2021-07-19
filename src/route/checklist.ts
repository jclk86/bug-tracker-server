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

checklistRouter.all('/checklist', catchAsync(requireAuth));

checklistRouter.get('/checklist/id/:checklistId', catchAsync(getChecklistById));

checklistRouter.get('/checklist/ticketId/:ticketId', catchAsync(getAllChecklistsByTicketId));

checklistRouter.post('/checklist/create', catchAsync(createChecklist));

checklistRouter.patch('/checklist/edit/:checklistId', catchAsync(updateChecklist));

checklistRouter.delete('/checklist/delete/:checklistId', catchAsync(deleteChecklist));

export default checklistRouter;
