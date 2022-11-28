import DateHelper from '../../../helpers/DateHelper';
import { TransactionItem } from '../models/TransactionItem';

export default class TransactionHelper {
  static getFilteredData = (recipientName: string, transactionList: TransactionItem[], isSortByDesc: boolean) => {
    const initialData = this.sortDates(transactionList.slice(), isSortByDesc);

    return initialData.filter(transactionItem => {
      const itemData = `${transactionItem.username?.toLowerCase()}`;
      return itemData.indexOf(recipientName.toLowerCase()) === 0;
    });
  };

  private static sortDates = (dates: TransactionItem[], isSortByDesc: boolean) => {
    return dates.sort((firstDate: TransactionItem, secondDate: TransactionItem) => {
      if (!firstDate.formattedZeroDate || !secondDate.formattedZeroDate) {
        return 1;
      }

      if (isSortByDesc) {
        return DateHelper.compareDatesByDesc(firstDate.formattedZeroDate, secondDate.formattedZeroDate);
      }

      return DateHelper.compareDatesByAsc(firstDate.formattedZeroDate, secondDate.formattedZeroDate);
    });
  };
}
