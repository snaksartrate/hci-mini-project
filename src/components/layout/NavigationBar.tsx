import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Search, Sparkles } from "lucide-react";
import { useAppState } from "../../hooks/useAppState";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

const NAV_ITEMS = [
  { id: "hero", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function NavigationBar() {
  const { isDarkMode, toggleDarkMode, toggleCommandPalette } = useAppState();
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Skip to Main Content Link for WCAG Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/85 dark:bg-gray-950/85 backdrop-blur-md shadow-sm border-b border-gray-200/80 dark:border-gray-800/80 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
            aria-label={`${PORTFOLIO_DATA.personalInfo.name} portfolio home`}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-gray-900 dark:text-gray-100 tracking-tight text-base sm:text-lg block leading-none">
                {PORTFOLIO_DATA.personalInfo.name}
              </span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                Comp Engg @ VJTI | ML &amp; Quant Dev
              </span>
            </div>
          </button>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-gray-100/80 dark:bg-gray-900/80 p-1 rounded-full border border-gray-200/60 dark:border-gray-800/60">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer relative focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBadge"
                      className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full shadow-xs border border-gray-200/50 dark:border-gray-700/50"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Action Icons: Command Palette & Theme Toggle */}
          <div className="flex items-center gap-2">
            {/* Command Palette Trigger */}
            <button
              type="button"
              onClick={toggleCommandPalette}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 transition-colors cursor-pointer text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Open command palette (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
              <span className="hidden sm:inline">Actions</span>
              <kbd className="font-mono text-[10px] bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                ⌘K
              </kbd>
            </button>

            {/* Dark / Light Mode Switch */}
            <button
              type="button"
              onClick={toggleDarkMode}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  );
}