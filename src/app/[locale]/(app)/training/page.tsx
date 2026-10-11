import type { Metadata } from "next";

import { buildPageMetadata } from "@/i18n/metadata";
import { type Locale } from "@/i18n/routing";
import TrainingClient from "@/features/training/components/TrainingClient";

export async function generateMetadata({ params }: PageProps<"/[locale]/training">): Promise<Metadata> {
    const { locale } = await params;

    return buildPageMetadata({
        locale: locale as Locale,
        path: "/training",
        titleKey: "trainingSeoTitle",
        descriptionKey: "trainingSeoDescription",
        noIndex: true
    });
}

export default function Training() {
    return (
        <main className="mx-auto flex min-h-[calc(100dvh-80px)] w-full max-w-7xl flex-col">
            <TrainingClient />
        </main>
    );
}
