import { makeAutoObservable } from 'mobx';

import { Nullable } from '../../base/types/BaseTypes';
import { isEmpty } from '../../base/utils/baseUtil';
import UserService from './UserService';
import { User } from './models/User';

export class UserStore {
  userInfoLoading: boolean = false;
  isUserInfoLoaded: boolean = true;

  user: Nullable<User> = null;

  private userService: UserService;

  constructor() {
    makeAutoObservable(this);
    this.userService = new UserService();
  }

  // API

  getUserInfo = () => {
    this.setUserInfoLoading(true);

    return this.userService
      .getUserInfo()
      .then(response => {
        this.setUser(response);
        this.setIsUserInfoLoaded(true);
      })
      .catch(() => this.setIsUserInfoLoaded(false))
      .finally(() => this.setUserInfoLoading(false));
  };

  // OTHERS

  updateUserBalance = (balance: Nullable<number> | undefined) => {
    if (!isEmpty(balance)) {
      this.user = this.userService.updateUserBalance(this.user, balance!);
    }
  };

  // SETTERS

  setUser = (user: Nullable<User>) => {
    this.user = user;
  };

  private setUserInfoLoading = (value: boolean) => {
    this.userInfoLoading = value;
  };

  private setIsUserInfoLoaded = (value: boolean) => {
    this.isUserInfoLoaded = value;
  };
}
