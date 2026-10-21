// ── Personal Info ──
export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  about: string;
  resumeUrl?: string;
}

// ── Skills ──
export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface SkillItem {
  name: string;
  proficiency: number; // 0–100
}

// ── HCI Artifacts ──
export interface ContextualInquiryFinding {
  participant: string;
  observation: string;
  designImplication: string;
}

export interface AffinityNode {
  id: string;
  label: string;
  theme: string;       // grouping theme name
  color: string;       // hex color for the theme
}

export interface WorkModel {
  type: "flow" | "sequence" | "artifact";
  title: string;
  description: string;
  steps: string[];      // ordered list of steps/nodes
}

export interface GOMSAnalysis {
  taskName: string;
  predictedTimeMs: number;
  actualTimeMs: number;
  operators: string[];   // list of GOMS operators
}

export interface FittsLawData {
  taskName: string;
  targetWidthPx: number;
  distancePx: number;
  indexOfDifficulty: number;  // log2(2D / W)
  measuredTimeMs: number;
}

// ── Projects / Case Studies ──
export interface ProjectLink {
  label: string;       // e.g. "Live Demo", "GitHub", "Figma Prototype"
  url: string;
}

export interface Project {
  id: string;
  title: string;
  role: string;         // e.g. "Lead UX Researcher"
  category: string;     // e.g. "HCI Research", "Interaction Design"
  summary: string;
  tags: string[];
  details: {
    problem: string;
    solution: string;
    heuristicsApplied: string[];
  };
  contextualInquiry: ContextualInquiryFinding[];
  affinityNodes: AffinityNode[];
  workModels: WorkModel[];
  gomsAnalysis: GOMSAnalysis[];
  fittsLawData: FittsLawData[];
  links: ProjectLink[];
}

// ── Application State ──
export interface AppState {
  searchQuery: string;
  activeCategory: string | null;    // null = "All"
  activeTags: string[];
  isDarkMode: boolean;
  activeModal: string | null;       // project id or null
  isCommandPaletteOpen: boolean;
  scrollProgress: number;           // 0–1
}

// ── History (Undo/Redo) ──
export interface HistoryEntry {
  label: string;         // human-readable description, e.g. "Filtered by HCI Research"
  state: Pick<AppState, "searchQuery" | "activeCategory" | "activeTags">;
}

// ── Portfolio Data Root ──
export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: SkillCategory[];
  projects: Project[];
}
