// ! admin accounts can only be created via creating a file and running it via node. This
// ! prevents just anyone creating admin accounts.

import db from '../database/config';
import { Account } from '../types/account';

// Accounts
export function retrieve(accountId?: string): Promise<Account[]> {
  const selector = {
    ...(accountId && { id: accountId })
  };

  return db<Account>('account').where(selector).returning('*');
}

export function remove(accountId: string): Promise<void> {
  const selector = {
    id: accountId
  };

  return db<Account>('account').where(selector).delete();
}
