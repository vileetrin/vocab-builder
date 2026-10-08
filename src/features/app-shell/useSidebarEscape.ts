"use client";

import { useEffect } from "react";

export function useSidebarEscape(isSidebarOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isSidebarOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarOpen, onClose]);
}
