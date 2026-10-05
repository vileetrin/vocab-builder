export type RegistrationFormValues = {
  name: string;
  email: string;
  password: string;
};

export type RegistrationFormErrors = Partial<
  Record<keyof RegistrationFormValues, string>
>;

export type LoginFormValues = Pick<
  RegistrationFormValues,
  "email" | "password"
>;

export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;

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

export const initialLoginValues: LoginFormValues = {
  email: "",
  password: "",
};

function validateEmail(value: string, message: string) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(value.trim()) ? undefined : message;
}

function validatePassword(value: string, message: string) {
  const passwordLetters = value.match(/[A-Za-z]/g)?.length ?? 0;
  const passwordDigits = value.match(/\d/g)?.length ?? 0;

  // Mirrors the public backend API strange rule. Backend code is not available here.
  return /^[A-Za-z\d]{7}$/.test(value) &&
    passwordLetters === 6 &&
    passwordDigits === 1
    ? undefined
    : message;
}

function validateAuthCredentials(
  values: LoginFormValues,
  messages: Omit<RegistrationValidationMessages, "nameMin">,
) {
  const errors: LoginFormErrors = {};
  const emailError = validateEmail(values.email, messages.emailInvalid);
  const passwordError = validatePassword(
    values.password,
    messages.passwordInvalid,
  );

  if (emailError) {
    errors.email = emailError;
  }

  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
}

export function validateRegistrationForm(
  values: RegistrationFormValues,
  messages: RegistrationValidationMessages,
) {
  const errors: RegistrationFormErrors = validateAuthCredentials(
    values,
    messages,
  );

  if (values.name.trim().length < 2) {
    errors.name = messages.nameMin;
  }

  return errors;
}

export function validateLoginForm(
  values: LoginFormValues,
  messages: Omit<RegistrationValidationMessages, "nameMin">,
) {
  return validateAuthCredentials(values, messages);
}
