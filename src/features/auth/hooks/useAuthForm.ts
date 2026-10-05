"use client";

import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { type ChangeEvent, type SubmitEvent, useState } from "react";

import { useRouter } from "@/i18n/navigation";
import { type ApiErrorResponse } from "@/types/api";

type AuthFormErrors<TValues> = Partial<Record<keyof TValues, string>>;

type UseAuthFormOptions<TValues, TPayload> = {
  initialValues: TValues;
  validate: (values: TValues) => AuthFormErrors<TValues>;
  buildPayload: (values: TValues) => TPayload;
  mutationFn: (payload: TPayload) => Promise<unknown>;
  redirectTo: string;
};

export function getAuthErrorMessage(error: Error, fallbackMessage: string) {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message ?? fallbackMessage;
  }

  return fallbackMessage;
}

export function useAuthForm<TValues extends object, TPayload>({
  initialValues,
  validate,
  buildPayload,
  mutationFn,
  redirectTo,
}: UseAuthFormOptions<TValues, TPayload>) {
  const router = useRouter();
  const [values, setValues] = useState<TValues>(initialValues);
  const [errors, setErrors] = useState<AuthFormErrors<TValues>>({});
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      setValues(initialValues);
      setErrors({});
      router.replace(redirectTo);
    },
  });

  const handleChange =
    (field: keyof TValues) => (event: ChangeEvent<HTMLInputElement>) => {
      mutation.reset();
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

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    mutation.mutate(buildPayload(values));
  };

  return {
    values,
    errors,
    mutation,
    handleChange,
    handleSubmit,
  };
}
