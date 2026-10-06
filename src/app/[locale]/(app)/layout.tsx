import { type ReactNode } from "react";

import AppHeader from "@/features/app-shell/AppHeader";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-surface text-text-primary">
      <AppHeader />
      {children}
    </div>
  );
}
