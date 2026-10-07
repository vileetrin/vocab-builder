import StudyWordsStatistic from "@/features/common/dashboard/DashboardActions/StudyWordsStatistic";
import AddNewWordButton from "@/features/common/dashboard/DashboardActions/AddNewWordButton";

export default function DashboardActions() {
    return (
        <div className="flex flex-row items-center gap-4">
            <StudyWordsStatistic />
            <AddNewWordButton />
        </div>
    );
}
