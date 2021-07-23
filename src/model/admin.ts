// ! admin accounts can only be created via creating a file and running it via node. This
// ! prevents just anyone creating admin accounts.

import db from '../database/config';
import { User } from '../types/user';

export function retrieve(): Promise<User[]> {
  return db<User>('user').returning('*');
}

// !replace with filter or find?
export function retrieveByRole(role: string): Promise<User[]> {
  const selector = {
    role
  };

  return db<User>('user').where(selector).returning('*');
}
