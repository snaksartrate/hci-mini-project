import { motion, AnimatePresence } from "framer-motion";
import { Undo2, X, Filter } from "lucide-react";
import { useAppState } from "../../hooks/useAppState";
import { useHistory } from "../../hooks/useHistory";

export default function SystemStatusBar() {
  const {
    scrollProgress,
    searchQuery,
    activeCategory,
    activeTags,
    clearFilters,
  } = useAppState();
  const { canUndo, undo } = useHistory();

  const hasActiveFilters =
    Boolean(searchQuery) || Boolean(activeCategory) || activeTags.length > 0;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Scroll Progress Bar */}
      <motion.div
        className="h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 origin-left w-full"
        style={{ scaleX: scrollProgress }}
        aria-hidden="true"
      />

      {/* Dynamic Status Notification Strip for Active Filters & Undo */}
      <AnimatePresence>
        {(hasActiveFilters || canUndo) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-between px-4 py-1.5 bg-gray-900/90 text-white dark:bg-gray-800/90 text-xs backdrop-blur-md border-b border-gray-700/50 shadow-sm pointer-events-auto"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center gap-2 overflow-x-auto py-0.5">
              <Filter className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="font-semibold text-gray-300 shrink-0">Active Filter:</span>

              {activeCategory && (
                <span className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30 shrink-0">
                  Category: {activeCategory}
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30 shrink-0">
                  Search: &ldquo;{searchQuery}&rdquo;
                </span>
              )}

              {activeTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 shrink-0"
                >
                  #{tag}
                </span>
              ))}

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 text-gray-400 hover:text-white underline cursor-pointer ml-1 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded shrink-0"
                  aria-label="Clear all active filters"
                >
                  <X className="w-3 h-3" />
                  Clear all
                </button>
              )}
            </div>

            {/* Quick Reversal (Undo) */}
            {canUndo && (
              <div className="flex items-center gap-2 shrink-0 ml-3">
                <button
                  type="button"
                  onClick={undo}
                  className="inline-flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 px-2.5 py-1 rounded border border-gray-600 transition-colors cursor-pointer text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
                  aria-label="Undo filter operation"
                >
                  <Undo2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Undo</span>
                  <kbd className="hidden sm:inline-block font-mono text-[10px] bg-gray-900 px-1 py-0.5 rounded border border-gray-700 text-gray-400">
                    Ctrl+Z
                  </kbd>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}