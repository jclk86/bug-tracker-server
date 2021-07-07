import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import CustomError from '../errorhandler/CustomError';

// https://stackoverflow.com/questions/54578203/creating-a-middleware-function-to-check-if-user-role-is-equal-to-admin

// define admin or other users in middleware req.ROLE = 'admin'

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.get('authorization');

  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer' && typeof token === 'undefined')
    throw new CustomError(401, 'Invalid or expired token');

  const payload = await jwt.verify(token, process.env.JWT_KEY);

  if (!payload) throw new CustomError(403, 'Invalid token');

  next();
};
