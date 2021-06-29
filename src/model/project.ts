import db from '../database/config';
import { Project, UpdateProject } from '../schema/project';
import { Priority } from '../schema/priority';
import { Status } from '../schema/status';
import util from './utilities';

export async function getByCompanyId(companyId: string): Promise<Project[]> {
  const selector = {
    company_id: companyId
  };

  return await db<Project>('project').returning('*').where(selector);
}

export async function getById(projectId: string): Promise<Project | undefined> {
  const selector = { id: projectId };

  return await db<Project>('project').returning('*').where(selector).first();
}

export async function getByCompanyIdAndName(
  companyId: string,
  name: string
): Promise<Project | undefined> {
  const selector = { company_id: companyId, name: name };

  return await db<Project>('project').returning('*').where(selector).first();
}

export async function create(newProject: Project): Promise<Project | undefined> {
  await db<Project>('project').insert(newProject);

  const createdProject = await getById(newProject.id);

  return createdProject;
}

export async function update(
  projectId: string,
  updatedProject: UpdateProject
): Promise<UpdateProject | undefined> {
  const selector = { id: projectId };

  await db<Project>('project').where(selector).update(updatedProject);

  return updatedProject;
}

export async function removeById(projectId: string): Promise<void> {
  const selector = { id: projectId };

  return db<Project>('project').where(selector).delete();
}

export async function getPriorities(): Promise<Priority[]> {
  return await db<Priority>('project_priority').returning('*');
}

export async function getStatuses(): Promise<Status[]> {
  return await db<Status>('project_status').returning('*');
}
