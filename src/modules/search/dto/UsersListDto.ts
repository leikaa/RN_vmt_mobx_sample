import AbstractDto from '../../../base/AbstractDto';

export default class UsersListDto extends AbstractDto {
  filter: string = '';

  constructor(props: any) {
    super();
    this.load(props);
  }
}
