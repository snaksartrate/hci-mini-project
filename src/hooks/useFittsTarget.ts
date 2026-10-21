import type { CSSProperties } from "react";

export type FittsPriority = "primary" | "secondary" | "tertiary";

export interface FittsTargetStyle {
  minWidth: string;
  minHeight: string;
  padding: string;
}

export function useFittsTarget(priority: FittsPriority = "secondary"): {
  style: CSSProperties;
} {
  const sizes: Record<FittsPriority, FittsTargetStyle> = {
    primary: { minWidth: "56px", minHeight: "56px", padding: "14px 28px" },
    secondary: { minWidth: "48px", minHeight: "48px", padding: "12px 24px" },
    tertiary: { minWidth: "40px", minHeight: "40px", padding: "10px 20px" },
  };

  return { style: sizes[priority] };
}
