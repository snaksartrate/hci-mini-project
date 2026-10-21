import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { Project } from "../../types";
import { useAppState } from "../../hooks/useAppState";
import FittsButton from "../interaction/FittsButton";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { openModal, toggleTag, activeTags } = useAppState();

  return (
    <motion.div
      layoutId={project.id}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={() => openModal(project.id)}
      className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 shadow-xs hover:shadow-xl hover:border-blue-500/40 dark:hover:border-blue-400/30 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Top Header: Category & Role */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200/60 dark:border-blue-900/60">
            <Sparkles className="w-3 h-3" />
            {project.category}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {project.role}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>

        {/* Summary Description */}
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3 leading-relaxed">
          {project.summary}
        </p>

        {/* Key Concepts Preview */}
        {project.details.heuristicsApplied.length > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              Key Concepts &amp; Methods
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.details.heuristicsApplied.map((heuristic) => (
                <span
                  key={heuristic}
                  className="text-[11px] bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-md border border-gray-200/80 dark:border-gray-700/80"
                >
                  {heuristic}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer: Tags & Action Button */}
      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-4">
        {/* Tags row */}
        <div className="flex flex-wrap gap-1.5" onClick={(e) => e.stopPropagation()}>
          {project.tags.map((tag) => {
            const isTagActive = activeTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                  isTagActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                aria-pressed={isTagActive}
              >
                #{tag}
              </button>
            );
          })}
        </div>

        {/* Primary Action Button */}
        <FittsButton
          priority="secondary"
          onClick={() => openModal(project.id)}
          icon={<ArrowUpRight className="w-4 h-4 text-blue-500" />}
          className="w-full text-xs"
        >
          View Project Details
        </FittsButton>
      </div>
    </motion.div>
  );
}
