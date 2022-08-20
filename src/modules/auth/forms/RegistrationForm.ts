import FormValidationHelper from '../../../helpers/FormValidationHelper';

export const RegistrationForm = {
  username: '',
  email: '',
  password: '',
  repeatedPassword: '',

  isFormValid: (form: IRegistrationForm) => {
    return (
      FormValidationHelper.isRequired(form.username) &&
      FormValidationHelper.isRequired(form.email) &&
      FormValidationHelper.isEmailValid(form.email) &&
      FormValidationHelper.isRequired(form.password) &&
      FormValidationHelper.isRequired(form.repeatedPassword) &&
      FormValidationHelper.isSameString(form.password, form.repeatedPassword)
    );
  },
};

export interface IRegistrationForm {
  username: string;
  email: string;
  password: string;
  repeatedPassword: string;

  isFormValid: (form: IRegistrationForm) => boolean;
}

export enum RegistrationFormFields {
  username = 'username',
  email = 'email',
  password = 'password',
  repeatedPassword = 'repeatedPassword',
}
