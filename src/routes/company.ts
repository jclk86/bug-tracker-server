import { Router } from 'express';
import {
  getAllCompanies,
  getCompanyByName,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany
} from '../controller/company';
import catchAsync from './utilities';

const companyRouter = Router();

companyRouter.get('/company', catchAsync(getAllCompanies));

companyRouter.get('/company/name/:name', catchAsync(getCompanyByName));

companyRouter.get('/company/id/:id', catchAsync(getCompanyById));

companyRouter.post('/company/create', catchAsync(createCompany));

companyRouter.patch('/company/edit/:id', catchAsync(updateCompany));

companyRouter.delete('/company/delete/:id', catchAsync(deleteCompany));

export default companyRouter;
