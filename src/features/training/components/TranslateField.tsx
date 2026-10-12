import { type ChangeEvent } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";

import LongArrowIcon from "@/assets/icons/LongArrowIcon.svg";
import UnitedKingdom from "@/assets/icons/UnitedKingdom.svg";
import Ukraine from "@/assets/icons/Ukraine.svg";

type Props = {
    locale: "en" | "ua";
    value?: string;
    placeholder?: string;
    readOnly?: boolean;
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    showNextButton?: boolean;
    onNext?: () => void;
    autoFocus?: boolean;
};

export default function TranslateField({
    locale,
    value,
    placeholder,
    readOnly,
    onChange,
    showNextButton,
    onNext,
    autoFocus
}: Props) {
    const t = useTranslations();
    const language = locale === "en" ? t("en") : t("uk");
    const defaultPlaceholder = t("trainingTranslationPlaceholder");
    const languageBadge = (
        <span className="flex shrink-0 items-center gap-2 text-[14px] font-medium text-text-primary md:text-[16px]">
            {locale === "en" ? (
                <UnitedKingdom aria-hidden="true" className="h-8 w-8 rounded-full" />
            ) : (
                <Ukraine aria-hidden="true" className="h-8 w-8 rounded-full" />
            )}
            {language}
        </span>
    );

    return (
        <div
            className={clsx(
                "flex min-h-0 flex-1 flex-col bg-white p-5.5",
                locale === "en"
                    ? "rounded-t-[15px] rounded-b-none lg:rounded-l-[15px] lg:rounded-r-none"
                    : "rounded-t-none rounded-b-[15px] lg:rounded-l-none lg:rounded-r-[15px]"
            )}
        >
            <div className="flex min-h-0 flex-1 items-start gap-4">
                <textarea
                    value={value}
                    aria-label={language}
                    placeholder={placeholder ?? defaultPlaceholder}
                    readOnly={readOnly}
                    autoFocus={autoFocus}
                    className="min-h-0 max-h-48.5 flex-1 resize-none bg-transparent text-[16px] leading-6 text-text-primary outline-none md:max-h-70.5 md:text-[20px] md:leading-8 lg:max-h-75.5"
                    onChange={onChange}
                />
                <div className="hidden md:flex">{languageBadge}</div>
            </div>
            <div className={clsx("mt-3 flex items-center md:mt-4", showNextButton ? "justify-between" : "justify-end")}>
                {showNextButton && (
                    <button
                        type="button"
                        aria-label={t("dashboardNextPage")}
                        className="flex items-center text-[16px] font-medium text-text-primary/50 transition-colors hover:text-accent"
                        onClick={onNext}
                    >
                        {t("dashboardNextPage")}
                        <LongArrowIcon aria-hidden="true" className="ml-2 h-5 w-5 text-accent" />
                    </button>
                )}
                <div className="md:hidden">{languageBadge}</div>
            </div>
        </div>
    );
}
