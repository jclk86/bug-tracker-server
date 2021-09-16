import db from '../database/config';
import { User, UpdateUser } from '../types/user';

export function retrieveAll(accountId?: string, userRole?: string): Promise<User[]> {
  const selector = {
    ...(accountId && { account_id: accountId }),
    ...(userRole && { role: userRole })
  };

  return db<User>('user').where(selector).returning('*');
}

export function retrieveBy(id: string, email: string): Promise<User | undefined> {
  const selector = {
    ...(id && { id: id }),
    ...(email && { email: email })
  };

  return db<User>('user').where(selector).returning('*').first();
}

export function create(signUp: User): Promise<void> {
  return db<User>('user').insert(signUp);
}

export function update(userId: string, updatedUser: UpdateUser): Promise<void> {
  const selector = { id: userId };

  return db<User>('user').where(selector).update(updatedUser);
}

export function remove(userId: string): Promise<void> {
  const selector = { id: userId };

  return db<User>('user').where(selector).delete();
}
