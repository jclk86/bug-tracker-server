import Company from '../model/company';
import util from '../model/utilities';
import { RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';

// getAllCompanies
const getAllCompanies: RequestHandler = async (req, res) => {
  try {
    const companies = await Company.getAllCompanies();
    res.status(200).send(companies);
  } catch (e) {
    res.status(404).send({
      message: 'No companies have been added'
    });
  }
};

// getCompanyByName
const getCompanyByName: RequestHandler<{ name: string }> = async (req, res, next) => {
  const { name } = req.params;

  try {
    const company = await Company.getCompanyByName(name);
    if (!company?.length) throw new Error('No company found');
    res.status(200).send(company[0]);
  } catch (e) {
    next(e);
  }
};

// createCompany
const createCompany: RequestHandler = async (req, res) => {
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
  } catch (e) {
    res.status(422).send({
      message: e.message
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
