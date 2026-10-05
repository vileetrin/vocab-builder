import type { Metadata } from "next";
import { useTranslations } from "next-intl";

import { buildPageMetadata } from "@/i18n/metadata";
import { type Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: locale as Locale,
    path: "/",
    titleKey: "homeSeoTitle",
    descriptionKey: "homeSeoDescription",
  });
}

export default function Home() {
  const t = useTranslations();

  return <div>{t("homeTitle")}</div>;
}
