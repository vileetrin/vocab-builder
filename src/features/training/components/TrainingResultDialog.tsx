import Image from "next/image";
import { useTranslations } from "next-intl";
import type { TrainingAnswerResult } from "@/features/training/api";
import { CommonDialog } from "@/features/common/dialog";
import Book from "@/assets/images/Book.png";

type TrainingResultDialogProps = {
    open: boolean;
    results?: TrainingAnswerResult[];
    onOpenChange: (open: boolean) => void;
};

function ResultList({ emptyText, items }: { emptyText: string; items: TrainingAnswerResult[] }) {
    if (items.length === 0) {
        return <p className="text-[14px] text-text-on-accent/50 md:text-[16px]">{emptyText}</p>;
    }

    return (
        <ul className="space-y-2 text-[16px] font-medium text-text-on-accent md:text-[20px]">
            {items.map((item) => (
                <li key={`${item._id}:${item.task}`}>{item.task === "en" ? item.en : item.ua}</li>
            ))}
        </ul>
    );
}

export default function TrainingResultDialog({ open, results = [], onOpenChange }: TrainingResultDialogProps) {
    const t = useTranslations();
    const correctAnswers = results.filter((item) => item.isDone);
    const mistakes = results.filter((item) => !item.isDone);

    return (
        <CommonDialog
            open={open}
            onOpenChange={onOpenChange}
            accessibleTitle={t("trainingResultTitle")}
            classes={{
                contentClassName: "overflow-hidden bg-accent px-4 pt-12 pb-0 text-text-on-accent md:px-16 md:pt-14"
            }}
        >
            <div className="relative min-h-89 pb-32 md:min-h-98 md:pb-36">
                <h2 className="text-center text-[24px] font-bold text-text-on-accent md:text-[40px]">
                    {t("trainingResultTitle")}
                </h2>
                <div className="mt-8 grid gap-8 md:grid-cols-2">
                    <section aria-labelledby="training-correct-answers">
                        <h3
                            id="training-correct-answers"
                            className="mb-4 text-[14px] font-bold text-text-on-accent/50 md:text-[16px]"
                        >
                            {t("trainingCorrectAnswers")}
                        </h3>
                        <ResultList emptyText={t("trainingNoCorrectAnswers")} items={correctAnswers} />
                    </section>
                    <section aria-labelledby="training-mistakes">
                        <h3
                            id="training-mistakes"
                            className="mb-4 text-[14px] font-bold text-text-on-accent/50 md:text-[16px]"
                        >
                            {t("trainingMistakes")}
                        </h3>
                        <ResultList emptyText={t("trainingNoMistakes")} items={mistakes} />
                    </section>
                </div>
                <Image
                    src={Book}
                    alt=""
                    width={212}
                    height={179}
                    className="absolute -right-4 bottom-0 h-30 w-auto object-contain md:-right-16 md:h-40"
                />
            </div>
        </CommonDialog>
    );
}
