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

export type SigninPayload = {
  email: string;
  password: string;
};

export type SigninResponse = SignupResponse;

export async function signupUser(payload: SignupPayload) {
  const { data } = await apiClient.post<SignupResponse>(
    "/users/signup",
    payload,
  );

  return data;
}

export async function signinUser(payload: SigninPayload) {
  const { data } = await apiClient.post<SigninResponse>(
    "/users/signin",
    payload,
  );

  return data;
}
