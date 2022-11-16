import Transactions from '../database/models/sequelizeTransactions';
import AccountService from './AccountService';
import Account from '../database/models/sequelizeAccounts';
import Itransactons from '../entities/Itransacton.interface';
import StructuredError from '../errors/StructuredError';
import UserService from './UserService';
// import Iaccount from '../entities/Iaccount.interface';

type selectType = 'paid' | 'received' | 'all';

export default class TransactionsService {
  private _transactionModel: typeof Transactions;
//   private _accountService: typeof AccountService;
  private _accountModel: typeof Account;
  constructor() {
    this._transactionModel = Transactions;
    this._accountModel = Account;
  } 

  public async createTransaction( token: string, transaction: Itransactons): Promise<Itransactons> {
    const { creditedAccoutId } = transaction;
    const { accountID: debtedAccountId } = await new UserService().validateLogin(token);

    // um usuário não deverá ter a possibilidade de realizar uma transferência para si mesmo.
    if (debtedAccountId === creditedAccoutId) {
      throw new StructuredError('It is not possible to create a transaction between two equal accounts', 422);
    }
    // verifica se ambas as contas envolvidas na transação existem
    const debitSource = await this._accountModel.findOne({ where: { id: debtedAccountId } });
    const creditDestny = await this._accountModel.findOne({ where: { id: creditedAccoutId as number } });
    if (!debitSource || !creditDestny) {
      throw new StructuredError('There is no account with such id!', 404);
    }
    // verifica se a conta de débito possui saldo suficiente para realizar a transferência e subtrai o saldo da conta de débito
    const push = await new AccountService().updateCashOutBalance(token, transaction.value);
    if (push) {
        // adiciona o saldo da conta de crédito
      const pull = await new AccountService().updateCashInBalance(creditedAccoutId as number, transaction.value);
      const newTransaction = await this._transactionModel.create({ debtedAccountId, ...transaction});
      return newTransaction as unknown as Itransactons;
    }
    throw new StructuredError('There is no account with such id!', 404);
}

public async getTransactions(token: string, select: selectType, date?: string  ): Promise<Itransactons[]> {
    const { accountID } = await new UserService().validateLogin(token);
    let parameters = {};
    // define os parâmetros de busca de acordo com o tipo de busca selecionado que pode ser paid, received ou all
    switch (select) {
        case 'paid':
            parameters = { debtedAccountId: accountID };
            break;
        case 'received':
            parameters = { creditedAccoutId: accountID };
            break;
        case 'all':
            parameters = { [this._transactionModel.Op.or]: [{ debtedAccountId: accountID }, { creditedAccoutId: accountID }] };
            break;
        default:
            throw new StructuredError('Invalid query parameter', 422);
    }
    // se o parâmetro date for passado, a busca será feita também por data
    if (date) {
        const dateArray = date.split('-');
        const year = dateArray[0];
        const month = dateArray[1];
        const day = dateArray[2];
        parameters = { ...parameters, [this._transactionModel.Op.and]: [{ year }, { month }, { day }] };
    }
    
    // retorna somente as transações que atendem aos parâmetros de busca
    const listTransactions = await this._transactionModel.findAll({ where: parameters });

    return listTransactions as unknown as Itransactons[];
}      
}
