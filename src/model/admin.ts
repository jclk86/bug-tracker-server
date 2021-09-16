// ! admin accounts can only be created via creating a file and running it via node. This
// ! prevents just anyone creating admin accounts.

import db from '../database/config';
import { Account } from '../types/account';

// Accounts
export function retrieveAll(): Promise<Account[]> {
  return db<Account>('account').returning('*');
}

export function retrieveBy(accountId: string): Promise<Account | undefined> {
  const selector = {
    ...(accountId && { id: accountId })
  };

  return db<Account>('account').where(selector).returning('*').first();
}

export function remove(accountId: string): Promise<void> {
  const selector = {
    id: accountId
  };

  return db<Account>('account').where(selector).delete();
}
