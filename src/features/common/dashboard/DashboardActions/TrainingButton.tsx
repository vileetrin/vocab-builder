import { useTranslations } from "next-intl";

import LongArrowIcon from "@/assets/icons/LongArrowIcon.svg";
import { Link } from "@/i18n/navigation";

export default function TrainingButton() {
    const t = useTranslations();

    return (
        <Link
            href="/training"
            className="group flex items-center gap-2 text-base text-text-primary transition-colors hover:text-accent"
        >
            {t("trainOneself")}
            <LongArrowIcon
                width={20}
                height={20}
                aria-hidden="true"
                className="text-accent transition-colors group-hover:text-accent-hover"
            />
        </Link>
    );
}
