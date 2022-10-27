import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserService from '../service/UserService';
import authCheck from '../middleware/authCheck';

const userRouter = Router();
const userService = new UserService();

const userCI = new UserController(userService);

userRouter.post('/login', (req, res) => userCI.login(req, res));
userRouter.get('/login/validate', authCheck, (req, res) => userCI.validateLogin(req, res));

export default userRouter;
