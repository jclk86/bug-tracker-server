import db from '../database/config';
import { Checklist, UpdateChecklist } from '../types/checklist';

export function retrieveAll(ticketId: string): Promise<Checklist[]> {
  const selector = {
    ...(ticketId && { ticket_id: ticketId })
  };

  return db<Checklist>('checklist').where(selector).returning('*');
}

export function retrieveBy(id?: string, checklistName?: string): Promise<Checklist | undefined> {
  const selector = {
    ...(id && { id: id }),
    ...(checklistName && { name: checklistName })
  };

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
