import db from '../database/config';
import { Invite } from '../types/invite';

export function retrieve(email: string): Promise<Invite | undefined> {
  const selector = {
    email: email
  };

  return db<Invite>('invite').where(selector).returning('*').first();
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
