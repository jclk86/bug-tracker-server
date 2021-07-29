import db from '../database/config';
import { Invite } from '../types/invite';

//** FUNCTION OVERLOADS **/

export function retrieve(accountId: string, email: string): Promise<Invite>;
export function retrieve(accountId: string, email: null): Promise<Invite[]>;
export function retrieve(accountId: null, email: string): Promise<Invite>;

// ** END ** //

export function retrieve(
  accountId?: string,
  email?: string
): Promise<Invite[] | Invite | undefined> {
  const selector = {
    ...(accountId && { account_id: accountId }),
    ...(email && { email: email })
  };

  const query = db<Invite>('invite').where(selector).returning('*');

  return (accountId && !email && query) || query.first();
}

export function create(inviteData: Invite): Promise<void> {
  return db<Invite>('invite').insert(inviteData);
}

export function update(inviteId: string, date_sent: string): Promise<void> {
  const selector = {
    id: inviteId
  };

  return db<Invite>('invite').where(selector).update({ date_sent });
}

export function remove(email: string): Promise<void> {
  const selector = { email: email };

  return db<Invite>('invite').where(selector).delete();
}
