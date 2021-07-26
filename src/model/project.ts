import db from '../database/config';
import { Project, UpdateProject, ProjectUser } from '../types/project';
import { Priority } from '../types/priority';
import { Status } from '../types/status';

export function retrieve(
  accountId?: string,
  projectId?: string,
  projectName?: string
): Promise<Project[]> {
  const selector = {
    ...(accountId && { account_id: accountId }),
    ...(projectId && { id: projectId }),
    ...(projectName && { name: projectName })
  };

  return db<Project>('project').where(selector).returning('*');
}

export function retrieveById(projectId: string): Promise<Project | undefined> {
  const selector = { id: projectId };

  return db<Project>('project').where(selector).returning('*').first();
}

export function retrieveByProjectUserByIds(
  projectId: string,
  userId: string
): Promise<ProjectUser | undefined> {
  const selector = { project_id: projectId, user_id: userId };

  return db<ProjectUser>('project_users').where(selector).returning('*').first();
}

export function retrievePriorities(): Promise<Priority[]> {
  return db<Priority>('project_priority').returning('*');
}

export function retrieveStatuses(): Promise<Status[]> {
  return db<Status>('project_status').returning('*');
}

export function create(newProject: Project): Promise<void> {
  return db<Project>('project').insert(newProject);
}
// ! rename to create? create a new model?
export function addProjectUser(newProjectUser: ProjectUser): Promise<void> {
  return db<ProjectUser>('project_users').insert(newProjectUser);
}

export function update(projectId: string, updatedProject: UpdateProject): Promise<void> {
  const selector = { id: projectId };

  return db<Project>('project').where(selector).update(updatedProject);
}

export function remove(projectId: string): Promise<void> {
  const selector = { id: projectId };

  return db<Project>('project').where(selector).delete();
}

export function removeProjectUser(projectId: string, userId: string): Promise<void> {
  const selector = { project_id: projectId, user_id: userId };

  return db<ProjectUser>('project_users').where(selector).delete();
}
