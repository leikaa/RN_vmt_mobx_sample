import AbstractDto from '../../../base/AbstractDto';

export default class LoginDto extends AbstractDto {
  email: string = '';
  password: string = '';

  constructor(props: any) {
    super();
    this.load(props);
  }
}
