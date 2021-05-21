// model interfaces with database. Handles all data logic and data manipulation
import db from '../database/config';
import { ICompany } from '../schema/company';

// getAllCompanies
function getAllCompanies(): Promise<ICompany[]> {
  return db<ICompany>('company').returning('*');
}

// getCompanyByName
function getCompanyByName(name: string): Promise<ICompany[]> {
  return db<ICompany>('company').returning('*').where({ name });
}

// create company
function createCompany(newCompany: ICompany): Promise<ICompany[]> {
  return db<ICompany>('company').insert(newCompany);
}

// updateCompany

// deleteCompany

export default {
  getAllCompanies,
  getCompanyByName,
  createCompany
};
