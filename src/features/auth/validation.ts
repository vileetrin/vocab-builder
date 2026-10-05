export type RegistrationFormValues = {
  name: string;
  email: string;
  password: string;
};

export type RegistrationFormErrors = Partial<
  Record<keyof RegistrationFormValues, string>
>;

export type RegistrationValidationMessages = {
  nameMin: string;
  emailInvalid: string;
  passwordInvalid: string;
};

export const initialRegistrationValues: RegistrationFormValues = {
  name: "",
  email: "",
  password: "",
};

export function validateRegistrationForm(
  values: RegistrationFormValues,
  messages: RegistrationValidationMessages,
) {
  const errors: RegistrationFormErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (values.name.trim().length < 2) {
    errors.name = messages.nameMin;
  }

  if (!emailPattern.test(values.email.trim())) {
    errors.email = messages.emailInvalid;
  }

  if (!/^(?=.*\d)[A-Za-z\d]{7,}$/.test(values.password)) {
    errors.password = messages.passwordInvalid;
  }

  return errors;
}
