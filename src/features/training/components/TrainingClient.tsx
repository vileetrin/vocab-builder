"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { getTrainingTasks } from "@/features/training/api";
import { queryKeys } from "@/lib/api/query-keys";
import EmptyState from "@/features/training/components/EmptyState";
import TrainingSession from "@/features/training/components/TrainingSession";

export default function TrainingClient() {
    const t = useTranslations();
    const {
        data = [],
        isError,
        isPending
    } = useQuery({
        queryKey: queryKeys.training,
        queryFn: getTrainingTasks
    });

    if (isPending) {
        return null;
    }

    if (isError) {
        return (
            <p className="px-4 py-8 text-[14px] text-error" role="alert">
                {t("trainingLoadError")}
            </p>
        );
    }

    if (data.length === 0) {
        return <EmptyState />;
    }

    return <TrainingSession tasks={data} />;
}
