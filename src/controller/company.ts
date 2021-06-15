import { get, getById, getByName, create, update, remove } from '../model/company';
import { Company } from '../schema/company';
import util from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import CustomError from '../errorhandler/CustomError';
import { exists } from 'node:fs';

// next(e): passes thrown error message to created errorhandler in app.ts. Value must be passed into next.
// Any value passed in, will pass it to errorhandler. Without a value, it wil pass to next middleware.

// this is admin controlled and owner

export const getAllCompanies = async (req: Request, res: Response): Promise<void> => {
  const companies = await get();

  if (!companies?.length) throw new CustomError(404, 'No companies have been added');

  res.status(200).send(companies);
};

export const getCompanyByName = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.params;

  const company = await getByName(name);

  if (!company) throw new CustomError(400, 'No such company exists');

  res.status(200).send(company);
};

export const createCompany = async (req: Request, res: Response): Promise<void> => {
  // check for missing required item
  const newCompany: Company = {
    id: uuidv4(),
    name: req.body.name,
    date_created: util.currentTimeStamp
  };

  // check if all fields are filled out
  await util.checkBody(newCompany);

  const exists = await getByName(newCompany.name);

  if (exists) throw new CustomError(400, 'Company already exists');

  // might want to attach a primary email to the company

  const result = await create(newCompany);

  res.status(201).send(result);
};

export const updateCompany = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isValid = await isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const exists = await getById(id);

  if (!exists) throw new CustomError(400, 'Company does not exist');

  const companyBody: Partial<Company> = {
    name: req.body.name,
    last_edited: util.currentTimeStamp
  };

  await util.checkBody(companyBody);

  if (exists.name !== companyBody.name) {
    const nameExists = await getByName(companyBody.name);
    if (nameExists) throw new CustomError(400, 'Company name exists');
  }

  await update(id, companyBody);

  res.status(201).send({ message: 'company successfuly updated' });
};

export const deleteCompany = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isValid = await isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const exists = await getById(id);

  if (!exists) throw new CustomError(400, 'Company does not exist');

  await remove(id);

  //! check if deleting a company deletes all users

  res.status(200).send({ message: 'Company deleted' });
};

export const getCompanyById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isValid = await isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const company = await getById(id);

  if (!company) throw new CustomError(400, 'No company exists by that ID');

  res.status(200).send(company);
};
