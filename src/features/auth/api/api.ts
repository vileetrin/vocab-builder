import { apiClient } from "@/lib/api/client";
import { readAuthToken } from "@/features/auth/session";

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

export async function signoutUser() {
  const token = readAuthToken();

  await apiClient.post(
    "/users/signout",
    undefined,
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined,
  );
}
