export default class FormValidationHelper {
  static isEmailValid = (email: string) => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(email);
  };

  static isRequired = (field: string) => {
    return field.trim().length !== 0;
  };

  static isSameString = (first: string, second: string) => {
    return first === second;
  };
}
