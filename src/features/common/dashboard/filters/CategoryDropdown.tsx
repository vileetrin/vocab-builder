"use client";

import { useEffect, useId, useRef, useState } from "react";

import ArrowIcon from "@/assets/icons/ArrowIcon.svg";

export type CategoryOption = {
    value: string;
    label: string;
};

type CategoryDropdownProps = {
    value?: string;
    onChange: (value: string) => void;
    options: CategoryOption[];
    placeholder: string;
    label: string;
};

export default function CategoryDropdown({ value, onChange, options, placeholder, label }: CategoryDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownId = useId();
    const rootRef = useRef<HTMLDivElement>(null);
    const selectedOption = options.find((option) => option.value === value);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        function handlePointerDown(event: PointerEvent) {
            if (!rootRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        }

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    return (
        <div ref={rootRef} className="relative w-41 max-w-full">
            <button
                type="button"
                aria-label={label}
                aria-expanded={isOpen}
                aria-controls={dropdownId}
                onClick={() => setIsOpen((current) => !current)}
                className="flex h-12 w-full items-center justify-between gap-3 rounded-[15px] border border-text-primary/10 bg-transparent px-6 text-left text-base text-text-primary outline-none transition-colors hover:border-accent focus:border-accent"
            >
                <span className="truncate">{selectedOption?.label ?? placeholder}</span>
                <ArrowIcon
                    className={`h-3 w-3 shrink-0 text-text-primary transition-transform ${
                        isOpen ? "rotate-90" : "-rotate-90"
                    }`}
                />
            </button>
            {isOpen && (
                <div
                    id={dropdownId}
                    role="listbox"
                    className="absolute top-[calc(100%+8px)] left-0 z-20 max-h-80 w-full overflow-y-auto rounded-[15px] border border-text-primary/10 bg-white py-2 shadow-[0_8px_24px_rgb(18_20_23/12%)]"
                >
                    {options.map((option) => {
                        const isSelected = option.value === value;

                        return (
                            <button
                                key={option.value}
                                type="button"
                                role="option"
                                aria-selected={isSelected}
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className="flex w-full items-center justify-between gap-3 px-6 py-2.5 text-left text-sm text-text-primary transition-colors hover:bg-accent-muted"
                            >
                                <span>{option.label}</span>
                                {isSelected && (
                                    <span
                                        aria-hidden="true"
                                        className="h-3 w-1.5 shrink-0 rotate-45 border-r-2 border-b-2 border-accent"
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
