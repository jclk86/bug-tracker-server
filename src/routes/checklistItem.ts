import { Router } from 'express';
import { catchAsync } from './utilities';
import {
  getChecklistItemById,
  getAllChecklistItemsByChecklistId,
  createChecklistItem,
  updateChecklistItem,
  deleteChecklistItem
} from '../controller/checklistItem';

const checklistItemRouter = Router();

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
