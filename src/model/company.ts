// model interfaces with database. Handles all data logic and data manipulation
import db from '../database/config';
import { Company } from '../schema/company';

export async function get(): Promise<Company[]> {
  return await db<Company>('company').returning('*');
}

export async function getByName(name: string): Promise<Company | undefined> {
  return await db<Company>('company').returning('*').where({ name }).first();
}

export async function getById(id: string): Promise<Company | undefined> {
  return await db<Company>('company').returning('*').where({ id }).first();
}

export async function create(newCompany: Company): Promise<Company> {
  await db<Company>('company').insert(newCompany);
  return newCompany;
}

export async function update(id: string, data: Partial<Company>): Promise<Partial<Company>> {
  await db<Company>('company').where({ id }).update(data);
  return data;
}

export async function remove(id: string): Promise<void> {
  return await db<Company>('company').where('id', id).delete();
}
