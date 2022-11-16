import { Router } from 'express';
import TransactionController from '../controllers/TransactionController';
import TransactionService from '../service/TransactionService ';
import authCheck from '../middleware/authCheck';
import fieldCheck from '../middleware/fieldCheck';

const TransactionFields = ['depositAcountID', 'value'];

const TransactionRouter = Router();
const transactionService = new TransactionService();

const TransactionCI = new TransactionController(transactionService);

TransactionRouter.post('/transaction', authCheck, fieldCheck(TransactionFields), TransactionCI.createNewTransaction);
TransactionRouter.get('/transactions?q=select&date', authCheck, TransactionCI.getTransaction);
TransactionRouter.get('/transactions?q=select', authCheck, TransactionCI.getTransaction);
 
export default TransactionRouter;
