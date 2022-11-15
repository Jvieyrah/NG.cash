import accounts from '../database/models/sequelizeAccounts';
import Iaccount from '../entities/Iaccount.interface';
import StructuredError from '../errors/StructuredError';
import TokenManager from '../helpers/tokenManager';
import UserService from './UserService';

export default class AcocountService {
  private _accountModel: typeof accounts;
  constructor() {
    this._accountModel = accounts;
  }

  public async createAccount(account: Iaccount): Promise<Iaccount> {
    const newAccount = await this._accountModel.create(account);
    return newAccount as unknown as Iaccount;
  }

  public async getAccountBalance(token: string): Promise<Iaccount> { 
    // verifica se o token é válido e busca conta do  user
    const { accountID } = await new UserService().validateLogin(token);    
    const account = await accounts.findOne({ where: { id: accountID } });
    return account?.balance as unknown as Iaccount;
  };

  public async updateCashOutBalance(token: string, value: number): Promise<Iaccount> {
    // verifica se o token é válido e busca conta do  user
    const { accountID } = await new UserService().validateLogin(token);
    // verifica se o valor é positivo e se o saldo é suficiente
    if (value < 0) throw new StructuredError('Value chashed out must be positive', 400);
    const account = await accounts.findOne({ where: { id: accountID } });
    // a verificação abaixo existe para tratar possibilidade de "null"
    if (!account) throw new StructuredError('Account not found', 404);
    if (account.balance < value) throw new StructuredError('Insufficient funds', 400);
    // caso esteja tudo certo, atualiza o saldo
    const newBalance = account.balance - value;
    const updatedAccount = await accounts.update({ balance: newBalance }, { where: { id: accountID } });
    return updatedAccount as unknown as Iaccount;
  }

  public async updateCashInBalance(accountID: number, value: number): Promise<Iaccount> {
    // verifica se o valor é positivo
    if (value < 0) throw new StructuredError('Value chashed in must be positive', 400);
    // caso esteja tudo certo, atualiza o saldo
    const accountToCashIn = await accounts.findOne({ where: { id: accountID } });
    // trata a possibilidade de null
    if (!accountToCashIn) throw new StructuredError('Account not found', 404);
    const newBalance = accountToCashIn.balance + value;
    const updatedAccount = await accounts.update({ balance: newBalance }, { where: { id: accountID } });
    return updatedAccount as unknown as Iaccount;
  }
}
