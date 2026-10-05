import type { Metadata } from "next";
import { useTranslations } from "next-intl";

import { buildPageMetadata } from "@/i18n/metadata";
import { type Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/dictionary">): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: locale as Locale,
    path: "/dictionary",
    titleKey: "dictionarySeoTitle",
    descriptionKey: "dictionarySeoDescription",
    noIndex: true,
  });
}

export default function Dictionary() {
  const t = useTranslations();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">{t("dictionaryTitle")}</h1>
        <p className="max-w-2xl text-base text-text-secondary">
          {t("dictionaryIntro")}
        </p>
      </header>

      <section aria-labelledby="dictionary-overview-title">
        <h2 id="dictionary-overview-title" className="sr-only">
          {t("wordTableHeader")}
        </h2>
        <p className="text-sm font-medium text-text-secondary">
          {t("wordTableHeader")}
        </p>
      </section>
    </main>
  );
}
