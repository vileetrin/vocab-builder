import StudyWordsStatistic from "@/features/common/dashboard/DashboardActions/StudyWordsStatistic";
import AddNewWordDialog from "@/features/common/dashboard/DashboardActions/AddNewWordDialog";

export default function DashboardActions() {
    return (
        <div className="flex flex-row items-center gap-4">
            <StudyWordsStatistic />
            <AddNewWordDialog />
        </div>
    );
}
