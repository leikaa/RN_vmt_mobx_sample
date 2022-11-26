import { isTrue } from '../../../base/utils/baseUtil';

export const TransactionForm = {
  name: '',
  amount: '',

  isValidForm: (form: ITransactionForm) => {
    return isTrue(form.name && form.amount);
  },
};

export enum TransactionFormFields {
  name = 'name',
  amount = 'amount',
}

export interface ITransactionForm {
  name: string;
  amount: string;
}
