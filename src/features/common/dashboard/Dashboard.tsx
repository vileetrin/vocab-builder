import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

import UkraineIcon from "@/assets/icons/Ukraine.svg";
import UnitedKingdomIcon from "@/assets/icons/UnitedKingdom.svg";
import HeaderLabel from "@/features/common/dashboard/HeaderLabel";
import type { DashboardItem } from "@/features/common/dashboard/types";

export type { DashboardItem } from "@/features/common/dashboard/types";

export type DashboardColumn<TItem extends DashboardItem> = {
    key: string;
    header?: ReactNode;
    className?: string;
    render: (item: TItem) => ReactNode;
};

type DashboardProps<TItem extends DashboardItem> = {
    items: TItem[];
    extraColumns?: DashboardColumn<TItem>[];
};

export default function Dashboard<TItem extends DashboardItem>({ items, extraColumns = [] }: DashboardProps<TItem>) {
    const t = useTranslations();
    const columnCount = 3 + extraColumns.length;

    return (
        <div className="overflow-hidden rounded-lg bg-white shadow-[0_8px_24px_rgb(133_170_159/12%)]">
            <div className="overflow-x-auto">
                <table className="w-full min-w-180 table-fixed border-separate border-spacing-0 text-left">
                    <thead className="bg-accent-muted text-text-primary">
                        <tr className="text-xs font-medium sm:text-sm md:text-base">
                            <th className="border-border w-[28%] border-r border-b px-2 py-3 first:rounded-tl-lg sm:px-3 md:px-5 md:py-5">
                                <HeaderLabel icon={<UnitedKingdomIcon className="hidden h-7 w-7 shrink-0 md:block" />}>
                                    {t("dashboardColumnWord")}
                                </HeaderLabel>
                            </th>
                            <th className="border-border w-[28%] border-r border-b px-2 py-3 sm:px-3 md:px-5 md:py-5">
                                <HeaderLabel icon={<UkraineIcon className="hidden h-7 w-7 shrink-0 md:block" />}>
                                    {t("dashboardColumnTranslation")}
                                </HeaderLabel>
                            </th>
                            <th
                                className={`border-border w-[18%] border-b px-2 py-3 sm:px-3 md:px-5 md:py-5 ${
                                    extraColumns.length === 0 ? "rounded-tr-lg" : ""
                                } ${extraColumns.length > 0 ? "border-r" : ""}`}
                            >
                                {t("dashboardColumnCategory")}
                            </th>
                            {extraColumns.map((column, index) => (
                                <th
                                    key={column.key}
                                    className={`border-border border-b px-2 py-3 sm:px-3 md:px-5 md:py-5 ${
                                        index === extraColumns.length - 1 ? "last:rounded-tr-lg" : "border-r"
                                    } ${column.className ?? ""}`}
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-xs text-text-primary sm:text-sm md:text-lg">
                        {items.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columnCount}
                                    className="px-3 py-8 text-center text-xs text-text-muted sm:text-sm md:px-5 md:py-10 md:text-base"
                                >
                                    {t("dashboardEmptyState")}
                                </td>
                            </tr>
                        )}
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td className="border-border border-r border-b px-2 py-3 font-medium wrap-break-word sm:px-3 md:px-5 md:py-5">
                                    {item.word}
                                </td>
                                <td className="border-border border-r border-b px-2 py-3 wrap-break-word sm:px-3 md:px-5 md:py-5">
                                    {item.translation}
                                </td>
                                <td
                                    className={`border-border border-b px-2 py-3 wrap-break-word sm:px-3 md:px-5 md:py-5 ${
                                        extraColumns.length > 0 ? "border-r" : ""
                                    }`}
                                >
                                    {item.category}
                                </td>
                                {extraColumns.map((column, index) => (
                                    <td
                                        key={column.key}
                                        className={`border-border border-b px-2 py-3 sm:px-3 md:px-5 md:py-5 ${
                                            index === extraColumns.length - 1 ? "" : "border-r"
                                        } ${column.className ?? ""}`}
                                    >
                                        {column.render(item)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
