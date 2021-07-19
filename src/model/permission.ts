import db from '../database/config';
import { Permission } from '../types/permission';

export function get(): Promise<Permission[]> {
  return db<Permission>('permission').returning('*');
}

export function getById(permissionId: number): Promise<Permission | undefined> {
  const selector = { id: permissionId };

  return db<Permission>('permission').returning('*').where(selector).first();
}
