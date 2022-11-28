import { makeAutoObservable } from 'mobx';

import { Nullable } from '../../base/types/BaseTypes';
import FormHelper from '../../helpers/FormHelper';
import TransactionService from './TransactionService';
import CreateTransactionDto from './dto/CreateTransactionDto';
import { TransactionForm, TransactionFormFields } from './forms/TransactionForm';
import { TransactionItem } from './models/TransactionItem';

export class TransactionStore {
  transactionLoading: boolean = false;
  transactionListLoading: boolean = true;
  isTransactionListLoaded: boolean = true;

  isListSortByDesc: boolean = false;
  transactionList: TransactionItem[] = [];

  transactionForm = TransactionForm;

  private transactionService: TransactionService;

  constructor() {
    makeAutoObservable(this);
    this.transactionService = new TransactionService();
  }

  // API

  getTransactionList = () => {
    this.setTransactionListLoading(true);

    return this.transactionService
      .getTransactionList()
      .then(response => {
        this.setTransactionList(response);
        this.setIsTransactionListLoaded(true);
      })
      .catch(() => this.setIsTransactionListLoaded(false))
      .finally(() => this.setTransactionListLoading(false));
  };

  createTransaction = (): Promise<TransactionItem | null> => {
    this.setTransactionLoading(true);

    const dto = CreateTransactionDto.populate(this.transactionForm) as CreateTransactionDto;

    return this.transactionService
      .createTransaction(dto)
      .then(response => {
        this.addTransactionItemToListBySort(response);
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

  // OTHERS

  addTransactionItemToListBySort = (item: TransactionItem) => {
    if (this.isListSortByDesc) {
      this.transactionList = [...this.transactionList, item];
      return;
    }

    this.transactionList = [item, ...this.transactionList];
  };

  prepareTemplateTransaction = (item: Nullable<TransactionItem>) => {
    return this.transactionService.prepareTemplateTransaction(item, this.changeTransactionForm);
  };

  // RESET

  resetTransactionForm = () => {
    this.transactionForm = TransactionForm;
  };

  resetTransactionList = () => {
    this.transactionListLoading = true;
    this.isListSortByDesc = false;
    this.transactionList = [];
  };

  // SETTERS

  setTransactionList = (value: TransactionItem[]) => {
    this.transactionList = value;
  };

  setIsListSortByDesc = (value: boolean) => {
    this.isListSortByDesc = value;
  };

  private setTransactionLoading = (value: boolean) => {
    this.transactionLoading = value;
  };

  private setTransactionListLoading = (value: boolean) => {
    this.transactionListLoading = value;
  };

  private setIsTransactionListLoaded = (value: boolean) => {
    this.isTransactionListLoaded = value;
  };
}
