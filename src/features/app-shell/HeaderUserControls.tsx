import LogOutButton from "@/features/app-shell/LogOutButton";
import UserBadge from "@/features/app-shell/UserBadge";

type HeaderUserControlsProps = {
  initials: string;
  isSignoutPending: boolean;
  logOutLabel: string;
  onLogOut: () => void;
  userName: string;
};

export default function HeaderUserControls({
  initials,
  isSignoutPending,
  logOutLabel,
  onLogOut,
  userName,
}: HeaderUserControlsProps) {
  return (
    <>
      <UserBadge initials={initials} userName={userName} />
      <LogOutButton
        disabled={isSignoutPending}
        label={logOutLabel}
        onClick={onLogOut}
      />
    </>
  );
}
