"use client";

import BurgerMenuIcon from "@/assets/icons/BurgerMenuIcon.svg";
import BrandLink from "@/features/app-shell/BrandLink";
import AppNavigation from "@/features/app-shell/AppNavigation";
import AppSidebar from "@/features/app-shell/AppSidebar";
import { appNavItems } from "@/features/app-shell/navigationItems";
import LogOutButton from "@/features/app-shell/LogOutButton";
import UserBadge from "@/features/app-shell/UserBadge";
import { signoutUser } from "@/features/auth/api/api";
import {
  clearAuthSession,
  readAuthUserName,
} from "@/features/auth/session";
import LocaleSwitcher from "@/features/i18n/LocaleSwitcher";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useAppStore } from "@/stores/use-app-store";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useAppStore();
  const [savedUserName] = useState(() => readAuthUserName());
  const userName = savedUserName || t("appUserName");
  const navigationLabel = t("appNavigationLabel");
  const logOutLabel = t("logOut");
  const navItems = appNavItems.map((item) => ({
    href: item.href,
    label: t(item.labelKey),
  }));
  const initials = userName
    .split(" ")
    .map((part) => part.at(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const signoutMutation = useMutation({
    mutationFn: signoutUser,
    onSettled: () => {
      closeSidebar();
      clearAuthSession();
      router.replace("/signin");
    },
  });

  const handleLogOut = () => {
    signoutMutation.mutate();
  };

  useEffect(() => {
    if (!isSidebarOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSidebar();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeSidebar, isSidebarOpen]);

  return (
    <header className="bg-surface shadow-[0_8px_24px_rgb(133_170_159/18%)]">
      <div className="relative mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-8 lg:gap-8">
        <BrandLink
          ariaLabel={t("appHome")}
          className="flex shrink-0 items-center gap-3"
        />

        <AppNavigation
          activePathname={pathname}
          ariaLabel={navigationLabel}
          items={navItems}
        />

        <div className="hidden shrink-0 items-center gap-7 lg:flex">
          <LocaleSwitcher className="hidden xl:block" />
          <UserBadge initials={initials} userName={userName} />
          <LogOutButton
            disabled={signoutMutation.isPending}
            label={logOutLabel}
            onClick={handleLogOut}
          />
        </div>

        <div className="flex shrink-0 items-center gap-5 md:gap-6 lg:hidden">
          <LocaleSwitcher className="hidden md:block" />
          <UserBadge
            initials={initials}
            userName={userName}
            showNameOnMobile={false}
          />
          <button
            type="button"
            aria-label={navigationLabel}
            aria-expanded={isSidebarOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-accent-muted"
            onClick={toggleSidebar}
          >
            <BurgerMenuIcon className="h-7 w-10" />
          </button>
        </div>
      </div>

      {isSidebarOpen && (
        <AppSidebar
          activePathname={pathname}
          closeLabel={t("closeMenu")}
          isSignoutPending={signoutMutation.isPending}
          logOutLabel={logOutLabel}
          navigationLabel={navigationLabel}
          navItems={navItems}
          initials={initials}
          userName={userName}
          onClose={closeSidebar}
          onLogOut={handleLogOut}
        />
      )}
    </header>
  );
}
