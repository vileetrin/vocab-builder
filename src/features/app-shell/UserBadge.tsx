type UserBadgeProps = {
  initials: string;
  userName: string;
  inverted?: boolean;
  showNameOnMobile?: boolean;
};

export default function UserBadge({
  initials,
  userName,
  inverted = false,
  showNameOnMobile = true,
}: UserBadgeProps) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`${showNameOnMobile ? "" : "hidden sm:inline"} text-sm font-semibold ${
          inverted ? "text-text-on-accent" : "text-text-primary"
        }`}
      >
        {userName}
      </span>
      <span
        aria-hidden="true"
        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
          inverted
            ? "bg-text-on-accent text-accent"
            : "bg-accent text-text-on-accent"
        }`}
      >
        {initials}
      </span>
    </div>
  );
}
