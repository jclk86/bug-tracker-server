import db from '../database/config';
import { Project, UpdateProject } from '../types/project';
import { Priority } from '../types/priority';
import { Status } from '../types/status';

export function getByCompanyId(companyId: string): Promise<Project[]> {
  const selector = {
    company_id: companyId
  };

  return db<Project>('project').where(selector).returning('*');
}

export function getById(projectId: string): Promise<Project | undefined> {
  const selector = { id: projectId };

  return db<Project>('project').where(selector).returning('*').first();
}

export function getByCompanyIdAndName(
  companyId: string,
  name: string
): Promise<Project | undefined> {
  const selector = { company_id: companyId, name: name };

  return db<Project>('project').where(selector).returning('*').first();
}

export function create(newProject: Project): Promise<void> {
  return db<Project>('project').insert(newProject);
}

export function update(projectId: string, updatedProject: UpdateProject): Promise<void> {
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
