"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";
import { type ReactNode } from "react";

import CloseIcon from "@/assets/icons/CloseIcon.svg";

type CommonDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    trigger: ReactNode;
    title?: ReactNode;
    description?: ReactNode;
    children: ReactNode;
    classes?: {
        contentClassName?: string;
        headerClassName?: string;
        titleClassName?: string;
        descriptionClassName?: string;
    };
};

export function CommonDialog({
    open,
    onOpenChange,
    trigger,
    title,
    description,
    children,
    classes
}: CommonDialogProps) {
    const t = useTranslations();
    const hasHeader = Boolean(title || description);

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-40 bg-text-primary/40" />
                <Dialog.Content
                    className={`fixed left-1/2 top-1/2 z-50 w-[calc(100%-32px)] max-w-157 -translate-x-1/2 -translate-y-1/2 rounded-[15px] shadow-xl md:w-[calc(100%-140px)] ${classes?.contentClassName ?? ""}`}
                >
                    <Dialog.Close asChild>
                        <button
                            type="button"
                            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-current transition-colors hover:bg-accent-muted focus-visible:bg-accent-muted focus-visible:outline-none"
                            aria-label={t("closeDialog")}
                        >
                            <CloseIcon className="h-4 w-4" />
                        </button>
                    </Dialog.Close>

                    {hasHeader && (
                        <div className={classes?.headerClassName}>
                            {title && <Dialog.Title className={classes?.titleClassName}>{title}</Dialog.Title>}
                            {description && (
                                <Dialog.Description
                                    className={`${title ? "mt-4 " : ""}${classes?.descriptionClassName ?? ""}`}
                                >
                                    {description}
                                </Dialog.Description>
                            )}
                        </div>
                    )}

                    {children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export function CommonDialogClose(props: Dialog.DialogCloseProps) {
    return <Dialog.Close {...props} />;
}
