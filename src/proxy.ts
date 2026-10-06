import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";

import { AUTH_TOKEN_COOKIE } from "@/features/auth/session";
import { routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);
const protectedRoutes = new Set(["dictionary", "recommended", "training"]);

function getLocaleAndRoute(pathname: string) {
  const [, firstSegment = "", secondSegment = ""] = pathname.split("/");
  const hasLocale = routing.locales.includes(
    firstSegment as (typeof routing.locales)[number],
  );

  return {
    locale: hasLocale ? firstSegment : routing.defaultLocale,
    route: hasLocale ? secondSegment : firstSegment,
  };
}

export default function proxy(request: NextRequest) {
  const { locale, route } = getLocaleAndRoute(request.nextUrl.pathname);
  const hasAuthToken = Boolean(request.cookies.get(AUTH_TOKEN_COOKIE)?.value);

  if (protectedRoutes.has(route) && !hasAuthToken) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${locale}/signin`;
    redirectUrl.searchParams.set("next", request.nextUrl.pathname);

    return NextResponse.redirect(redirectUrl);
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
