import { useTranslations } from "next-intl";
import PlusIcon from "../../../../assets/icons/PlusIcon.svg";

export default function AddNewWordButton() {
    const t = useTranslations();
    return (
        <button
            type="button"
            className="group flex flex-row items-center gap-1 text-base text-text-primary transition-colors hover:text-accent"
        >
            {t("addWord")}
            <PlusIcon width={20} height={20} className="text-accent transition-colors group-hover:text-accent-hover" />
        </button>
    );
}
