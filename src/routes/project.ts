import { Router } from 'express';
import {
  getAllProjects,
  createProject,
  getProjectByName,
  getProjectById
} from '../controller/project';
import catchAsync from './utilities';

const projectRouter = Router();

projectRouter.get('/project', catchAsync(getAllProjects));

projectRouter.get('/project/name/:name', catchAsync(getProjectByName));

projectRouter.get('/project/id/:id', catchAsync(getProjectById));

projectRouter.post('/project/create', catchAsync(createProject));

export default projectRouter;
