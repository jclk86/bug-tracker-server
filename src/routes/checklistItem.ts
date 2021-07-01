import { Router } from 'express';
import { catchAsync } from './utilities';
import {
  getChecklistItem,
  createChecklistItem,
  updateChecklistItem,
  deleteChecklistItem
} from '../controller/checklistItem';

const checklistItemRouter = Router();

checklistItemRouter.get('/checklistItem/:checklistItemId', catchAsync(getChecklistItem));

checklistItemRouter.post('/checklistItem/create/:checklistId', catchAsync(createChecklistItem));

checklistItemRouter.patch('/checklistItem/edit/:checklistItemId', catchAsync(updateChecklistItem));

checklistItemRouter.delete(
  '/checklistItem/delete/:checklistItemId',
  catchAsync(deleteChecklistItem)
);

export default checklistItemRouter;
