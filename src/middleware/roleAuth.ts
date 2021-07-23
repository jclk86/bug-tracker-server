import { Request, Response, NextFunction, RequestHandler } from 'express';
import CustomError from '../errorHandler/CustomError';

export const requireAuthRole = (roleTitle: string): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { role } = req['user'];

    if (roleTitle !== role) throw new CustomError(401, 'Unauthorized');

    next();
  };
};
