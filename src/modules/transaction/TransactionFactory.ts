import AbstractFactory from '../../base/AbstractFactory';
import DateHelper from '../../helpers/DateHelper';
import { DateTypes } from '../../types/Date';
import TransactionHelper from './helpers/TransactionHelper';
import { TransactionItem } from './models/TransactionItem';

export default class TransactionFactory extends AbstractFactory {
  createTransactionItem = (item: TransactionItem) => {
    const transactionItem = this.create<TransactionItem>(TransactionItem, item);

    if (transactionItem.date) {
      transactionItem.formattedDate = DateHelper.getZeroTimeFromServerTime(
        DateHelper.getFormattedDate(
          DateHelper.getParsedDate(transactionItem.date!, DateTypes.dayMonthYearCommaHoursMinutesSeconds).toString(),
          DateTypes.yearMonthDayHoursMinutesSeconds,
        ),
      ).toString();
    }

    return transactionItem;
  };

  createTransactionList = (data: TransactionItem[]) => {
    return TransactionHelper.sortDatesByDesc(
      data.map(item => {
        return this.createTransactionItem(item);
      }),
    );
  };
}
