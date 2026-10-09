"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import DotsIcon from "@/assets/icons/DotsIcon.svg";
import EditIcon from "@/assets/icons/EditIcon.svg";
import TrashBinIcon from "@/assets/icons/TrashBinIcon.svg";
import { clearAuthSession } from "@/features/auth/session";
import { deleteWord, hasAuthToken } from "@/features/dictionary/api/api";
import EditWordDialog from "@/features/dictionary/components/EditWordDialog";
import type { OwnDictionaryWord } from "@/features/dictionary/api/types";
import { useRouter } from "@/i18n/navigation";
import { queryKeys } from "@/lib/api/query-keys";

type DictionaryRowActionsProps = {
    word: OwnDictionaryWord;
};

type MenuPosition = {
    left: number;
    top: number;
};

function getMenuPosition(button: HTMLButtonElement): MenuPosition {
    const rect = button.getBoundingClientRect();

    return {
        left: Math.max(16, rect.right - 128),
        top: rect.bottom + 8
    };
}

export default function DictionaryRowActions({ word }: DictionaryRowActionsProps) {
    const t = useTranslations();
    const router = useRouter();
    const queryClient = useQueryClient();
    const menuId = useId();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const editButtonRef = useRef<HTMLButtonElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState<MenuPosition>();
    const [isEditOpen, setIsEditOpen] = useState(false);

    useEffect(() => {
        if (!isMenuOpen) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target as Node;

            if (buttonRef.current?.contains(target) || menuRef.current?.contains(target)) {
                return;
            }

            setIsMenuOpen(false);
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
                buttonRef.current?.focus();
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isMenuOpen]);

    useEffect(() => {
        if (isMenuOpen) {
            editButtonRef.current?.focus();
        }
    }, [isMenuOpen]);

    const handleAuthError = (error: unknown) => {
        if (isAxiosError(error) && error.response?.status === 401) {
            clearAuthSession();
            router.replace("/signin");
        }
    };

    const deleteMutation = useMutation({
        mutationFn: () => deleteWord(word.id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: queryKeys.words.all });
            setIsMenuOpen(false);
        },
        onError: handleAuthError
    });

    const toggleMenu = () => {
        const button = buttonRef.current;

        if (!button) {
            return;
        }

        setMenuPosition(getMenuPosition(button));
        setIsMenuOpen((current) => !current);
    };

    const openEditDialog = () => {
        if (!hasAuthToken()) {
            router.replace("/signin");
            return;
        }

        setIsMenuOpen(false);
        setIsEditOpen(true);
    };

    const handleDelete = () => {
        if (!hasAuthToken()) {
            router.replace("/signin");
            return;
        }

        deleteMutation.mutate();
    };

    return (
        <>
            <button
                ref={buttonRef}
                type="button"
                aria-label={t("dashboardOpenRowMenu", { word: word.word })}
                aria-expanded={isMenuOpen}
                aria-controls={isMenuOpen ? menuId : undefined}
                aria-haspopup="menu"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-accent-muted md:h-10 md:w-10"
                onClick={toggleMenu}
            >
                <DotsIcon className="h-3 w-4 md:h-4 md:w-5" />
            </button>

            {isMenuOpen &&
                menuPosition &&
                createPortal(
                    <div
                        id={menuId}
                        ref={menuRef}
                        role="menu"
                        className="fixed z-50 w-32 rounded-[15px] bg-white py-2 shadow-[0_8px_24px_rgb(18_20_23/12%)]"
                        style={{ left: menuPosition.left, top: menuPosition.top }}
                    >
                        <button
                            ref={editButtonRef}
                            type="button"
                            role="menuitem"
                            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm font-medium text-text-primary transition-colors hover:bg-accent-muted"
                            onClick={openEditDialog}
                        >
                            <EditIcon className="h-4 w-4 text-accent" />
                            {t("edit")}
                        </button>
                        <button
                            type="button"
                            role="menuitem"
                            disabled={deleteMutation.isPending}
                            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm font-medium text-text-primary transition-colors hover:bg-accent-muted disabled:cursor-not-allowed disabled:opacity-60"
                            onClick={handleDelete}
                        >
                            <TrashBinIcon className="h-4 w-4 text-accent" />
                            {t("delete")}
                        </button>
                    </div>,
                    document.body
                )}

            <EditWordDialog open={isEditOpen} word={word} onOpenChange={setIsEditOpen} />
        </>
    );
}
