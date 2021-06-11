import Company from '../model/company';
import util from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import CustomError from '../errorhandler/CustomError';

// next(e): passes thrown error message to created errorhandler in app.ts. Value must be passed into next.
// Any value passed in, will pass it to errorhandler. Without a value, it wil pass to next middleware.

// this is admin controlled and owner

export const getAllCompanies = async (req: Request, res: Response): Promise<void> => {
  const companies = await Company.get();
  // !this still needs to be tested
  if (!companies?.length) throw new CustomError(404, 'No companies have been added');

  res.status(200).send(companies);
};

export const getCompanyByName = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.params;

  const company = await Company.getByName(name);

  if (!company) throw new CustomError(400, 'No such company exists');

  res.status(200).send(company);
};

export const createCompany = async (req: Request, res: Response): Promise<void> => {
  // check for missing required item
  const newCompany = {
    id: uuidv4(),
    name: req.body.name
  };

  // check if all fields are filled out
  await util.checkBody(newCompany);

  const exists = await Company.getByName(newCompany.name);

  if (exists) throw new CustomError(400, 'Company already exists');

  // might want to attach a primary email to the company

  const result = await Company.create(newCompany);

  res.status(201).send(result);
};

export const updateCompany = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isValid = await isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const company = await Company.getById(id);

  if (!company) throw new CustomError(400, 'Company does not exist');

  const companyBody = {
    name: req.body.name
  };

  await util.checkBody(companyBody);

  // look through database to see if any other company under that name

  const exists = await Company.getByName(companyBody.name);

  if (exists) throw new CustomError(400, 'Please choose a different company name');

  await Company.update(id, companyBody);

  res.status(201).send({ message: 'company successfuly updated' });
};

export const deleteCompany = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isValid = await isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const exists = await Company.getById(id);

  if (!exists) throw new CustomError(400, 'Company does not exist');

  await Company.remove(id);

  //! check if deleting a company deletes all users

  res.status(200).send({ message: 'Company deleted' });
};

export const getCompanyById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isValid = await isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const company = await Company.getById(id);

  if (!company) throw new CustomError(400, 'No company exists by that ID');

  res.status(200).send(company);
};
