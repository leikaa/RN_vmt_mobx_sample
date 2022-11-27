import AbstractApiRepository from '../../../base/api/AbstractApiRepository';
import CreateTransactionDto from '../dto/CreateTransactionDto';

export default class TransactionApiRepository extends AbstractApiRepository {
  getTransactionList = () => {
    return this.apiClient.get({
      url: '/api/protected/transactions',
    });
  };

  createTransaction = (data: CreateTransactionDto) => {
    return this.apiClient.post({
      url: '/api/protected/transactions',
      data,
    });
  };
}
