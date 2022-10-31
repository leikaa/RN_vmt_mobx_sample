import { makeAutoObservable } from 'mobx';

import { Nullable } from '../../base/types/BaseTypes';
import { isTrue } from '../../base/utils/baseUtil';
import FormHelper from '../../helpers/FormHelper';
import AuthService from './AuthService';
import LoginDto from './dto/LoginDto';
import RegistrationDto from './dto/RegistrationDto';
import { LoginForm, LoginFormFields } from './forms/LoginForm';
import { RegistrationForm, RegistrationFormFields } from './forms/RegistrationForm';
import TokenService from './modules/token/TokenService';

export class AuthStore {
  loginLoading: boolean = false;
  registrationLoading: boolean = false;

  accessToken: Nullable<string> = null;

  private authService: AuthService;
  private tokenService: TokenService;

  loginForm = LoginForm;
  registrationForm = RegistrationForm;

  constructor() {
    makeAutoObservable(this);
    this.authService = new AuthService();
    this.tokenService = new TokenService();
  }

  // FORMS

  changeLoginForm = (key: LoginFormFields, value: string) => {
    this.loginForm = FormHelper.updateForm(this.loginForm, key, value);
  };

  changeRegistrationForm = (key: RegistrationFormFields, value: string) => {
    this.registrationForm = FormHelper.updateForm(this.registrationForm, key, value);
  };

  // API

  register = () => {
    this.setRegistrationLoading(true);

    const dto = RegistrationDto.populate({
      username: this.registrationForm.username,
      email: this.registrationForm.email,
      password: this.registrationForm.password,
    }) as RegistrationDto;

    return this.authService
      .register(dto)
      .then(async response => {
        if (response.id_token) {
          this.setAccessToken(response.id_token);
          await this.tokenService.saveToken(response.id_token);
        }

        return isTrue(response.id_token);
      })
      .catch(() => {
        return false;
      })
      .finally(() => this.setRegistrationLoading(false));
  };

  login = () => {
    this.setLoginLoading(true);

    const dto = LoginDto.populate(this.loginForm) as LoginDto;

    return this.authService
      .login(dto)
      .then(async response => {
        if (response.id_token) {
          await this.tokenService.saveToken(response.id_token);
        }

        return isTrue(response.id_token);
      })
      .catch(() => {
        return false;
      })
      .finally(() => this.setLoginLoading(false));
  };

  // OTHERS

  checkAuth = async () => {
    const token = await this.tokenService.getToken();

    if (token) {
      this.setAccessToken(token);
    }
  };

  // RESET

  resetLoginForm = () => {
    this.loginForm = LoginForm;
  };

  resetRegistrationForm = () => {
    this.registrationForm = RegistrationForm;
  };

  // SETTERS

  private setAccessToken = (value: string) => {
    this.accessToken = value;
  };

  private setLoginLoading = (value: boolean) => {
    this.loginLoading = value;
  };

  private setRegistrationLoading = (value: boolean) => {
    this.registrationLoading = value;
  };
}
