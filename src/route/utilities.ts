import { Request, Response, NextFunction } from 'express';

// passes error to errorhandler if fails

export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return function (req: Request, res: Response, next: NextFunction): void {
    fn(req, res, next).catch((err) => next(err));
  };
};
