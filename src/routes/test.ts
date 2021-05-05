import { Router } from 'express';
import testController from '../controller/test';

class TestRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes() {
    this.router.get('/', testController.all);
  }
}

const testRouter = new TestRouter();

testRouter.routes();

const router = testRouter.router;

export default router;
