import db from '../database/config';
import { Permission } from '../schema/permission';

export async function get(): Promise<Permission[]> {
  return await db<Permission>('permission').returning('*');
}

export async function getById(permissionId: number): Promise<Permission | undefined> {
  const selector = { id: permissionId };

  return await db<Permission>('permission').returning('*').where(selector).first();
}
