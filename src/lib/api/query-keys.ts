export const queryKeys = {
    user: ["user"] as const,
    words: {
        all: ["words"] as const,
        own: (page: number, limit: number, filters: { keyword?: string; category?: string }) =>
            [...queryKeys.words.all, "own", { page, limit, ...filters }] as const
    },
    statistics: ["statistics"] as const
};
