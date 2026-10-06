import type { Metadata } from "next";
import { useTranslations } from "next-intl";

import { buildPageMetadata } from "@/i18n/metadata";
import { type Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/training">): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: locale as Locale,
    path: "/training",
    titleKey: "trainingSeoTitle",
    descriptionKey: "trainingSeoDescription",
    noIndex: true,
  });
}

export default function Training() {
  const t = useTranslations();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-8 md:px-8">
      <h1 className="text-3xl font-semibold">{t("trainingTitle")}</h1>
      <p className="max-w-2xl text-base text-text-secondary">
        {t("trainingIntro")}
      </p>
    </main>
  );
}
