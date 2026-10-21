import { useContext } from "react";
import { StateContext, type StateContextType } from "../context/StateContextDefinition";

export function useAppState(): StateContextType {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useAppState must be used within a StateProvider");
  }
  return context;
}
