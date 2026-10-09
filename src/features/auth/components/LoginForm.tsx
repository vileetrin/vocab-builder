"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { signinUser } from "@/features/auth/api/api";
import AuthTextInput from "@/features/auth/components/AuthTextInput";
import PasswordInput from "@/features/auth/components/PasswordInput";
import {
  createLoginSchema,
  initialLoginValues,
  type LoginFormValues,
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

export default function LoginForm() {
  const t = useTranslations();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: initialLoginValues,
    resolver: zodResolver(
      createLoginSchema({
        emailInvalid: t("validationEmailInvalid"),
        passwordInvalid: t("validationPasswordInvalid"),
      }),
    ),
  });
  const mutation = useMutation({
    mutationFn: signinUser,
    onSuccess: (data) => {
      saveAuthSession(data.token, data.name);
      reset(initialLoginValues);
      router.replace("/dictionary");
    },
  });

  const getInputClassName = (field: keyof LoginFormValues) =>
    `${styles.input} ${errors[field] ? styles.inputError : styles.inputDefault}`;

  const onSubmit = (values: LoginFormValues) => {
    mutation.mutate({
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
        autoComplete="current-password"
        showPasswordLabel={t("showPassword")}
        hidePasswordLabel={t("hidePassword")}
        {...register("password")}
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
