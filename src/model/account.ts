// model interfaces with database. Handles all data logic and data manipulation
import db from '../database/config';
import { Account, UpdateAccount } from '../types/account';

// https://stackoverflow.com/questions/12016322/async-all-the-way-down
// async await returns a promise. we do this in controller
// ! The only thing to watch out for is strack trace

// Retrieves specific account
export function retrieveBy(
  accountId?: string,
  accountEmail?: string,
  companyName?: string
): Promise<Account | undefined> {
  const selector = {
    ...(accountId && { id: accountId }),
    ...(accountEmail && { email: accountEmail }),
    ...(companyName && { company_name: companyName })
  };

  return db<Account>('account').where(selector).returning('*').first();
}

export function create(account: Account): Promise<void> {
  return db<Account>('account').insert(account);
}

export function update(accountId: string, updatedAccount: UpdateAccount): Promise<void> {
  const selector = { id: accountId };

  return db<Account>('account').where(selector).update(updatedAccount);
}

export function remove(accountId: string): Promise<void> {
  const selector = { id: accountId };

  return db<Account>('account').where(selector).delete();
}
