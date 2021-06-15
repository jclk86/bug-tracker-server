import { get, getById } from '../model/permission';
import { Request, Response } from 'express';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import CustomError from '../errorhandler/CustomError';

export const getAllPermissionLevels = async (req: Request, res: Response): Promise<void> => {
  const permissionLevels = await get();

  if (!permissionLevels) throw new CustomError(404, 'Permission levels do not exist');

  res.status(200).send(permissionLevels);
};

export const getPermissionById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isValid = isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const permission = await getById(id);
  if (!permission) throw new CustomError(400, 'No matching permission level');

  res.status(200).send(permission);
};
