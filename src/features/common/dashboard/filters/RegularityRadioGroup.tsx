import { useTranslations } from "next-intl";

type RegularityRadioGroupProps = {
    isIrregular?: boolean;
    label: string;
    onChange: (isIrregular: boolean) => void;
};

function RadioIndicator({ isSelected }: { isSelected: boolean }) {
    return (
        <span
            aria-hidden="true"
            className={`grid h-4 w-4 place-items-center rounded-full border transition-colors ${
                isSelected ? "border-accent" : "border-text-primary/30"
            }`}
        >
            <span className={`h-2 w-2 rounded-full transition-colors ${isSelected ? "bg-accent" : "bg-transparent"}`} />
        </span>
    );
}

export default function RegularityRadioGroup({ isIrregular, label, onChange }: RegularityRadioGroupProps) {
    const t = useTranslations();

    return (
        <fieldset aria-label={label} className="flex h-12 items-center gap-4 px-2">
            <legend className="sr-only">{label}</legend>
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-text-primary">
                <input
                    type="radio"
                    name="regularity"
                    className="sr-only"
                    checked={isIrregular === false}
                    onChange={() => onChange(false)}
                />
                <RadioIndicator isSelected={isIrregular === false} />
                {t("categoryRegular")}
            </label>
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-text-primary">
                <input
                    type="radio"
                    name="regularity"
                    className="sr-only"
                    checked={isIrregular === true}
                    onChange={() => onChange(true)}
                />
                <RadioIndicator isSelected={isIrregular === true} />
                {t("categoryIrregular")}
            </label>
        </fieldset>
    );
}
