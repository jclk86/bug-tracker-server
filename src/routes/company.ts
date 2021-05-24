import { Router } from 'express';
import companyController from '../controller/company';

const companyRouter = Router();

companyRouter.get('/company', companyController.getAllCompanies);

companyRouter.get('/company/:name', companyController.getCompanyByName);

companyRouter.post('/company/create', companyController.createCompany);

export default companyRouter;
