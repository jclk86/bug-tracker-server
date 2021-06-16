import db from '../database/config';
import { Project } from '../schema/project';
import CustomError from '../errorhandler/CustomError';

export async function getByCompanyId(company_id: string): Promise<Project[]> {
  return await db<Project>('project').returning('*').where({ company_id });
}

export async function getById(id: string): Promise<Project | undefined> {
  return await db<Project>('project').returning('*').where({ id }).first();
}

export async function getByCompanyIdAndName(company_id: string, name: string): Promise<Project[]> {
  return await db<Project>('project').returning('*').where({ company_id }).andWhere({ name });
}

export async function create(newProject: Project): Promise<Project | undefined> {
  await db<Project>('project').insert(newProject);
  return newProject;
}

export async function update(
  id: string,
  data: Partial<Project>
): Promise<Partial<Project> | undefined> {
  await db<Project>('project').where({ id }).update(data);
  return data;
}

export async function removeById(id: string): Promise<void> {
  return db<Project>('project').where({ id }).delete();
}
