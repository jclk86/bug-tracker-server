// model interfaces with database. Handles all data logic and data manipulation
import db from '../database/config';
import { ICompany, ICompanyGeneric } from '../schema/company';

async function getAllCompanies(): Promise<ICompany[]> {
  return await db<ICompany>('company').returning('*');
}

async function getCompanyByName(name: string): Promise<ICompany | undefined> {
  return await db<ICompany>('company').returning('*').where({ name }).first();
}

async function getCompanyById(id: string): Promise<ICompany | undefined> {
  return await db<ICompany>('company').returning('*').where({ id }).first();
}

async function createCompany(newCompany: ICompany): Promise<ICompany> {
  await db<ICompany>('company').insert(newCompany);
  return newCompany;
}

async function updateCompany(id: string, data: ICompanyGeneric): Promise<ICompanyGeneric> {
  await db<ICompany>('company').where({ id }).update(data);
  return data;
}

async function deleteCompany(id: string): Promise<string> {
  await db<ICompany>('company').where('id', id).delete();
  return id;
}

export default {
  getAllCompanies,
  getCompanyByName,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany
};
