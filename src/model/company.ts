// model interfaces with database. Handles all data logic and data manipulation
import db from '../database/config';
import { Company, UpdateCompany } from '../schema/company';

// https://stackoverflow.com/questions/12016322/async-all-the-way-down
// async await returns a promise. we do this in controller
// ! The only thing to watch out for is strack trace
export function get(): Promise<Company[]> {
  return db<Company>('company').returning('*');
}

export function getByName(companyName: string): Promise<Company | undefined> {
  const selector = { name: companyName };

  return db<Company>('company').returning('*').where(selector).first();
}

export function getById(companyId: string): Promise<Company | undefined> {
  const selector = { id: companyId };

  return db<Company>('company').select('*').where(selector).first();
}

export function create(company: Company): Promise<Company> {
  return db<Company>('company').insert(company);
}

export function update(companyId: string, updatedCompany: UpdateCompany): Promise<UpdateCompany> {
  const selector = { id: companyId };

  return db<Company>('company').where(selector).update(updatedCompany);
}

export function remove(companyId: string): Promise<void> {
  const selector = { id: companyId };

  return db<Company>('company').where(selector).delete();
}
