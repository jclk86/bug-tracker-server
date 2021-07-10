import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from './loggers/config/morgan';
import routes from './route';
import CustomError from './errorHandler/CustomError';

// Server class executes constructor when instantiated. Exported into index.ts

// ! app.delete /logout route. -- to use app.delete install method--override --> app.use(methodOverride(_method)) 35 min web dev simpliedfied

const app: express.Application = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan);

app.use(routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new CustomError(404, 'Not Found');
  next(err);
});

// if next is used here, will pass to express' in-built error handler -- you don't need to use their in-built errorhandler though
// next needs to be here, or else it returns error stack
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let response;

  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error', status: 500 } };
  } else {
    response = { error };
  }
  // For errors without status codes
  const statusCode = response.error.status || 500;

  // place console.log during development to log error message
  res.status(statusCode).json(response.error.message);
});

export default app;
