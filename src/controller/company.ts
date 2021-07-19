import { get, getById, getByName, create, update, remove } from '../model/company';
import { checkBody, currentTimeStamp, validateUUID } from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import CustomError from '../errorHandler/CustomError';
import { Company, UpdateCompany } from '../types/company';

// next(e): passes thrown error message to created errorhandler in app.ts. Value must be passed into next.
// Any value passed in, will pass it to errorhandler. Without a value, it wil pass to next middleware.

// this is admin controlled and owner

//! You have to define types for req.body. This should give feedback to client
// ! ensure the function names are all consistent across all controllers
//! checking project, ticket, company to see if an item exists under those
export const getAllCompanies = async (req: Request, res: Response): Promise<void> => {
  const companies = await get();

  if (!companies?.length) throw new CustomError(404, 'Companies have not been added');

  res.status(200).send(companies);
};

export const getCompanyById = async (req: Request, res: Response): Promise<void> => {
  const { companyId } = req.params;

  await validateUUID({ companyId: companyId });

  const company = await getById(companyId);

  if (!company) throw new CustomError(404, 'Company does not exist');

  res.status(200).send(company);
};

export const getCompanyByName = async (req: Request, res: Response): Promise<void> => {
  const { companyName } = req.params;

  const company = await getByName(companyName);

  if (!company) throw new CustomError(404, 'Company does not exist');

  res.status(200).send(company);
};

export const createCompany = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;

  const newCompany: Company = {
    id: uuidv4(),
    name: name,
    date_created: currentTimeStamp
  };

  // check if all fields are filled out
  await checkBody(newCompany);

  const company = await getByName(newCompany.name);

  if (company) throw new CustomError(409, 'Company name already exists');

  await create(newCompany);

  res.status(201).send(newCompany);
};

export const updateCompany = async (req: Request, res: Response): Promise<void> => {
  const { companyId } = req.params;
  const { name } = req.body;

  await validateUUID({ companyId: companyId });

  const company = await getById(companyId);

  if (!company) throw new CustomError(404, 'Company does not exist');

  const updatedCompany: UpdateCompany = {
    name: name,
    last_edited: currentTimeStamp
  };

  await checkBody(updatedCompany);

  if (company.name !== updatedCompany.name) {
    const nameExists = await getByName(updatedCompany.name);
    if (nameExists) throw new CustomError(409, 'Company name already exists');
  }

  await update(companyId, updatedCompany);

  res.status(201).send(updatedCompany);
};

export const deleteCompany = async (req: Request, res: Response): Promise<void> => {
  const { companyId } = req.params;

  await validateUUID({ companyId: companyId });

  const company = await getById(companyId);

  if (!company) throw new CustomError(404, 'Company does not exist');

  await remove(companyId);

  //! check if deleting a company deletes all users

  res.status(200).send({ message: 'Company was sucessfully deleted' });
};
