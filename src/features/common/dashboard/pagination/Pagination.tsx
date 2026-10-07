import { useTranslations } from "next-intl";

import ArrowIcon from "@/assets/icons/ArrowIcon.svg";
import DoubleArrowIcon from "@/assets/icons/DoubleArrowIcon.svg";

type PaginationProps = {
  page: number;
  totalPages: number;
  isDisabled?: boolean;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  isDisabled = false,
  onPageChange,
}: PaginationProps) {
  const t = useTranslations();
  const safeTotalPages = Math.max(totalPages, 1);
  const pageNumbers = Array.from(
    { length: safeTotalPages },
    (_, index) => index + 1,
  );
  const hasPreviousPage = page > 1;
  const hasNextPage = page < safeTotalPages;

  return (
    <nav
      aria-label={t("dashboardPaginationLabel")}
      className="flex flex-wrap items-center justify-center gap-2 text-sm text-text-primary"
    >
      <button
        type="button"
        onClick={() => onPageChange(1)}
        disabled={!hasPreviousPage || isDisabled}
        aria-label={t("dashboardFirstPage")}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-text-primary transition-colors hover:bg-accent-muted disabled:cursor-not-allowed disabled:opacity-50"
      >
        <DoubleArrowIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={!hasPreviousPage || isDisabled}
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
              onClick={() => onPageChange(pageNumber)}
              disabled={isDisabled || isCurrentPage}
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
        onClick={() => onPageChange(Math.min(safeTotalPages, page + 1))}
        disabled={!hasNextPage || isDisabled}
        aria-label={t("dashboardNextPage")}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-text-primary transition-colors hover:bg-accent-muted disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ArrowIcon className="h-3 w-3 rotate-180" />
      </button>
      <button
        type="button"
        onClick={() => onPageChange(safeTotalPages)}
        disabled={!hasNextPage || isDisabled}
        aria-label={t("dashboardLastPage")}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-text-primary transition-colors hover:bg-accent-muted disabled:cursor-not-allowed disabled:opacity-50"
      >
        <DoubleArrowIcon className="h-4 w-4 rotate-180" />
      </button>
    </nav>
  );
}
