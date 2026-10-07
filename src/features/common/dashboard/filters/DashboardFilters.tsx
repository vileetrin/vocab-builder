import { useTranslations } from "next-intl";

import CategoryDropdown, {
  type CategoryOption,
} from "@/features/common/dashboard/filters/CategoryDropdown";
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
  { value: "functional phrase", labelKey: "categoryFunctionalPhrase" },
];

type DashboardFiltersProps = {
  keyword: string;
  category?: string;
  onKeywordChange: (keyword: string) => void;
  onCategoryChange: (category: string) => void;
};

export default function DashboardFilters({
  keyword,
  category,
  onKeywordChange,
  onCategoryChange,
}: DashboardFiltersProps) {
  const t = useTranslations();
  const categoryOptions: CategoryOption[] = CATEGORY_OPTIONS.map((option) => ({
    value: option.value,
    label: t(option.labelKey),
  }));

  return (
    <div className="flex flex-row flex-wrap gap-2">
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
    </div>
  );
}
