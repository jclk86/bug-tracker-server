import db from '../database/config';
import { User, UpdateUser } from '../schema/user';

export async function get(): Promise<User[]> {
  return await db<User>('user').returning('*');
}

// export async function getBySelector(id?: string, email?: string): Promise<User | undefined> {
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

//   const data = await db<User>('user').select(cols).where(selector).first();

//   return data;
// }

export async function getByEmail(userEmail: string): Promise<User | undefined> {
  const selector = { email: userEmail };

  return await db<User>('user').returning('*').where(selector).first();
}

export async function getById(userId: string): Promise<User | undefined> {
  const selector = { id: userId };

  return await db<User>('user').returning('*').where(selector).first();
}

export async function getByCompanyId(companyId: string): Promise<User[]> {
  const selector = { company_id: companyId };

  return await db<User>('user').returning('*').where(selector);
}

export async function getAccountOwner(
  companyId: string,
  permissionId: number
): Promise<User | undefined> {
  const selector = { company_id: companyId, permission_id: permissionId };

  return await db<User>('user').returning('*').where(selector).first();
}

export async function create(signUp: User): Promise<User | undefined> {
  await db<User>('user').insert(signUp);

  return signUp;
}

export async function update(
  userId: string,
  updatedUser: UpdateUser
): Promise<UpdateUser | undefined> {
  const selector = { id: userId };

  await db<User>('user').where(selector).update(updatedUser);

  return updatedUser;
}

export async function removeByEmail(userEmail: string): Promise<User | undefined> {
  const selector = { email: userEmail };

  return await db<User>('user').where(selector).delete();
}

export async function removeById(userId: string): Promise<void> {
  const selector = { id: userId };

  return await db<User>('user').where(selector).delete();
}
