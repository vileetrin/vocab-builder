"use client";

import { type ChangeEvent, type SubmitEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useTranslations } from "next-intl";

import { signupUser } from "@/features/auth/api/api";
import AuthTextInput from "@/features/auth/components/AuthTextInput";
import PasswordInput from "@/features/auth/components/PasswordInput";
import {
  initialRegistrationValues,
  type RegistrationFormErrors,
  type RegistrationFormValues,
  validateRegistrationForm,
} from "@/features/auth/api/validation";
import { Link, useRouter } from "@/i18n/navigation";
import { type ApiErrorResponse } from "@/types/api";

const styles = {
  input:
    "w-full rounded-[16px] border bg-transparent px-4.5 py-4 text-base outline-none placeholder:text-text-muted focus:border-accent",
  inputDefault: "border-accent-muted",
  inputError: "border-error",
  error: "mt-1.5 text-sm text-error",
};

function getSignupErrorMessage(error: Error, fallbackMessage: string) {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message ?? fallbackMessage;
  }

  return fallbackMessage;
}

export default function RegistrationForm() {
  const router = useRouter();
  const t = useTranslations();
  const [values, setValues] = useState<RegistrationFormValues>(
    initialRegistrationValues,
  );
  const [errors, setErrors] = useState<RegistrationFormErrors>({});
  const signupMutation = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      setValues(initialRegistrationValues);
      setErrors({});
      router.replace("/dictionary");
    },
  });

  const handleChange =
    (field: keyof RegistrationFormValues) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      signupMutation.reset();
      setValues((currentValues) => ({
        ...currentValues,
        [field]: event.target.value,
      }));
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: undefined,
      }));
    };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateRegistrationForm(values, {
      nameMin: t("validationNameMin"),
      emailInvalid: t("validationEmailInvalid"),
      passwordInvalid: t("validationPasswordInvalid"),
    });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    signupMutation.mutate({
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
    });
  };

  const getInputClassName = (field: keyof RegistrationFormValues) =>
    `${styles.input} ${errors[field] ? styles.inputError : styles.inputDefault}`;

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
      <AuthTextInput
        id="name"
        name="name"
        type="text"
        label={t("name")}
        autoComplete="name"
        value={values.name}
        className={getInputClassName("name")}
        errorClassName={styles.error}
        error={errors.name}
        onChange={handleChange("name")}
      />

      <AuthTextInput
        id="email"
        name="email"
        type="email"
        label={t("email")}
        autoComplete="email"
        value={values.email}
        className={getInputClassName("email")}
        errorClassName={styles.error}
        error={errors.email}
        onChange={handleChange("email")}
      />

      <PasswordInput
        value={values.password}
        className={getInputClassName("password")}
        label={t("password")}
        error={errors.password}
        showPasswordLabel={t("showPassword")}
        hidePasswordLabel={t("hidePassword")}
        onChange={handleChange("password")}
      />

      <div className="flex flex-col items-center justify-center gap-4">
        {signupMutation.isError && (
          <p className={styles.error} role="alert">
            {getSignupErrorMessage(signupMutation.error, t("signupFailed"))}
          </p>
        )}
        {signupMutation.isSuccess && (
          <p className="text-sm text-success" role="status">
            {t("registrationSuccess")}
          </p>
        )}
        <button
          type="submit"
          className="w-full rounded-[30px] bg-accent p-4 text-base font-bold text-text-on-accent disabled:cursor-not-allowed disabled:opacity-60"
          disabled={signupMutation.isPending}
        >
          {signupMutation.isPending ? t("registering") : t("register")}
        </button>
        <Link
          href="/signin"
          className="text-base font-bold text-text-muted underline"
        >
          {t("login")}
        </Link>
      </div>
    </form>
  );
}
