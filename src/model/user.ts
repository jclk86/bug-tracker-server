import db from '../database/config';
import { User, UpdateUser } from '../schema/user';

export function get(): Promise<User[]> {
  return db<User>('user').returning('*');
}

// export function getBySelector(id?: string, email?: string): Promise<User | undefined> {
//   const selector = {
//     ...(id && { id: id }),
//     ...(email && { email: email })
//   };

//   const cols = [
//     'id',
//     'first_name AS firstName',
//     'last_name AS lastName',
//     'permission_id AS permissionId',
//     'email',
//     'date_created AS dateCreated',
//     'company_id AS companyId',
//     'active'
//   ];

//   const data = db<User>('user').select(cols).where(selector).first();

//   return data;
// }

export function getByEmail(userEmail: string): Promise<User | undefined> {
  const selector = { email: userEmail };

  return db<User>('user').where(selector).returning('*').first();
}

export function getById(userId: string): Promise<User | undefined> {
  const selector = { id: userId };

  return db<User>('user').where(selector).returning('*').first();
}

export function getByCompanyId(companyId: string): Promise<User[]> {
  const selector = { company_id: companyId };

  return db<User>('user').where(selector).returning('*');
}

export function getAccountOwner(
  companyId: string,
  permissionId: number
): Promise<User | undefined> {
  const selector = { company_id: companyId, permission_id: permissionId };

  return db<User>('user').where(selector).returning('*').first();
}

export function create(signUp: User): Promise<void> {
  return db<User>('user').insert(signUp);
}

export function update(userId: string, updatedUser: UpdateUser): Promise<void> {
  const selector = { id: userId };

  return db<User>('user').where(selector).update(updatedUser);
}

export function removeByEmail(userEmail: string): Promise<User | undefined> {
  const selector = { email: userEmail };

  return db<User>('user').where(selector).delete();
}

export function removeById(userId: string): Promise<void> {
  const selector = { id: userId };

  return db<User>('user').where(selector).delete();
}
