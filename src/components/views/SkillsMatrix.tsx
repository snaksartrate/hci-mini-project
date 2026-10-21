import { motion } from "framer-motion";
import { Brain, Sparkles, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

export default function SkillsMatrix() {
  const { skills } = PORTFOLIO_DATA;

  return (
    <section id="skills" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-xs uppercase tracking-wider mb-2">
            <Brain className="w-4 h-4" />
            <span>Technical Capabilities &amp; Coursework</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            Skills &amp; Technical Disciplines
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-2xl leading-relaxed">
            Foundations in algorithms, mathematical statistics, machine learning, systems programming, and database architecture.
          </p>
        </div>
      </div>

      {/* Grid of Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((categoryGroup, index) => (
          <motion.div
            key={categoryGroup.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xs hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                  {categoryGroup.category}
                </h3>
              </div>
              <span className="text-xs text-gray-400 font-mono">
                {categoryGroup.items.length} competencies
              </span>
            </div>

            <div className="space-y-4">
              {categoryGroup.items.map((skill) => (
                <div key={skill.name} className="group">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 opacity-80" />
                      {skill.name}
                    </span>
                    <span className="font-mono text-gray-400">{skill.proficiency}%</span>
                  </div>

                  {/* Accessible Proficiency Progress Bar */}
                  <div
                    role="progressbar"
                    aria-valuenow={skill.proficiency}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${skill.name} proficiency`}
                    className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
