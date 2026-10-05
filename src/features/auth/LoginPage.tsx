import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations();

  return <div>{t("loginTitle")}</div>;
}
