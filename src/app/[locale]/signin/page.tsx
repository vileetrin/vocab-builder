import type { Metadata } from "next";

import LoginPage from "@/features/auth/LoginPage";
import { buildPageMetadata } from "@/i18n/metadata";
import { type Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/signin">): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: locale as Locale,
    path: "/signin",
    titleKey: "loginSeoTitle",
    descriptionKey: "loginSeoDescription",
    noIndex: true,
  });
}

export default function SignIn() {
  return <LoginPage />;
}
