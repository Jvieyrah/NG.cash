import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserService from '../service/UserService';

const userRouter = Router();
const userService = new UserService();

const userControllerInstance = new UserController(userService);

userRouter.post('/login', (req, res) => userControllerInstance.login(req, res));

export default userRouter;
