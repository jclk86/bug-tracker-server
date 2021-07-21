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
import { requireAuth } from '../middleware/jwtAuth';

const companyRouter = Router();

companyRouter.get('/company', catchAsync(getAllCompanies));

companyRouter.get('/company/name/:companyName', catchAsync(getCompanyByName));

companyRouter.get('/company/:companyId', catchAsync(getCompanyById));

companyRouter.post('/company', catchAsync(createCompany));

companyRouter.patch('/company/:companyId', catchAsync(requireAuth), catchAsync(updateCompany));

companyRouter.delete('/company/:companyId', catchAsync(requireAuth), catchAsync(deleteCompany));

export default companyRouter;
