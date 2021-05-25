import { Router } from 'express';
import companyController from '../controller/company';
import wrapAsync from './utilities';
const companyRouter = Router();

companyRouter.get('/company', wrapAsync(companyController.getAllCompanies));

companyRouter.get('/company/:name', wrapAsync(companyController.getCompanyByName));

companyRouter.post('/company/create', companyController.createCompany);

export default companyRouter;
