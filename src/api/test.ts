import { Router } from 'express';
import testController from '../controller/testController';

const api = Router();

// global error handler
// ! do we need this?
const use = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

api.get('/test', use(testController.get));

export default api;
