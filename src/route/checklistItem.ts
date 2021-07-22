import { Router } from 'express';
import { catchAsync } from './utilities';
import {
  getChecklistItemById,
  getAllChecklistItemsByChecklistId,
  createChecklistItem,
  updateChecklistItem,
  deleteChecklistItem
} from '../controller/checklistItem';
import { requireAuth } from '../middleware/jwtAuth';

const checklistItemRouter = Router();

checklistItemRouter.use('/checklist-item', catchAsync(requireAuth));

checklistItemRouter.get(
  '/checklist-item/checklist/:checklistId',
  catchAsync(getAllChecklistItemsByChecklistId)
);

checklistItemRouter.get('/checklist-item/:checklistItemId', catchAsync(getChecklistItemById));

checklistItemRouter.post('/checklist-item', catchAsync(createChecklistItem));

checklistItemRouter.patch('/checklist-item/:checklistItemId', catchAsync(updateChecklistItem));

checklistItemRouter.delete('/checklist-item/:checklistItemId', catchAsync(deleteChecklistItem));

export default checklistItemRouter;
