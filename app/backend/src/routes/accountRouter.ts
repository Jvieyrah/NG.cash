import { Router } from 'express';
import AccountController from '../controllers/AccountController';
import AccountService from '../service/AccountService';
import authCheck from '../middleware/authCheck';

const accountRouter = Router();
const accountService = new AccountService();

const accountCI = new AccountController(accountService);

accountRouter.get('/balance', authCheck, accountCI.getBalance);

export default accountRouter;
