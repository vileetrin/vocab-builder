import { apiClient } from "@/lib/api/client";
import { readAuthToken } from "@/features/auth/session";
import type {
    GetOwnDictionaryResponse,
    OwnDictionaryWord,
    OwnDictionaryWordResponse
} from "@/features/dictionary/api/types";

export async function getOwnDictionary(): Promise<OwnDictionaryWord[]> {
    const token = readAuthToken();
    const { data } = await apiClient.get<GetOwnDictionaryResponse>(
        "/words/own",
        token
            ? {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              }
            : undefined
    );

    return data.results.map((word: OwnDictionaryWordResponse): OwnDictionaryWord => ({
        id: word._id,
        word: word.en,
        translation: word.ua,
        category: word.category,
        progress: word.progress
    }));
}
