import type { WordCategory } from "@/features/common/dashboard/categoryOptions";

export type DashboardItem = {
    id: string;
    word: string;
    translation: string;
    category: WordCategory;
};
