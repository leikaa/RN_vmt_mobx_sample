import AbstractApiRepository from '../../../base/api/AbstractApiRepository';

export default class UserApiRepository extends AbstractApiRepository {
  getUserInfo = () => {
    return this.apiClient.get({
      url: '/api/protected/user-info',
    });
  };
}
