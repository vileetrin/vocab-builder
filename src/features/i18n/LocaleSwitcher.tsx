"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState, useTransition } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
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

  const handleLocaleSelect = (nextLocale: Locale) => {
    setIsOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
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
            {routing.locales.map((availableLocale) => (
              <li key={availableLocale}>
                <button
                  type="button"
                  role="option"
                  aria-selected={locale === availableLocale}
                  className="w-full px-4 py-2 text-left text-sm text-text-primary outline-none hover:bg-accent-muted"
                  onClick={() => handleLocaleSelect(availableLocale)}
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
