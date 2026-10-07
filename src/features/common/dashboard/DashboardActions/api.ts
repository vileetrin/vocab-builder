import { apiClient } from "@/lib/api/client";

type GetStatisticsResponse = {
    totalCount: number;
};

export async function getStatistics(): Promise<number> {
    const { data } = await apiClient.get<GetStatisticsResponse>("/words/statistics");

    return data.totalCount;
}
