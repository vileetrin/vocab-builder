"use client";

import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useTranslations } from "next-intl";
import { type ChangeEvent, type SubmitEvent, useState } from "react";

import { signinUser } from "@/features/auth/api/api";
import AuthTextInput from "@/features/auth/components/AuthTextInput";
import PasswordInput from "@/features/auth/components/PasswordInput";
import {
  initialLoginValues,
  type LoginFormErrors,
  type LoginFormValues,
  validateLoginForm,
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

function getSigninErrorMessage(error: Error, fallbackMessage: string) {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message ?? fallbackMessage;
  }

  return fallbackMessage;
}

export default function LoginForm() {
  const router = useRouter();
  const t = useTranslations();
  const [values, setValues] = useState<LoginFormValues>(initialLoginValues);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const signingMutation = useMutation({
    mutationFn: signinUser,
    onSuccess: () => {
      setValues(initialLoginValues);
      setErrors({});
      router.replace("/dictionary");
    },
  });

  const handleChange =
    (field: keyof LoginFormValues) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      signingMutation.reset();
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

    const nextErrors = validateLoginForm(values, {
      emailInvalid: t("validationEmailInvalid"),
      passwordInvalid: t("validationPasswordInvalid"),
    });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    signingMutation.mutate({
      email: values.email.trim(),
      password: values.password,
    });
  };

  const getInputClassName = (field: keyof LoginFormValues) =>
    `${styles.input} ${errors[field] ? styles.inputError : styles.inputDefault}`;

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
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
        {signingMutation.isError && (
          <p className={styles.error} role="alert">
            {getSigninErrorMessage(signingMutation.error, t("signinFailed"))}
          </p>
        )}
        {signingMutation.isSuccess && (
          <p className="text-sm text-success" role="status">
            {t("signinSuccess")}
          </p>
        )}
        <button
          type="submit"
          className="w-full rounded-[30px] bg-accent p-4 text-base font-bold text-text-on-accent disabled:cursor-not-allowed disabled:opacity-60"
          disabled={signingMutation.isPending}
        >
          {signingMutation.isPending ? t("signingIn") : t("login")}
        </button>
        <Link
          href="/signup"
          className="text-base font-bold text-text-muted underline"
        >
          {t("register")}
        </Link>
      </div>
    </form>
  );
}
