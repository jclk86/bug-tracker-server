import db from '../database/config';
import { Checklist, UpdateChecklist } from '../types/checklist';

// ** FUNCTION OVERLOADS ** //

export function retrieve(
  ticketId: string,
  checklistId: null,
  checklistName: null
): Promise<Checklist[]>;

export function retrieve(
  ticketId: string,
  checklistId: null,
  checklistName: string
): Promise<Checklist>;

export function retrieve(
  ticketId: null,
  checklistId: string,
  checklistName: null
): Promise<Checklist>;

// ** END ** //

export function retrieve(
  ticketId?: string,
  checklistId?: string,
  checklistName?: string
): Promise<Checklist[] | Checklist | undefined> {
  const selector = {
    ...(ticketId && { ticket_id: ticketId }),
    ...(checklistId && { id: checklistId }),
    ...(checklistName && { name: checklistName })
  };

  const query = db<Checklist>('checklist').where(selector).returning('*');

  return (
    (ticketId && !checklistName && query) ||
    ((checklistId || (ticketId && checklistName)) && query.first())
  );
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
