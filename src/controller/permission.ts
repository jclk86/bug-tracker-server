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
  const { permissionId } = req.params;

  const isValid = await isValidUUIDV4(permissionId);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const numId = parseInt(permissionId);

  const permission = await getById(numId);
  if (!permission) throw new CustomError(400, 'No matching permission level');

  res.status(200).send(permission);
};
