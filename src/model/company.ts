// model interfaces with database. Handles all data logic and data manipulation
import db from '../database/config';
import { Company, UpdateCompany } from '../schema/company';

export async function get(): Promise<Company[]> {
  const companies = await db<Company>('company').returning('*');

  return companies;
}

export async function getByName(companyName: string): Promise<Company | undefined> {
  const selector = { name: companyName };

  const data = await db<Company>('company').returning('*').where(selector).first();

  return data;
}

export async function getById(companyId: string): Promise<Company | undefined> {
  const selector = { id: companyId };

  const data = await db<Company>('company').select('*').where(selector).first();

  return data;
}

export async function create(company: Company): Promise<Company> {
  await db<Company>('company').insert(company);

  const createdCompany = await getById(company.id);

  return createdCompany;
}

export async function update(
  companyId: string,
  updatedCompany: UpdateCompany
): Promise<UpdateCompany> {
  const selector = { id: companyId };

  await db<Company>('company').where(selector).update(updatedCompany);

  return updatedCompany;
}

export async function remove(companyId: string): Promise<void> {
  const selector = { id: companyId };

  return await db<Company>('company').where(selector).delete();
}
