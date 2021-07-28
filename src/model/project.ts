import db from '../database/config';
import { Project, UpdateProject, ProjectUser } from '../types/project';
import { Priority } from '../types/priority';
import { Status } from '../types/status';

// ** FUNCTION OVERLOADS **//

export function retrieve(accountId: string, projectId: null, projectName: null): Promise<Project[]>;

export function retrieve(accountId: string, projectId: null, projectName: string): Promise<Project>;

export function retrieve(accountId: null, projectId: string, projectName: null): Promise<Project>;

// ** END ** //

export function retrieve(
  accountId?: string,
  projectId?: string,
  projectName?: string
): Promise<Project[] | Project | undefined> {
  const selector = {
    ...(accountId && { account_id: accountId }),
    ...(projectId && { id: projectId }),
    ...(projectName && { name: projectName })
  };

  const query = db<Project>('project').where(selector).returning('*');

  return (
    (accountId && !projectName && query) ||
    ((projectId || (accountId && projectName)) && query.first())
  );
}

// ** FUNCTION OVERLOADS **//

export function retrieveProjectUser(projectId: string, userId: string): Promise<ProjectUser>;

export function retrieveProjectUser(projectId: string, userId: null): Promise<ProjectUser[]>;

export function retrieveProjectUser(projectId: null, userId: string): Promise<ProjectUser>;

export function retrieveProjectUser(
  projectId?: string,
  userId?: string
): Promise<ProjectUser[] | ProjectUser | undefined> {
  const selector = {
    ...(projectId && { project_id: projectId }),
    ...(userId && { user_id: userId })
  };

  const query = db<ProjectUser>('project_users').where(selector).returning('*');

  return (
    (projectId && !userId && query) ||
    (projectId && userId && query.first()) ||
    (!projectId && userId && query.first())
  );
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
