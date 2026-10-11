import Dropdown, { type DropdownOption } from "@/features/common/dropdown";
import type { WordCategory } from "@/features/common/dashboard/categoryOptions";

export type CategoryOption = DropdownOption;

type CategoryDropdownProps = {
    value?: WordCategory;
    onChange: (value: WordCategory) => void;
    options: CategoryOption[];
    placeholder: string;
    label: string;
};

export default function CategoryDropdown({ value, onChange, options, placeholder, label }: CategoryDropdownProps) {
    return (
        <Dropdown
            className="w-41 max-w-full"
            label={label}
            onChange={(value) => onChange(value as WordCategory)}
            options={options}
            placeholder={placeholder}
            value={value}
        />
    );
}
