import { useContext } from "react";
import { HistoryContext, type HistoryContextType } from "../context/HistoryContextDefinition";

export function useHistory(): HistoryContextType {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error(
      "useHistory must be used within a HistoryProvider (wrapped inside StateProvider)"
    );
  }
  return context;
}
