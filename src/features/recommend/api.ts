import type { OwnDictionaryWord, OwnDictionaryWordResponse } from "@/features/dictionary/api/types";
import { apiClient } from "@/lib/api/client";

// export async function addWord(id: string): Promise<OwnDictionaryWord> {
//     const { data } = await apiClient.post<OwnDictionaryWordResponse>(`/words/add/${id}`, undefined, {
//         headers: getAuthHeaders()
//     });
//
//     return mapOwnDictionaryWord(data);
// }
