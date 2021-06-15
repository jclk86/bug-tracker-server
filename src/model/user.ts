import db from '../database/config';
import { User } from '../schema/user';

export async function get(): Promise<User[]> {
  return await db<User>('user').returning('*');
}

export async function getByEmail(email: string): Promise<User | undefined> {
  return await db<User>('user').returning('*').where({ email }).first();
}

export async function getByName(name: string): Promise<User | undefined> {
  return await db<User>('user').returning('*').where({ name }).first();
}

export async function getById(id: string): Promise<User | undefined> {
  return await db<User>('user').returning('*').where({ id }).first();
}

export async function getAccountOwner(
  company_id: string,
  permission_id: number
): Promise<User | undefined> {
  return await db<User>('user')
    .returning('*')
    .where('company_id', company_id)
    .andWhere('permission_id', permission_id)
    .first();
}

export async function create(newUser: User): Promise<User> {
  await db<User>('user').insert(newUser);
  return newUser;
}

export async function update(id: string, data: Partial<User>): Promise<Partial<User>> {
  await db<User>('user').where({ id }).update(data);
  return data;
}

export async function removeByEmail(email: string): Promise<User | undefined> {
  return await db<User>('user').where('email', email).delete();
}

export async function removeById(id: string): Promise<void> {
  return await db<User>('user').where({ id }).delete();
}
