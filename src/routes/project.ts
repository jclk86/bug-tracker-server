import { Router } from 'express';
import {
  getAllProjects,
  createProject,
  getProjectByName,
  getProjectById,
  updateProject,
  deleteProject
} from '../controller/project';
import catchAsync from './utilities';

const projectRouter = Router();

projectRouter.get('/project', catchAsync(getAllProjects));

projectRouter.get('/project/name/:name', catchAsync(getProjectByName));

projectRouter.get('/project/id/:id', catchAsync(getProjectById));

projectRouter.post('/project/create', catchAsync(createProject));

projectRouter.patch('/project/edit/:id', catchAsync(updateProject));

projectRouter.delete('/project/delete/:id', catchAsync(deleteProject));

export default projectRouter;
