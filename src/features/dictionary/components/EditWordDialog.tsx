"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useTranslations } from "next-intl";
import { type FormEvent, useState } from "react";

import UkraineIcon from "@/assets/icons/Ukraine.svg";
import UnitedKingdomIcon from "@/assets/icons/UnitedKingdom.svg";
import AddWordTextInput from "@/features/common/dashboard/DashboardActions/AddWordTextInput";
import { CommonDialog, CommonDialogClose } from "@/features/common/dialog";
import { clearAuthSession } from "@/features/auth/session";
import { editWord, hasAuthToken } from "@/features/dictionary/api/api";
import type { OwnDictionaryWord } from "@/features/dictionary/api/types";
import { useRouter } from "@/i18n/navigation";
import { queryKeys } from "@/lib/api/query-keys";

type EditWordDialogProps = {
    open: boolean;
    word: OwnDictionaryWord;
    onOpenChange: (open: boolean) => void;
};

export default function EditWordDialog({ open, word, onOpenChange }: EditWordDialogProps) {
    const t = useTranslations();
    const router = useRouter();
    const queryClient = useQueryClient();
    const [ua, setUa] = useState(word.translation);
    const [en, setEn] = useState(word.word);
    const isFormComplete = Boolean(ua.trim() && en.trim());

    const mutation = useMutation({
        mutationFn: () =>
            editWord(word.id, {
                en: en.trim(),
                ua: ua.trim(),
                category: word.category
            }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: queryKeys.words.all });
            onOpenChange(false);
        },
        onError: (error) => {
            if (isAxiosError(error) && error.response?.status === 401) {
                clearAuthSession();
                router.replace("/signin");
            }
        }
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isFormComplete || !hasAuthToken()) {
            if (!hasAuthToken()) {
                router.replace("/signin");
            }

            return;
        }

        mutation.mutate();
    };

    const handleOpenChange = (nextOpen: boolean) => {
        if (nextOpen) {
            setUa(word.translation);
            setEn(word.word);
        }

        onOpenChange(nextOpen);
    };

    return (
        <CommonDialog
            open={open}
            onOpenChange={handleOpenChange}
            accessibleTitle={t("edit")}
            classes={{
                contentClassName: "bg-accent px-4 py-12 text-text-on-accent md:px-16"
            }}
        >
            <form aria-describedby={mutation.isError ? "edit-word-error" : undefined} onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <AddWordTextInput
                        id={`edit-word-ukrainian-${word.id}`}
                        label={t("dashboardColumnTranslation")}
                        language={t("uk")}
                        placeholder={t("dashboardColumnTranslation")}
                        Icon={UkraineIcon}
                        value={ua}
                        required
                        onChange={(event) => setUa(event.target.value)}
                    />
                    <AddWordTextInput
                        id={`edit-word-english-${word.id}`}
                        label={t("dashboardColumnWord")}
                        language={t("en")}
                        placeholder={t("dashboardColumnWord")}
                        Icon={UnitedKingdomIcon}
                        value={en}
                        required
                        onChange={(event) => setEn(event.target.value)}
                    />
                </div>
                {mutation.isError && (
                    <p id="edit-word-error" className="mt-4 text-[12px] text-text-on-accent/80" role="alert">
                        {t("editWordFailed")}
                    </p>
                )}
                <div className="mt-8 flex w-full gap-3">
                    <button
                        type="submit"
                        disabled={!isFormComplete || mutation.isPending}
                        className="flex-1 rounded-[30px] bg-text-on-accent px-6 py-3 text-[18px] font-bold text-accent transition-colors hover:bg-text-on-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {mutation.isPending ? t("saving") : t("save")}
                    </button>
                    <CommonDialogClose asChild>
                        <button
                            type="button"
                            className="flex-1 rounded-[30px] border border-text-on-accent/40 bg-transparent px-6 py-3 text-[18px] font-bold text-text-on-accent transition-colors hover:bg-white/10"
                        >
                            {t("cancel")}
                        </button>
                    </CommonDialogClose>
                </div>
            </form>
        </CommonDialog>
    );
}
