import db from '../database/config';
import { Project, UpdateProject } from '../schema/project';
import { Priority } from '../schema/priority';
import { Status } from '../schema/status';

export function getByCompanyId(companyId: string): Promise<Project[]> {
  const selector = {
    company_id: companyId
  };

  return db<Project>('project').returning('*').where(selector);
}

export function getById(projectId: string): Promise<Project | undefined> {
  const selector = { id: projectId };

  return db<Project>('project').returning('*').where(selector).first();
}

export function getByCompanyIdAndName(
  companyId: string,
  name: string
): Promise<Project | undefined> {
  const selector = { company_id: companyId, name: name };

  return db<Project>('project').returning('*').where(selector).first();
}

export function create(newProject: Project): Promise<Project | undefined> {
  return db<Project>('project').insert(newProject);
}

export function update(
  projectId: string,
  updatedProject: UpdateProject
): Promise<UpdateProject | undefined> {
  const selector = { id: projectId };

  return db<Project>('project').where(selector).update(updatedProject);
}

export function removeById(projectId: string): Promise<void> {
  const selector = { id: projectId };

  return db<Project>('project').where(selector).delete();
}

export function getPriorities(): Promise<Priority[]> {
  return db<Priority>('project_priority').returning('*');
}

export function getStatuses(): Promise<Status[]> {
  return db<Status>('project_status').returning('*');
}
