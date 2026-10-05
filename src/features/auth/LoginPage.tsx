import AuthLayout from "@/features/auth/components/AuthLayout";
import LoginForm from "@/features/auth/components/LoginForm";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations();

  return (
    <AuthLayout
      title={t("loginTitle")}
      description={t("loginDescription")}
      showMobileWordTableHeader
    >
      <LoginForm />
    </AuthLayout>
  );
}
