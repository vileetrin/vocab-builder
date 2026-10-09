"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";

import Dashboard, { type DashboardColumn } from "@/features/common/dashboard/Dashboard";
import DashboardActions from "@/features/common/dashboard/DashboardActions/DashboardActions";
import DashboardFilters from "@/features/common/dashboard/filters/DashboardFilters";
import Pagination from "@/features/common/dashboard/pagination/Pagination";
import ProgressCircle from "@/features/common/dashboard/ProgressCircle";
import { getOwnDictionary } from "@/features/dictionary/api/api";
import DictionaryRowActions from "@/features/dictionary/components/DictionaryRowActions";
import type { OwnDictionaryWord } from "@/features/dictionary/api/types";
import { queryKeys } from "@/lib/api/query-keys";

const WORDS_PER_PAGE = 7;

export default function DictionaryClient() {
    const t = useTranslations();
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState<string>();
    const trimmedKeyword = keyword.trim();
    const filters = {
        ...(trimmedKeyword ? { keyword: trimmedKeyword } : {}),
        ...(category ? { category } : {})
    };
    const { data, isFetching } = useQuery({
        queryKey: queryKeys.words.own(page, WORDS_PER_PAGE, filters),
        queryFn: () =>
            getOwnDictionary({
                page,
                limit: WORDS_PER_PAGE,
                ...filters
            }),
        placeholderData: keepPreviousData
    });

    const words = data?.results ?? [];
    const hasWords = words.length > 0;
    const totalPages = Math.max(data?.totalPages ?? 1, 1);
    const shouldShowPagination = hasWords && totalPages > 1;

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
        <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <DashboardFilters
                    keyword={keyword}
                    category={category}
                    onKeywordChange={(nextKeyword) => {
                        setKeyword(nextKeyword);
                        setPage(1);
                    }}
                    onCategoryChange={(nextCategory) => {
                        setCategory(nextCategory);
                        setPage(1);
                    }}
                    onClear={() => {
                        setKeyword("");
                        setCategory(undefined);
                        setPage(1);
                    }}
                />
                <DashboardActions />
            </div>

            <Dashboard items={words} extraColumns={columns} />
            {shouldShowPagination && (
                <Pagination page={page} totalPages={totalPages} isDisabled={isFetching} onPageChange={setPage} />
            )}
        </div>
    );
}
