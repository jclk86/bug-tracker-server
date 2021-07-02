import db from '../database/config';
import { Checklist, UpdateChecklist } from '../schema/checklist';

export function get(ticketId: string): Promise<Checklist[] | undefined> {
  const selector = { ticket_id: ticketId };

  return db<Checklist>('checklist').where(selector).returning('*');
}

export function getById(checklistId: string): Promise<Checklist | undefined> {
  const selector = { id: checklistId };

  return db<Checklist>('checklist').where(selector).returning('*').first();
}

export function getByTicketIdAndName(
  ticketId: string,
  checklistName: string
): Promise<Checklist | undefined> {
  const selector = { ticket_id: ticketId, name: checklistName };

  return db<Checklist>('checklist').where(selector).returning('*').first();
}

export function getByTicketId(ticketId: string): Promise<Checklist[]> {
  const selector = {
    ticket_id: ticketId
  };

  return db<Checklist>('checklist').where(selector).returning('*');
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
