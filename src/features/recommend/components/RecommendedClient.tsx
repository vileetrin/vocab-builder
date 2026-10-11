"use client";

import StudyWordsStatistic from "@/features/common/dashboard/DashboardActions/StudyWordsStatistic";
import TrainingButton from "@/features/common/dashboard/DashboardActions/TrainingButton";
import { type DashboardColumn } from "@/features/common/dashboard/Dashboard";
import WordsDashboardClient from "@/features/common/dashboard/WordsDashboardClient";
import { getRecommendedWords } from "@/features/recommend/api";
import AddToDictionaryButton from "@/features/recommend/components/AddToDictionaryButton";
import type { RecommendedWord } from "@/features/recommend/types";
import { queryKeys } from "@/lib/api/query-keys";

export default function RecommendedClient() {
    const columns: DashboardColumn<RecommendedWord>[] = [
        {
            key: "addWord",
            className: "w-40 text-center md:w-48",
            render: (item) => <AddToDictionaryButton word={item} />
        }
    ];

    return (
        <WordsDashboardClient
            queryKey={queryKeys.recommended.list}
            queryFn={getRecommendedWords}
            extraColumns={columns}
            actions={
                <>
                    <StudyWordsStatistic />
                    <TrainingButton />
                </>
            }
        />
    );
}
