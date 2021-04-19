import * as express from 'express';
import * as helmet from 'helmet';
import apiRouter from './api';

const app = express();

app.use(helmet());

// config express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

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
