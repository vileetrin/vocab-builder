import type { WordCategory } from "@/features/common/dashboard/categoryOptions";

type WordFilters = {
    keyword?: string;
    category?: WordCategory;
};

export const queryKeys = {
    user: ["user"] as const,
    words: {
        all: ["words"] as const,
        own: (page: number, limit: number, filters: WordFilters) =>
            [...queryKeys.words.all, "own", { page, limit, ...filters }] as const
    },
    statistics: ["statistics"] as const,
    recommended: {
        all: ["recommended"] as const,
        list: (page: number, limit: number, filters: WordFilters) =>
            [...queryKeys.recommended.all, { page, limit, ...filters }] as const
    }
};
