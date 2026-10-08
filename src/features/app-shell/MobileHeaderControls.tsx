import BurgerMenuIcon from "@/assets/icons/BurgerMenuIcon.svg";
import UserBadge from "@/features/app-shell/UserBadge";

type MobileHeaderControlsProps = {
  initials: string;
  isSidebarOpen: boolean;
  navigationLabel: string;
  onToggleSidebar: () => void;
  userName: string;
};

export default function MobileHeaderControls({
  initials,
  isSidebarOpen,
  navigationLabel,
  onToggleSidebar,
  userName,
}: MobileHeaderControlsProps) {
  return (
    <>
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
        onClick={onToggleSidebar}
      >
        <BurgerMenuIcon className="h-7 w-10" />
      </button>
    </>
  );
}
