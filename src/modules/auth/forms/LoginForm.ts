import FormValidationHelper from '../../../helpers/FormValidationHelper';

export const LoginForm = {
  email: '',
  password: '',

  isFormValid: (form: ILoginForm) => {
    return (
      FormValidationHelper.isRequired(form.email) &&
      FormValidationHelper.isEmailValid(form.email) &&
      FormValidationHelper.isRequired(form.password)
    );
  },
};

export interface ILoginForm {
  email: string;
  password: string;

  isFormValid: (form: ILoginForm) => boolean;
}

export enum LoginFormFields {
  email = 'email',
  password = 'password',
}
