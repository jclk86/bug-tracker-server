import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from './loggers/config/morgan';
import routes from './routes';

// Server class executes constructor when instantiated. Exported into index.ts

const app: express.Application = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan);

app.use(routes);

app.use((req, res) => {
  res.status(404).send('NOT FOUND');
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(error.name);
  next(error);
});
// if next is used here, will pass to express' in-built error handler -- you don't need to use their in-built errorhandler though
// next needs to be here, or else it returns error stack
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  let response;
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error', status: 500 } };
  } else {
    response = { error };
  }
  res.status(response.error.status).json(response);
});

export default app;
