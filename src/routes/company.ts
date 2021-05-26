import { Router } from 'express';
import companyController from '../controller/company';
import catchAsync from './utilities';
const companyRouter = Router();

companyRouter.get('/company', catchAsync(companyController.getAllCompanies));

companyRouter.get('/company/:name', catchAsync(companyController.getCompanyByName));

companyRouter.post('/company/create', catchAsync(companyController.createCompany));

export default companyRouter;
