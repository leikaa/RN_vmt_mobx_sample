import AuthFactory from './AuthFactory';
import AuthApiRepository from './repositories/AuthApiRepository';

export default class AuthService {
  authApi: AuthApiRepository;
  authFactory: AuthFactory;

  constructor() {
    this.authApi = new AuthApiRepository();
    this.authFactory = new AuthFactory();
  }
}
