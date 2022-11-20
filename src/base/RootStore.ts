import React from 'react';

import { AuthStore } from '../modules/auth/AuthStore';
import { SearchStore } from '../modules/search/SearchStore';
import { TransactionStore } from '../modules/transaction/TransactionStore';
import { UserStore } from '../modules/user/UserStore';

class RootStore {
  authStore: AuthStore;
  searchStore: SearchStore;
  transactionStore: TransactionStore;
  userStore: UserStore;

  constructor() {
    this.authStore = new AuthStore();
    this.searchStore = new SearchStore();
    this.transactionStore = new TransactionStore();
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
