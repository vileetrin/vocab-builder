import AuthLayout from "@/features/auth/components/AuthLayout";
import RegistrationForm from "@/features/auth/components/RegistrationForm";
import { useTranslations } from "next-intl";

export default function RegistrationPage() {
  const t = useTranslations();

  return (
    <AuthLayout
      title={t("registrationTitle")}
      description={t("registrationDescription")}
    >
      <RegistrationForm />
    </AuthLayout>
  );
}
