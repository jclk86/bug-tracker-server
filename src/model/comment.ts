import db from '../database/config';
import { Comment, UpdateComment } from '../schema/comment';

export function get(ticketId: string): Promise<Comment[]> {
  const selector = {
    ticket_id: ticketId
  };

  return db<Comment>('comment').where(selector).returning('*');
}

export function getById(commentId: string): Promise<Comment> {
  const selector = {
    id: commentId
  };

  return db<Comment>('comment').where(selector).returning('*').first();
}

export function create(newComment: Comment): Promise<void> {
  return db<Comment>('comment').insert(newComment);
}

export function update(ticketId: string, updatedComment: UpdateComment): Promise<void> {
  const selector = {
    ticket_id: ticketId
  };

  return db<Comment>('comment').where(selector).update(updatedComment);
}

export function remove(commentId: string): Promise<void> {
  const selector = {
    id: commentId
  };

  return db<Comment>('comment').where(selector).delete();
}
