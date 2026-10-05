import type { Metadata } from "next";

import enMessages from "../../messages/en.json";
import ukMessages from "../../messages/uk.json";
import { type Locale, routing } from "@/i18n/routing";

const messagesByLocale = {
  en: enMessages,
  uk: ukMessages,
} satisfies Record<Locale, Record<string, string>>;

type BuildPageMetadataOptions = {
  locale: Locale;
  path: string;
  titleKey: keyof (typeof messagesByLocale)[Locale];
  descriptionKey: keyof (typeof messagesByLocale)[Locale];
  noIndex?: boolean;
};

function getMessages(locale: string) {
  return routing.locales.includes(locale as Locale)
    ? messagesByLocale[locale as Locale]
    : messagesByLocale[routing.defaultLocale];
}

function getLocalizedPath(locale: Locale, path: string) {
  return `/${locale}${path === "/" ? "" : path}`;
}

export function buildPageMetadata({
  locale,
  path,
  titleKey,
  descriptionKey,
  noIndex = false,
}: BuildPageMetadataOptions): Metadata {
  const messages = getMessages(locale);
  const title = messages[titleKey];
  const description = messages[descriptionKey];

  return {
    title,
    description,
    alternates: {
      canonical: getLocalizedPath(locale, path),
      languages: Object.fromEntries(
        routing.locales.map((availableLocale) => [
          availableLocale,
          getLocalizedPath(availableLocale, path),
        ]),
      ),
    },
    openGraph: {
      title,
      description,
      siteName: "VocabBuilder",
      locale,
      type: "website",
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}
