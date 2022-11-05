import { makeAutoObservable } from 'mobx';

import { Nullable } from '../../base/types/BaseTypes';
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
