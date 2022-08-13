import { makeAutoObservable } from 'mobx';

import AuthService from './AuthService';

export class AuthStore {
  private authService: AuthService;

  constructor() {
    makeAutoObservable(this);
    this.authService = new AuthService();
  }
}
