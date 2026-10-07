"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { queryKeys } from "@/lib/api/query-keys";
import { getStatistics } from "@/features/common/dashboard/DashboardActions/api";

export default function StudyWordsStatistic() {
    const t = useTranslations();
    const { data } = useQuery({
        queryKey: queryKeys.statistics,
        queryFn: getStatistics
    });

    return (
        <p className="flex gap-1 items-center text-base text-text-muted">
            {t("dashboardToStudy")}
            <span className="text-xl text-text-primary">{data ?? 0}</span>
        </p>
    );
}
