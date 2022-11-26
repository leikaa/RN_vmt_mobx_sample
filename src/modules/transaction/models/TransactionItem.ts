import AbstractModel from '../../../base/AbstractModel';
import { Nullable } from '../../../base/types/BaseTypes';

export class TransactionItem extends AbstractModel {
  id: Nullable<number> = null;
  date: Nullable<string> = null;
  username: Nullable<string> = null;
  amount: Nullable<number> = null;
  balance: Nullable<number> = null;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
