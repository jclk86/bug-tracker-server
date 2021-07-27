import { retrieve, create, update, remove } from '../model/comment';
import { retrieve as retrieveTicket } from '../model/ticket';
import { checkBody, currentTimeStamp, validateUUID } from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import CustomError from '../errorHandler/CustomError';
import { Comment, UpdateComment } from '../types/comment';

export const getComments = async (req: Request, res: Response): Promise<void> => {
  const { ticketId } = req.params;

  await validateUUID({ ticketId });

  const ticket = await retrieveTicket(null, ticketId)[0];

  if (!ticket) throw new CustomError(404, 'Ticket does not exist');

  const comments = await retrieve(ticketId);

  if (!comments.length) throw new CustomError(404, 'No comments have been added for this ticket');

  res.status(200).send(comments);
};

export const getCommentById = async (req: Request, res: Response): Promise<void> => {
  const { commentId } = req.params;

  await validateUUID({ commentId });

  const comment = await retrieve(null, commentId)[0];

  if (!comment) throw new CustomError(404, 'Comment does not exist');

  res.status(200).send(comment);
};
// ! auto assign ticketId and userId using browser
export const createComment = async (req: Request, res: Response): Promise<void> => {
  const { content, ticketId, userId } = req.body;

  const newComment: Comment = {
    id: uuidv4(),
    date_created: currentTimeStamp,
    ticket_id: ticketId,
    user_id: userId,
    content: content
  };

  await checkBody(newComment);

  await create(newComment);

  res.status(201).send(newComment);
};

export const updateComment = async (req: Request, res: Response): Promise<void> => {
  const { commentId } = req.params;
  const { content } = req.body;

  await validateUUID({ commentId });

  const comment = await retrieve(null, commentId)[0];

  if (!comment) throw new CustomError(404, 'Comment does not exist');

  const updatedComment: UpdateComment = {
    content: content,
    last_edited: currentTimeStamp
  };

  await checkBody(updatedComment);

  await update(commentId, updatedComment);

  res.status(201).send(updatedComment);
};

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  const { commentId } = req.params;

  await validateUUID({ commentId });

  const comment = await retrieve(null, commentId)[0];

  if (!comment) throw new CustomError(404, 'Comment does not exist');

  await remove(commentId);

  res.status(200).send({ message: 'Comment was successfully deleted' });
};
