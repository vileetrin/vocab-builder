import type { Metadata } from "next";

import DictionaryClient from "@/features/dictionary/components/DictionaryClient";
import { buildPageMetadata } from "@/i18n/metadata";
import { type Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: PageProps<"/[locale]/dictionary">): Promise<Metadata> {
    const { locale } = await params;

    return buildPageMetadata({
        locale: locale as Locale,
        path: "/dictionary",
        titleKey: "dictionarySeoTitle",
        descriptionKey: "dictionarySeoDescription",
        noIndex: true
    });
}

export default function Dictionary() {
    return (
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pt-8 pb-8 md:px-8 md:pt-20">
            <DictionaryClient />
        </main>
    );
}
