import db from '../database/config';
import { Checklist } from '../schema/checklist';

export async function get(ticket_id: string): Promise<Checklist[]> {
  return await db<Checklist>('checklist').returning('*').where({ ticket_id });
}

// we also need to return checklist items

// do we need ticketId?
export async function create(newChecklist: Checklist): Promise<Checklist> {
  await db<Checklist>('checklist').insert(newChecklist);
  return newChecklist;
}

// export default {
//   get,
//   create
// };
