import type { ReactNode } from "react";

type HeaderLabelProps = {
  children: ReactNode;
  icon?: ReactNode;
};

export default function HeaderLabel({ children, icon }: HeaderLabelProps) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      {icon}
      <span>{children}</span>
    </span>
  );
}
