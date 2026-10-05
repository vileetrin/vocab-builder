"use client";

import { useTranslations } from "next-intl";

import { signupUser } from "@/features/auth/api/api";
import AuthTextInput from "@/features/auth/components/AuthTextInput";
import PasswordInput from "@/features/auth/components/PasswordInput";
import {
  initialRegistrationValues,
  type RegistrationFormValues,
  validateRegistrationForm,
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

export default function RegistrationForm() {
  const t = useTranslations();
  const { values, errors, mutation, handleChange, handleSubmit } = useAuthForm({
    initialValues: initialRegistrationValues,
    mutationFn: signupUser,
    redirectTo: "/dictionary",
    validate: (currentValues) =>
      validateRegistrationForm(currentValues, {
        nameMin: t("validationNameMin"),
        emailInvalid: t("validationEmailInvalid"),
        passwordInvalid: t("validationPasswordInvalid"),
      }),
    buildPayload: (currentValues: RegistrationFormValues) => {
      return {
        name: currentValues.name.trim(),
        email: currentValues.email.trim(),
        password: currentValues.password,
      };
    },
  });

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
        {mutation.isError && (
          <p className={styles.error} role="alert">
            {getAuthErrorMessage(mutation.error, t("signupFailed"))}
          </p>
        )}
        {mutation.isSuccess && (
          <p className="text-sm text-success" role="status">
            {t("registrationSuccess")}
          </p>
        )}
        <button
          type="submit"
          className="w-full rounded-[30px] bg-accent p-4 text-base font-bold text-text-on-accent disabled:cursor-not-allowed disabled:opacity-60"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? t("registering") : t("register")}
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
