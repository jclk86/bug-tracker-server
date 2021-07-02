import {
  getById,
  getByCompanyIdAndName,
  getByCompanyId,
  create,
  update,
  removeById,
  getPriorities,
  getStatuses
} from '../model/project';
import { getById as getCompany } from '../model/company';
import { checkBody, currentTimeStamp, validateUUID } from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import CustomError from '../errorhandler/CustomError';
import { Project, UpdateProject } from '../schema/project';

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
// ! this needs to auto assign companyId. It will take from user's company_id
export const createProject = async (req: Request, res: Response): Promise<void> => {
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

  res.status(201).send(newProject);
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.params;

  await validateUUID({ projectId: projectId });

  const project = await getById(projectId);

  if (!project) throw new CustomError(404, 'Project does not exist');

  const updatedProject: UpdateProject = {
    name: req.body.name,
    description: req.body.description,
    start_date: req.body.startDate,
    completion_date: req.body.completionDate,
    due_date: req.body.dueDate,
    team_leader_id: req.body.teamLeaderId,
    project_priority_id: req.body.projectPriorityId,
    project_status_id: req.body.projectStatusId,
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

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.params;

  await validateUUID({ projectId: projectId });

  const project = await getById(projectId);

  if (!project) throw new CustomError(404, 'Project does not exist');

  await removeById(projectId);

  res.status(200).send({ message: 'Project was successfully deleted' });
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
