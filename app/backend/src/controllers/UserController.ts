import { Request, Response } from 'express';
import UserService from '../service/UserService';

export default class UserController {
  userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const token = await this.userService.makelogin(req.body);
    return res.status(200).send({ token });
  }
}
