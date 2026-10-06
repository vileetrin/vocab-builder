"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

import { getPathname, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type LocaleSwitcherProps = {
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  menuPositionClassName?: string;
  optionClassName?: string;
};

export default function LocaleSwitcher({
  className = "",
  triggerClassName = "bg-surface text-text-primary shadow-[0_8px_24px_rgb(133_170_159/28%)] hover:bg-accent-muted",
  menuClassName = "bg-text-on-accent shadow-[0_12px_32px_rgb(18_20_23/14%)]",
  menuPositionClassName = "right-0",
  optionClassName = "text-text-primary hover:bg-accent-muted focus-visible:bg-accent-muted",
}: LocaleSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(
      routing.locales.findIndex(
        (availableLocale) => availableLocale === locale,
      ),
      0,
    ),
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      optionRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex, isOpen]);

  const openMenu = () => {
    setActiveIndex(
      Math.max(
        routing.locales.findIndex(
          (availableLocale) => availableLocale === locale,
        ),
        0,
      ),
    );
    setIsOpen(true);
  };

  const getLocaleHref = (nextLocale: (typeof routing.locales)[number]) =>
    getPathname({
      href: pathname,
      locale: nextLocale,
      forcePrefix: true,
    });

  const handleTriggerKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
  ) => {
    if (
      event.key === "ArrowDown" ||
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      openMenu();
    }
  };

  const handleOptionKeyDown =
    (index: number) => (event: ReactKeyboardEvent<HTMLAnchorElement>) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((index + 1) % routing.locales.length);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex(
          (index - 1 + routing.locales.length) % routing.locales.length,
        );
      }

      if (event.key === "Home") {
        event.preventDefault();
        setActiveIndex(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        setActiveIndex(routing.locales.length - 1);
      }
    };

  return (
    <div
      ref={containerRef}
      className={`relative z-50 text-sm font-medium ${className}`}
    >
      <button
        type="button"
        aria-label={t("localeLabel")}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`inline-flex min-w-32 items-center justify-between gap-4 rounded-2xl py-2 pr-4 pl-3 text-sm font-semibold outline-none transition-colors disabled:opacity-60 ${triggerClassName}`}
        onClick={() => setIsOpen((current) => !current)}
        onKeyDown={handleTriggerKeyDown}
      >
        <span>{t(locale)}</span>
        <span
          aria-hidden="true"
          className="h-2 w-2 rotate-45 border-r-2 border-b-2 border-text-muted"
        />
      </button>

      {isOpen && (
        <div
          className={`absolute ${menuPositionClassName} z-50 mt-2 min-w-32 rounded-2xl p-3 ${menuClassName}`}
        >
          <ul
            role="listbox"
            aria-label={t("localeLabel")}
            className="flex flex-col gap-1"
          >
            {routing.locales.map((availableLocale, index) => (
              <li key={availableLocale}>
                <a
                  ref={(element) => {
                    optionRefs.current[index] = element;
                  }}
                  href={getLocaleHref(availableLocale)}
                  role="option"
                  aria-selected={locale === availableLocale}
                  className={`block w-full cursor-pointer rounded-lg px-4 py-2 text-left text-sm outline-none transition-colors ${optionClassName}`}
                  onClick={() => setIsOpen(false)}
                  onFocus={() => setActiveIndex(index)}
                  onKeyDown={handleOptionKeyDown(index)}
                >
                  {t(availableLocale)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
