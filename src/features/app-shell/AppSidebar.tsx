import RegistrationImage from "@/assets/images/RegistrationImage.png";
import AppNavigation from "@/features/app-shell/AppNavigation";
import LogOutButton from "@/features/app-shell/LogOutButton";
import UserBadge from "@/features/app-shell/UserBadge";
import LocaleSwitcher from "@/features/i18n/LocaleSwitcher";
import Image from "next/image";

type AppSidebarProps = {
  activePathname: string;
  closeLabel: string;
  isSignoutPending: boolean;
  logOutLabel: string;
  navigationLabel: string;
  navItems: Array<{ href: string; label: string }>;
  initials: string;
  userName: string;
  onClose: () => void;
  onLogOut: () => void;
};

export default function AppSidebar({
  activePathname,
  closeLabel,
  isSignoutPending,
  logOutLabel,
  navigationLabel,
  navItems,
  initials,
  userName,
  onClose,
  onLogOut,
}: AppSidebarProps) {
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label={closeLabel}
        className="absolute inset-0 bg-text-primary/30"
        onClick={onClose}
      />
      <aside
        aria-label={navigationLabel}
        className="absolute top-0 right-0 flex h-full w-[min(82vw,360px)] flex-col overflow-hidden bg-accent px-6 pt-7 pb-0 text-text-on-accent shadow-[-12px_0_36px_rgb(18_20_23/22%)]"
      >
        <div className="relative z-10 flex items-center justify-between gap-4">
          <UserBadge
            initials={initials}
            userName={userName}
            inverted
            showNameOnMobile
          />
          <button
            type="button"
            aria-label={closeLabel}
            className="flex h-10 w-10 items-center justify-center rounded-full text-3xl leading-none text-text-on-accent transition-colors hover:bg-text-on-accent/15"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="relative z-10 mt-6">
          <LocaleSwitcher
            triggerClassName="bg-text-on-accent text-accent shadow-[0_10px_28px_rgb(18_20_23/16%)] hover:bg-text-on-accent/90"
            menuClassName="bg-text-on-accent shadow-[0_12px_32px_rgb(18_20_23/18%)]"
            menuPositionClassName="left-0"
            optionClassName="text-accent hover:bg-accent-muted focus-visible:bg-accent-muted"
          />
        </div>

        <div className="relative z-10 flex flex-1 items-center">
          <div className="flex flex-col items-start gap-3">
            <AppNavigation
              activePathname={activePathname}
              ariaLabel={navigationLabel}
              items={navItems}
              inverted
              onNavigate={onClose}
            />
            <LogOutButton
              disabled={isSignoutPending}
              label={logOutLabel}
              inverted
              onClick={onLogOut}
            />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none relative -mx-6 h-64 shrink-0 overflow-hidden"
        >
          <Image
            src={RegistrationImage.src}
            alt=""
            width={498}
            height={498}
            className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2"
          />
        </div>
      </aside>
    </div>
  );
}
