import AbstractApiRepository from '../../../base/api/AbstractApiRepository';
import LoginDto from '../dto/LoginDto';
import RegistrationDto from '../dto/RegistrationDto';

export default class AuthApiRepository extends AbstractApiRepository {
  register = (dto: RegistrationDto) => {
    return this.apiClient.post({ url: '/users', data: dto });
  };

  login = (dto: LoginDto) => {
    return this.apiClient.post({ url: '/sessions/create', data: dto });
  };
}
