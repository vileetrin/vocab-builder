"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import DotsIcon from "@/assets/icons/DotsIcon.svg";
import Dashboard, {
  type DashboardColumn,
} from "@/features/common/dashboard/Dashboard";
import ProgressCircle from "@/features/common/dashboard/ProgressCircle";
import { getOwnDictionary } from "@/features/dictionary/api/api";
import type { OwnDictionaryWord } from "@/features/dictionary/api/types";
import { queryKeys } from "@/lib/api/query-keys";

export default function DictionaryClient() {
  const t = useTranslations();
  const { data = [] } = useQuery({
    queryKey: queryKeys.words,
    queryFn: getOwnDictionary,
  });

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
      className: "w-11 text-right sm:w-14 md:w-18",
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

  return <Dashboard items={data} extraColumns={columns} />;
}
