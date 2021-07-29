import db from '../database/config';
import { User, UpdateUser } from '../types/user';

// ** FUNCTION OVERLOADS **//
export function retrieve(
  accountId: string,
  userId: null,
  userEmail: null,
  userRole: null
): Promise<User[]>;

export function retrieve(
  accountId: string,
  userId: null,
  userEmail: null,
  userRole: string
): Promise<User>;

export function retrieve(
  accountId: null,
  userId: null,
  userEmail: string,
  userRole: null
): Promise<User>;

export function retrieve(
  accountId: null,
  userId: string,
  userEmail: null,
  userRole: null
): Promise<User>;

// ** END ** //

export function retrieve(
  accountId?: string,
  userId?: string,
  userEmail?: string,
  userRole?: string
): Promise<User[] | User | undefined> {
  const selector = {
    ...(accountId && { account_id: accountId }),
    ...(userId && { id: userId }),
    ...(userEmail && { email: userEmail }),
    ...(userRole && { role: userRole })
  };

  const query = db<User>('user').where(selector).returning('*');
  // if accountId && no userRole, then return array. If not, return first item.
  return (accountId && !userRole && query) || query.first();
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
