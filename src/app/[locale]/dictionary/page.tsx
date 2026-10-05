import type { Metadata } from "next";

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
  return <div>DICTIONARY</div>;
}
