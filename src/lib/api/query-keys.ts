export const queryKeys = {
  user: ["user"] as const,
  words: {
    all: ["words"] as const,
    own: (page: number, limit: number) =>
      [...queryKeys.words.all, "own", { page, limit }] as const,
  },
};
