import { useEffect } from "react";
import { useAppState } from "./useAppState";
import { useHistory } from "./useHistory";

export function useKeyboardShortcuts() {
  const {
    toggleCommandPalette,
    closeModal,
    clearFilters,
    activeModal,
    isCommandPaletteOpen,
  } = useAppState();
  const { undo, redo } = useHistory();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      const mod = e.metaKey || e.ctrlKey;

      // Ctrl/Cmd + K: Toggle Command Palette
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggleCommandPalette();
        return;
      }

      // Escape: Close active modal -> Close Command Palette -> Clear filters
      if (e.key === "Escape") {
        if (activeModal) {
          closeModal();
        } else if (isCommandPaletteOpen) {
          toggleCommandPalette();
        } else {
          clearFilters();
        }
        return;
      }

      // Ctrl/Cmd + Shift + Z: Redo
      if (mod && e.shiftKey && e.key.toLowerCase() === "z") {
        e.preventDefault();
        redo();
        return;
      }

      // Ctrl/Cmd + Z: Undo
      if (mod && e.key.toLowerCase() === "z") {
        e.preventDefault();
        undo();
        return;
      }

      // / : Focus global search input when not typing in an input
      if (e.key === "/" && !mod && !isInput) {
        e.preventDefault();
        const searchInput = document.getElementById("search-input");
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    activeModal,
    isCommandPaletteOpen,
    toggleCommandPalette,
    closeModal,
    clearFilters,
    undo,
    redo,
  ]);
}
