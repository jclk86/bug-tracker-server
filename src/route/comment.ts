import { Router } from 'express';
import { catchAsync } from './utilities';
import {
  getComments,
  getCommentById,
  updateComment,
  createComment,
  deleteComment
} from '../controller/commentController';
import { requireAuth } from '../middleware/jwtAuth';

const commentRouter = Router();

// commentRouter.use('/comment', catchAsync(requireAuth));

commentRouter.get('/comment/ticket/:ticketId', catchAsync(getComments));

commentRouter.get('/comment/:commentId', catchAsync(getCommentById));

commentRouter.post('/comment', catchAsync(createComment));

commentRouter.patch('/comment/:commentId', catchAsync(updateComment));

commentRouter.delete('/comment/:commentId', catchAsync(deleteComment));

export default commentRouter;
