import { type ReactNode } from "react";

import Logo from "@/assets/icons/app-icon.svg";
import RegistrationImage from "@/assets/images/RegistrationImage.png";
import LocaleSwitcher from "@/features/i18n/LocaleSwitcher";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

type AuthLayoutProps = {
  title: string;
  description: string;
  showMobileWordTableHeader?: boolean;
  children: ReactNode;
};

type WordTableHeaderProps = {
  children: ReactNode;
  className: string;
};

function WordTableHeader({ children, className }: WordTableHeaderProps) {
  return <p className={className}>{children}</p>;
}

export default function AuthLayout({
  title,
  description,
  showMobileWordTableHeader = false,
  children,
}: AuthLayoutProps) {
  const t = useTranslations();
  const wordTableHeader = t("wordTableHeader");

  return (
    <main
      className="relative flex min-h-screen w-full flex-col gap-2.5 overflow-hidden md:gap-0
    lg:gap-2.5"
    >
      <div aria-hidden="true" className="auth-corner-gradient" />
      <header
        className="relative z-30 px-4 pt-4 w-full flex items-center justify-between gap-4
      md:px-9 md:pt-6
      lg:pl-25"
      >
        <Link
          href="/"
          aria-label={t("authHome")}
          className="flex flex-row items-center gap-4"
        >
          <Logo className="h-9 w-9" />
          <span className="text-lg font-semibold">VocabBuilder</span>
        </Link>
        <LocaleSwitcher />
      </header>
      <div
        className="relative z-10 flex flex-1 flex-col
        md:items-center md:justify-center
        lg:flex-row lg:gap-20 lg:px-25"
      >
        <div className="flex flex-1 flex-col md:flex-none md:items-center lg:items-stretch">
          <Image
            src={RegistrationImage.src}
            alt=""
            width={246}
            height={246}
            className="auth-mobile-image ml-auto mr-auto flex shrink-0 md:hidden"
          />
          {showMobileWordTableHeader && (
            <WordTableHeader className="mx-auto mb-2 max-w-74 text-center text-sm font-medium text-text-secondary md:hidden">
              {wordTableHeader}
            </WordTableHeader>
          )}
          <section
            className="mt-8 flex flex-1 flex-col items-start justify-start rounded-t-[26px] bg-accent-muted px-4 pt-8 pb-8
            md:mt-0 md:flex-none md:rounded-[30px] md:mx-17.5 md:px-12 md:py-16 md:max-w-162
            lg:mx-0 lg:max-w-157"
            aria-labelledby="auth-title"
          >
            <div className="mb-4 flex flex-col gap-4">
              <h1
                id="auth-title"
                className="text-2xl font-semibold md:text-[40px]"
              >
                {title}
              </h1>
              <p className="text-base text-text-secondary md:text-xl">
                {description}
              </p>
            </div>
            {children}
          </section>
          <WordTableHeader className="mt-4 hidden max-w-162 text-center text-sm font-medium text-text-secondary md:block lg:hidden">
            {wordTableHeader}
          </WordTableHeader>
        </div>

        <div className="auth-desktop-illustration hidden shrink-0 flex-col items-center gap-4">
          <Image
            src={RegistrationImage.src}
            alt=""
            width={498}
            height={498}
            className="h-auto w-124.5 max-w-none shrink-0"
          />
          <WordTableHeader className="max-w-124.5 text-center text-lg font-medium text-text-secondary">
            {wordTableHeader}
          </WordTableHeader>
        </div>
      </div>
    </main>
  );
}
