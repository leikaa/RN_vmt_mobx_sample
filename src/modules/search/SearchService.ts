import SearchFactory from './SearchFactory';
import UsersListDto from './dto/UsersListDto';
import { UsersListItem } from './models/UsersListItem';
import SearchApiRepository from './repositories/SearchApiRepository';

export default class SearchService {
  searchApi: SearchApiRepository;
  searchFactory: SearchFactory;

  constructor() {
    this.searchApi = new SearchApiRepository();
    this.searchFactory = new SearchFactory();
  }

  // API

  getUsersList = async (dto: UsersListDto) => {
    const { data } = await this.searchApi.getUsersList(dto);
    return this.searchFactory.createList<UsersListItem>(UsersListItem, data);
  };
}
