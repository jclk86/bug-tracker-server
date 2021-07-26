import { Router } from 'express';
import { catchAsync } from './utilities';
import {
  getChecklistItemById,
  getChecklistItems,
  createChecklistItem,
  updateChecklistItem,
  deleteChecklistItem
} from '../controller/checklistItemController';
import { requireAuth } from '../middleware/jwtAuth';

const checklistItemRouter = Router();

checklistItemRouter.use('/checklist-item', catchAsync(requireAuth));

checklistItemRouter.get('/checklist-item/checklist/:checklistId', catchAsync(getChecklistItems));

checklistItemRouter.get('/checklist-item/:checklistItemId', catchAsync(getChecklistItemById));

checklistItemRouter.post('/checklist-item', catchAsync(createChecklistItem));

checklistItemRouter.patch('/checklist-item/:checklistItemId', catchAsync(updateChecklistItem));

checklistItemRouter.delete('/checklist-item/:checklistItemId', catchAsync(deleteChecklistItem));

export default checklistItemRouter;
