import TransactionFactory from './TransactionFactory';
import CreateTransactionDto from './dto/CreateTransactionDto';
import { TransactionItem } from './models/TransactionItem';
import TransactionApiRepository from './repositories/TransactionApiRepository';

export default class TransactionService {
  transactionApi: TransactionApiRepository;
  transactionFactory: TransactionFactory;

  constructor() {
    this.transactionApi = new TransactionApiRepository();
    this.transactionFactory = new TransactionFactory();
  }

  // API

  createTransaction = async (dto: CreateTransactionDto) => {
    const { data } = await this.transactionApi.createTransaction(dto);
    return this.transactionFactory.create<TransactionItem>(TransactionItem, data.trans_token);
  };
}
