import { Router } from 'express';
import companyController from '../controller/company';
import catchAsync from './utilities';

const companyRouter = Router();

companyRouter.get('/company', catchAsync(companyController.getAllCompanies));

companyRouter.get('/company/:name', catchAsync(companyController.getCompanyByName));

companyRouter.get('/select/:id', catchAsync(companyController.getCompanyById));

companyRouter.post('/company/create', catchAsync(companyController.createCompany));

companyRouter.put('/company/edit/:id', catchAsync(companyController.updateCompany));

companyRouter.delete('/company/delete/:id', catchAsync(companyController.deleteCompany));

export default companyRouter;
