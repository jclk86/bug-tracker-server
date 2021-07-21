import { Router } from 'express';
import { catchAsync } from './utilities';
import {
  getAllCommentsByticketId,
  getCommentById,
  updateComment,
  createComment,
  deleteComment
} from '../controller/comment';
import { requireAuth } from '../middleware/jwtAuth';

const commentRouter = Router();

commentRouter.all('/comment', catchAsync(requireAuth));

commentRouter.get('/comment/ticket/:ticketId', catchAsync(getAllCommentsByticketId));

commentRouter.get('/comment/:commentId', catchAsync(getCommentById));

commentRouter.post('/comment', catchAsync(createComment));

commentRouter.patch('/comment/:commentId', catchAsync(updateComment));

commentRouter.delete('/comment/:commentId', catchAsync(deleteComment));

export default commentRouter;
