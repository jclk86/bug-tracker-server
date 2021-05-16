import { Router } from 'express';
import testController from '../controller/test';

const testRouter = Router();

testRouter.get('/test', testController.all);
// testRouter.get('/test2', testController.all);

// add testRouter.post, patch delete

export default testRouter;
