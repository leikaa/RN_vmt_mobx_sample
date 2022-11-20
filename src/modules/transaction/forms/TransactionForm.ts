export const TransactionForm = {
  name: '',
  amount: '',

  isValidForm: (form: ITransactionForm) => {
    return form.name && form.amount;
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
