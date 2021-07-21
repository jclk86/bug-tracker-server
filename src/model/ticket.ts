import db from '../database/config';
import { Ticket, UpdateTicket } from '../types/ticket';
import { Priority } from '../types/priority';
import { Status } from '../types/status';

export function getByProjectId(projectId: string): Promise<Ticket[]> {
  const selector = { project_id: projectId };

  return db<Ticket>('ticket').where(selector).returning('*');
}

export function getByName(ticketName: string): Promise<Ticket | undefined> {
  const selector = { name: ticketName };

  return db<Ticket>('ticket').where(selector).returning('*').first();
}

export function getById(ticketId: string): Promise<Ticket | undefined> {
  const selector = { id: ticketId };

  return db<Ticket>('ticket').where(selector).returning('*').first();
}

export function getByProjectIdAndName(
  projectId: string,
  ticketName: string
): Promise<Ticket | undefined> {
  const selector = { project_id: projectId, name: ticketName };

  return db<Ticket>('ticket').where(selector).returning('*').first();
}

export function getPriorities(): Promise<Priority[]> {
  return db<Priority>('ticket_priority').returning('*');
}

export function getStatuses(): Promise<Status[]> {
  return db<Status>('ticket_status').returning('*');
}

export function create(newTicket: Ticket): Promise<void> {
  return db<Ticket>('ticket').insert(newTicket);
}

export function update(ticketId: string, updatedTicket: UpdateTicket): Promise<void> {
  const selector = { id: ticketId };

  return db<Ticket>('ticket').where(selector).update(updatedTicket);
}

export function removeByName(ticketName: string): Promise<void> {
  const selector = { name: ticketName };

  return db<Ticket>('ticket').where(selector).delete();
}

export function removeById(ticketId: string): Promise<void> {
  const selector = { id: ticketId };

  return db<Ticket>('ticket').where(selector).delete();
}
