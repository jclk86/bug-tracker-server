import { Router } from 'express';
import { catchAsync } from './utilities';
import { getChecklistItem } from '../controller/checklistItem';

const checklistItemRouter = Router();

checklistItemRouter.get('/checklistItem/:checklistItemId', catchAsync(getChecklistItem));

export default checklistItemRouter;
