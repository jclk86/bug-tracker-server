import db from '../database/config';
import { Checklist } from '../schema/checklist';

export async function get(ticket_id: string): Promise<Checklist | undefined> {
  return await db<Checklist>('checklist').returning('*').where({ ticket_id }).first();
}

// we also need to return checklist items

export async function create(newChecklist: Checklist): Promise<Checklist> {
  await db<Checklist>('checklist').insert(newChecklist);
  return newChecklist;
}

export async function update(id: string, data: Partial<Checklist>): Promise<Partial<Checklist>> {
  await db<Checklist>('checklist').where({ id }).update(data);
  return data;
}
