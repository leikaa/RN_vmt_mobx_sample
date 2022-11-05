import AbstractModel from '../../../base/AbstractModel';
import { Nullable } from '../../../base/types/BaseTypes';

export class User extends AbstractModel {
  id: Nullable<number> = null;
  name: Nullable<string> = null;
  email: Nullable<string> = null;
  balance: Nullable<number> = null;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
