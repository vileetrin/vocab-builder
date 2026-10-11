import { ReactNode } from "react";

export default function DashboardActions({ children }: { children: ReactNode }) {
    return <div className="flex flex-row items-center gap-4">{children}</div>;
}
