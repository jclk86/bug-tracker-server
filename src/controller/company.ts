import { get, getById, getByName, create, update, remove } from '../model/company';
import { checkBody, currentTimeStamp } from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import CustomError from '../errorhandler/CustomError';

// next(e): passes thrown error message to created errorhandler in app.ts. Value must be passed into next.
// Any value passed in, will pass it to errorhandler. Without a value, it wil pass to next middleware.

// this is admin controlled and owner

//! You have to define types for req.body. This should give feedback to client
// ! ensure the function names are all consistent across all controllers
//! checking project, ticket, company to see if an item exists under those
export const getAllCompanies = async (req: Request, res: Response): Promise<void> => {
  const companies = await get();

  if (!companies?.length) throw new CustomError(404, 'No companies have been added');

  res.status(200).send(companies);
};

export const getCompanyByName = async (req: Request, res: Response): Promise<void> => {
  const { companyName } = req.params;

  const company = await getByName(companyName);

  if (!company) throw new CustomError(400, 'No such company exists');

  res.status(200).send(company);
};

export const createCompany = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;

  const newCompany = {
    id: uuidv4(),
    name: name,
    date_created: currentTimeStamp
  };

  // check if all fields are filled out
  await checkBody(newCompany);

  const company = await getByName(newCompany.name);

  if (company) throw new CustomError(400, 'Company already exists');

  await create(newCompany);

  res.status(201).send(newCompany);
};

export const updateCompany = async (req: Request, res: Response): Promise<void> => {
  const { companyId } = req.params;
  const { name } = req.body;

  const isValid = await isValidUUIDV4(companyId);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const company = await getById(companyId);

  if (!company) throw new CustomError(400, 'Company does not exist');

  const updatedCompany = {
    name: name,
    last_edited: currentTimeStamp
  };

  await checkBody(updatedCompany);

  if (company.name !== updatedCompany.name) {
    const nameExists = await getByName(updatedCompany.name);
    if (nameExists) throw new CustomError(400, 'Company name exists');
  }

  await update(companyId, updatedCompany);

  res.status(201).send(updatedCompany);
};

export const deleteCompany = async (req: Request, res: Response): Promise<void> => {
  const { companyId } = req.params;

  const isValid = await isValidUUIDV4(companyId);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const company = await getById(companyId);

  if (!company) throw new CustomError(400, 'Company does not exist');

  await remove(companyId);

  //! check if deleting a company deletes all users

  res.status(200).send({ message: 'Company deleted' });
};

export const getCompanyById = async (req: Request, res: Response): Promise<void> => {
  const { companyId } = req.params;

  const isValid = await isValidUUIDV4(companyId);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const company = await getById(companyId);

  if (!company) throw new CustomError(400, 'No company exists by that ID');

  res.status(200).send(company);
};
