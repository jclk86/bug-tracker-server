import Company from '../model/company';
import util from './utilities';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import CustomError from '../errorhandler/errorhandler';

// next(e): passes thrown error message to created errorhandler in app.ts. Value must be passed into next.
// Any value passed in, will pass it to errorhandler. Without a value, it wil pass to next middleware.

// getAllCompanies
const getAllCompanies = async (req: Request, res: Response): Promise<void> => {
  try {
    const companies = await Company.getAllCompanies();
    res.status(200).send(companies);
  } catch (err) {
    res.status(404).send({
      message: 'No companies have been added'
    });
  }
};

// getCompanyByName
const getCompanyByName = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.params;
  const company = await Company.getCompanyByName(name);
  if (!company?.length) throw new CustomError(400, 'No such company exists');
  res.status(200).send(company[0]);
};

// createCompany
const createCompany = async (req: Request, res: Response): Promise<void> => {
  // check for missing required item
  const newCompany = {
    id: uuidv4(),
    name: req.body.name as string
  };

  try {
    await util.checkBody(newCompany);
    // check if all fields are filled out
    const result = await Company.createCompany(newCompany);
    res.status(201).send(result);
  } catch (err) {
    res.status(422).send({
      message: err.message
    });
  }
};

// updateCompany

// deleteCompany

export default {
  getAllCompanies,
  getCompanyByName,
  createCompany
};
