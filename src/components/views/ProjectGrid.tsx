import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, Sparkles } from "lucide-react";
import { useAppState } from "../../hooks/useAppState";
import { useHistory } from "../../hooks/useHistory";
import { PORTFOLIO_DATA } from "../../data/portfolioData";
import ProjectCard from "./ProjectCard";
import FittsButton from "../interaction/FittsButton";

export default function ProjectGrid() {
  const {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    activeTags,
    toggleTag,
    clearFilters,
  } = useAppState();
  const { pushState } = useHistory();

  // Extract unique categories
  const categories = [
    "All",
    ...Array.from(new Set(PORTFOLIO_DATA.projects.map((p) => p.category))),
  ];

  // Extract all unique tags
  const allTags = Array.from(
    new Set(PORTFOLIO_DATA.projects.flatMap((p) => p.tags))
  );

  // Filtered projects computation
  const filteredProjects = PORTFOLIO_DATA.projects.filter((project) => {
    // 1. Category filter
    if (activeCategory && project.category !== activeCategory) {
      return false;
    }

    // 2. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = project.title.toLowerCase().includes(q);
      const matchSummary = project.summary.toLowerCase().includes(q);
      const matchCategory = project.category.toLowerCase().includes(q);
      const matchTags = project.tags.some((t) => t.toLowerCase().includes(q));

      if (!matchTitle && !matchSummary && !matchCategory && !matchTags) {
        return false;
      }
    }

    // 3. Active tags filter (must contain all active tags)
    if (activeTags.length > 0) {
      const hasAllTags = activeTags.every((tag) => project.tags.includes(tag));
      if (!hasAllTags) {
        return false;
      }
    }

    return true;
  });

  const handleCategorySelect = (category: string) => {
    pushState(`Filter by ${category}`);
    setActiveCategory(category === "All" ? null : category);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
  };

  const hasFilters =
    Boolean(searchQuery) || Boolean(activeCategory) || activeTags.length > 0;

  return (
    <section id="projects" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Featured Technical Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            Projects &amp; Systems
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-2xl leading-relaxed">
            Hands-on implementations in game-tree search algorithms, neural networks, image segmentation pipelines, and database management systems.
          </p>
        </div>

        {/* Total Count Badge */}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 self-start md:self-auto">
          <span>Showing</span>
          <span className="font-bold text-gray-900 dark:text-gray-100 px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            {filteredProjects.length} of {PORTFOLIO_DATA.projects.length}
          </span>
          <span>projects</span>
        </div>
      </div>

      {/* Control Bar: Categories + Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((category) => {
            const isSelected =
              (category === "All" && activeCategory === null) ||
              activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategorySelect(category)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Global Search Input */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search keywords, tech stack, tags..."
            className="w-full pl-9 pr-14 py-2 text-xs rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-950 transition-colors"
          />
          <kbd className="hidden sm:inline-block font-mono text-[10px] bg-white dark:bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
            /
          </kbd>
        </div>
      </div>

      {/* Available Tags Filter Bar */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1">
          <Filter className="w-3 h-3" /> Filter by tag:
        </span>
        {allTags.map((tag) => {
          const isActive = activeTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => {
                pushState(`Toggle #${tag}`);
                toggleTag(tag);
              }}
              className={`text-[11px] px-2.5 py-1 rounded-lg transition-colors cursor-pointer border ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                  : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
              }`}
            >
              #{tag}
            </button>
          );
        })}

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-[11px] text-gray-500 hover:text-red-500 flex items-center gap-1 cursor-pointer ml-2 focus:outline-none"
          >
            <X className="w-3 h-3" />
            Reset all
          </button>
        )}
      </div>

      {/* Projects Grid Container */}
      {filteredProjects.length === 0 ? (
        <div className="py-16 text-center rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 p-8 space-y-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No projects match your current search and filter criteria.
          </p>
          <FittsButton priority="secondary" onClick={clearFilters} icon={<X className="w-4 h-4" />}>
            Clear All Active Filters
          </FittsButton>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}