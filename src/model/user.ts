import db from '../database/config';
import { IUser } from '../schema/user';

async function getAllUsers(): Promise<IUser[]> {
  return await db<IUser>('user').returning('*');
}

export default {
  getAllUsers
};
