import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from './loggers/config/morgan';
import Logger from './loggers/config/logger';
import routes from './routes';

// Server class executes constructor when instantiated. Exported into index.ts

const app: express.Application = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan);

app.use(routes);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    Logger.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

// class Server {
//   public app: express.Application;
//   constructor() {
//     this.app = express();
//     this.config();
//     Routes(this.app);
//   }

//   // !create cors access options
//   // middleware
//   private config(): void {
//     this.app.use(helmet());
//     this.app.use(express.json());
//     this.app.use(express.urlencoded({ extended: true }));
//     this.app.use(cors());
//     this.app.use(morgan);
//   }
// }

export default app;
