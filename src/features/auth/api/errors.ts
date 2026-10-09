import { isAxiosError } from "axios";

import { type ApiErrorResponse } from "@/types/api";

export function getAuthErrorMessage(error: Error, fallbackMessage: string) {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message ?? fallbackMessage;
  }

  return fallbackMessage;
}
