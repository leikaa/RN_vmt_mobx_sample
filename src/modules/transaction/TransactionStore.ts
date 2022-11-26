import { makeAutoObservable, runInAction } from 'mobx';

import FormHelper from '../../helpers/FormHelper';
import TransactionService from './TransactionService';
import CreateTransactionDto from './dto/CreateTransactionDto';
import { TransactionForm, TransactionFormFields } from './forms/TransactionForm';
import { TransactionItem } from './models/TransactionItem';

export class TransactionStore {
  transactionLoading: boolean = false;

  transactionForm = TransactionForm;

  private transactionService: TransactionService;

  constructor() {
    makeAutoObservable(this);
    this.transactionService = new TransactionService();
  }

  // API

  createTransaction = (): Promise<TransactionItem | null> => {
    this.setTransactionLoading(true);

    const dto = CreateTransactionDto.populate(this.transactionForm) as CreateTransactionDto;

    return this.transactionService
      .createTransaction(dto)
      .then(response => {
        runInAction(() => {
          //todo vmt - remove log
          console.log('response: ', JSON.stringify(response));
        });

        return response;
      })
      .catch(() => {
        return null;
      })
      .finally(() => this.setTransactionLoading(false));
  };

  // FORMS

  changeTransactionForm = (key: TransactionFormFields, value: string) => {
    this.transactionForm = FormHelper.updateForm(this.transactionForm, key, value);
  };

  // RESET

  resetTransactionForm = () => {
    this.transactionForm = TransactionForm;
  };

  // SETTERS

  private setTransactionLoading = (value: boolean) => {
    this.transactionLoading = value;
  };
}
