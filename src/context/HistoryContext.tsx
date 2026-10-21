import { useState, useCallback, type ReactNode } from "react";
import type { HistoryEntry } from "../types";
import { useAppState } from "../hooks/useAppState";
import { HistoryContext, type HistoryContextType } from "./HistoryContextDefinition";

export function HistoryProvider({ children }: { children: ReactNode }) {
  const { searchQuery, activeCategory, activeTags, setFilterState } = useAppState();
  const [past, setPast] = useState<HistoryEntry[]>([]);
  const [future, setFuture] = useState<HistoryEntry[]>([]);

  const pushState = useCallback(
    (label: string, _nextState?: HistoryEntry["state"]) => {
      setPast((prev) => [
        ...prev,
        {
          label,
          state: {
            searchQuery,
            activeCategory,
            activeTags: [...activeTags],
          },
        },
      ]);
      setFuture([]);
    },
    [searchQuery, activeCategory, activeTags]
  );

  const undo = useCallback(() => {
    setPast((prevPast) => {
      if (prevPast.length === 0) return prevPast;
      const previous = prevPast[prevPast.length - 1];
      const newPast = prevPast.slice(0, prevPast.length - 1);

      setFuture((prevFuture) => [
        {
          label: "Undone state",
          state: {
            searchQuery,
            activeCategory,
            activeTags: [...activeTags],
          },
        },
        ...prevFuture,
      ]);

      setFilterState(previous.state);
      return newPast;
    });
  }, [searchQuery, activeCategory, activeTags, setFilterState]);

  const redo = useCallback(() => {
    setFuture((prevFuture) => {
      if (prevFuture.length === 0) return prevFuture;
      const next = prevFuture[0];
      const newFuture = prevFuture.slice(1);

      setPast((prevPast) => [
        ...prevPast,
        {
          label: "Redone state",
          state: {
            searchQuery,
            activeCategory,
            activeTags: [...activeTags],
          },
        },
      ]);

      setFilterState(next.state);
      return newFuture;
    });
  }, [searchQuery, activeCategory, activeTags, setFilterState]);

  const value: HistoryContextType = {
    past,
    future,
    pushState,
    undo,
    redo,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
  };

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
}
