import db from '../database/config';
import { Checklist, UpdateChecklist } from '../schema/checklist';

export function get(ticketId: string): Promise<Checklist[] | undefined> {
  const selector = { ticket_id: ticketId };

  return db<Checklist>('checklist').returning('*').where(selector);
}

export function getById(checklistId: string): Promise<Checklist | undefined> {
  const selector = { id: checklistId };

  return db<Checklist>('checklist').returning('*').where(selector).first();
}

export function getByTicketIdAndName(
  ticketId: string,
  name: string
): Promise<Checklist | undefined> {
  const selector = { ticket_id: ticketId, name: name };

  return db<Checklist>('checklist').returning('*').where(selector).first();
}
//! we also need to return checklist items
export function create(newChecklist: Checklist): Promise<Checklist> {
  return db<Checklist>('checklist').insert(newChecklist);
}

export function update(
  checklistId: string,
  updatedChecklist: UpdateChecklist
): Promise<UpdateChecklist> {
  const selector = { id: checklistId };

  return db<Checklist>('checklist').where(selector).update(updatedChecklist);
}
