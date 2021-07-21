import {
  getById,
  getByCompanyIdAndName,
  getByCompanyId,
  create,
  update,
  removeById,
  getPriorities,
  getStatuses,
  addProjectUser,
  getByProjectUserByIds,
  removeProjectUser
} from '../model/project';
import { getById as getCompany } from '../model/company';
import { checkBody, currentTimeStamp, validateUUID } from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import CustomError from '../errorHandler/CustomError';
import { Project, UpdateProject, ProjectUser } from '../types/project';

export const getAllProjectsByCompanyId = async (req: Request, res: Response): Promise<void> => {
  const { companyId } = req.params;

  await validateUUID({ companyId: companyId });

  const companyExists = await getCompany(companyId);

  if (!companyExists) throw new CustomError(404, 'Company does not exist');

  const projects = await getByCompanyId(companyId);

  if (!projects?.length) throw new CustomError(404, 'No projects have been added');

  res.status(200).send(projects);
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.params;

  await validateUUID({ projectId: projectId });

  const project = await getById(projectId);

  if (!project) throw new CustomError(404, 'Project does not exist');

  res.status(200).send(project);
};

export const getProjectPriorities = async (req: Request, res: Response): Promise<void> => {
  const priorities = await getPriorities();

  if (!priorities.length) throw new CustomError(404, 'No project priorities have been added');

  res.status(200).send(priorities);
};

export const getProjectStatuses = async (req: Request, res: Response): Promise<void> => {
  const statuses = await getStatuses();

  if (!statuses.length) throw new CustomError(404, 'No project statuses have been added');

  res.status(200).send(statuses);
};

// ! this needs to auto assign companyId. It will take from user's company_id
export const createProject = async (req: Request, res: Response): Promise<void> => {
  // const belongsToCompany? = await -- or just don't even allow client to see this interface on front side -- like not a shown option rendered
  // ! person who creates project is team leader. Automatically filled in on front end
  const {
    name,
    description,
    startDate,
    completionDate,
    dueDate,
    teamLeaderId,
    projectPriorityId,
    projectStatusId,
    companyId
  } = req.body;

  const newProject: Project = {
    id: uuidv4(),
    name: name,
    description: description,
    start_date: startDate,
    completion_date: completionDate,
    due_date: dueDate,
    team_leader_id: teamLeaderId,
    project_priority_id: projectPriorityId,
    project_status_id: projectStatusId,
    company_id: companyId,
    date_created: currentTimeStamp
  };

  await checkBody(newProject);

  //! does the team leader exist in this company, for this project? Does this even matter? A team leader is someone who works for that company

  const company = await getByCompanyIdAndName(newProject.company_id, newProject.name);

  if (company) throw new CustomError(409, 'Project name already exists');

  await create(newProject);

  await addProjectUser({ project_id: newProject.id, user_id: newProject.team_leader_id });

  res.status(201).send(newProject);
};

export const addUserToProject = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.params;
  const { userId } = req.body;

  await validateUUID({ projectId: projectId });

  await validateUUID({ userId: userId });

  const newProjectUser: ProjectUser = {
    project_id: projectId,
    user_id: userId
  };

  const userAlreadyAdded = await getByProjectUserByIds(
    newProjectUser.project_id,
    newProjectUser.user_id
  );

  if (userAlreadyAdded) throw new CustomError(409, 'User is already added to project');

  await addProjectUser(newProjectUser);

  res.status(201).send(newProjectUser);
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.params;
  const {
    name,
    description,
    startDate,
    completionDate,
    dueDate,
    teamLeaderId,
    projectPriorityId,
    projectStatusId
  } = req.body;

  await validateUUID({ projectId: projectId });

  const project = await getById(projectId);

  if (!project) throw new CustomError(404, 'Project does not exist');

  const updatedProject: UpdateProject = {
    name: name,
    description: description,
    start_date: startDate,
    completion_date: completionDate,
    due_date: dueDate,
    team_leader_id: teamLeaderId,
    project_priority_id: projectPriorityId,
    project_status_id: projectStatusId,
    last_edited: currentTimeStamp
  };

  await checkBody(updatedProject);

  if (project.name !== updatedProject.name) {
    const nameExists = await await getByCompanyIdAndName(project.company_id, updatedProject.name);
    if (nameExists) throw new CustomError(409, 'Project name already exists');
  }

  await update(projectId, updatedProject);

  res.status(201).send(updatedProject);
};

export const deleteProjectUser = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.params;
  const { userId } = req.body;

  await validateUUID({ projectId: projectId });

  await validateUUID({ userId: userId });

  const exists = await getByProjectUserByIds(projectId, userId);

  if (!exists) throw new CustomError(404, 'User does not exist for project');

  await removeProjectUser(projectId, userId);

  res.status(200).send({ message: 'User was successfully removed from project' });
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.params;

  await validateUUID({ projectId: projectId });

  const project = await getById(projectId);

  if (!project) throw new CustomError(404, 'Project does not exist');

  await removeById(projectId);

  res.status(200).send({ message: 'Project was successfully deleted' });
};
