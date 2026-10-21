import { useState, useEffect, type ReactNode } from "react";
import type { AppState } from "../types";
import { StateContext, type StateContextType } from "./StateContextDefinition";

export function StateProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Sync dark mode class on document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory(null);
    setActiveTags([]);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const openModal = (projectId: string) => {
    setActiveModal(projectId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const toggleCommandPalette = () => {
    setIsCommandPaletteOpen((prev) => !prev);
  };

  const setFilterState = (state: Pick<AppState, "searchQuery" | "activeCategory" | "activeTags">) => {
    setSearchQuery(state.searchQuery);
    setActiveCategory(state.activeCategory);
    setActiveTags(state.activeTags);
  };

  const value: StateContextType = {
    searchQuery,
    activeCategory,
    activeTags,
    isDarkMode,
    activeModal,
    isCommandPaletteOpen,
    scrollProgress,
    setSearchQuery,
    setActiveCategory,
    toggleTag,
    clearFilters,
    toggleDarkMode,
    openModal,
    closeModal,
    toggleCommandPalette,
    setScrollProgress,
    setFilterState,
  };

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
}
