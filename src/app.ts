import express from 'express';
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

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    response = { message: error.message };
  }
  res.status(500).json(response);
});

export default app;
