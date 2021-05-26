// model interfaces with database. Handles all data logic and data manipulation
import db from '../database/config';
import { ICompany } from '../schema/company';

// getAllCompanies
async function getAllCompanies(): Promise<ICompany[]> {
  return await db<ICompany>('company').returning('*');
}

// getCompanyByName
async function getCompanyByName(name: string): Promise<ICompany[]> {
  return await db<ICompany>('company').returning('*').where({ name });
}

// create company
async function createCompany(newCompany: ICompany): Promise<ICompany> {
  await db<ICompany>('company').insert(newCompany);
  return newCompany;
}

// updateCompany
// async function updateCompany(editedCompany): Promise<ICompany> {
//   await db<ICompany>('company')
//     .where('name', editedCompany.name)
//     .update('name', editedCompany.name);
//   return editedCompany;
// }

// deleteCompany

export default {
  getAllCompanies,
  getCompanyByName,
  createCompany
};
