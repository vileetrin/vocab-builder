"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

import ArrowIcon from "@/assets/icons/ArrowIcon.svg";

export type DropdownOption = {
  href?: string;
  label: string;
  value: string;
};

type DropdownProps = {
  label: string;
  onChange?: (value: string) => void;
  options: DropdownOption[];
  placeholder: string;
  value?: string;
  className?: string;
  iconClassName?: string;
  triggerClassName?: string;
  menuClassName?: string;
  optionClassName?: string;
};

function getSelectedIndex(options: DropdownOption[], value?: string) {
  return Math.max(
    options.findIndex((option) => option.value === value),
    0,
  );
}

export default function Dropdown({
  label,
  onChange,
  options,
  placeholder,
  value,
  className = "",
  iconClassName = "text-text-primary",
  triggerClassName = "h-12 rounded-[15px] border border-text-primary/10 bg-transparent px-6 text-base text-text-primary hover:border-accent focus:border-accent",
  menuClassName = "top-[calc(100%+8px)] left-0 max-h-80 w-full rounded-[15px] border border-text-primary/10 bg-white py-2 shadow-[0_8px_24px_rgb(18_20_23/12%)]",
  optionClassName = "px-6 py-2.5 text-sm text-text-primary hover:bg-accent-muted",
}: DropdownProps) {
  const labelId = useId();
  const valueId = useId();
  const listboxId = useId();
  const optionIdPrefix = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    getSelectedIndex(options, value),
  );
  const selectedOption = options.find((option) => option.value === value);
  const activeOption = options[activeIndex];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      listboxRef.current?.focus();
    }
  }, [isOpen]);

  const openDropdown = (nextActiveIndex = getSelectedIndex(options, value)) => {
    setActiveIndex(nextActiveIndex);
    setIsOpen(true);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const selectOption = (option: DropdownOption) => {
    if (option.href) {
      setIsOpen(false);
      window.location.assign(option.href);
      return;
    }

    onChange?.(option.value);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const moveActiveOption = (step: number) => {
    setActiveIndex((currentIndex) => {
      const nextIndex = currentIndex + step;

      if (nextIndex < 0) {
        return options.length - 1;
      }

      if (nextIndex >= options.length) {
        return 0;
      }

      return nextIndex;
    });
  };

  const handleTriggerKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openDropdown(getSelectedIndex(options, value));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      openDropdown(options.length - 1);
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDropdown();
    }
  };

  const handleListboxKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveActiveOption(1);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveActiveOption(-1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(options.length - 1);
    }

    if ((event.key === "Enter" || event.key === " ") && activeOption) {
      event.preventDefault();
      selectOption(activeOption);
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeDropdown();
    }
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <span id={labelId} className="sr-only">
        {label}
      </span>
      <button
        ref={triggerRef}
        type="button"
        aria-labelledby={`${labelId} ${valueId}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        className={`flex w-full items-center justify-between gap-3 text-left outline-none transition-colors ${triggerClassName}`}
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
            return;
          }

          openDropdown();
        }}
        onKeyDown={handleTriggerKeyDown}
      >
        <span id={valueId} className="truncate">
          {selectedOption?.label ?? placeholder}
        </span>
        <ArrowIcon
          aria-hidden="true"
          className={`h-3 w-3 shrink-0 transition-transform ${iconClassName} ${
            isOpen ? "rotate-90" : "-rotate-90"
          }`}
        />
      </button>

      {isOpen && (
        <div
          ref={listboxRef}
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={labelId}
          aria-activedescendant={
            activeOption ? `${optionIdPrefix}-${activeIndex}` : undefined
          }
          className={`absolute z-20 overflow-y-auto outline-none ${menuClassName}`}
          onKeyDown={handleListboxKeyDown}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;
            const optionClassNameValue = `flex w-full items-center justify-between gap-3 text-left outline-none transition-colors ${
              isActive ? "bg-accent-muted" : ""
            } ${optionClassName}`;
            const optionContent = (
              <>
                <span>{option.label}</span>
                {isSelected && (
                  <span
                    aria-hidden="true"
                    className="h-3 w-1.5 shrink-0 rotate-45 border-r-2 border-b-2 border-accent"
                  />
                )}
              </>
            );

            if (option.href) {
              return (
                <a
                  key={option.value}
                  id={`${optionIdPrefix}-${index}`}
                  href={option.href}
                  role="option"
                  aria-selected={isSelected}
                  className={optionClassNameValue}
                  onClick={() => setIsOpen(false)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {optionContent}
                </a>
              );
            }

            return (
              <button
                key={option.value}
                id={`${optionIdPrefix}-${index}`}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={optionClassNameValue}
                onClick={() => selectOption(option)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {optionContent}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
