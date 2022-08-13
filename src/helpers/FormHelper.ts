export default class FormHelper {
  static updateForm = <T>(form: T, key: any, value: any) => {
    return { ...form, [key]: value };
  };
}
