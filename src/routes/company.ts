import { Router } from 'express';
import {
  getAllCompanies,
  getCompanyByName,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany
} from '../controller/company';
import { catchAsync } from './utilities';

const companyRouter = Router();

companyRouter.get('/company', catchAsync(getAllCompanies));

companyRouter.get('/company/name/:companyName', catchAsync(getCompanyByName));

companyRouter.get('/company/id/:companyId', catchAsync(getCompanyById));

companyRouter.post('/company/create', catchAsync(createCompany));

companyRouter.patch('/company/edit/:companyId', catchAsync(updateCompany));

companyRouter.delete('/company/delete/:companyId', catchAsync(deleteCompany));

export default companyRouter;
