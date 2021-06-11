import db from '../database/config';
import { ITicket, IUpdateTicket } from '../schema/ticket';

async function get(): Promise<ITicket[]> {
  return await db<ITicket>('ticket').returning('*');
}

async function getByName(name: string): Promise<ITicket | undefined> {
  return await db<ITicket>('ticket').returning('*').where({ name }).first();
}

async function getById(id: string): Promise<ITicket | undefined> {
  return await db<ITicket>('ticket').returning('*').where({ id }).first();
}

async function create(newTicket: ITicket): Promise<ITicket> {
  await db<ITicket>('ticket').insert(newTicket);
  return newTicket;
}

async function removeByName(name: string): Promise<void> {
  return await db<ITicket>('ticket').where({ name }).delete();
}

async function removeById(id: string): Promise<void> {
  return await db<ITicket>('ticket').where({ id }).delete();
}

async function update(id: string, data: IUpdateTicket): Promise<IUpdateTicket | undefined> {
  await db<ITicket>('ticket').where({ id }).update(data);
  return data;
}

export default {
  get,
  create,
  getByName,
  getById,
  removeByName,
  removeById,
  update
};
