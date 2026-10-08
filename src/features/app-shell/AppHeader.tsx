import { cookies } from "next/headers";

import AppHeaderClient from "@/features/app-shell/AppHeaderClient";
import { AUTH_USER_NAME_COOKIE } from "@/features/auth/cookies";

function decodeCookieValue(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export default async function AppHeader() {
  const cookieStore = await cookies();
  const initialUserName = decodeCookieValue(
    cookieStore.get(AUTH_USER_NAME_COOKIE)?.value ?? "",
  );

  return <AppHeaderClient initialUserName={initialUserName} />;
}
