import { Router } from 'express';
import {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectPriorities,
  getProjectStatuses,
  addUserToProject,
  deleteProjectUser
} from '../controller/projectController';
import { catchAsync } from './utilities';
import { requireAuth } from '../middleware/jwtAuth';

const projectRouter = Router();

projectRouter.get('/project/account/:accountId', catchAsync(getProjects));

projectRouter.get('/project/:projectId', catchAsync(getProjectById));

projectRouter.get('/project/priorities', catchAsync(getProjectPriorities));

projectRouter.get('/project/statuses', catchAsync(getProjectStatuses));

projectRouter.post('/project', catchAsync(requireAuth), catchAsync(createProject));

projectRouter.post('/project/project-user/:projectId', catchAsync(addUserToProject));

projectRouter.patch('/project/:projectId', catchAsync(updateProject));

projectRouter.delete(
  '/project/project-user/:projectId',
  catchAsync(requireAuth),
  catchAsync(deleteProjectUser)
);

projectRouter.delete('/project/:projectId', catchAsync(requireAuth), catchAsync(deleteProject));

export default projectRouter;
