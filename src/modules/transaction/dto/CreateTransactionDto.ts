import AbstractDto from '../../../base/AbstractDto';

export default class CreateTransactionDto extends AbstractDto {
  name: string = '';
  amount: number = 0;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
