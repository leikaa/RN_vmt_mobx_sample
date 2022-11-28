import { format, parse, addHours, compareDesc, compareAsc } from 'date-fns';
import { enUS } from 'date-fns/locale';

import { DateTypes } from '../types/Date';

export default class DateHelper {
  static getFormattedDate = (date: string, formatDate: DateTypes) => {
    const d = this.getDate(date);
    return format(d, formatDate, { locale: enUS });
  };

  static getParsedDate = (date: string, formatDate: DateTypes) => {
    return parse(date, formatDate, new Date());
  };

  //server sends date with +3 time-zone
  static getZeroTimeFromServerTime = (date: string) => {
    const d = this.getDate(this.prepareZeroDateFormat(date));
    return this.addHours(d, -3);
  };

  static addHours = (date: Date, amount: number) => {
    return addHours(date, amount);
  };

  static compareDatesByDesc = (firstDate: string, secondDate: string) => {
    return compareDesc(new Date(firstDate), new Date(secondDate));
  };

  static compareDatesByAsc = (firstDate: string, secondDate: string) => {
    return compareAsc(new Date(firstDate), new Date(secondDate));
  };

  private static getDate = (date?: string) => {
    return date ? new Date(date) : new Date();
  };

  /**
   * The incoming date format is 'dd.MM.yyyy, HH:mm:ss'.
   * Method is used to add the zero time-zone marker to the incoming date,
   * in order to use exactly the transmitted values, after the date-fns format.
   */
  private static prepareZeroDateFormat = (date: string) => {
    return `${date.replace(/ /g, 'T')}Z`;
  };
}
