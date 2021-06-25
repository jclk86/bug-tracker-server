import db from '../database/config';
import { BaseUser, User } from '../schema/user';
import { v4 as uuidv4 } from 'uuid';
import util from './utilities';
import bcrypt from 'bcrypt';

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

export async function getByEmail(email: string): Promise<User | undefined> {
  return await db<User>('user').returning('*').where('email', email).first();
}

export async function getById(id: string): Promise<User | undefined> {
  return await db<User>('user').returning('*').where('id', id).first();
}

export async function getByCompanyId(company_id: string): Promise<User[]> {
  return await db<User>('user').returning('*').where('company_id', company_id);
}

export async function getAccountOwner(
  companyId: string,
  permission_id: number
): Promise<User | undefined> {
  return await db<User>('user')
    .returning('*')
    .where('company_id', companyId)
    .andWhere('permission_id', permission_id)
    .first();
}

export async function create(signUp: BaseUser): Promise<User | User[] | undefined> {
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(signUp.password, salt);

  const data = {
    id: uuidv4(),
    first_name: signUp.firstName,
    last_name: signUp.lastName,
    email: signUp.email,
    permission_id: signUp.permissionId,
    date_created: util.currentTimeStamp,
    password: hashedPassword,
    company_id: signUp.companyId,
    active: true
  };

  await db<User>('user').insert(data);

  return getById(data.id);
}

export async function update(
  id: string,
  updatedData: Partial<User>
): Promise<User | User[] | undefined> {
  const data = {
    email: updatedData.email,
    permission_id: updatedData.permissionId,
    password: updatedData.password,
    active: updatedData.active
  };

  await db<User>('user').where('id', id).update(data);

  return getById(id);
}

export async function removeByEmail(email: string): Promise<User | undefined> {
  return await db<User>('user').where('email', email).delete();
}

export async function removeById(id: string): Promise<void> {
  return await db<User>('user').where('id', id).delete();
}
