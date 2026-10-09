import { z } from "zod";

export type RegistrationValidationMessages = {
  nameMin: string;
  emailInvalid: string;
  passwordInvalid: string;
};

export const initialRegistrationValues = {
  name: "",
  email: "",
  password: "",
};

export const initialLoginValues = {
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

export function createLoginSchema(
  messages: Omit<RegistrationValidationMessages, "nameMin">,
) {
  return z.object({
    email: z
      .string()
      .refine((value) => !validateEmail(value, messages.emailInvalid), {
        message: messages.emailInvalid,
      }),
    password: z
      .string()
      .refine((value) => !validatePassword(value, messages.passwordInvalid), {
        message: messages.passwordInvalid,
      }),
  });
}

export function createRegistrationSchema(
  messages: RegistrationValidationMessages,
) {
  return createLoginSchema(messages).extend({
    name: z.string().refine((value) => value.trim().length >= 2, {
      message: messages.nameMin,
    }),
  });
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;

export type RegistrationFormValues = z.infer<
  ReturnType<typeof createRegistrationSchema>
>;
