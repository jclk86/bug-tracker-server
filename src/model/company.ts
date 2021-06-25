// model interfaces with database. Handles all data logic and data manipulation
import db from '../database/config';
import { v4 as uuidv4 } from 'uuid';
import { BaseCompany, Company } from '../schema/company';
import util from './utilities';

export async function get(): Promise<Company[]> {
  const data = await db<Company>('company').returning('*');
  return data;
}

export async function getByName(name: string): Promise<Company | undefined> {
  const data = await db<Company>('company').returning('*').where('name', name).first();
  return data;
}

export async function getById(id: string): Promise<Company> {
  const data = await db<Company>('company')
    .select('id', 'name', 'date_created AS dateCreated')
    .where('id', id)
    .first();

  return data;
}

export async function create(company: { name: string }): Promise<Company> {
  const data = {
    id: uuidv4(),
    name: company.name,
    date_created: util.currentTimeStamp
  };

  await db<Company>('company').insert(data);

  const createdCompany = await getById(data.id);

  return createdCompany;
}

export async function update(id: string, data: BaseCompany): Promise<Company> {
  await db<Company>('company').where('id', id).update(data);

  const updatedCompany = await getById(id);

  return updatedCompany;
}

export async function remove(id: string): Promise<void> {
  return await db<Company>('company').where('id', id).delete();
}
