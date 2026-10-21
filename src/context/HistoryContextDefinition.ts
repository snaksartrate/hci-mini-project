import { createContext } from "react";
import type { HistoryEntry } from "../types";

export interface HistoryContextType {
  past: HistoryEntry[];
  future: HistoryEntry[];
  pushState: (label: string, filterState?: HistoryEntry["state"]) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const HistoryContext = createContext<HistoryContextType | undefined>(undefined);
