import { motion } from "framer-motion";
import { ArrowDown, Network, Layers, GitCommit } from "lucide-react";
import type { WorkModel } from "../../types";

interface WorkModelViewerProps {
  model: WorkModel;
}

export default function WorkModelViewer({ model }: WorkModelViewerProps) {
  const getModelIcon = (type: WorkModel["type"]) => {
    switch (type) {
      case "flow":
        return <Network className="w-4 h-4 text-blue-500" />;
      case "sequence":
        return <GitCommit className="w-4 h-4 text-emerald-500" />;
      case "artifact":
        return <Layers className="w-4 h-4 text-purple-500" />;
    }
  };

  const getModelBadge = (type: WorkModel["type"]) => {
    switch (type) {
      case "flow":
        return "Pipeline & Architecture Flow";
      case "sequence":
        return "Execution Sequence";
      case "artifact":
        return "Structural Component Model";
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 p-5 shadow-xs space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          {getModelIcon(model.type)}
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {getModelBadge(model.type)}
          </span>
        </div>
        <h4 className="text-base font-bold text-gray-900 dark:text-gray-100">
          {model.title}
        </h4>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
          {model.description}
        </p>
      </div>

      {/* Model Steps Flow */}
      <div className="space-y-2 pt-2">
        {model.steps.map((step, index) => {
          const isLast = index === model.steps.length - 1;

          return (
            <div key={index} className="flex flex-col items-center sm:items-start">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.3 }}
                className="w-full flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-200/70 dark:border-gray-700/60"
              >
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-mono text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <div className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                  {step}
                </div>
              </motion.div>

              {!isLast && (
                <div className="py-1 text-gray-400 dark:text-gray-600 pl-4 flex items-center gap-1">
                  <ArrowDown className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase font-mono tracking-wider opacity-70">
                    Proceeds to
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
