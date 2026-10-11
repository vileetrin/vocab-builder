"use client";

import { useQuery } from "@tanstack/react-query";
import { getTrainingTasks } from "@/features/training/api";
import { queryKeys } from "@/lib/api/query-keys";
import EmptyState from "@/features/training/components/EmptyState";

export default function TrainingClient() {
    const { data } = useQuery({
        queryKey: queryKeys.training,
        queryFn: getTrainingTasks
    });
    return <div>{!data?.length && <EmptyState />}</div>;
}
