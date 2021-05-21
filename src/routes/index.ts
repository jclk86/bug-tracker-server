import { Router } from 'express';
import companyRouter from './company';

const router = Router();

router.use(companyRouter);

export = router;
