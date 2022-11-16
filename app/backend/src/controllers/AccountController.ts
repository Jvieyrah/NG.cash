import { Request, Response } from 'express';
import AccountService from '../service/AccountService';

export default class accountController {
  private _accountService: AccountService;
  constructor(accountService: AccountService) {
    this._accountService = accountService;
  }

  public async getBalance(req: Request, res: Response): Promise<Response> {
    const token = req.headers.authorization
    const balance = await this._accountService.getAccountBalance(token as string);
    return res.status(200).json(balance);
  }
}
