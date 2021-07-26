import { Router } from 'express';
import { createInvite, deleteInvite } from '../controller/inviteController';
import { catchAsync } from './utilities';
import { requireAuthRole } from '../middleware/roleAuth';
import { requireAuth } from '../middleware/jwtAuth';
import { ROLE } from '../middleware/permission/role';

const inviteRouter = Router();
// ! untested
inviteRouter.use('/invite', catchAsync(requireAuth), requireAuthRole(ROLE.OWNER));

inviteRouter.post('/invite/:accountId', catchAsync(createInvite));

inviteRouter.delete('/invite', catchAsync(deleteInvite));
