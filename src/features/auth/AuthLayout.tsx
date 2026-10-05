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
  children: ReactNode;
};

export default function AuthLayout({
  title,
  description,
  children,
}: AuthLayoutProps) {
  const t = useTranslations();

  return (
    <main className="flex min-h-screen w-full flex-col gap-2.5">
      <header className="m-4 flex items-center justify-between gap-4 md:ml-9 md:mt-6 md:mr-9 lg:ml-25">
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
      <Image
        src={RegistrationImage.src}
        alt=""
        width={246}
        height={246}
        className="ml-auto mr-auto flex"
      />
      <section
        className="flex flex-1 flex-col items-start justify-start gap-4 rounded-t-[26px] bg-accent-muted px-4 pt-8"
        aria-labelledby="auth-title"
      >
        <div className="flex flex-col gap-4">
          <h1 id="auth-title" className="text-2xl font-semibold">
            {title}
          </h1>
          <p className="text-base">{description}</p>
        </div>
        {children}
      </section>
    </main>
  );
}
