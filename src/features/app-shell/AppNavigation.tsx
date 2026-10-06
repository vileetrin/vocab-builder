import { Link } from "@/i18n/navigation";

type AppNavigationItem = {
  href: string;
  label: string;
};

type AppNavigationProps = {
  activePathname: string;
  ariaLabel: string;
  inverted?: boolean;
  items: AppNavigationItem[];
  onNavigate?: () => void;
};

export default function AppNavigation({
  activePathname,
  ariaLabel,
  inverted = false,
  items,
  onNavigate,
}: AppNavigationProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={
        inverted
          ? "relative z-10"
          : "absolute left-1/2 hidden -translate-x-1/2 lg:block"
      }
    >
      <ul
        className={
          inverted
            ? "flex flex-col items-start gap-3"
            : "flex items-center gap-2"
        }
      >
        {items.map((item) => {
          const isActive = activePathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={
                  inverted
                    ? `inline-flex min-h-12 items-center rounded-[30px] px-5 text-base font-bold transition-colors ${
                        isActive
                          ? "bg-text-on-accent text-accent"
                          : "text-text-on-accent hover:bg-text-on-accent/15"
                      }`
                    : `inline-flex min-h-11 items-center rounded-[30px] px-5 text-sm font-bold transition-colors ${
                        isActive
                          ? "bg-accent text-text-on-accent"
                          : "text-text-secondary hover:bg-accent-muted hover:text-text-primary"
                      }`
                }
                onClick={onNavigate}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
