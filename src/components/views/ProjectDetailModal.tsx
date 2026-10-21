import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Layers, Cpu, CheckCircle2, Terminal, Code2 } from "lucide-react";
import type { Project } from "../../types";

// Local SVG icon for GitHub repository link
function GitHubIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "specs">("overview");

  if (!project) return null;

  const details = project.details || {
    problem: project.summary,
    solution: "Designed and implemented from scratch with high performance and modularity in mind.",
    heuristicsApplied: ["Modular Design", "Optimized Complexity", "Robust Error Handling"],
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-gray-950/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 z-10 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-900/40">
                {project.category}
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                {project.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-200/70 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 px-6 py-2 border-b border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-900/30 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "overview"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Overview &amp; Problem
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("architecture")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "architecture"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Architecture &amp; Design
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("specs")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "specs"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Performance &amp; Specs
            </button>
          </div>

          {/* Modal Body Content */}
          <div className="p-6 overflow-y-auto space-y-6 text-sm text-gray-600 dark:text-gray-300">
            {activeTab === "overview" && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                    <Terminal className="w-3.5 h-3.5" /> Core Objective / Problem Statement
                  </h4>
                  <p className="leading-relaxed bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800 text-xs">
                    {details.problem}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Solution &amp; Implementation
                  </h4>
                  <p className="leading-relaxed bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800 text-xs">
                    {details.solution}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "architecture" && (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-xs uppercase tracking-wider flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                  <Layers className="w-3.5 h-3.5" /> Technical Design &amp; Methodology
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {details.heuristicsApplied.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex items-start gap-2.5 text-xs"
                    >
                      <div className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                        0{idx + 1}
                      </div>
                      <span className="leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-xs uppercase tracking-wider flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                  <Cpu className="w-3.5 h-3.5" /> Tech Stack &amp; Implementation Tags
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-mono border border-gray-200 dark:border-gray-700"
                    >
                      <Code2 className="w-3 h-3 text-blue-500" />
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex items-center justify-between">
            <span className="text-[11px] text-gray-400 font-mono">
              ID: {project.id}
            </span>
            <div className="flex items-center gap-3">
              {"githubUrl" in project && typeof project.githubUrl === "string" && project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-800 dark:hover:bg-gray-700 text-xs font-medium transition-colors shadow-xs"
                >
                  <GitHubIcon />
                  <span>GitHub Repo</span>
                </a>
              )}
              {"liveUrl" in project && typeof project.liveUrl === "string" && project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo / Artifact</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}