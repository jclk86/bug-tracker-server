import { Request, Response, NextFunction } from 'express';

const wrapAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return function (req: Request, res: Response, next: NextFunction): void {
    fn(req, res, next).catch((err) => next(err));
  };
};

export default wrapAsync;
