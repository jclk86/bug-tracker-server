import db from '../database/config';
import { IProject, IUpdateProject } from '../schema/project';

async function get(): Promise<IProject[]> {
  return await db<IProject>('project').returning('*');
}

async function getById(id: string): Promise<IProject | undefined> {
  return await db<IProject>('project').returning('*').where({ id }).first();
}

async function getByName(name: string): Promise<IProject | undefined> {
  return await db<IProject>('project').returning('*').where({ name }).first();
}

async function create(newProject: IProject): Promise<IProject | undefined> {
  await db<IProject>('project').insert(newProject);
  return newProject;
}

async function update(id: string, data: IUpdateProject): Promise<IUpdateProject | undefined> {
  await db<IProject>('project').where({ id }).update(data);
  return data;
}

export default {
  get,
  create,
  getById,
  getByName,
  update
};
