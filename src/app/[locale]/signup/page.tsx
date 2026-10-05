import type { Metadata } from "next";

import RegistrationPage from "@/features/auth/RegistrationPage";
import { buildPageMetadata } from "@/i18n/metadata";
import { type Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/signup">): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: locale as Locale,
    path: "/signup",
    titleKey: "registrationSeoTitle",
    descriptionKey: "registrationSeoDescription",
    noIndex: true,
  });
}

export default function SignUp() {
  return <RegistrationPage />;
}
