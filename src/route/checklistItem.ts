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

checklistItemRouter.use(catchAsync(requireAuth));

checklistItemRouter.get(
  '/checklistItem/checklistId/:checklistId',
  catchAsync(getAllChecklistItemsByChecklistId)
);

checklistItemRouter.get('/checklistItem/id/:checklistItemId', catchAsync(getChecklistItemById));

checklistItemRouter.post('/checklistItem/create', catchAsync(createChecklistItem));

checklistItemRouter.patch('/checklistItem/edit/:checklistItemId', catchAsync(updateChecklistItem));

checklistItemRouter.delete(
  '/checklistItem/delete/:checklistItemId',
  catchAsync(deleteChecklistItem)
);

export default checklistItemRouter;
