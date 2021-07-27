import db from '../database/config';
import { Checklist, UpdateChecklist } from '../types/checklist';

export function retrieve(
  ticketId?: string,
  checklistId?: string,
  checklistName?: string
): Promise<Checklist[] | undefined> {
  const selector = {
    ...(ticketId && { ticket_id: ticketId }),
    ...(checklistId && { id: checklistId }),
    ...(checklistName && { name: checklistName })
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
