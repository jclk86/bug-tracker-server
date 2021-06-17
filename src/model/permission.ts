import db from '../database/config';
import { Permission } from '../schema/permission';

export async function get(): Promise<Permission[]> {
  return await db<Permission>('permission').returning('*');
}

export async function getById(id: number): Promise<Permission | undefined> {
  return await db<Permission>('permission').returning('*').where({ id }).first();
}
