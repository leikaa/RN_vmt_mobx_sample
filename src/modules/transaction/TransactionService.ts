import { Nullable } from '../../base/types/BaseTypes';
import { isEmpty } from '../../base/utils/baseUtil';
import TransactionFactory from './TransactionFactory';
import CreateTransactionDto from './dto/CreateTransactionDto';
import { TransactionFormFields } from './forms/TransactionForm';
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

  getTransactionList = async () => {
    const { data } = await this.transactionApi.getTransactionList();
    return this.transactionFactory.createTransactionList(data.trans_token);
  };

  createTransaction = async (dto: CreateTransactionDto) => {
    const { data } = await this.transactionApi.createTransaction(dto);
    return this.transactionFactory.createTransactionItem(data.trans_token);
  };

  // OTHERS

  prepareTemplateTransaction = (
    item: Nullable<TransactionItem>,
    changeForm: (key: TransactionFormFields, value: string) => void,
  ): boolean => {
    if (!item?.username || isEmpty(item.amount)) {
      return false;
    }

    changeForm(TransactionFormFields.name, item.username);
    changeForm(TransactionFormFields.amount, Math.abs(item.amount!).toString());

    return true;
  };
}
