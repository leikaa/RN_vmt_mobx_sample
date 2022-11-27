import DateHelper from '../../../helpers/DateHelper';
import { TransactionItem } from '../models/TransactionItem';

export default class TransactionHelper {
  static sortDatesByDesc = (dates: TransactionItem[]) => {
    return dates.sort((firstDate: TransactionItem, secondDate: TransactionItem) => {
      if (!firstDate.formattedDate || !secondDate.formattedDate) {
        return 1;
      }

      return DateHelper.compareDatesByDesc(firstDate.formattedDate, secondDate.formattedDate);
    });
  };
}
