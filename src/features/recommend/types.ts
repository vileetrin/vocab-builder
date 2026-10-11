import type { WordCategory } from "@/features/common/dashboard/categoryOptions";

export type RecommendedWordResponse = {
    _id: string;
    en: string;
    ua: string;
    category: WordCategory;
};

export type RecommendedWord = {
    id: string;
    word: string;
    translation: string;
    category: WordCategory;
};

export type GetRecommendedWordsResponse = {
    results: RecommendedWordResponse[];
    totalPages: number;
    page: number;
    perPage: number;
};

export type GetRecommendedWordsParams = {
    page?: number;
    limit?: number;
    keyword?: string;
    category?: WordCategory;
};

export type RecommendedWordsPage = {
    results: RecommendedWord[];
    totalPages: number;
    page: number;
    perPage: number;
};
