import { get, getById, getByName, create, update, remove } from '../model/company';
import util from './utilities';
import { Request, Response } from 'express';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import CustomError from '../errorhandler/CustomError';
import { BaseCompany } from '../schema/company';

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
  const { name } = req.body;

  const newCompany: BaseCompany = {
    name: name
  };

  // check if all fields are filled out
  await util.checkBody(newCompany);

  const company = await getByName(newCompany.name);

  if (company) throw new CustomError(400, 'Company already exists');

  const result = await create(newCompany);

  res.status(201).send(result);
};

export const updateCompany = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name } = req.body;

  const isValid = await isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const company = await getById(id);

  if (!company) throw new CustomError(400, 'Company does not exist');

  const updateCompany: BaseCompany = {
    name: name
  };

  await util.checkBody(updateCompany);

  if (company.name !== updateCompany.name) {
    const nameExists = await getByName(updateCompany.name);
    if (nameExists) throw new CustomError(400, 'Company name exists');
  }

  await update(id, updateCompany);

  res.status(201).send({ message: 'company successfuly updated' });
};

export const deleteCompany = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isValid = await isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const company = await getById(id);

  if (!company) throw new CustomError(400, 'Company does not exist');

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
