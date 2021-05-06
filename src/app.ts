import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from './loggers/config/morgan';
import Routes from './routes';

// Server class executes constructor when instantiated. Exported into index.ts
class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();
    Routes(this.app);
  }

  // !create cors access options
  // middleware
  private config(): void {
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(morgan);
  }
}

export default new Server().app;
