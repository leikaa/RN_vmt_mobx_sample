import AbstractDto from '../../../base/AbstractDto';

export default class RegistrationDto extends AbstractDto {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(props: any) {
    super();
    this.load(props);
  }
}
