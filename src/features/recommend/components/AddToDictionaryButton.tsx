"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useTranslations } from "next-intl";

import LongArrowIcon from "@/assets/icons/LongArrowIcon.svg";
import { clearAuthSession } from "@/features/auth/session";
import { hasAuthToken } from "@/features/dictionary/api/api";
import { addWord } from "@/features/recommend/api";
import type { RecommendedWord } from "@/features/recommend/types";
import { useRouter } from "@/i18n/navigation";
import { queryKeys } from "@/lib/api/query-keys";

export default function AddToDictionaryButton({ word }: { word: RecommendedWord }) {
    const t = useTranslations();
    const router = useRouter();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: () => addWord(word.id),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: queryKeys.words.all }),
                queryClient.invalidateQueries({ queryKey: queryKeys.recommended.all }),
                queryClient.invalidateQueries({ queryKey: queryKeys.statistics })
            ]);
        },
        onError: (error) => {
            if (isAxiosError(error) && error.response?.status === 401) {
                clearAuthSession();
                router.replace("/signin");
            }
        }
    });

    const handleAdd = () => {
        if (!hasAuthToken()) {
            router.replace("/signin");
            return;
        }

        mutation.mutate();
    };

    return (
        <button
            type="button"
            aria-label={`${t("addToDictionary")}: ${word.word}`}
            disabled={mutation.isPending}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium text-text-primary transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-60 md:text-base"
            onClick={handleAdd}
        >
            {t("addToDictionary")}
            <LongArrowIcon aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />
        </button>
    );
}
