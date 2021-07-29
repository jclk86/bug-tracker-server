import db from '../database/config';
import { Comment, UpdateComment } from '../types/comment';

// ** FUNCTION OVERLOADS ** //

export function retrieve(ticketId: string, commentId: null): Promise<Comment[]>;

export function retrieve(ticketId: null, commentId: string): Promise<Comment>;

//** END ** //

export function retrieve(
  ticketId?: string,
  commentId?: string
): Promise<Comment[] | Comment | undefined> {
  const selector = {
    ...(ticketId && { ticket_id: ticketId }),
    ...(commentId && { id: commentId })
  };

  const query = db<Comment>('comment').where(selector).returning('*');

  return (ticketId && query) || query.first();
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
