"use client";

import BrandLink from "@/features/app-shell/BrandLink";
import AppNavigation from "@/features/app-shell/AppNavigation";
import AppSidebar from "@/features/app-shell/AppSidebar";
import HeaderUserControls from "@/features/app-shell/HeaderUserControls";
import LocaleSwitcher from "@/features/i18n/LocaleSwitcher";
import MobileHeaderControls from "@/features/app-shell/MobileHeaderControls";
import { getUserInitials } from "@/features/app-shell/getUserInitials";
import { appNavItems } from "@/features/app-shell/navigationItems";
import { useHeaderSession } from "@/features/app-shell/useHeaderSession";
import { useSidebarEscape } from "@/features/app-shell/useSidebarEscape";
import { usePathname } from "@/i18n/navigation";
import { useAppStore } from "@/stores/use-app-store";
import { useTranslations } from "next-intl";

type AppHeaderClientProps = {
  initialUserName: string;
};

export default function AppHeaderClient({
  initialUserName,
}: AppHeaderClientProps) {
  const pathname = usePathname();
  const t = useTranslations();
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useAppStore();
  const navigationLabel = t("appNavigationLabel");
  const logOutLabel = t("logOut");
  const { isSignoutPending, onLogOut, userName } = useHeaderSession({
    fallbackUserName: t("appUserName"),
    initialUserName,
    onSignoutSettled: closeSidebar,
  });
  const navItems = appNavItems.map((item) => ({
    href: item.href,
    label: t(item.labelKey),
  }));
  const initials = getUserInitials(userName);

  useSidebarEscape(isSidebarOpen, closeSidebar);

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
          <HeaderUserControls
            initials={initials}
            isSignoutPending={isSignoutPending}
            logOutLabel={logOutLabel}
            onLogOut={onLogOut}
            userName={userName}
          />
        </div>

        <div className="flex shrink-0 items-center gap-5 md:gap-6 lg:hidden">
          <LocaleSwitcher className="hidden md:block" />
          <MobileHeaderControls
            initials={initials}
            isSidebarOpen={isSidebarOpen}
            navigationLabel={navigationLabel}
            onToggleSidebar={toggleSidebar}
            userName={userName}
          />
        </div>
      </div>

      {isSidebarOpen && (
        <AppSidebar
          activePathname={pathname}
          closeLabel={t("closeMenu")}
          isSignoutPending={isSignoutPending}
          logOutLabel={logOutLabel}
          navigationLabel={navigationLabel}
          navItems={navItems}
          initials={initials}
          userName={userName}
          onClose={closeSidebar}
          onLogOut={onLogOut}
        />
      )}
    </header>
  );
}
