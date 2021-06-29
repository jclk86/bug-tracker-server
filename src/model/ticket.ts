import db from '../database/config';
import { Ticket, UpdateTicket } from '../schema/ticket';
import { Priority } from '../schema/priority';
import { Status } from '../schema/status';

export async function getByProjectId(projectId: string): Promise<Ticket[]> {
  const selector = { project_id: projectId };

  return await db<Ticket>('ticket').returning('*').where(selector);
}

export async function getByName(ticketName: string): Promise<Ticket | undefined> {
  const selector = { name: ticketName };

  return await db<Ticket>('ticket').returning('*').where(selector).first();
}

export async function getById(ticketId: string): Promise<Ticket | undefined> {
  const selector = { id: ticketId };

  return await db<Ticket>('ticket').returning('*').where(selector).first();
}

export async function getByProjectIdAndName(
  projectId: string,
  ticketName: string
): Promise<Ticket | undefined> {
  const selector = { project_id: projectId, name: ticketName };

  return await db<Ticket>('ticket').returning('*').where(selector).first();
}

export async function create(newTicket: Ticket): Promise<Ticket> {
  await db<Ticket>('ticket').insert(newTicket);
  return newTicket;
}

export async function removeByName(ticketName: string): Promise<void> {
  const selector = { name: ticketName };

  return await db<Ticket>('ticket').where(selector).delete();
}

export async function removeById(ticketId: string): Promise<void> {
  const selector = { id: ticketId };

  return await db<Ticket>('ticket').where(selector).delete();
}

export async function update(
  ticketId: string,
  updatedTicket: UpdateTicket
): Promise<UpdateTicket | undefined> {
  const selector = { id: ticketId };

  await db<Ticket>('ticket').where(selector).update(updatedTicket);
  return updatedTicket;
}

export async function getPriorities(): Promise<Priority[]> {
  return await db<Priority>('ticket_priority').returning('*');
}

export async function getStatuses(): Promise<Status[]> {
  return await db<Status>('ticket_status').returning('*');
}
