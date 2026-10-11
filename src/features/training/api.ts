import { getAuthHeaders } from "@/features/dictionary/api/api";
import { apiClient } from "@/lib/api/client";

type TrainingTasksResponse = Array<{
    _id: string;
    ua: string;
    task: "ua" | "en";
}>;

type TrainingTask = {
    id: string;
    word: string;
    translateToLocale: "ua" | "en";
};

export async function getTrainingTasks(): Promise<TrainingTask[]> {
    const { data } = await apiClient.get<TrainingTasksResponse>("/words/tasks", {
        headers: getAuthHeaders()
    });

    return data.map((task) => {
        return {
            id: task._id,
            word: task.ua,
            translateToLocale: task.task
        };
    });
}
