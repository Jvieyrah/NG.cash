 import { Request, Response } from 'express';
 import TransactionService from '../service/TransactionService ';
 import Itransaction from '../entities/Itransacton.interface';

export default class TransactionController {
  private _TransactionService: TransactionService;
  constructor(transactionService: TransactionService) {
    this._TransactionService = transactionService;
  }

  public async createNewTransaction(req: Request, res: Response): Promise<Response> {
    const token = req.headers.authorization;
    const newTransaction = await this._TransactionService.createTransaction(token as string, req.body as Itransaction);
    return res.status(201).json(newTransaction);  
  }
    public async getTransaction(req: Request, res: Response): Promise<Response> {
    const token = req.headers.authorization;
    const { q:select } = req.query;
    const { date } = req.query
    const transactions = await this._TransactionService.getTransactions(token as string, select as any, date as string);
    return res.status(200).json(transactions);
}
}
