import express from 'express';
import testRouter from './test';

export default function Routes(app: express.Application): void {
  const router: express.Router = express.Router();

  app.use('/', router);
  app.use('/test', testRouter);

  // error handler
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const err = new Error('Not Found');
    res.status(404);
    next(err);
  });

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      error: {
        message: err.message
      }
    });
  });
}
