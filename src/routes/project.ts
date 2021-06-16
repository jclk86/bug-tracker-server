import { Router } from 'express';
import {
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  test
} from '../controller/project';
import { catchAsync } from './utilities';

const projectRouter = Router();

projectRouter.get('/project/company_id/:company_id', catchAsync(getAllProjects));

projectRouter.get('/project/company_id/:company_id/name/:name', catchAsync(test));

projectRouter.get('/project/id/:id', catchAsync(getProjectById));

projectRouter.post('/project/create', catchAsync(createProject));

projectRouter.patch('/project/edit/:id', catchAsync(updateProject));

projectRouter.delete('/project/delete/:id', catchAsync(deleteProject));

export default projectRouter;
