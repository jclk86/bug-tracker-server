import db from '../database/config';
import { IUser, IUpdateUser } from '../schema/user';

async function get(): Promise<IUser[]> {
  return await db<IUser>('user').returning('*');
}

async function getByEmail(email: string): Promise<IUser | undefined> {
  return await db<IUser>('user').returning('*').where({ email }).first();
}

async function getByName(name: string): Promise<IUser | undefined> {
  return await db<IUser>('user').returning('*').where({ name }).first();
}

async function getById(id: string): Promise<IUser | undefined> {
  return await db<IUser>('user').returning('*').where({ id }).first();
}

async function getAccountOwner(
  company_id: string,
  permission_id: number
): Promise<IUser | undefined> {
  return await db<IUser>('user')
    .returning('*')
    .where('company_id', company_id)
    .andWhere('permission_id', permission_id)
    .first();
}

async function create(newUser: IUser): Promise<IUser> {
  await db<IUser>('user').insert(newUser);
  return newUser;
}

async function update(id: string, data: IUpdateUser): Promise<IUpdateUser> {
  await db<IUser>('user').where({ id }).update(data);
  return data;
}

async function removeByEmail(email: string): Promise<IUser | undefined> {
  return await db<IUser>('user').where('email', email).delete();
}

export default {
  get,
  getByEmail,
  getById,
  getByName,
  create,
  removeByEmail,
  getAccountOwner,
  update
};
