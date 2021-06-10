import Project from '../model/project';
import util from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import CustomError from '../errorhandler/CustomError';

export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  const projects = await Project.get();

  if (!projects?.length) throw new CustomError(404, 'No projects have been added');

  res.status(200).send(projects);
};

export const getProjectByName = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.params;

  const project = await Project.getByName(name);

  if (!project) throw new CustomError(400, 'No project of that name exists');

  res.status(200).send(project);
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const project = await Project.getById(id);

  if (!project) throw new CustomError(400, 'No project of that id exists');

  res.status(200).send(project);
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
  const project = req.body;

  const newProject = {
    id: uuidv4(),
    name: project.name,
    description: project.description,
    start_date: project.start_date,
    completion_date: project.completion_date,
    due_date: project.due_date,
    team_leader_id: project.team_leader_id,
    project_priority_id: project.project_priority_id,
    project_status_id: project.project_status_id,
    company_id: project.company_id
  };

  await util.checkBody(newProject);

  const exists = await Project.getByName(newProject.name);

  if (exists) throw new CustomError(400, 'Choose different project name');

  const result = await Project.create(newProject);

  res.status(201).send(result);
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isValid = await isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const exists = await Project.getById(id);

  if (!exists) throw new CustomError(400, 'Project does not exist');

  const projectBody = {};

  await util.checkBody(projectBody);

  // await Project.update(id, projectBody);
};
