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

  getUsersList = async (dto: UsersListDto) => {
    const { data } = await this.searchApi.getUsersList(dto);
    return this.searchFactory.createList<UsersListItem>(UsersListItem, data);
  };

  runUserListSearch = async (
    query: string,
    list: UsersListItem[],
    shouldDisplayStub: (value: boolean) => void,
    getList: (filter: string) => Promise<void>,
    resetList: () => void,
    isListLoading: boolean,
  ) => {
    if (!query) {
      resetList();
      shouldDisplayStub(false);
      return;
    }

    if (isListLoading) {
      return;
    }

    await getList(query);

    if (!list.length) {
      shouldDisplayStub(true);
    }
  };
}
