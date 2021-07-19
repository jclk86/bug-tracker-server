import { UserPayload } from '../types/auth';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
