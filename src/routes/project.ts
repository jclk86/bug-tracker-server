import { Router } from 'express';
import {
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectPriorities,
  getProjectStatuses
} from '../controller/project';
import { catchAsync } from './utilities';

const projectRouter = Router();

projectRouter.get('/project/companyId/:companyId', catchAsync(getAllProjects));

projectRouter.get('/project/id/:id', catchAsync(getProjectById));

projectRouter.post('/project/create', catchAsync(createProject));

projectRouter.patch('/project/edit/:id', catchAsync(updateProject));

projectRouter.delete('/project/delete/:id', catchAsync(deleteProject));

projectRouter.get('/project/priorities', catchAsync(getProjectPriorities));

projectRouter.get('/project/statuses', catchAsync(getProjectStatuses));

export default projectRouter;
