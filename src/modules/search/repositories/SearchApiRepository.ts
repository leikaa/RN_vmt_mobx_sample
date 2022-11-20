import AbstractApiRepository from '../../../base/api/AbstractApiRepository';
import UsersListDto from '../dto/UsersListDto';

export default class SearchApiRepository extends AbstractApiRepository {
  getUsersList = (data: UsersListDto) => {
    return this.apiClient.post({
      url: '/api/protected/users/list',
      data,
    });
  };
}
