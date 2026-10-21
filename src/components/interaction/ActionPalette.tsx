import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FolderGit2,
  Brain,
  Mail,
  Sun,
  Moon,
  Trash2,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { useAppState } from "../../hooks/useAppState";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

interface PaletteCommand {
  id: string;
  title: string;
  category: "Navigation" | "Actions" | "Projects";
  icon: typeof Search;
  action: () => void;
  shortcut?: string;
}

export default function ActionPalette() {
  const {
    isCommandPaletteOpen,
    toggleCommandPalette,
    toggleDarkMode,
    isDarkMode,
    clearFilters,
    openModal,
  } = useAppState();

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Define commands
  const commands: PaletteCommand[] = [
    {
      id: "nav-hero",
      title: "Scroll to About / Introduction",
      category: "Navigation",
      icon: ArrowRight,
      action: () => {
        document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-projects",
      title: "Browse All Projects & Systems",
      category: "Navigation",
      icon: FolderGit2,
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      },
      shortcut: "#projects",
    },
    {
      id: "nav-skills",
      title: "View Technical Skills & Coursework",
      category: "Navigation",
      icon: Brain,
      action: () => {
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
      },
      shortcut: "#skills",
    },
    {
      id: "nav-contact",
      title: "Get in Touch (Contact Form)",
      category: "Navigation",
      icon: Mail,
      action: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      },
      shortcut: "#contact",
    },
    {
      id: "action-theme",
      title: isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode",
      category: "Actions",
      icon: isDarkMode ? Sun : Moon,
      action: () => {
        toggleDarkMode();
      },
    },
    {
      id: "action-clear",
      title: "Reset & Clear Active Filters",
      category: "Actions",
      icon: Trash2,
      action: () => {
        clearFilters();
      },
      shortcut: "Esc",
    },
    ...PORTFOLIO_DATA.projects.map((project) => ({
      id: `project-${project.id}`,
      title: `Inspect Project: ${project.title}`,
      category: "Projects" as const,
      icon: ExternalLink,
      action: () => {
        openModal(project.id);
      },
      shortcut: project.category,
    })),
  ];

  // Filter commands by search term
  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleDismiss = () => {
    setQuery("");
    setSelectedIndex(0);
    toggleCommandPalette();
  };

  // Focus input when palette opens
  useEffect(() => {
    if (isCommandPaletteOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isCommandPaletteOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredCommands.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCommands.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        handleDismiss();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleDismiss();
    }
  };

  if (!isCommandPaletteOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4 sm:px-6">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleDismiss}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          role="dialog"
          aria-modal="true"
          aria-label="Universal Command Palette"
          className="relative w-full max-w-xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-10"
          onKeyDown={handleKeyDown}
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
            <Search className="w-5 h-5 text-gray-400 shrink-0 mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Type a command, case study, or navigation destination..."
              className="w-full py-4 bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none"
            />
            <kbd className="hidden sm:inline-block font-mono text-[11px] bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded border border-gray-300 dark:border-gray-700">
              Esc
            </kbd>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto p-2 divide-y divide-gray-100 dark:divide-gray-800/50">
            {filteredCommands.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-400">
                No matching actions found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              filteredCommands.map((command, idx) => {
                const isSelected = idx === selectedIndex;
                const Icon = command.icon;

                return (
                  <button
                    key={command.id}
                    type="button"
                    onClick={() => {
                      command.action();
                      handleDismiss();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm transition-all cursor-pointer ${
                      isSelected
                        ? "bg-blue-600 text-white font-medium shadow-xs"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60"
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div
                        className={`p-1.5 rounded-lg ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="truncate">{command.title}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full ${
                          isSelected
                            ? "bg-white/20 text-blue-100"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                        }`}
                      >
                        {command.category}
                      </span>
                      {command.shortcut && (
                        <kbd
                          className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${
                            isSelected
                              ? "bg-white/10 border-white/20 text-white"
                              : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-500"
                          }`}
                        >
                          {command.shortcut}
                        </kbd>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Guide */}
          <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-[11px] text-gray-400">
            <div className="flex items-center gap-3">
              <span>
                <kbd className="font-mono bg-gray-200 dark:bg-gray-800 px-1 rounded">↑</kbd>{" "}
                <kbd className="font-mono bg-gray-200 dark:bg-gray-800 px-1 rounded">↓</kbd> to navigate
              </span>
              <span>
                <kbd className="font-mono bg-gray-200 dark:bg-gray-800 px-1 rounded">Enter</kbd> to select
              </span>
            </div>
            <span>
              <kbd className="font-mono bg-gray-200 dark:bg-gray-800 px-1 rounded">Esc</kbd> to dismiss
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
