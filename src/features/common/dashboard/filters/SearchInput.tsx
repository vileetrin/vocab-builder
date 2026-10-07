import { useId } from "react";

import SearchIcon from "@/assets/icons/SearchIcon.svg";

type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    label: string;
};

export default function SearchInput({ value, onChange, placeholder, label }: SearchInputProps) {
    const inputId = useId();

    return (
        <div className="relative block w-69 max-w-full">
            <label htmlFor={inputId} className="sr-only">
                {label}
            </label>
            <input
                id={inputId}
                type="search"
                value={value}
                name="search"
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="h-12 w-full rounded-[15px] border border-text-primary/10 bg-transparent px-6 pr-12 text-base text-text-primary outline-none transition-colors"
            />
            <SearchIcon className="pointer-events-none absolute top-1/2 right-6 h-5 w-5 -translate-y-1/2 text-text-primary" />
        </div>
    );
}
