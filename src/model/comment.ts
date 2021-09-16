import db from '../database/config';
import { Comment, UpdateComment } from '../types/comment';

export function retrieveAll(ticketId: string): Promise<Comment[]> {
  const selector = {
    ticketId: ticketId
  };

  return db<Comment>('comment').where(selector).returning('*');
}

export function retrieveBy(id: string): Promise<Comment | undefined> {
  const selector = {
    ...(id && { id: id })
  };

  return db<Comment>('comment').where(selector).returning('*').first();
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
