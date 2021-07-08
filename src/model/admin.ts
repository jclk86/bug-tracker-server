// ! admin accounts can only be created via creating a file and running it via node. This
// ! prevents just anyone creating admin accounts.

import db from '../database/config';
import { User } from '../types/user';

export function get(): Promise<User[]> {
  return db<User>('user').returning('*');
}

export function getOwners(): Promise<User[]> {
  const selector = {
    permission_id: 1
  };

  return db<User>('user').where(selector).returning('*');
}
