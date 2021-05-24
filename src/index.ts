import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import config from './config';
import Logger from './loggers/config/logger';

// server config
const { port } = config;

app
  .listen(port, () => {
    Logger.info(`Server is running in http://localhost:${port}`);
  })
  // if port in use
  .on('error', function (err) {
    Logger.error(err);
  });
