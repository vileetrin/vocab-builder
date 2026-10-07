"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";

import ArrowIcon from "@/assets/icons/ArrowIcon.svg";
import DoubleArrowIcon from "@/assets/icons/DoubleArrowIcon.svg";
import DotsIcon from "@/assets/icons/DotsIcon.svg";
import Dashboard, {
  type DashboardColumn,
} from "@/features/common/dashboard/Dashboard";
import ProgressCircle from "@/features/common/dashboard/ProgressCircle";
import { getOwnDictionary } from "@/features/dictionary/api/api";
import type { OwnDictionaryWord } from "@/features/dictionary/api/types";
import { queryKeys } from "@/lib/api/query-keys";

const WORDS_PER_PAGE = 7;

export default function DictionaryClient() {
  const t = useTranslations();
  const [page, setPage] = useState(1);
  const { data, isFetching } = useQuery({
    queryKey: queryKeys.words.own(page, WORDS_PER_PAGE),
    queryFn: () => getOwnDictionary({ page, limit: WORDS_PER_PAGE }),
    placeholderData: keepPreviousData,
  });

  const words = data?.results ?? [];
  const hasWords = words.length > 0;
  const totalPages = Math.max(data?.totalPages ?? 1, 1);
  const shouldShowPagination = hasWords && totalPages > 1;
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  const columns: DashboardColumn<OwnDictionaryWord>[] = [
    {
      key: "progress",
      header: t("dashboardColumnProgress"),
      className: "w-11 sm:w-14 md:w-28",
      render: (item) => (
        <div className="flex items-center justify-center md:justify-start md:gap-2">
          <span className="hidden w-10 text-base font-medium md:inline">
            {item.progress}%
          </span>
          <ProgressCircle
            value={item.progress}
            label={t("dashboardProgressLabel", { progress: item.progress })}
          />
        </div>
      ),
    },
    {
      key: "actions",
      className: "w-11 text-center sm:w-14 md:w-18",
      render: (item) => (
        <button
          type="button"
          aria-label={t("dashboardOpenRowMenu", { word: item.word })}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-accent-muted md:h-10 md:w-10"
        >
          <DotsIcon className="h-3 w-4 md:h-4 md:w-5" />
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Dashboard items={words} extraColumns={columns} />
      {shouldShowPagination && (
        <nav
          aria-label={t("dashboardPaginationLabel")}
          className="flex flex-wrap items-center justify-center gap-2 text-sm text-text-primary"
        >
          <button
            type="button"
            onClick={() => setPage(1)}
            disabled={!hasPreviousPage || isFetching}
            aria-label={t("dashboardFirstPage")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-text-primary transition-colors hover:bg-accent-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            <DoubleArrowIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={!hasPreviousPage || isFetching}
            aria-label={t("dashboardPreviousPage")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-text-primary transition-colors hover:bg-accent-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ArrowIcon className="h-3 w-3" />
          </button>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {pageNumbers.map((pageNumber) => {
              const isCurrentPage = pageNumber === page;

              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  disabled={isFetching || isCurrentPage}
                  aria-current={isCurrentPage ? "page" : undefined}
                  aria-label={t("dashboardGoToPage", { page: pageNumber })}
                  className={`inline-flex h-10 min-w-10 items-center justify-center rounded-md border px-3 font-medium transition-colors disabled:cursor-not-allowed ${
                    isCurrentPage
                      ? "border-accent bg-accent text-text-on-accent"
                      : "border-border text-text-primary hover:bg-accent-muted disabled:opacity-50"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            disabled={!hasNextPage || isFetching}
            aria-label={t("dashboardNextPage")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-text-primary transition-colors hover:bg-accent-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ArrowIcon className="h-3 w-3 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => setPage(totalPages)}
            disabled={!hasNextPage || isFetching}
            aria-label={t("dashboardLastPage")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-text-primary transition-colors hover:bg-accent-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            <DoubleArrowIcon className="h-4 w-4 rotate-180" />
          </button>
        </nav>
      )}
    </div>
  );
}
