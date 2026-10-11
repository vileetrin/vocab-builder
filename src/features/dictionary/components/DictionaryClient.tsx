"use client";

import { useTranslations } from "next-intl";

import AddNewWordDialog from "@/features/common/dashboard/DashboardActions/AddNewWordDialog";
import StudyWordsStatistic from "@/features/common/dashboard/DashboardActions/StudyWordsStatistic";
import TrainingButton from "@/features/common/dashboard/DashboardActions/TrainingButton";
import { type DashboardColumn } from "@/features/common/dashboard/Dashboard";
import ProgressCircle from "@/features/common/dashboard/ProgressCircle";
import WordsDashboardClient from "@/features/common/dashboard/WordsDashboardClient";
import { getOwnDictionary } from "@/features/dictionary/api/api";
import type { OwnDictionaryWord } from "@/features/dictionary/api/types";
import DictionaryRowActions from "@/features/dictionary/components/DictionaryRowActions";
import { queryKeys } from "@/lib/api/query-keys";

type DictionaryClientProps = {
    openAddWordDialog?: boolean;
};

export default function DictionaryClient({ openAddWordDialog = false }: DictionaryClientProps) {
    const t = useTranslations();
    const columns: DashboardColumn<OwnDictionaryWord>[] = [
        {
            key: "progress",
            header: t("dashboardColumnProgress"),
            className: "w-11 sm:w-14 md:w-28",
            render: (item) => (
                <div className="flex items-center justify-center md:justify-start md:gap-2">
                    <span aria-hidden="true" className="hidden w-10 text-base font-medium md:inline">
                        {item.progress}%
                    </span>
                    <ProgressCircle
                        value={item.progress}
                        label={t("dashboardProgressLabel", { progress: item.progress })}
                    />
                </div>
            )
        },
        {
            key: "actions",
            className: "w-11 text-center sm:w-14 md:w-18",
            render: (item) => <DictionaryRowActions word={item} />
        }
    ];

    return (
        <WordsDashboardClient
            queryKey={queryKeys.words.own}
            queryFn={getOwnDictionary}
            extraColumns={columns}
            actions={
                <>
                    <StudyWordsStatistic />
                    <AddNewWordDialog defaultOpen={openAddWordDialog} />
                    <TrainingButton />
                </>
            }
        />
    );
}
