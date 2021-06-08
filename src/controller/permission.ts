import util from './utilities';
import Permission from '../model/permission';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import CustomError from '../errorhandler/CustomError';

export const getAllPermissionLevels = async (req: Request, res: Response): Promise<void> => {
  const permissionLevels = await Permission.get();

  if (!permissionLevels) throw new CustomError(404, 'Permission levels do not exist');

  res.status(200).send(permissionLevels);
};

export const getPermissionById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const permission = await Permission.getById(id);
  if (!permission) throw new CustomError(400, 'No matching permission level');

  res.status(200).send(permission);
};
