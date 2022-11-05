import React from 'react';

import { AuthStore } from '../modules/auth/AuthStore';
import { UserStore } from '../modules/user/UserStore';

class RootStore {
  authStore: AuthStore;
  userStore: UserStore;

  constructor() {
    this.authStore = new AuthStore();
    this.userStore = new UserStore();
  }

  sync = async () => {
    await Promise.all(
      Object.values(this).map(store => {
        return store?.sync ? store?.sync() : Promise.resolve();
      }),
    );
  };
}

export const rootStore = new RootStore();

export const storesContext = React.createContext(rootStore);
