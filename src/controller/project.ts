import {
  retrieveById,
  retrieveByAccountIdAndName,
  retrieve,
  create,
  update,
  remove,
  retrievePriorities,
  retrieveStatuses,
  addProjectUser,
  retrieveByProjectUserByIds,
  removeProjectUser
} from '../model/project';
import { retrieveById as retrieveAccount } from '../model/account';
import { checkBody, currentTimeStamp, validateUUID } from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import CustomError from '../errorHandler/CustomError';
import { Project, UpdateProject, ProjectUser } from '../types/project';

export const getAllProjectsByAccountId = async (req: Request, res: Response): Promise<void> => {
  const { accountId } = req.params;

  await validateUUID({ accountId });

  const accountExists = await retrieveAccount(accountId);

  if (!accountExists) throw new CustomError(404, 'Account does not exist');

  const projects = await retrieve(accountId);

  if (!projects?.length) throw new CustomError(404, 'No projects have been added');

  res.status(200).send(projects);
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.params;

  await validateUUID({ projectId });

  const project = await retrieveById(projectId);

  if (!project) throw new CustomError(404, 'Project does not exist');

  res.status(200).send(project);
};

export const getProjectPriorities = async (req: Request, res: Response): Promise<void> => {
  const priorities = await retrievePriorities();

  if (!priorities.length) throw new CustomError(404, 'No project priorities have been added');

  res.status(200).send(priorities);
};

export const getProjectStatuses = async (req: Request, res: Response): Promise<void> => {
  const statuses = await retrieveStatuses();

  if (!statuses.length) throw new CustomError(404, 'No project statuses have been added');

  res.status(200).send(statuses);
};

// ! this needs to auto assign accountId. It will take from user's account_id
export const createProject = async (req: Request, res: Response): Promise<void> => {
  // const belongsToAccount? = await -- or just don't even allow client to see this interface on front side -- like not a shown option rendered
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
    accountId
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
    account_id: accountId,
    date_created: currentTimeStamp
  };

  await checkBody(newProject);

  //! does the team leader exist in this account, for this project? Does this even matter? A team leader is someone who works for that account

  const account = await retrieveByAccountIdAndName(newProject.account_id, newProject.name);

  if (account) throw new CustomError(409, 'Project name already exists');

  await create(newProject);

  await addProjectUser({ project_id: newProject.id, user_id: newProject.team_leader_id });

  res.status(201).send(newProject);
};

export const addUserToProject = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.params;
  const { userId } = req.body;

  await validateUUID({ projectId });

  await validateUUID({ userId });

  const newProjectUser: ProjectUser = {
    project_id: projectId,
    user_id: userId
  };

  const userAlreadyAdded = await retrieveByProjectUserByIds(
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

  await validateUUID({ projectId });

  const project = await retrieveById(projectId);

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
    const nameExists = await retrieveByAccountIdAndName(project.account_id, updatedProject.name);
    if (nameExists) throw new CustomError(409, 'Project name already exists');
  }

  await update(projectId, updatedProject);

  res.status(201).send(updatedProject);
};

export const deleteProjectUser = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.params;
  const { userId } = req.body;

  await validateUUID({ projectId });

  await validateUUID({ userId });

  const exists = await retrieveByProjectUserByIds(projectId, userId);

  if (!exists) throw new CustomError(404, 'User does not exist for project');

  await removeProjectUser(projectId, userId);

  res.status(200).send({ message: 'User was successfully removed from project' });
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.params;

  await validateUUID({ projectId });

  const project = await retrieveById(projectId);

  if (!project) throw new CustomError(404, 'Project does not exist');

  await remove(projectId);

  res.status(200).send({ message: 'Project was successfully deleted' });
};
