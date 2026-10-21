import { createContext } from "react";
import type { AppState } from "../types";

export interface StateContextType extends AppState {
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string | null) => void;
  toggleTag: (tag: string) => void;
  clearFilters: () => void;
  toggleDarkMode: () => void;
  openModal: (projectId: string) => void;
  closeModal: () => void;
  toggleCommandPalette: () => void;
  setScrollProgress: (progress: number) => void;
  setFilterState: (state: Pick<AppState, "searchQuery" | "activeCategory" | "activeTags">) => void;
}

export const StateContext = createContext<StateContextType | undefined>(undefined);
