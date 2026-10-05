"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition, type ChangeEvent } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as Locale;

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <label className="flex items-center gap-2 text-sm font-medium text-text-secondary">
      <span className="sr-only">{t("localeLabel")}</span>
      <select
        aria-label={t("localeLabel")}
        value={locale}
        className="rounded-lg border border-accent-muted bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:border-accent disabled:opacity-60"
        disabled={isPending}
        onChange={handleChange}
      >
        {routing.locales.map((availableLocale) => (
          <option key={availableLocale} value={availableLocale}>
            {t(availableLocale)}
          </option>
        ))}
      </select>
    </label>
  );
}
