"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  useEffect,
  useRef,
  useState,
  useTransition,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(
      routing.locales.findIndex(
        (availableLocale) => availableLocale === locale,
      ),
      0,
    ),
  );
  const [isPending, startTransition] = useTransition();

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

  const handleLocaleSelect = (nextLocale: Locale) => {
    setIsOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

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
    (index: number, optionLocale: Locale) =>
    (event: ReactKeyboardEvent<HTMLButtonElement>) => {
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

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleLocaleSelect(optionLocale);
      }
    };

  return (
    <div ref={containerRef} className="relative text-sm font-medium">
      <button
        type="button"
        aria-label={t("localeLabel")}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="inline-flex min-w-32 items-center justify-between gap-4 rounded-2xl border border-accent bg-surface py-2 pr-4 pl-3 text-sm font-semibold text-text-primary outline-none disabled:opacity-60"
        disabled={isPending}
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
        <div className="absolute right-0 z-10 mt-2 min-w-32 rounded-2xl bg-text-on-accent py-2 shadow-[0_12px_32px_rgb(18_20_23_/_14%)]">
          <ul role="listbox" aria-label={t("localeLabel")}>
            {routing.locales.map((availableLocale, index) => (
              <li key={availableLocale}>
                <button
                  ref={(element) => {
                    optionRefs.current[index] = element;
                  }}
                  type="button"
                  role="option"
                  aria-selected={locale === availableLocale}
                  className="w-full px-4 py-2 text-left text-sm text-text-primary outline-none hover:bg-accent-muted"
                  onClick={() => handleLocaleSelect(availableLocale)}
                  onFocus={() => setActiveIndex(index)}
                  onKeyDown={handleOptionKeyDown(index, availableLocale)}
                >
                  {t(availableLocale)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
