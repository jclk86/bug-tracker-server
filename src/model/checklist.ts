import db from '../database/config';
import { Checklist, UpdateChecklist } from '../types/checklist';

export function retrieve(ticketId: string): Promise<Checklist[] | undefined> {
  const selector = { ticket_id: ticketId };

  return db<Checklist>('checklist').where(selector).returning('*');
}

export function retrieveById(checklistId: string): Promise<Checklist | undefined> {
  const selector = { id: checklistId };

  return db<Checklist>('checklist').where(selector).returning('*').first();
}
// ! replace with filter or find?
export function retrieveByTicketIdAndName(
  ticketId: string,
  checklistName: string
): Promise<Checklist | undefined> {
  const selector = { ticket_id: ticketId, name: checklistName };

  return db<Checklist>('checklist').where(selector).returning('*').first();
}

export function create(newChecklist: Checklist): Promise<void> {
  return db<Checklist>('checklist').insert(newChecklist);
}

export function update(checklistId: string, updatedChecklist: UpdateChecklist): Promise<void> {
  const selector = { id: checklistId };

  return db<Checklist>('checklist').where(selector).update(updatedChecklist);
}

export function remove(checklistId: string): Promise<void> {
  const selector = {
    id: checklistId
  };

  return db<Checklist>('checklist').where(selector).delete();
}
