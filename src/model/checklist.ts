import db from '../database/config';
import { IChecklist } from '../schema/checklist';

// do we need to return all checklist if only 1 for a ticket?
async function get(ticket_id: string): Promise<IChecklist | undefined> {
  return await db<IChecklist>('checklist').returning('*').where({ ticket_id }).first();
}

// we also need to return checklist items

// do we need ticketId?
async function create(newChecklist: IChecklist): Promise<IChecklist> {
  await db<IChecklist>('checklist').insert(newChecklist);
  return newChecklist;
}

export default {
  get,
  create
};
