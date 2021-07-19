import { Router } from 'express';
import {
  getAllProjectsByCompanyId,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectPriorities,
  getProjectStatuses
} from '../controller/project';
import { catchAsync } from './utilities';
import { requireAuth } from '../middleware/jwtAuth';

const projectRouter = Router();

projectRouter.all('/project', catchAsync(requireAuth));

projectRouter.get('/project/companyId/:companyId', catchAsync(getAllProjectsByCompanyId));

projectRouter.get('/project/id/:projectId', catchAsync(getProjectById));

projectRouter.post('/project/create', catchAsync(createProject));

projectRouter.patch('/project/edit/:projectId', catchAsync(updateProject));

projectRouter.delete('/project/delete/:projectId', catchAsync(deleteProject));

projectRouter.get('/project/priorities', catchAsync(getProjectPriorities));

projectRouter.get('/project/statuses', catchAsync(getProjectStatuses));

export default projectRouter;
