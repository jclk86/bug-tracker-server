import * as express from 'express';
import testController from '../controller/testController';

const api = express.Router();

// global error handler
const use = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

api.get('/test', use(testController));

export default api;
