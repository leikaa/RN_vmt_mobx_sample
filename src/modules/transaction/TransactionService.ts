import TransactionFactory from './TransactionFactory';
import CreateTransactionDto from './dto/CreateTransactionDto';
import TransactionApiRepository from './repositories/TransactionApiRepository';

export default class TransactionService {
  transactionApi: TransactionApiRepository;
  transactionFactory: TransactionFactory;

  constructor() {
    this.transactionApi = new TransactionApiRepository();
    this.transactionFactory = new TransactionFactory();
  }

  // API

  getTransactionList = async () => {
    const { data } = await this.transactionApi.getTransactionList();
    return this.transactionFactory.createTransactionList(data.trans_token);
  };

  createTransaction = async (dto: CreateTransactionDto) => {
    const { data } = await this.transactionApi.createTransaction(dto);
    return this.transactionFactory.createTransactionItem(data.trans_token);
  };
}
