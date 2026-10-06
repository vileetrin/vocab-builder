import Logo from "@/assets/icons/app-icon.svg";
import { Link } from "@/i18n/navigation";

type BrandLinkProps = {
  ariaLabel: string;
  className?: string;
  logoClassName?: string;
  textClassName?: string;
};

export default function BrandLink({
  ariaLabel,
  className = "flex items-center gap-3",
  logoClassName = "h-10 w-10",
  textClassName = "text-lg font-semibold",
}: BrandLinkProps) {
  return (
    <Link href="/" aria-label={ariaLabel} className={className}>
      <Logo className={logoClassName} />
      <span className={textClassName}>VocabBuilder</span>
    </Link>
  );
}
