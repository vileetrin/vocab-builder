"use client";

import { useLocale, useTranslations } from "next-intl";

import Dropdown from "@/features/common/dropdown";
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

  const getLocaleHref = (nextLocale: (typeof routing.locales)[number]) =>
    getPathname({
      href: pathname,
      locale: nextLocale,
      forcePrefix: true,
    });

  return (
    <Dropdown
      className={`z-50 text-sm font-medium ${className}`}
      iconClassName="text-text-muted"
      label={t("localeLabel")}
      menuClassName={`${menuPositionClassName} mt-2 min-w-32 rounded-2xl p-3 ${menuClassName}`}
      optionClassName={`rounded-lg px-4 py-2 text-sm ${optionClassName}`}
      options={routing.locales.map((availableLocale) => ({
        href: getLocaleHref(availableLocale),
        label: t(availableLocale),
        value: availableLocale,
      }))}
      placeholder={t(locale)}
      triggerClassName={`min-w-32 rounded-2xl py-2 pr-4 pl-3 text-sm font-semibold disabled:opacity-60 ${triggerClassName}`}
      value={locale}
    />
  );
}
