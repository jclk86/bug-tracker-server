import db from '../database/config';
import { Checklist, UpdateChecklist } from '../schema/checklist';

export async function get(ticketId: string): Promise<Checklist | undefined> {
  const selector = { ticket_id: ticketId };

  return await db<Checklist>('checklist').returning('*').where(selector).first();
}

export async function getById(checklistId: string): Promise<Checklist | undefined> {
  const selector = { id: checklistId };

  return await db<Checklist>('checklist').returning('*').where(selector).first();
}

export async function getByTicketIdAndName(
  ticketId: string,
  name: string
): Promise<Checklist | undefined> {
  const selector = { ticket_id: ticketId, name: name };

  return await db<Checklist>('checklist').returning('*').where(selector).first();
}
//! we also need to return checklist items
export async function create(newChecklist: Checklist): Promise<Checklist> {
  await db<Checklist>('checklist').insert(newChecklist);

  return newChecklist;
}

export async function update(
  checklistId: string,
  updatedChecklist: UpdateChecklist
): Promise<UpdateChecklist> {
  const selector = { id: checklistId };

  await db<Checklist>('checklist').where(selector).update(updatedChecklist);

  return updatedChecklist;
}
