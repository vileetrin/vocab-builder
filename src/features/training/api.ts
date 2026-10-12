import { getAuthHeaders } from "@/features/dictionary/api/api";
import { apiClient } from "@/lib/api/client";

export type TrainingTask = {
    id: string;
    word: string;
    translateToLocale: "ua" | "en";
};

export type TrainingAnswerPayload = {
    _id: string;
    en: string;
    ua: string;
    task: "ua" | "en";
};

export type TrainingAnswerResult = TrainingAnswerPayload & {
    isDone: boolean;
};

type RawTrainingTask = Partial<TrainingTask> & {
    _id?: string;
    en?: string;
    ua?: string;
    task?: "ua" | "en";
};

type TrainingTasksResponse = RawTrainingTask[] | { tasks: RawTrainingTask[] };

function getTaskId(task: RawTrainingTask) {
    return task.id ?? task._id ?? "";
}

function normalizeTrainingTask(task: RawTrainingTask): TrainingTask[] {
    const id = getTaskId(task);

    if (task.task) {
        const word = task.task === "en" ? (task.ua ?? task.word ?? "") : (task.en ?? task.word ?? "");

        return [
            {
                id,
                word,
                translateToLocale: task.task
            }
        ];
    }

    return [];
}

export async function getTrainingTasks(): Promise<TrainingTask[]> {
    const { data } = await apiClient.get<TrainingTasksResponse>("/words/tasks", {
        headers: getAuthHeaders()
    });
    const tasks = Array.isArray(data) ? data : data.tasks;

    return tasks.flatMap(normalizeTrainingTask).filter((task) => task.id && task.word);
}

export async function submitTrainingAnswers(payload: TrainingAnswerPayload[]): Promise<TrainingAnswerResult[]> {
    const { data } = await apiClient.post<TrainingAnswerResult[]>("/words/answers", payload, {
        headers: getAuthHeaders()
    });

    return data;
}
