import { apiClient } from "@/lib/api/client";

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export type SignupResponse = {
  email: string;
  name: string;
  token: string;
};

export async function signupUser(payload: SignupPayload) {
  const { data } = await apiClient.post<SignupResponse>(
    "/users/signup",
    payload,
  );

  return data;
}
