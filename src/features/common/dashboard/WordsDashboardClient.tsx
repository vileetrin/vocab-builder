"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useState } from "react";

import Dashboard, { type DashboardColumn, type DashboardItem } from "@/features/common/dashboard/Dashboard";
import DashboardActions from "@/features/common/dashboard/DashboardActions/DashboardActions";
import type { WordCategory } from "@/features/common/dashboard/categoryOptions";
import DashboardFilters from "@/features/common/dashboard/filters/DashboardFilters";
import Pagination from "@/features/common/dashboard/pagination/Pagination";

const DEFAULT_WORDS_PER_PAGE = 7;

export type WordDashboardFilters = {
    keyword?: string;
    category?: WordCategory;
};

export type WordDashboardParams = WordDashboardFilters & {
    page: number;
    limit: number;
};

export type WordDashboardPage<TItem extends DashboardItem> = {
    results: TItem[];
    totalPages: number;
    page: number;
    perPage: number;
};

type WordsDashboardClientProps<TItem extends DashboardItem> = {
    actions?: ReactNode;
    extraColumns?: DashboardColumn<TItem>[];
    queryKey: (page: number, limit: number, filters: WordDashboardFilters) => readonly unknown[];
    queryFn: (params: WordDashboardParams) => Promise<WordDashboardPage<TItem>>;
    wordsPerPage?: number;
};

export default function WordsDashboardClient<TItem extends DashboardItem>({
    actions,
    extraColumns = [],
    queryKey,
    queryFn,
    wordsPerPage = DEFAULT_WORDS_PER_PAGE
}: WordsDashboardClientProps<TItem>) {
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState<WordCategory>();
    const trimmedKeyword = keyword.trim();
    const filters: WordDashboardFilters = {
        ...(trimmedKeyword ? { keyword: trimmedKeyword } : {}),
        ...(category ? { category } : {})
    };

    const { data, isFetching } = useQuery({
        queryKey: queryKey(page, wordsPerPage, filters),
        queryFn: () =>
            queryFn({
                page,
                limit: wordsPerPage,
                ...filters
            }),
        placeholderData: keepPreviousData
    });

    const words = data?.results ?? [];
    const hasWords = words.length > 0;
    const totalPages = Math.max(data?.totalPages ?? 1, 1);
    const shouldShowPagination = hasWords && totalPages > 1;

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
                {actions && <DashboardActions>{actions}</DashboardActions>}
            </div>

            <Dashboard items={words} extraColumns={extraColumns} />
            {shouldShowPagination && (
                <Pagination page={page} totalPages={totalPages} isDisabled={isFetching} onPageChange={setPage} />
            )}
        </div>
    );
}
