import { Nullable } from '../../base/types/BaseTypes';
import UserFactory from './UserFactory';
import { User } from './models/User';
import UserApiRepository from './repositories/UserApiRepository';

export default class UserService {
  userApi: UserApiRepository;
  userFactory: UserFactory;

  constructor() {
    this.userApi = new UserApiRepository();
    this.userFactory = new UserFactory();
  }

  // API

  getUserInfo = async () => {
    const { data } = await this.userApi.getUserInfo();
    return this.userFactory.create<User>(User, data.user_info_token as any);
  };

  // OTHERS

  updateUserBalance = (user: Nullable<User>, balance: number) => {
    if (!user) {
      return user;
    }

    const newUser = Object.assign({}, user);

    newUser.balance = balance;

    return newUser;
  };
}
