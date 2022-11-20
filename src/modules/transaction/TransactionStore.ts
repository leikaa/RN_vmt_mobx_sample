import { makeAutoObservable, set } from 'mobx';

import TransactionService from './TransactionService';
import { TransactionForm } from './forms/TransactionForm';

export class TransactionStore {
  transactionForm = TransactionForm;

  private transactionService: TransactionService;

  constructor() {
    makeAutoObservable(this);
    this.transactionService = new TransactionService();
  }

  changeForm = (form: any, key: string, value: any) => {
    set(form, key, value);
  };

  resetTransactionForm = () => {
    this.transactionForm = TransactionForm;
  };
}
