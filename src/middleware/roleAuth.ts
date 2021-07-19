import { Request, Response, NextFunction, RequestHandler } from 'express';
import CustomError from '../errorHandler/CustomError';
import { getById } from '../model/permission';

export const requireAuthRole = (role: string): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { permission_id } = req['user'];

    const permission = await getById(permission_id);

    if (!permission) throw new CustomError(404, 'Resource not found');

    if (permission.level !== role) throw new CustomError(401, 'Unauthorized');

    next();
  };
};
