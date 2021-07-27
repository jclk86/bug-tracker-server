import db from '../database/config';
import { Ticket, UpdateTicket } from '../types/ticket';
import { Priority } from '../types/priority';
import { Status } from '../types/status';

export function retrieve(
  projectId?: string,
  ticketId?: string,
  ticketName?: string
): Promise<Ticket[]> {
  const selector = {
    ...(projectId && { project_id: projectId }),
    ...(ticketId && { id: ticketId }),
    ...(ticketName && { name: ticketName })
  };

  return db<Ticket>('ticket').where(selector).returning('*');
}

export function retrievePriorities(): Promise<Priority[]> {
  return db<Priority>('ticket_priority').returning('*');
}

export function retrieveStatuses(): Promise<Status[]> {
  return db<Status>('ticket_status').returning('*');
}

export function create(newTicket: Ticket): Promise<void> {
  return db<Ticket>('ticket').insert(newTicket);
}

export function update(ticketId: string, updatedTicket: UpdateTicket): Promise<void> {
  const selector = { id: ticketId };

  return db<Ticket>('ticket').where(selector).update(updatedTicket);
}

export function remove(ticketId: string): Promise<void> {
  const selector = { id: ticketId };

  return db<Ticket>('ticket').where(selector).delete();
}
