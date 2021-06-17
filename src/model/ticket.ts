import db from '../database/config';
import { Ticket } from '../schema/ticket';
import { Priority } from '../schema/priority';
import { Status } from '../schema/status';

export async function getByProjectId(project_id: string): Promise<Ticket[]> {
  return await db<Ticket>('ticket').returning('*').where({ project_id });
}

export async function getByName(name: string): Promise<Ticket | undefined> {
  return await db<Ticket>('ticket').returning('*').where({ name }).first();
}

export async function getById(id: string): Promise<Ticket | undefined> {
  return await db<Ticket>('ticket').returning('*').where({ id }).first();
}

export async function getByProjectIdAndName(
  project_id: string,
  name: string
): Promise<Ticket | undefined> {
  return await db<Ticket>('ticket').returning('*').where({ project_id, name }).first();
}

export async function create(newTicket: Ticket): Promise<Ticket> {
  await db<Ticket>('ticket').insert(newTicket);
  return newTicket;
}

export async function removeByName(name: string): Promise<void> {
  return await db<Ticket>('ticket').where({ name }).delete();
}

export async function removeById(id: string): Promise<void> {
  return await db<Ticket>('ticket').where({ id }).delete();
}

export async function update(
  id: string,
  data: Partial<Ticket>
): Promise<Partial<Ticket> | undefined> {
  await db<Ticket>('ticket').where({ id }).update(data);
  return data;
}

export async function getPriorities(): Promise<Priority[]> {
  return await db<Priority>('ticket_priority').returning('*');
}

export async function getStatuses(): Promise<Status[]> {
  return await db<Status>('ticket_status').returning('*');
}
