import type { Metadata } from "next";

import { buildPageMetadata } from "@/i18n/metadata";
import { type Locale } from "@/i18n/routing";
import RecommendedClient from "@/features/recommend/components/RecommendedClient";

export async function generateMetadata({ params }: PageProps<"/[locale]/recommended">): Promise<Metadata> {
    const { locale } = await params;

    return buildPageMetadata({
        locale: locale as Locale,
        path: "/recommended",
        titleKey: "recommendedSeoTitle",
        descriptionKey: "recommendedSeoDescription",
        noIndex: true
    });
}

export default function Recommended() {
    return (
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 pt-8 pb-8 md:px-8 md:pt-20">
            <RecommendedClient />
        </main>
    );
}
