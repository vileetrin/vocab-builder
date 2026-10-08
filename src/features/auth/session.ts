import {
  AUTH_TOKEN_COOKIE,
  AUTH_USER_NAME_COOKIE,
} from "@/features/auth/cookies";

export { AUTH_TOKEN_COOKIE, AUTH_USER_NAME_COOKIE };

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function getCookieOptions() {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";

  return `Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}

export function saveAuthSession(token: string, name: string) {
  document.cookie = `${AUTH_TOKEN_COOKIE}=${encodeURIComponent(token)}; ${getCookieOptions()}`;
  document.cookie = `${AUTH_USER_NAME_COOKIE}=${encodeURIComponent(name)}; ${getCookieOptions()}`;
}

export function clearAuthSession() {
  document.cookie = `${AUTH_TOKEN_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
  document.cookie = `${AUTH_USER_NAME_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}

function readCookie(name: string) {
  if (typeof document === "undefined") {
    return "";
  }

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=")[1] ?? "") : "";
}

export function readAuthToken() {
  return readCookie(AUTH_TOKEN_COOKIE);
}

export function readAuthUserName() {
  return readCookie(AUTH_USER_NAME_COOKIE);
}
