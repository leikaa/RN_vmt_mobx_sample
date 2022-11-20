import TransactionFactory from './TransactionFactory';
import TransactionApiRepository from './repositories/TransactionApiRepository';

export default class TransactionService {
  transactionApi: TransactionApiRepository;
  transactionFactory: TransactionFactory;

  constructor() {
    this.transactionApi = new TransactionApiRepository();
    this.transactionFactory = new TransactionFactory();
  }
}
