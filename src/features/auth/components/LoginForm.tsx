"use client";

import { useTranslations } from "next-intl";

import { signinUser } from "@/features/auth/api/api";
import AuthTextInput from "@/features/auth/components/AuthTextInput";
import PasswordInput from "@/features/auth/components/PasswordInput";
import {
  initialLoginValues,
  type LoginFormValues,
  validateLoginForm,
} from "@/features/auth/api/validation";
import {
  getAuthErrorMessage,
  useAuthForm,
} from "@/features/auth/hooks/useAuthForm";
import { Link } from "@/i18n/navigation";

const styles = {
  input:
    "w-full rounded-[16px] border bg-transparent px-4.5 py-4 text-base outline-none placeholder:text-text-muted focus:border-accent",
  inputDefault: "border-accent-muted",
  inputError: "border-error",
  error: "mt-1.5 text-sm text-error",
};

export default function LoginForm() {
  const t = useTranslations();
  const { values, errors, mutation, handleChange, handleSubmit } = useAuthForm({
    initialValues: initialLoginValues,
    mutationFn: signinUser,
    redirectTo: "/dictionary",
    validate: (currentValues) =>
      validateLoginForm(currentValues, {
        emailInvalid: t("validationEmailInvalid"),
        passwordInvalid: t("validationPasswordInvalid"),
      }),
    buildPayload: (currentValues: LoginFormValues) => {
      return {
        email: currentValues.email.trim(),
        password: currentValues.password,
      };
    },
  });

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
        {mutation.isError && (
          <p className={styles.error} role="alert">
            {getAuthErrorMessage(mutation.error, t("signinFailed"))}
          </p>
        )}
        {mutation.isSuccess && (
          <p className="text-sm text-success" role="status">
            {t("signinSuccess")}
          </p>
        )}
        <button
          type="submit"
          className="w-full rounded-[30px] bg-accent p-4 text-base font-bold text-text-on-accent transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:hover:bg-accent disabled:opacity-60"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? t("signingIn") : t("login")}
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
