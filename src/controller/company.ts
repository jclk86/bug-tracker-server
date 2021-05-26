import Company from '../model/company';
import util from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import CustomError from '../errorhandler/CustomError';

// next(e): passes thrown error message to created errorhandler in app.ts. Value must be passed into next.
// Any value passed in, will pass it to errorhandler. Without a value, it wil pass to next middleware.

const getAllCompanies = async (req: Request, res: Response): Promise<void> => {
  const companies = await Company.getAllCompanies();
  if (!companies?.length) throw new CustomError(400, 'No companies have been added');
  res.status(200).send(companies);
};

const getCompanyByName = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.params;
  const company = await Company.getCompanyByName(name);
  if (!company?.length) throw new CustomError(400, 'No such company exists');
  res.status(200).send(company);
};

const createCompany = async (req: Request, res: Response): Promise<void> => {
  // check for missing required item
  const newCompany = {
    id: uuidv4(),
    name: req.body.name as string
  };

  // check if all fields are filled out
  await util.checkBody(newCompany);

  const exists = await Company.getCompanyByName(newCompany.name);

  if (exists) throw new CustomError(400, 'Company already exists');

  // might want to attach a primary email to the company

  const result = await Company.createCompany(newCompany);

  res.status(201).send(result);
};

// const updateCompany = async (req: Request, res: Response): Promise<void> => {
//   const updatedCompany = {
//     name: req.body.name
//   }
// };

// deleteCompany

export default {
  getAllCompanies,
  getCompanyByName,
  createCompany
};
