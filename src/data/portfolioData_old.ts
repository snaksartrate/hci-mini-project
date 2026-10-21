import type { PortfolioData } from "../types";

export const PORTFOLIO_DATA: PortfolioData = {
  personalInfo: {
    name: "Sanskar Tarte",
    role: "Student, VJTI - TY BTech CE",
    tagline: "The ultimate problem solver.",
    about: "CP, DSA, Math, AI, ML, Chess, Sudoku, Football, Swimming",
    resumeUrl: "https://drive.google.com/file/d/14OeN0ydsHBqQEGWRYGbf72zpuQrWF8AN/view?usp=sharing",
  },

  skills: [
    {
      category: "HCI & Research",
      items: [
        { name: "Heuristic Evaluation", proficiency: 90 },
        { name: "Usability Testing", proficiency: 85 },
        { name: "Wireframing", proficiency: 80 },
        { name: "Mental Models", proficiency: 75 },
      ],
    },
    {
      category: "Frontend Dev",
      items: [
        { name: "React", proficiency: 92 },
        { name: "Vite", proficiency: 80 },
        { name: "Tailwind CSS", proficiency: 88 },
        { name: "Framer Motion", proficiency: 78 },
      ],
    },
    {
      category: "Design Tools",
      items: [
        { name: "Figma", proficiency: 90 },
        { name: "Adobe XD", proficiency: 70 },
        { name: "Sketch", proficiency: 65 },
        { name: "Miro", proficiency: 82 },
      ],
    },
    {
      category: "Programming",
      items: [
        { name: "TypeScript", proficiency: 88 },
        { name: "Python", proficiency: 75 },
        { name: "JavaScript", proficiency: 92 },
        { name: "HTML/CSS", proficiency: 95 },
      ],
    },
  ],

  projects: [
    {
      id: "project-1",
      title: "Adaptive Mobile Navigation System",
      role: "Lead UX Researcher",
      category: "HCI Research",
      summary: "A study and prototype on transient navigation patterns to reduce visual fatigue on mobile devices.",
      tags: ["UX Research", "Prototyping", "A/B Testing", "Mobile"],
      details: {
        problem: "Mobile screens suffer from limited spatial availability leading to cognitive overload with persistent navigation elements.",
        solution: "Implemented off-canvas transient menus triggered by ergonomic gestures, validated through A/B testing with 24 participants.",
        heuristicsApplied: [
          "Visibility of System Status",
          "Flexibility and Efficiency of Use",
          "Aesthetic and Minimalist Design",
        ],
      },
      contextualInquiry: [
        {
          participant: "Participant P01 (Mobile Shopper)",
          observation: "Struggled with one-handed thumb reach to access top-left hamburger menu on 6.7-inch device.",
          designImplication: "Relocate primary navigation anchors to bottom 40% ergonomic thumb zone.",
        },
        {
          participant: "Participant P04 (Commuter)",
          observation: "Expressed visual fatigue when static navigation chrome remained persistent during long reading sessions.",
          designImplication: "Implement auto-collapsing transient navigation on directional scroll down.",
        },
      ],
      affinityNodes: [
        {
          id: "node-1-1",
          label: "One-handed reach limitations on large viewports",
          theme: "Navigation Pain Points",
          color: "#3B82F6",
        },
        {
          id: "node-1-2",
          label: "Persistent nav banners clutter content canvas",
          theme: "Navigation Pain Points",
          color: "#3B82F6",
        },
        {
          id: "node-1-3",
          label: "Bottom sheet gesture anchors felt natural",
          theme: "User Preferences",
          color: "#10B981",
        },
        {
          id: "node-1-4",
          label: "Haptic feedback confirmed drawer state transition",
          theme: "User Preferences",
          color: "#10B981",
        },
      ],
      workModels: [
        {
          type: "flow",
          title: "Transient Navigation Flow Model",
          description: "Communication channels and artifact hand-off between user gesture input, gesture parser, and UI view renderer.",
          steps: [
            "User edge-swipe or bottom trigger gesture initiates interaction",
            "Gesture discriminator validates velocity threshold (> 0.5px/ms)",
            "Physics spring simulation begins rendering drawer transform",
            "State manager updates active viewport focus coordinates",
            "Target item selected, dismissing transient sheet back to resting state",
          ],
        },
        {
          type: "sequence",
          title: "Menu Invocation Sequence Model",
          description: "Step-by-step sequential breakdown of physical actions and cognitive checkpoints during transient drawer opening.",
          steps: [
            "User perceives need to switch application module context",
            "Finger rests on bottom-dock trigger zone (Fitts-optimized 56px target)",
            "Upward flick gesture executes; tactile spring feedback acknowledges trigger",
            "Category clusters render with progressive disclosure animation",
          ],
        },
      ],
      gomsAnalysis: [
        {
          taskName: "Open navigation menu & select target section",
          predictedTimeMs: 1200,
          actualTimeMs: 1450,
          operators: [
            "M (Mental preparation - 1200ms)",
            "P (Point cursor/thumb to bottom anchor - 1100ms)",
            "B (Press/tap touch target - 100ms)",
            "H (Haptic feedback sensory confirmation - 400ms)",
            "M (Mental verification of menu options - 1200ms)",
          ],
        },
      ],
      fittsLawData: [
        {
          taskName: "Bottom-anchored primary navigation hit",
          targetWidthPx: 48,
          distancePx: 320,
          indexOfDifficulty: 3.7,
          measuredTimeMs: 380,
        },
      ],
      links: [
        { label: "GitHub", url: "#" },
        { label: "Live Prototype", url: "#" },
      ],
    },
    {
      id: "project-2",
      title: "Accessible Dashboard Redesign",
      role: "Interaction Designer",
      category: "Interaction Design",
      summary: "Redesigned an enterprise analytics dashboard to meet WCAG 2.1 AA standards while improving task completion rate by 34%.",
      tags: ["Accessibility", "Dashboard", "WCAG", "Enterprise"],
      details: {
        problem: "The existing dashboard had low color contrast, tiny click targets, and no keyboard navigation, making it inaccessible to 15% of users.",
        solution: "Conducted heuristic evaluation, rebuilt component library with ARIA labels, focus management, and Fitts' Law-optimized button sizes.",
        heuristicsApplied: [
          "Error Prevention",
          "Consistency and Standards",
          "Help and Documentation",
        ],
      },
      contextualInquiry: [
        {
          participant: "Participant P08 (Keyboard-only user)",
          observation: "Lost focus state inside deep data grid filter modals without tab trapping.",
          designImplication: "Establish programmatic focus locks with visible high-contrast ring tokens.",
        },
        {
          participant: "Participant P12 (Low-vision analyst)",
          observation: "Unable to discern chart trends due to low-contrast monochromatic palettes.",
          designImplication: "Implement dual visual encoding (distinct patterns + high-contrast WCAG AAA color scales).",
        },
      ],
      affinityNodes: [
        {
          id: "node-2-1",
          label: "Inconsistent tab order breaks keyboard flow",
          theme: "Accessibility Barriers",
          color: "#EF4444",
        },
        {
          id: "node-2-2",
          label: "Target sizes below 32px cause frequent mis-clicks",
          theme: "Accessibility Barriers",
          color: "#EF4444",
        },
        {
          id: "node-2-3",
          label: "Keyboard shortcuts cut repetitive reporting time in half",
          theme: "Efficiency Gains",
          color: "#8B5CF6",
        },
        {
          id: "node-2-4",
          label: "Live regions provide instant query completion status",
          theme: "Efficiency Gains",
          color: "#8B5CF6",
        },
      ],
      workModels: [
        {
          type: "artifact",
          title: "Analytics Filter Artifact Model",
          description: "Physical and structural breakdown of the filter criteria builder, inspection panels, and export triggers.",
          steps: [
            "Global filter pill container with live screen reader announcements",
            "Multi-select dropdown with roving tabindex focus navigation",
            "Query status badge displaying active result volume and execution latency",
            "One-click action bar with 48px min-size touch targets for report generation",
          ],
        },
        {
          type: "flow",
          title: "Query Builder Coordination Flow",
          description: "Information transfer between user keyboard commands, accessibility tree, and data visualization canvas.",
          steps: [
            "User issues keyboard shortcut (Ctrl+F) to enter search scope",
            "Focus ring navigates to query input with aria-expanded status",
            "Dynamic debounced result count announced to aria-live polite region",
            "Selection applied via Enter key, updating chart canvas with polite notification",
            "Focus gracefully returns to summary card container",
          ],
        },
      ],
      gomsAnalysis: [
        {
          taskName: "Apply date filter & export filtered dataset",
          predictedTimeMs: 1800,
          actualTimeMs: 1950,
          operators: [
            "M (Mental scan of date range options - 1200ms)",
            "P (Point to date picker trigger - 1100ms)",
            "K (Keystroke shortcut activation - 280ms)",
            "P (Point to preset 'Last 30 Days' - 1100ms)",
            "B (Press export trigger - 100ms)",
          ],
        },
      ],
      fittsLawData: [
        {
          taskName: "Primary date preset selection",
          targetWidthPx: 56,
          distancePx: 180,
          indexOfDifficulty: 2.7,
          measuredTimeMs: 290,
        },
      ],
      links: [
        { label: "Figma Prototype", url: "#" },
        { label: "Case Study PDF", url: "#" },
      ],
    },
    {
      id: "project-3",
      title: "Voice-Augmented Form Filling System",
      role: "UX Engineer",
      category: "HCI Research",
      summary: "Explored multimodal input combining voice recognition with traditional form UI to reduce input time by 40% for long-form data entry.",
      tags: ["Voice UI", "Multimodal", "Forms", "Usability Testing"],
      details: {
        problem: "Long forms cause user fatigue and high abandonment rates, especially on mobile where typing is cumbersome.",
        solution: "Designed a hybrid input system where users can speak field values, with real-time transcription shown inline. Fallback to keyboard is always available.",
        heuristicsApplied: [
          "User Control and Freedom",
          "Recognition Rather Than Recall",
          "Flexibility and Efficiency of Use",
        ],
      },
      contextualInquiry: [
        {
          participant: "Participant P03 (Field Inspector)",
          observation: "Found physical keyboard entry error-prone while wearing gloves in outdoor fieldwork.",
          designImplication: "Enable hands-free push-to-talk field filling with immediate visual transcription preview.",
        },
        {
          participant: "Participant P07 (Administrative Clerk)",
          observation: "Hesitant to use pure voice due to fear of misrecognized technical jargon or postal codes.",
          designImplication: "Offer instant hybrid inline keyboard editing without restarting voice stream.",
        },
      ],
      affinityNodes: [
        {
          id: "node-3-1",
          label: "Repetitive mobile keyboard typing causes finger strain",
          theme: "Input Frustrations",
          color: "#F59E0B",
        },
        {
          id: "node-3-2",
          label: "Fear of voice misrecognition slows overall adoption",
          theme: "Input Frustrations",
          color: "#F59E0B",
        },
        {
          id: "node-3-3",
          label: "40% faster completion time on address and notes sections",
          theme: "Multimodal Benefits",
          color: "#14B8A6",
        },
        {
          id: "node-3-4",
          label: "Real-time speech confidence badges increased user trust",
          theme: "Multimodal Benefits",
          color: "#14B8A6",
        },
      ],
      workModels: [
        {
          type: "sequence",
          title: "Multimodal Field Input Sequence",
          description: "Temporal order of cognitive decision, speech trigger, interim feedback, and manual correction.",
          steps: [
            "User focuses form input; microphone signifier pulses gently",
            "User holds spacebar or taps mic button to initiate recording",
            "Speech recognition engine streams interim hypothesis tokens",
            "Confidence badge renders (Green > 90%, Amber 70-90%)",
            "User inspects transcribed string, using keyboard only for quick correction if needed",
          ],
        },
        {
          type: "flow",
          title: "Speech-to-Text Disambiguation Flow",
          description: "Flow of speech audio buffers, lexical parsing, and form validation state synchronization.",
          steps: [
            "Audio stream captured via Web Speech API stream",
            "Grammar parsing maps spoken phrases to structured schema fields",
            "UI updates input value with subtle highlight pulse",
            "Validation rule triggers, displaying green verification signifier",
          ],
        },
      ],
      gomsAnalysis: [
        {
          taskName: "Fill address field via voice vs. manual keyboard",
          predictedTimeMs: 2200,
          actualTimeMs: 2400,
          operators: [
            "M (Mental formulation of address string - 1200ms)",
            "V (Voice utterance duration - 1800ms)",
            "P (Point/inspect confirmation badge - 600ms)",
            "M (Mental verification of accuracy - 800ms)",
          ],
        },
      ],
      fittsLawData: [
        {
          taskName: "Large push-to-talk microphone button activation",
          targetWidthPx: 64,
          distancePx: 120,
          indexOfDifficulty: 2.1,
          measuredTimeMs: 210,
        },
      ],
      links: [
        { label: "GitHub", url: "#" },
        { label: "Demo Video", url: "#" },
      ],
    },
  ],
};
