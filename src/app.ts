import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from './loggers/config/morgan';
import apiRouter from './api';

const app: express.Application = express();

app.use(helmet());

// !create cors access options

// config express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(), apiRouter);

app.use(morgan);

app.use('/', (req, res, next) => {
  res.send('Not found');
});

app.use(function (err, req, res, next) {
  let message = null;

  if (err.raw) {
    message = err.raw.message;
  } else if (err.message) {
    message = err.message;
  } else if (err.sqlMessage) {
    message = err.sqlMessage;
  }

  console.error(message);

  message ? res.status(400).send({ message: message }) : res.status(400).send(err);
});

export default app;
