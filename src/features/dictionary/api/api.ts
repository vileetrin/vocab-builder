import { apiClient } from "@/lib/api/client";
import { readAuthToken } from "@/features/auth/session";
import {
    CreateNewWordPayload,
    EditWordPayload,
    GetOwnDictionaryParams,
    GetOwnDictionaryResponse,
    OwnDictionaryPage,
    OwnDictionaryWord,
    OwnDictionaryWordResponse
} from "@/features/dictionary/api/types";

function getAuthHeaders() {
    const token = readAuthToken();

    return token
        ? {
              Authorization: `Bearer ${token}`
          }
        : undefined;
}

export function hasAuthToken() {
    return Boolean(readAuthToken());
}

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
    const { data } = await apiClient.get<GetOwnDictionaryResponse>("/words/own", {
        params,
        headers: getAuthHeaders()
    });

    return {
        results: data.results.map(mapOwnDictionaryWord),
        totalPages: data.totalPages,
        page: data.page,
        perPage: data.perPage
    };
}

export async function createNewWord(payload: CreateNewWordPayload): Promise<OwnDictionaryWord> {
    const { data } = await apiClient.post<OwnDictionaryWordResponse>(`/words/create`, payload, {
        headers: getAuthHeaders()
    });

    return mapOwnDictionaryWord(data);
}

export async function editWord(id: string, payload: EditWordPayload): Promise<OwnDictionaryWord> {
    const { data } = await apiClient.patch<OwnDictionaryWordResponse>(`/words/edit/${id}`, payload, {
        headers: getAuthHeaders()
    });

    return mapOwnDictionaryWord(data);
}

export async function deleteWord(id: string) {
    await apiClient.delete(`/words/delete/${id}`, {
        headers: getAuthHeaders()
    });
}
