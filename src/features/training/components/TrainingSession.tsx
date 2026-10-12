import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import type { TrainingTask } from "@/features/training/api";
import { submitTrainingAnswers } from "@/features/training/api";
import ProgressCircle from "@/features/common/dashboard/ProgressCircle";
import TranslateField from "@/features/training/components/TranslateField";
import TrainingResultDialog from "@/features/training/components/TrainingResultDialog";
import { useTrainingSession } from "@/features/training/components/useTrainingSession";
import { useRouter } from "@/i18n/navigation";
import { queryKeys } from "@/lib/api/query-keys";

type TrainingSessionProps = {
    tasks: TrainingTask[];
};

export default function TrainingSession({ tasks }: TrainingSessionProps) {
    const t = useTranslations();
    const router = useRouter();
    const queryClient = useQueryClient();
    const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);
    const {
        answerPayloads,
        currentTaskKey,
        getFieldProps,
        goToNextTask,
        inputLanguageError,
        isLastTask,
        progressValue,
        remainingTaskCount,
        resetTrainingSession
    } = useTrainingSession(tasks);
    const mutation = useMutation({
        mutationFn: submitTrainingAnswers,
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: queryKeys.words.all }),
                queryClient.invalidateQueries({ queryKey: queryKeys.statistics }),
                queryClient.invalidateQueries({ queryKey: queryKeys.training })
            ]);
            resetTrainingSession();
            setIsResultDialogOpen(true);
        }
    });
    const handleCancel = () => {
        router.push("/dictionary");
    };
    const handleSave = () => {
        mutation.mutate(answerPayloads);
    };

    return (
        <section className="px-4 pt-6 pb-19 md:px-8 md:pt-15.5 lg:px-25" aria-label={t("trainingTitle")}>
            <div className="flex justify-end">
                <ProgressCircle
                    value={progressValue}
                    valueLabel={String(remainingTaskCount)}
                    label={t("trainingTasksProgressLabel")}
                    showValue={true}
                    valueText={t("trainingRemainingTasksLabel", { count: remainingTaskCount })}
                    classes={{
                        outCircleClass: "w-11 h-11",
                        inCircleClass: "w-8 h-8"
                    }}
                />
            </div>
            <div className="mt-6 flex h-97.25 max-h-97.25 w-full flex-col md:mt-8 md:h-141.25 md:max-h-141.25 lg:h-75.5 lg:max-h-75.5 lg:flex-row">
                <TranslateField
                    key={`${currentTaskKey}:en`}
                    locale="en"
                    showNextButton={!isLastTask}
                    onNext={goToNextTask}
                    {...getFieldProps("en")}
                />
                <div aria-hidden="true" className="h-px w-full shrink-0 bg-border lg:h-full lg:w-px" />
                <TranslateField key={`${currentTaskKey}:ua`} locale="ua" {...getFieldProps("ua")} />
            </div>
            {inputLanguageError && (
                <p className="mt-3 text-[14px] text-error" role="alert">
                    {t("trainingLanguageInputError", {
                        language: inputLanguageError === "en" ? t("en") : t("uk")
                    })}
                </p>
            )}
            {mutation.isError && (
                <p className="mt-4 text-[14px] text-error" role="alert">
                    {t("trainingSaveError")}
                </p>
            )}
            <div className="mt-8 flex w-full flex-col gap-3 md:flex-row md:justify-start">
                <button
                    type="button"
                    className="inline-flex h-14 items-center justify-center rounded-[30px] border border-accent px-8 text-[16px] font-bold text-accent transition-colors hover:bg-accent-muted md:min-w-44"
                    onClick={handleCancel}
                >
                    {t("cancel")}
                </button>
                <button
                    type="button"
                    className="inline-flex h-14 items-center justify-center rounded-[30px] bg-accent px-8 text-[16px] font-bold text-text-on-accent transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-accent md:min-w-44"
                    disabled={!isLastTask || answerPayloads.length === 0 || mutation.isPending}
                    onClick={handleSave}
                >
                    {mutation.isPending ? t("saving") : t("save")}
                </button>
            </div>
            <TrainingResultDialog
                open={isResultDialogOpen}
                onOpenChange={setIsResultDialogOpen}
                results={mutation.data}
            />
        </section>
    );
}
