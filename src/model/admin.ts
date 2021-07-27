// ! admin accounts can only be created via creating a file and running it via node. This
// ! prevents just anyone creating admin accounts.

import db from '../database/config';
import { Account } from '../types/account';

export function retrieve(accountId: string): Promise<Account>;

export function retrieve(): Promise<Account[]>;

// Accounts
export function retrieve(accountId?: string): Promise<Account[] | Account> {
  // If accountId is not provided, returns all accounts.
  const selector = {
    ...(accountId && { id: accountId })
  };

  const query = db<Account>('account').where(selector).returning('*');

  return (accountId && query.first()) || query;
}

export function remove(accountId: string): Promise<void> {
  const selector = {
    id: accountId
  };

  return db<Account>('account').where(selector).delete();
}
