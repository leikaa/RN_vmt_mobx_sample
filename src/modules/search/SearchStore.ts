import { makeAutoObservable, runInAction } from 'mobx';

import SearchService from './SearchService';
import UsersListDto from './dto/UsersListDto';
import { UsersListItem } from './models/UsersListItem';

export class SearchStore {
  usersListLoading: boolean = false;
  isUsersListLoaded: boolean = true;
  isSearchStarted: boolean = false;

  searchQuery: string = '';
  usersList: UsersListItem[] = [];

  private searchService: SearchService;

  constructor() {
    makeAutoObservable(this);
    this.searchService = new SearchService();
  }

  // API

  getUsersList = (filter: string) => {
    this.setUsersListLoading(true);

    const dto = UsersListDto.populate({ filter: filter.toLowerCase() }) as UsersListDto;

    return this.searchService
      .getUsersList(dto)
      .then(response => {
        runInAction(() => {
          this.usersList = response;
        });

        this.setIsUsersListLoaded(true);
      })
      .catch(() => this.setIsUsersListLoaded(false))
      .finally(() => this.setUsersListLoading(false));
  };

  // RESET

  resetUsersList = () => {
    this.usersList = [];
  };

  // SETTERS

  setSearchQuery = (value: string) => {
    this.searchQuery = value;
  };

  setIsSearchStarted = (value: boolean) => {
    this.isSearchStarted = value;
  };

  private setUsersListLoading = (value: boolean) => {
    this.usersListLoading = value;
  };

  private setIsUsersListLoaded = (value: boolean) => {
    this.isUsersListLoaded = value;
  };
}
