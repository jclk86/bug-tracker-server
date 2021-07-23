import db from '../database/config';
import { User, UpdateUser } from '../types/user';

export function get(): Promise<User[]> {
  return db<User>('user').returning('*');
}

// export function getBySelector(id?: string, email?: string): Promise<User | undefined> {
//   const selector = {
//   };

// ! email ? (selector['account.email'] = email) : (selector['account.id'] = id);

//   const cols = [
//     'id',
//     'first_name AS firstName',
//     'last_name AS lastName',
//     'permission_id AS permissionId',
//     'email',
//     'date_created AS dateCreated',
//     'account_id AS accountId',
//     'active'
//   ];

//   const data = db<User>('user').select(cols).where(selector).first();

//   return data;
// }

// ! there should be a list of members in each project
export function retrieve(accountId: string): Promise<User[]> {
  const selector = { account_id: accountId };

  return db<User>('user').where(selector).returning('*');
}

export function retrieveByEmail(userEmail: string): Promise<User | undefined> {
  const selector = { email: userEmail };

  return db<User>('user').where(selector).returning('*').first();
}

export function retrieveById(userId: string): Promise<User | undefined> {
  const selector = { id: userId };

  return db<User>('user').where(selector).returning('*').first();
}

export function retrieveAccountOwner(accountId: string, role: string): Promise<User | undefined> {
  const selector = { account_id: accountId, role: role };

  return db<User>('user').where(selector).returning('*').first();
}

export function create(signUp: User): Promise<void> {
  return db<User>('user').insert(signUp);
}

export function update(userId: string, updatedUser: UpdateUser): Promise<void> {
  const selector = { id: userId };

  return db<User>('user').where(selector).update(updatedUser);
}

export function remove(userId: string): Promise<void> {
  const selector = { id: userId };

  return db<User>('user').where(selector).delete();
}
