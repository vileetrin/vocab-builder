import { getAuthHeaders, mapOwnDictionaryWord } from "@/features/dictionary/api/api";
import type { OwnDictionaryWord, OwnDictionaryWordResponse } from "@/features/dictionary/api/types";
import type {
    GetRecommendedWordsParams,
    GetRecommendedWordsResponse,
    RecommendedWord,
    RecommendedWordResponse,
    RecommendedWordsPage
} from "@/features/recommend/types";
import { apiClient } from "@/lib/api/client";

function mapRecommendedWord(word: RecommendedWordResponse): RecommendedWord {
    return {
        id: word._id,
        word: word.en,
        translation: word.ua,
        category: word.category
    };
}

export async function getRecommendedWords(params: GetRecommendedWordsParams = {}): Promise<RecommendedWordsPage> {
    const { data } = await apiClient.get<GetRecommendedWordsResponse>("/words/all", {
        params,
        headers: getAuthHeaders()
    });

    return {
        results: data.results.map(mapRecommendedWord),
        totalPages: data.totalPages,
        page: data.page,
        perPage: data.perPage
    };
}

export async function addWord(id: string): Promise<OwnDictionaryWord> {
    const { data } = await apiClient.post<OwnDictionaryWordResponse>(`/words/add/${id}`, undefined, {
        headers: getAuthHeaders()
    });

    return mapOwnDictionaryWord(data);
}
