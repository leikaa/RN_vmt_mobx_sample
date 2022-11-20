import AbstractModel from '../../../base/AbstractModel';
import { Nullable } from '../../../base/types/BaseTypes';

export class UsersListItem extends AbstractModel {
  id: Nullable<number> = null;
  name: Nullable<string> = null;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
