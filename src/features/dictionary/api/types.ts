export type OwnDictionaryWordResponse = {
    _id: string;
    en: string;
    ua: string;
    category: string;
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
    category: string;
    progress: number;
};

export type GetOwnDictionaryParams = {
    page?: number;
    limit?: number;
    keyword?: string;
    category?: string;
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
    category: string;
};

export type EditWordPayload = CreateNewWordPayload;
