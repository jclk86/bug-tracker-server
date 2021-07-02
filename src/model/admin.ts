// ! admin accounts can only be created via creating a file and running it via node. This
// ! prevents just anyone creating admin accounts.

import db from '../database/config';
import { Admin, UpdateAdmin } from '../schema/admin';

export function get(): Promise<Admin[]> {
  return db<Admin>('admin').returning('*');
}

export function update(adminId: string, updatedAdmin: UpdateAdmin): Promise<void> {
  const selector = {
    id: adminId
  };

  return db<Admin>('admin').where(selector).update(updatedAdmin);
}

export function remove(adminId: string): Promise<void> {
  const selector = {
    id: adminId
  };

  return db<Admin>('admin').where(selector).delete();
}
