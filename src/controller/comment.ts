import { get, getById, create, update, remove } from '../model/comment';
import { getById as getTicket } from '../model/ticket';
import { checkBody, currentTimeStamp } from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import CustomError from '../errorhandler/CustomError';

export const getAllCommentsByticketId = async (req: Request, res: Response): Promise<void> => {
  const { ticketId } = req.params;

  const isValid = isValidUUIDV4(ticketId);

  if (!isValid) throw new CustomError(400, 'Invalid id');

  const ticketExists = await getTicket(ticketId);

  if (!ticketExists) throw new CustomError(400, 'No such ticket exists');

  const comments = await get(ticketId);

  if (!comments.length) throw new CustomError(400, 'No comments exist for this ticket');

  res.status(200).send(comments);
};

export const getCommentById = async (req: Request, res: Response): Promise<void> => {
  const { commentId } = req.params;

  const isValid = isValidUUIDV4(commentId);

  if (!isValid) throw new CustomError(400, 'Invalid id');

  const comment = await getById(commentId);

  if (!comment) throw new CustomError(400, 'No such comment exists');

  res.status(200).send(comment);
};
// ! auto assign ticketId and userId using browser
export const createComment = async (req: Request, res: Response): Promise<void> => {
  const { content, ticketId, userId } = req.body;

  const newComment = {
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

  const isValid = isValidUUIDV4(commentId);

  if (!isValid) throw new CustomError(400, 'Invalid id');

  const exists = await getById(commentId);

  if (!exists) throw new CustomError(400, 'No such comment exists');

  const updatedComment = {
    content: content,
    last_edited: currentTimeStamp
  };

  await checkBody(updatedComment);

  await update(commentId, updatedComment);

  res.status(201).send(updatedComment);
};

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  const { commentId } = req.params;

  const isValid = isValidUUIDV4(commentId);

  if (!isValid) throw new CustomError(400, 'Invalid id');

  const exists = await getById(commentId);

  if (!exists) throw new CustomError(400, 'No such comment exists');

  await remove(commentId);

  res.status(200).send({ message: 'Comment was successfully deleted' });
};
