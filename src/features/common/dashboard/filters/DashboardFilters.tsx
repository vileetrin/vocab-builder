import { useTranslations } from "next-intl";

import TrashBinIcon from "@/assets/icons/TrashBinIcon.svg";
import CategoryDropdown, { type CategoryOption } from "@/features/common/dashboard/filters/CategoryDropdown";
import RegularityRadioGroup from "@/features/common/dashboard/filters/RegularityRadioGroup";
import SearchInput from "@/features/common/dashboard/filters/SearchInput";

const CATEGORY_OPTIONS = [
    { value: "verb", labelKey: "categoryVerb" },
    { value: "participle", labelKey: "categoryParticiple" },
    { value: "noun", labelKey: "categoryNoun" },
    { value: "adjective", labelKey: "categoryAdjective" },
    { value: "pronoun", labelKey: "categoryPronoun" },
    { value: "numerals", labelKey: "categoryNumerals" },
    { value: "adverb", labelKey: "categoryAdverb" },
    { value: "preposition", labelKey: "categoryPreposition" },
    { value: "conjunction", labelKey: "categoryConjunction" },
    { value: "phrasal verb", labelKey: "categoryPhrasalVerb" },
    { value: "functional phrase", labelKey: "categoryFunctionalPhrase" }
];

type DashboardFiltersProps = {
    keyword: string;
    category?: string;
    isIrregular?: boolean;
    onKeywordChange: (keyword: string) => void;
    onCategoryChange: (category: string) => void;
    onRegularityChange: (isIrregular: boolean) => void;
    onClear: () => void;
};

export default function DashboardFilters({
    keyword,
    category,
    isIrregular,
    onKeywordChange,
    onCategoryChange,
    onRegularityChange,
    onClear
}: DashboardFiltersProps) {
    const t = useTranslations();
    const hasActiveFilters = keyword.trim().length > 0 || Boolean(category) || typeof isIrregular === "boolean";
    const categoryOptions: CategoryOption[] = CATEGORY_OPTIONS.map((option) => ({
        value: option.value,
        label: t(option.labelKey)
    }));

    return (
    <form
      role="search"
      aria-label={t("dashboardFiltersLabel")}
      className="flex flex-row flex-wrap gap-2"
      onSubmit={(event) => event.preventDefault()}
    >
      <SearchInput
        value={keyword}
        onChange={onKeywordChange}
        placeholder={t("filterSearchPlaceholder")}
        label={t("filterSearchLabel")}
      />
      <CategoryDropdown
        value={category}
        onChange={onCategoryChange}
        options={categoryOptions}
        placeholder={t("filterCategoryPlaceholder")}
        label={t("filterCategoryLabel")}
      />
      <button
        type="button"
        aria-label={t("filterClearLabel")}
                disabled={!hasActiveFilters}
                className="inline-flex h-12 w-12 items-center justify-center rounded-[15px] text-text-primary transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-text-primary"
                onClick={onClear}
      >
        <TrashBinIcon aria-hidden="true" className="h-5 w-5" />
      </button>
      <RegularityRadioGroup
        isIrregular={isIrregular}
        label={t("filterRegularityLabel")}
        onChange={onRegularityChange}
      />
    </form>
  );
}
