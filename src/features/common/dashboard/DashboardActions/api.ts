import { getAuthHeaders } from "@/features/dictionary/api/api";
import { apiClient } from "@/lib/api/client";

type GetStatisticsResponse = {
    totalCount: number;
};

export async function getStatistics(): Promise<number> {
    const { data } = await apiClient.get<GetStatisticsResponse>("/words/statistics", {
        headers: getAuthHeaders()
    });

    return data.totalCount;
}
