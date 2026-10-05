import type { Metadata } from "next";
import { useTranslations } from "next-intl";

import Logo from "@/assets/icons/app-icon.svg";
import LocaleSwitcher from "@/features/i18n/LocaleSwitcher";
import { buildPageMetadata } from "@/i18n/metadata";
import { Link } from "@/i18n/navigation";
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
  const previewRows = [
    {
      word: t("homePreviewWordFirst"),
      translation: t("homePreviewTranslationFirst"),
      grammar: t("homePreviewGrammarFirst"),
      progress: "82%",
    },
    {
      word: t("homePreviewWordSecond"),
      translation: t("homePreviewTranslationSecond"),
      grammar: t("homePreviewGrammarSecond"),
      progress: "64%",
    },
    {
      word: t("homePreviewWordThird"),
      translation: t("homePreviewTranslationThird"),
      grammar: t("homePreviewGrammarThird"),
      progress: "41%",
    },
  ];

  return (
    <main className="min-h-screen bg-surface text-text-primary">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8 md:py-6">
        <Link
          href="/"
          aria-label={t("authHome")}
          className="flex items-center gap-3"
        >
          <Logo className="h-10 w-10" />
          <span className="text-lg font-semibold">VocabBuilder</span>
        </Link>
        <nav
          aria-label={t("homeNavigationLabel")}
          className="flex items-center gap-3"
        >
          <Link
            href="/signin"
            className="hidden text-sm font-semibold text-text-secondary hover:text-text-primary sm:inline-flex"
          >
            {t("login")}
          </Link>
          <LocaleSwitcher />
        </nav>
      </header>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 pt-10 pb-16 md:px-8 md:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(420px,520px)] lg:items-center">
        <div className="flex flex-col items-start gap-6">
          <p className="rounded-full bg-accent-muted px-4 py-2 text-sm font-semibold text-text-secondary">
            {t("homeEyebrow")}
          </p>
          <div className="flex flex-col gap-5">
            <h1 className="max-w-3xl text-5xl leading-tight font-semibold md:text-6xl lg:text-7xl">
              {t("homeHeroTitle")}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-text-secondary md:text-xl">
              {t("homeHeroDescription")}
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex justify-center rounded-[30px] bg-accent px-6 py-4 text-base font-bold text-text-on-accent hover:bg-accent-hover"
            >
              {t("homePrimaryCta")}
            </Link>
            <Link
              href="/signin"
              className="inline-flex justify-center rounded-[30px] border border-accent px-6 py-4 text-base font-bold text-text-primary hover:bg-accent-muted"
            >
              {t("homeSecondaryCta")}
            </Link>
          </div>
        </div>

        <section
          aria-labelledby="home-preview-title"
          className="rounded-[26px] bg-text-on-accent p-4 shadow-[0_18px_60px_rgb(18_20_23/10%)] md:p-6"
        >
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 id="home-preview-title" className="text-xl font-semibold">
                {t("homePreviewTitle")}
              </h2>
              <p className="mt-1 text-sm text-text-secondary">
                {t("homePreviewDescription")}
              </p>
            </div>
            <span className="rounded-full bg-accent-muted px-3 py-1 text-sm font-semibold text-text-secondary">
              {t("homePreviewBadge")}
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-accent-muted">
            <div className="grid grid-cols-[1fr_1fr_1fr_72px] bg-accent-muted px-3 py-3 text-xs font-bold text-text-secondary md:px-4">
              <span>{t("homePreviewColumnWord")}</span>
              <span>{t("homePreviewColumnTranslation")}</span>
              <span>{t("homePreviewColumnGrammar")}</span>
              <span>{t("homePreviewColumnProgress")}</span>
            </div>
            <div className="divide-y divide-accent-muted">
              {previewRows.map((row) => (
                <div
                  key={row.word}
                  className="grid grid-cols-[1fr_1fr_1fr_72px] items-center px-3 py-4 text-sm md:px-4"
                >
                  <span className="font-semibold">{row.word}</span>
                  <span className="text-text-secondary">{row.translation}</span>
                  <span className="text-text-secondary">{row.grammar}</span>
                  <span className="font-semibold text-accent">
                    {row.progress}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>

      <section
        aria-labelledby="home-features-title"
        className="mx-auto grid w-full max-w-7xl gap-4 px-4 pb-16 md:grid-cols-3 md:px-8"
      >
        <h2 id="home-features-title" className="sr-only">
          {t("homeFeaturesTitle")}
        </h2>
        {[0, 1, 2].map((index) => (
          <article key={index} className="rounded-2xl bg-accent-muted p-5">
            <h3 className="text-lg font-semibold">
              {t(`homeFeatureTitle${index + 1}`)}
            </h3>
            <p className="mt-3 text-base leading-7 text-text-secondary">
              {t(`homeFeatureDescription${index + 1}`)}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
