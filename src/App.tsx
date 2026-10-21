import { useEffect, useState, type ComponentProps } from "react";
import { AnimatePresence } from "framer-motion";
import { useAppState } from "./hooks/useAppState";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
const PORTFOLIO_DATA = {
  projects: [] as Array<NonNullable<ComponentProps<typeof ProjectDetailModal>["project"]>>,
  personalInfo: { name: "Sanskar Tarte" },
};

// Layout Components
import NavigationBar from "./components/layout/NavigationBar";
import SystemStatusBar from "./components/layout/SystemStatusBar";

// Interaction Components
import ActionPalette from "./components/interaction/ActionPalette";

// View Components
import HeroSection from "./components/views/HeroSection";
import ProjectGrid from "./components/views/ProjectGrid";
import ProjectDetailModal from "./components/views/ProjectDetailModal";
import SkillsMatrix from "./components/views/SkillsMatrix";
import ContactSection from "./components/views/ContactSection";
import { ArrowUp } from "lucide-react";

const CURRENT_YEAR = new Date().getFullYear();

export default function App() {
  const {
    activeModal,
    isCommandPaletteOpen,
    setScrollProgress,
    isDarkMode,
  } = useAppState();
  const [isModalDismissed, setIsModalDismissed] = useState(false);

  useEffect(() => {
    setIsModalDismissed(false);
  }, [activeModal]);

  // Register universal hotkey listeners (Ctrl+K, Esc, Ctrl+Z, /)
  useKeyboardShortcuts();

  // Track scroll depth for the system status progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScrollProgress]);

  // Synchronize dark theme class on document element
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const selectedProject = activeModal
    ? PORTFOLIO_DATA.projects.find((p) => p.id === activeModal) ?? null
    : null;
  const activeProject = isModalDismissed ? null : selectedProject;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors selection:bg-blue-500 selection:text-white">
      {/* Pinned Heuristic Status Bar & Navigation */}
      <SystemStatusBar />
      <NavigationBar />

      {/* Main Single Page Document Canvas */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <HeroSection />
        <ProjectGrid />
        <SkillsMatrix />
        <ContactSection />
      </main>

      {/* Accessible Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <span>Built by Sanskar Tarte</span>
            <span className="text-gray-400 dark:text-gray-600">•</span>
            <span>Computer Engineering, VJTI Mumbai</span>
          </div>

          <div className="flex items-center gap-4">
            <span>© {CURRENT_YEAR} {PORTFOLIO_DATA.personalInfo.name}</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer focus:outline-none"
              aria-label="Scroll back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </footer>

      {/* Case Study Detail Modal Layer */}
      <AnimatePresence>
        {activeProject && (
          <ProjectDetailModal
            project={activeProject}
            onClose={() => setIsModalDismissed(true)}
          />
        )}
      </AnimatePresence>

      {/* Universal Command Palette */}
      <AnimatePresence>
        {isCommandPaletteOpen && <ActionPalette />}
      </AnimatePresence>
    </div>
  );
}
