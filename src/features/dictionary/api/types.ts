import type { WordCategory } from "@/features/common/dashboard/categoryOptions";

export type OwnDictionaryWordResponse = {
    _id: string;
    en: string;
    ua: string;
    category: WordCategory;
    owner: string;
    progress: number;
};

export type GetOwnDictionaryResponse = {
    results: OwnDictionaryWordResponse[];
    totalPages: number;
    page: number;
    perPage: number;
};

export type OwnDictionaryWord = {
    id: string;
    word: string;
    translation: string;
    category: WordCategory;
    progress: number;
};

export type GetOwnDictionaryParams = {
    page?: number;
    limit?: number;
    keyword?: string;
    category?: WordCategory;
};

export type OwnDictionaryPage = {
    results: OwnDictionaryWord[];
    totalPages: number;
    page: number;
    perPage: number;
};

export type CreateNewWordPayload = {
    en: string;
    ua: string;
    category: WordCategory;
};

export type EditWordPayload = CreateNewWordPayload;
