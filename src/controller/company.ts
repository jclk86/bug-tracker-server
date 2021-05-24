import Company from '../model/company';
import util from '../model/utilities';
import { RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ICompany } from '../schema/company';

// !typecasting only instances that you know what the type will be.
// typecasting uses 'as' keyword, followed by the type {title: string}
// we know our own api and database types, so do typecasting
// see 5:00 of working with controllers and parsing req bodies in TS tutorial

// !if dealing with params ... params.id = /:id in routes.
// for req.params.whatver, the RequestHandler mustb e given a generic type or else
// req.params.whatever will resort to "any" type again. Ex: RequestHandler<{ whatever: string}>
// const get: RequestHandler = async (req, res) => {
//   const data = await test.get();

//   res.send(data);
// };

// export default {
//   get
// };

// controller handles all client requests. Does not directly manipulate database

// getAllCompanies
const getAllCompanies: RequestHandler = async (req, res) => {
  try {
    const companies = await Company.getAllCompanies();
    res.status(200).send(companies);
  } catch (error) {
    res.status(404).send({
      message: 'No companies have been added'
    });
  }
};

// getCompanyByName
const getCompanyByName: RequestHandler = async (req, res) => {
  const name = req.params.name as string;

  try {
    const company = await Company.getCompanyByName(name);
    res.status(200).send(company[0]);
  } catch (error) {
    res.status(404).send({
      message: 'Company not found'
    });
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
  } catch (error) {
    res.status(422).send({
      message: error.message
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
