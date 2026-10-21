import { motion } from "framer-motion";
import { ChevronDown, ArrowDownRight, FileText, Binary, Cpu, Network } from "lucide-react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";
import FittsButton from "../interaction/FittsButton";

export default function HeroSection() {
  const { personalInfo } = PORTFOLIO_DATA;

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Dynamic Ambient Background Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500/15 dark:bg-blue-600/20 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 60, -30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-purple-500/15 dark:bg-purple-600/20 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -30, 40, 0],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute -bottom-20 left-1/3 w-96 h-96 rounded-full bg-indigo-500/15 dark:bg-indigo-600/15 blur-3xl"
        />
      </div>

      {/* Main Hero Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center"
      >
        {/* Active Focus Pill */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-900/60 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Machine Learning • Quant Development • High-Performance Systems
          </span>
        </motion.div>

        {/* Hero Name / Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-4"
        >
          {personalInfo.name}
        </motion.h1>

        {/* Professional Subheading */}
        <motion.h2
          variants={itemVariants}
          className="text-lg sm:text-2xl font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-6"
        >
          {personalInfo.role}
        </motion.h2>

        {/* Engineering Focus Description */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* Primary Interaction CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        >
          <FittsButton
            priority="primary"
            onClick={scrollToProjects}
            icon={<ArrowDownRight className="w-4 h-4" />}
            shortcutBadge="#projects"
          >
            Explore Projects &amp; Systems
          </FittsButton>

          <FittsButton
            priority="secondary"
            onClick={() => {
              const skillsElem = document.getElementById("skills");
              skillsElem?.scrollIntoView({ behavior: "smooth" });
            }}
            icon={<FileText className="w-4 h-4" />}
          >
            Technical Skills &amp; Coursework
          </FittsButton>
        </motion.div>

        {/* Quick Scan Cards: Active Study Areas & Targeted Technical Topics */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl text-left"
        >
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="p-4 rounded-2xl bg-white/60 dark:bg-gray-900/40 backdrop-blur-md border border-gray-200/80 dark:border-gray-800 shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
              <Binary className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">
                Algorithms &amp; Game AI
              </h3>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-100/70 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold">
                Core Focus
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
              Minimax tree search with Alpha-Beta pruning, Zobrist position hashing, dynamic move ordering, graph algorithms, and DP optimizations.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="p-4 rounded-2xl bg-white/60 dark:bg-gray-900/40 backdrop-blur-md border border-gray-200/80 dark:border-gray-800 shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">
                Quant Dev &amp; Systems
              </h3>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-100/70 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-semibold">
                High Concurrency
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
              Modern C++ (20), GPU acceleration with CUDA, shared-memory OpenMP &amp; distributed MPI, memory-aligned structures, and low-latency data layouts.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="p-4 rounded-2xl bg-white/60 dark:bg-gray-900/40 backdrop-blur-md border border-gray-200/80 dark:border-gray-800 shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
              <Network className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">
                Deep Learning &amp; CV
              </h3>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-purple-100/70 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-semibold">
                From Scratch
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
              Multilayer neural nets with custom backpropagation, matrix autograd mechanics, Otsu &amp; adaptive computer vision pipelines, NumPy, and PyTorch.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Continuity Cue / Animated Scroll Down Indicator */}
      <motion.button
        type="button"
        onClick={scrollToProjects}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        className="mt-12 text-gray-400 hover:text-blue-500 transition-colors flex flex-col items-center gap-1 cursor-pointer focus:outline-none"
        aria-label="Scroll to projects"
      >
        <span className="text-[11px] font-medium uppercase tracking-wider">Explore Work</span>
        <ChevronDown className="w-4 h-4" />
      </motion.button>
    </section>
  );
}