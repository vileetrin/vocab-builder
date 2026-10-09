"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useTranslations } from "next-intl";
import { type FormEvent, useState } from "react";

import UkraineIcon from "@/assets/icons/Ukraine.svg";
import UnitedKingdomIcon from "@/assets/icons/UnitedKingdom.svg";
import AddNewWordButton from "@/features/common/dashboard/DashboardActions/AddNewWordButton";
import AddWordTextInput from "@/features/common/dashboard/DashboardActions/AddWordTextInput";
import { CATEGORY_OPTIONS } from "@/features/common/dashboard/categoryOptions";
import { CommonDialog, CommonDialogClose } from "@/features/common/dialog";
import Dropdown from "@/features/common/dropdown";
import { clearAuthSession } from "@/features/auth/session";
import { createNewWord, hasAuthToken } from "@/features/dictionary/api/api";
import { useRouter } from "@/i18n/navigation";
import { queryKeys } from "@/lib/api/query-keys";

export default function AddNewWordDialog() {
    const t = useTranslations();
    const router = useRouter();
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const [category, setCategory] = useState<string>(CATEGORY_OPTIONS[0].value);
    const [ua, setUa] = useState("");
    const [en, setEn] = useState("");
    const categoryOptions = CATEGORY_OPTIONS.map((option) => ({
        value: option.value,
        label: t(option.labelKey)
    }));
    const isFormComplete = Boolean(category && ua.trim() && en.trim());
    const mutation = useMutation({
        mutationFn: createNewWord,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: queryKeys.words.all });
            setCategory(CATEGORY_OPTIONS[0].value);
            setUa("");
            setEn("");
            setIsOpen(false);
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

        mutation.mutate({
            en: en.trim(),
            ua: ua.trim(),
            category
        });
    };

    return (
        <CommonDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            trigger={<AddNewWordButton />}
            title={t("addWord")}
            description={t("addWordDescription")}
            classes={{
                contentClassName: "bg-accent px-4 py-12 text-text-on-accent md:px-16",
                headerClassName: "mb-4 md:mb-8",
                titleClassName: "text-[24px] font-bold text-text-on-accent md:text-[40px]",
                descriptionClassName: "text-[16px] font-normal text-text-on-accent/80 md:text-[20px]"
            }}
        >
            <form aria-describedby={mutation.isError ? "add-word-error" : undefined} onSubmit={handleSubmit}>
                <Dropdown
                    className="w-51 max-w-full"
                    iconClassName="text-text-on-accent"
                    label={t("filterCategoryLabel")}
                    menuClassName="top-[calc(100%+8px)] left-0 max-h-80 w-full rounded-[15px] border border-text-on-accent/30 bg-white py-2 shadow-[0_8px_24px_rgb(18_20_23/12%)]"
                    onChange={setCategory}
                    optionClassName="px-6 py-2.5 text-sm text-text-primary hover:bg-accent-muted"
                    options={categoryOptions}
                    placeholder={t("filterCategoryPlaceholder")}
                    triggerClassName="h-12 rounded-[15px] border border-text-on-accent/30 bg-transparent px-6 text-base text-text-on-accent hover:bg-white/10 focus:bg-white/10"
                    value={category}
                />
                <div className="mt-4 flex flex-col gap-4">
                    <AddWordTextInput
                        id="add-word-ukrainian"
                        label={t("dashboardColumnTranslation")}
                        language={t("uk")}
                        placeholder={t("dashboardColumnTranslation")}
                        Icon={UkraineIcon}
                        value={ua}
                        required
                        onChange={(event) => setUa(event.target.value)}
                    />
                    <AddWordTextInput
                        id="add-word-english"
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
                    <p id="add-word-error" className="mt-4 text-[12px] text-text-on-accent/80" role="alert">
                        {t("addWordFailed")}
                    </p>
                )}
                <div className="mt-8 flex w-full gap-3">
                    <button
                        type="submit"
                        disabled={!isFormComplete || mutation.isPending}
                        className="flex-1 rounded-[30px] bg-text-on-accent px-6 py-3 text-[18px] font-bold text-accent transition-colors hover:bg-text-on-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {mutation.isPending ? t("addingWord") : t("add")}
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
