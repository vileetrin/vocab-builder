"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import Report from "@/assets/images/Report.png";
import { useRouter } from "@/i18n/navigation";

export default function EmptyState() {
    const t = useTranslations();
    const router = useRouter();

    const handleDictionaryRedirect = () => {
        router.push("/dictionary");
    };

    const handleAddWordRedirect = () => {
        router.push("/dictionary?addWord=true");
    };

    return (
        <div className="flex min-h-[calc(100dvh-80px)] w-full flex-col items-center px-4 py-18.5 md:justify-center md:px-23 lg:flex-row lg:gap-8">
            <div className="order-2 flex w-full flex-1 flex-col items-start md:max-w-137 md:flex-none lg:order-1">
                <h2 className="mt-8 text-[16px] leading-tight font-normal text-text-primary md:text-[20px] lg:mt-0">
                    {t("trainingEmptyStateTitle")}
                </h2>
                <p className="mt-4 text-[14px] leading-6 text-text-primary md:mt-8 md:text-[16px] md:leading-7">
                    {t("trainingEmptyStateDescription")}
                </p>
                <div className="mt-auto flex w-full flex-col gap-3 md:mt-16 md:flex-row md:justify-start md:gap-2.5">
                    <button
                        type="button"
                        className="inline-flex h-14 w-full items-center justify-center rounded-[30px] bg-accent px-6 text-[16px] font-bold text-text-on-accent transition-colors hover:bg-accent-hover md:max-w-53.5 md:text-[18px]"
                        onClick={handleAddWordRedirect}
                    >
                        {t("trainingEmptyStateAddWord")}
                    </button>
                    <button
                        type="button"
                        className="inline-flex h-14 w-full items-center justify-center rounded-[30px] bg-transparent px-6 text-[16px] font-bold text-text-muted transition-colors hover:bg-accent-muted md:max-w-53.5 md:border md:border-accent md:text-[18px] md:text-accent"
                        onClick={handleDictionaryRedirect}
                    >
                        {t("trainingEmptyStateCancel")}
                    </button>
                </div>
            </div>
            <Image
                src={Report}
                alt=""
                width={204}
                height={230}
                className="order-1 h-41.5 w-36 object-contain md:h-57.5 md:w-51 lg:order-2"
                priority
            />
        </div>
    );
}
