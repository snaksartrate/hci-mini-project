import { motion } from "framer-motion";
import type { AffinityNode } from "../../types";

interface AffinityDiagramProps {
  nodes: AffinityNode[];
}

export default function AffinityDiagram({ nodes }: AffinityDiagramProps) {
  // Group nodes by theme
  const themes = nodes.reduce<Record<string, { color: string; items: AffinityNode[] }>>(
    (acc, node) => {
      if (!acc[node.theme]) {
        acc[node.theme] = { color: node.color, items: [] };
      }
      acc[node.theme].items.push(node);
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Affinity Clustering &amp; Insights
        </h4>
        <span className="text-xs text-gray-400">
          {nodes.length} observation nodes across {Object.keys(themes).length} thematic clusters
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(themes).map(([themeName, themeData]) => (
          <div
            key={themeName}
            className="rounded-xl p-4 bg-gray-50/70 dark:bg-gray-800/40 border border-gray-200/80 dark:border-gray-800"
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: themeData.color }}
              />
              <h5 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                {themeName}
              </h5>
            </div>

            <div className="space-y-2.5">
              {themeData.items.map((node) => (
                <motion.div
                  key={node.id}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{
                    backgroundColor: `${themeData.color}15`,
                    borderColor: `${themeData.color}40`,
                  }}
                  className="p-3 rounded-lg border text-xs text-gray-800 dark:text-gray-200 shadow-2xs font-normal"
                >
                  <p className="leading-relaxed">{node.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
