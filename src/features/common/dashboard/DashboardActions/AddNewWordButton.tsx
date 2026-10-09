import { type ComponentProps } from "react";

import PlusIcon from "@/assets/icons/PlusIcon.svg";
import { useTranslations } from "next-intl";

type AddNewWordButtonProps = ComponentProps<"button">;

export default function AddNewWordButton({ ...buttonProps }: AddNewWordButtonProps) {
    const t = useTranslations();

    return (
        <button
            type="button"
            className="group flex flex-row items-center gap-1 text-base text-text-primary transition-colors hover:text-accent"
            {...buttonProps}
        >
            {t("addWord")}
            <PlusIcon width={20} height={20} className="text-accent transition-colors group-hover:text-accent-hover" />
        </button>
    );
}
