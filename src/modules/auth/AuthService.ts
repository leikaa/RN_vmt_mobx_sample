import AuthFactory from './AuthFactory';
import LoginDto from './dto/LoginDto';
import RegistrationDto from './dto/RegistrationDto';
import { AuthAccess } from './models/AuthAccess';
import AuthApiRepository from './repositories/AuthApiRepository';

export default class AuthService {
  authApi: AuthApiRepository;
  authFactory: AuthFactory;

  constructor() {
    this.authApi = new AuthApiRepository();
    this.authFactory = new AuthFactory();
  }

  // API

  register = async (dto: RegistrationDto) => {
    const { data } = await this.authApi.register(dto);
    return this.authFactory.create<AuthAccess>(AuthAccess, data);
  };

  login = async (dto: LoginDto) => {
    const { data } = await this.authApi.login(dto);
    return this.authFactory.create<AuthAccess>(AuthAccess, data);
  };
}
