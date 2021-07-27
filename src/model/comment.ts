import db from '../database/config';
import { Comment, UpdateComment } from '../types/comment';

export function retrieve(ticketId?: string, commentId?: string): Promise<Comment[]> {
  const selector = {
    ...(ticketId && { ticket_id: ticketId }),
    ...(commentId && { id: commentId })
  };

  return db<Comment>('comment').where(selector).returning('*');
}

export function create(newComment: Comment): Promise<void> {
  return db<Comment>('comment').insert(newComment);
}

export function update(commentId: string, updatedComment: UpdateComment): Promise<void> {
  const selector = {
    id: commentId
  };

  return db<Comment>('comment').where(selector).update(updatedComment);
}

export function remove(commentId: string): Promise<void> {
  const selector = {
    id: commentId
  };

  return db<Comment>('comment').where(selector).delete();
}
