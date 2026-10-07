import { apiClient } from "@/lib/api/client";
import { readAuthToken } from "@/features/auth/session";
import type {
    GetOwnDictionaryParams,
    GetOwnDictionaryResponse,
    OwnDictionaryPage,
    OwnDictionaryWord,
    OwnDictionaryWordResponse
} from "@/features/dictionary/api/types";

function mapOwnDictionaryWord(word: OwnDictionaryWordResponse): OwnDictionaryWord {
    return {
        id: word._id,
        word: word.en,
        translation: word.ua,
        category: word.category,
        progress: word.progress
    };
}

export async function getOwnDictionary(params: GetOwnDictionaryParams = {}): Promise<OwnDictionaryPage> {
    const token = readAuthToken();
    const { data } = await apiClient.get<GetOwnDictionaryResponse>(
        "/words/own",
        {
            params,
            ...(token
                ? {
                      headers: {
                          Authorization: `Bearer ${token}`
                      }
                  }
                : {})
        }
    );

    return {
        results: data.results.map(mapOwnDictionaryWord),
        totalPages: data.totalPages,
        page: data.page,
        perPage: data.perPage
    };
}
