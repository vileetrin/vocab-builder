"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { signupUser } from "@/features/auth/api/api";
import AuthTextInput from "@/features/auth/components/AuthTextInput";
import PasswordInput from "@/features/auth/components/PasswordInput";
import {
  createRegistrationSchema,
  initialRegistrationValues,
  type RegistrationFormValues,
} from "@/features/auth/api/validation";
import { getAuthErrorMessage } from "@/features/auth/api/errors";
import { saveAuthSession } from "@/features/auth/session";
import { Link, useRouter } from "@/i18n/navigation";

const styles = {
  input:
    "w-full rounded-[16px] border bg-transparent px-4.5 py-4 text-base outline-none placeholder:text-text-muted focus:border-accent",
  inputDefault: "border-accent-muted",
  inputError: "border-error",
  error: "mt-1.5 text-sm text-error",
};

export default function RegistrationForm() {
  const t = useTranslations();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    defaultValues: initialRegistrationValues,
    resolver: zodResolver(
      createRegistrationSchema({
        nameMin: t("validationNameMin"),
        emailInvalid: t("validationEmailInvalid"),
        passwordInvalid: t("validationPasswordInvalid"),
      }),
    ),
  });
  const mutation = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      saveAuthSession(data.token, data.name);
      reset(initialRegistrationValues);
      router.replace("/dictionary");
    },
  });

  const getInputClassName = (field: keyof RegistrationFormValues) =>
    `${styles.input} ${errors[field] ? styles.inputError : styles.inputDefault}`;

  const onSubmit = (values: RegistrationFormValues) => {
    mutation.mutate({
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
    });
  };

  return (
    <form
      className="flex w-full flex-col gap-4"
      onChange={() => mutation.reset()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <AuthTextInput
        id="name"
        type="text"
        label={t("name")}
        autoComplete="name"
        className={getInputClassName("name")}
        errorClassName={styles.error}
        error={errors.name?.message}
        {...register("name")}
      />

      <AuthTextInput
        id="email"
        type="email"
        label={t("email")}
        autoComplete="email"
        className={getInputClassName("email")}
        errorClassName={styles.error}
        error={errors.email?.message}
        {...register("email")}
      />

      <PasswordInput
        className={getInputClassName("password")}
        label={t("password")}
        error={errors.password?.message}
        showPasswordLabel={t("showPassword")}
        hidePasswordLabel={t("hidePassword")}
        {...register("password")}
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
          className="w-full rounded-[30px] bg-accent p-4 text-base font-bold text-text-on-accent transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:hover:bg-accent disabled:opacity-60"
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
