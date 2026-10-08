import Dropdown, {
    type DropdownOption,
} from "@/features/common/dropdown";

export type CategoryOption = DropdownOption;

type CategoryDropdownProps = {
    value?: string;
    onChange: (value: string) => void;
    options: CategoryOption[];
    placeholder: string;
    label: string;
};

export default function CategoryDropdown({ value, onChange, options, placeholder, label }: CategoryDropdownProps) {
    return (
        <Dropdown
            className="w-41 max-w-full"
            label={label}
            onChange={onChange}
            options={options}
            placeholder={placeholder}
            value={value}
        />
    );
}
