import db from '../database/config';
import { IUser } from '../schema/user';

async function get(): Promise<IUser[]> {
  return await db<IUser>('user').returning('*');
}

async function getByName(name: string): Promise<IUser | undefined> {
  return await db<IUser>('user').returning('*').where({ name }).first();
}

async function getById(id: string): Promise<IUser | undefined> {
  return await db<IUser>('user').returning('*').where({ id }).first();
}

async function create(newUser: IUser): Promise<IUser> {
  await db<IUser>('user').insert(newUser);
  return newUser;
}

export default {
  get,
  getByName,
  getById,
  create
};
