import db from '../database/config';
import { IPermission } from '../schema/permission';

async function get(): Promise<IPermission[]> {
  return await db<IPermission>('permission').returning('*');
}

async function getById(id: string): Promise<IPermission | undefined> {
  return await db<IPermission>('permission').returning('*').where({ id }).first();
}

export default {
  get,
  getById
};
