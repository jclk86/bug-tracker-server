import {
  getById,
  getByCompanyIdAndName,
  getByCompanyId,
  create,
  update,
  removeById
} from '../model/project';
import { Project } from '../schema/project';
import util from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import CustomError from '../errorhandler/CustomError';

export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  const { company_id } = req.params;

  const projects = await getByCompanyId(company_id);

  if (!projects?.length) throw new CustomError(404, 'No projects have been added');

  res.status(200).send(projects);
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const project = await getById(id);

  if (!project) throw new CustomError(400, 'No project of that id exists');

  res.status(200).send(project);
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
  const project = req.body;

  const newProject: Project = {
    id: uuidv4(),
    name: project.name,
    description: project.description,
    date_created: util.currentTimeStamp,
    start_date: project.start_date,
    completion_date: project.completion_date,
    due_date: project.due_date,
    team_leader_id: project.team_leader_id,
    project_priority_id: project.project_priority_id,
    project_status_id: project.project_status_id,
    company_id: project.company_id
  };

  await util.checkBody(newProject);

  //! does the team leader exist in this company, for this project? Does this even matter? A team leader is someone who works for that company

  const exists = await getByCompanyIdAndName(newProject.company_id, newProject.name);

  if (exists) throw new CustomError(400, 'Choose different project name');

  const result = await create(newProject);

  res.status(201).send(result);
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isValid = await isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const exists = await getById(id);

  if (!exists) throw new CustomError(400, 'Project does not exist');

  const projectBody: Partial<Project> = {
    name: req.body.name,
    description: req.body.description,
    start_date: req.body.start_date,
    completion_date: req.body.completion_date,
    due_date: req.body.due_date,
    last_edited: util.currentTimeStamp,
    team_leader_id: req.body.team_leader_id,
    project_priority_id: req.body.project_priority_id,
    project_status_id: req.body.project_status_id
  };

  await util.checkBody(projectBody);

  if (exists.name !== projectBody.name) {
    const nameExists = await await getByCompanyIdAndName(exists.company_id, projectBody.name);
    if (nameExists) throw new CustomError(400, 'Please choose different project name');
  }

  await update(id, projectBody);

  res.status(201).send({ message: 'Project was sucessfully updated' });
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isValid = await isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const exists = await getById(id);

  if (!exists) throw new CustomError(400, 'Project does not exist');

  await removeById(id);

  res.status(200).send({ message: 'Project successfully deleted' });
};
