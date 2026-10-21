import type { ReactNode, CSSProperties } from "react";
import { motion } from "framer-motion";
import { useFittsTarget, type FittsPriority } from "../../hooks/useFittsTarget";

export interface FittsButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  priority?: FittsPriority;
  icon?: ReactNode;
  shortcutBadge?: string;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  style?: CSSProperties;
}

export default function FittsButton({
  children,
  onClick,
  type = "button",
  priority = "secondary",
  icon,
  shortcutBadge,
  className = "",
  disabled = false,
  ariaLabel,
  style = {},
}: FittsButtonProps) {
  const { style: fittsStyle } = useFittsTarget(priority);

  const priorityStyles: Record<FittsPriority, string> = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-500/20 border border-blue-500/30",
    secondary:
      "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 shadow-xs",
    tertiary:
      "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-700",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ ...fittsStyle, ...style }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium text-sm transition-colors cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${priorityStyles[priority]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {shortcutBadge && (
        <kbd className="font-mono text-[11px] bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded border border-black/10 dark:border-white/10 text-current ml-1">
          {shortcutBadge}
        </kbd>
      )}
    </motion.button>
  );
}
