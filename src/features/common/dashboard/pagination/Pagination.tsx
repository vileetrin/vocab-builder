import { useTranslations } from "next-intl";

import ArrowIcon from "@/assets/icons/ArrowIcon.svg";
import DoubleArrowIcon from "@/assets/icons/DoubleArrowIcon.svg";

const ELLIPSIS = "ellipsis";
const VISIBLE_PAGE_ITEMS = 5;

type PaginationProps = {
    page: number;
    totalPages: number;
    isDisabled?: boolean;
    onPageChange: (page: number) => void;
};

type PaginationItem = number | typeof ELLIPSIS;

function getPaginationItems(currentPage: number, totalPages: number): PaginationItem[] {
    if (totalPages <= VISIBLE_PAGE_ITEMS) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
        return [1, 2, 3, ELLIPSIS, totalPages];
    }

    if (currentPage >= totalPages - 2) {
        return [1, ELLIPSIS, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, ELLIPSIS, currentPage, ELLIPSIS, totalPages];
}

export default function Pagination({ page, totalPages, isDisabled = false, onPageChange }: PaginationProps) {
    const t = useTranslations();
    const safeTotalPages = Math.max(totalPages, 1);
    const safePage = Math.min(Math.max(page, 1), safeTotalPages);
    const pageItems = getPaginationItems(safePage, safeTotalPages);
    const hasPreviousPage = safePage > 1;
    const hasNextPage = safePage < safeTotalPages;

    return (
        <nav
            aria-label={t("dashboardPaginationLabel")}
            className="flex flex-nowrap items-center justify-center gap-1 text-sm text-text-primary sm:gap-2"
        >
            <button
                type="button"
                onClick={() => onPageChange(1)}
                disabled={!hasPreviousPage || isDisabled}
                aria-label={t("dashboardFirstPage")}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-text-primary transition-colors hover:bg-accent-muted disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:w-10"
            >
                <DoubleArrowIcon className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={() => onPageChange(Math.max(1, safePage - 1))}
                disabled={!hasPreviousPage || isDisabled}
                aria-label={t("dashboardPreviousPage")}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-text-primary transition-colors hover:bg-accent-muted disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:w-10"
            >
                <ArrowIcon className="h-3 w-3" />
            </button>
            <div className="flex flex-nowrap items-center justify-center gap-1 sm:gap-2">
                {pageItems.map((item, index) => {
                    if (item === ELLIPSIS) {
                        return (
                            <span
                                key={`${item}-${index}`}
                                aria-hidden="true"
                                className="inline-flex h-8 w-5 shrink-0 items-center justify-center font-medium text-text-muted sm:h-10 sm:w-8"
                            >
                                ...
                            </span>
                        );
                    }

                    const isCurrentPage = item === safePage;

                    return (
                        <button
                            key={item}
                            type="button"
                            onClick={() => onPageChange(item)}
                            disabled={isDisabled || isCurrentPage}
                            aria-current={isCurrentPage ? "page" : undefined}
                            aria-label={t("dashboardGoToPage", { page: item })}
                            className={`inline-flex h-8 min-w-8 shrink-0 items-center justify-center rounded-md border px-2 font-medium transition-colors disabled:cursor-not-allowed sm:h-10 sm:min-w-10 sm:px-3 ${
                                isCurrentPage
                                    ? "border-accent bg-accent text-text-on-accent"
                                    : "border-border text-text-primary hover:bg-accent-muted disabled:opacity-50"
                            }`}
                        >
                            {item}
                        </button>
                    );
                })}
            </div>
            <button
                type="button"
                onClick={() => onPageChange(Math.min(safeTotalPages, safePage + 1))}
                disabled={!hasNextPage || isDisabled}
                aria-label={t("dashboardNextPage")}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-text-primary transition-colors hover:bg-accent-muted disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:w-10"
            >
                <ArrowIcon className="h-3 w-3 rotate-180" />
            </button>
            <button
                type="button"
                onClick={() => onPageChange(safeTotalPages)}
                disabled={!hasNextPage || isDisabled}
                aria-label={t("dashboardLastPage")}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-text-primary transition-colors hover:bg-accent-muted disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:w-10"
            >
                <DoubleArrowIcon className="h-4 w-4 rotate-180" />
            </button>
        </nav>
    );
}
