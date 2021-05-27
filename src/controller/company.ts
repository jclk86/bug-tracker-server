import Company from '../model/company';
import util from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import CustomError from '../errorhandler/CustomError';

// next(e): passes thrown error message to created errorhandler in app.ts. Value must be passed into next.
// Any value passed in, will pass it to errorhandler. Without a value, it wil pass to next middleware.

const getAllCompanies = async (req: Request, res: Response): Promise<void> => {
  const companies = await Company.getAllCompanies();
  // !this still needs to be tested
  if (!companies?.length) throw new CustomError(400, 'No companies have been added');

  res.status(200).send(companies);
};

const getCompanyByName = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.params;

  const company = await Company.getCompanyByName(name);

  if (!company) throw new CustomError(400, 'No such company exists');

  res.status(200).send(company);
};

const createCompany = async (req: Request, res: Response): Promise<void> => {
  // check for missing required item
  const newCompany = {
    id: uuidv4(),
    name: req.body.name
  };

  // check if all fields are filled out
  await util.checkBody(newCompany);

  const exists = await Company.getCompanyByName(newCompany.name);

  if (exists) throw new CustomError(400, 'Company already exists');

  // might want to attach a primary email to the company

  const result = await Company.createCompany(newCompany);

  res.status(201).send(result);
};

const updateCompany = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isValid = await isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const exists = await Company.getCompanyById(id);

  if (!exists) throw new CustomError(400, 'Company does not exist');

  const companyBody = {
    name: req.body.name
  };

  await util.checkBody(companyBody);

  await Company.updateCompany(id, companyBody);

  res.status(204).send('Resouce successfully updated');
};

const deleteCompany = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isValid = await isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const exists = await Company.getCompanyById(id);

  if (!exists) throw new CustomError(400, 'Company does not exist');

  await Company.deleteCompany(id);

  res.status(200).send({ message: 'Company deleted' });
};

const getCompanyById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isValid = await isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const company = await Company.getCompanyById(id);

  if (!company) throw new CustomError(400, 'No company exists by that ID');

  res.status(200).send(company);
};

export default {
  getAllCompanies,
  getCompanyByName,
  createCompany,
  deleteCompany,
  getCompanyById,
  updateCompany
};
