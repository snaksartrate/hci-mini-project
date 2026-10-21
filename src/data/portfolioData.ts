import type { PortfolioData } from "../types";

export const PORTFOLIO_DATA: PortfolioData = {
  personalInfo: {
    name: "Sanskar Tarte",
    role: "TY B.Tech Computer Engineering Student, VJTI Mumbai",
    tagline: "Building intelligent systems through mathematics, algorithms, and engineering.",
    about:
      "I am a Computer Engineering student at VJTI Mumbai interested in machine learning, quantitative development, quantitative research, and forward-deployed engineering. I enjoy mathematics, data structures and algorithms, and turning technical ideas into working software. Outside technology, I enjoy chess, football, and swimming.",
    resumeUrl:
      "https://drive.google.com/file/d/14OeN0ydsHBqQEGWRYGbf72zpuQrWF8AN/view?usp=sharing",
  },

  skills: [
    {
      category: "Programming Languages",
      items: [
        { name: "C++", proficiency: 75 },
        { name: "Python", proficiency: 75 },
        { name: "SQL", proficiency: 70 },
        { name: "JavaScript", proficiency: 60 },
      ],
    },
    {
      category: "Machine Learning & Data Science",
      items: [
        { name: "Machine Learning", proficiency: 55 },
        { name: "NumPy", proficiency: 55 },
        { name: "pandas", proficiency: 55 },
        { name: "OpenCV", proficiency: 55 },
        { name: "Neural Networks & Backpropagation", proficiency: 55 },
      ],
    },
    {
      category: "Algorithms & Competitive Programming",
      items: [
        { name: "Data Structures & Algorithms", proficiency: 70 },
        { name: "Alpha-Beta Pruning", proficiency: 65 },
        { name: "Zobrist Hashing", proficiency: 60 },
        { name: "Graph Algorithms & Dynamic Programming", proficiency: 70 },
      ],
    },
    {
      category: "Quantitative & Mathematical Foundations",
      items: [
        { name: "Mathematics, Probability & Statistics", proficiency: 70 },
        { name: "Linear Algebra", proficiency: 70 },
        { name: "Discrete Mathematics", proficiency: 70 },
        { name: "Calculus", proficiency: 70 },
      ],
    },
    {
      category: "Systems & Parallel Computing",
      items: [
        { name: "CUDA", proficiency: 45 },
        { name: "OpenMP", proficiency: 45 },
        { name: "MPI", proficiency: 45 },
        { name: "Linux", proficiency: 60 },
        { name: "Git / GitHub", proficiency: 70 },
      ],
    },
    {
      category: "Backend & Databases",
      items: [
        { name: "SQL / Database Design", proficiency: 70 },
        { name: "MySQL", proficiency: 70 },
        { name: "FastAPI", proficiency: 45 },
        { name: "Supabase", proficiency: 45 },
        { name: "Streamlit", proficiency: 45 },
      ],
    },
  ],

  projects: [
    {
      id: "go-game-engine",
      title: "Go Game Engine",
      role: "Developer",
      category: "Algorithms & Game AI",
      summary:
        "A functional Python Go engine supporting human-vs-AI gameplay and self-play, using search and position-evaluation techniques.",
      tags: [
        "Python",
        "Alpha-Beta Pruning",
        "Zobrist Hashing",
        "Move Ordering",
        "Heuristic Evaluation",
      ],
      details: {
        problem:
          "Building a Go engine requires representing board states, evaluating positions, and exploring candidate moves while controlling the cost of game-tree search.",
        solution:
          "Implemented a working Python engine with human-vs-AI gameplay and self-play. It uses alpha-beta pruning, Zobrist hashing, move ordering, and heuristic-based position evaluation. Further search optimization and a C++ port are planned; the project is not yet described as production-ready.",
        heuristicsApplied: [],
      },
      contextualInquiry: [],
      affinityNodes: [],
      workModels: [
        {
          type: "flow",
          title: "Go Move-Selection Workflow",
          description:
            "Conceptual workflow describing how the engine evaluates and selects a move; this is a software model, not a user-study result.",
          steps: [
            "Receive the current board state and legal candidate moves",
            "Generate or retrieve position hashes for search-state tracking",
            "Explore candidate moves using game-tree search and move ordering",
            "Apply alpha-beta pruning to avoid exploring branches that cannot improve the current decision",
            "Evaluate resulting positions heuristically and select a move",
          ],
        },
        {
          type: "sequence",
          title: "Game Turn Sequence",
          description:
            "High-level sequence for a human-vs-AI or self-play turn.",
          steps: [
            "Read the current game state",
            "Determine legal moves for the active player",
            "Run the engine's move-selection procedure when the AI is active",
            "Apply the selected move and update the game state",
            "Check the updated state before the next turn",
          ],
        },
      ],
      gomsAnalysis: [],
      fittsLawData: [],
      links: [{ label: "GitHub", url: "https://github.com/snaksartrate/go" }],
    },
    {
      id: "mnist-number-recognition",
      title: "MNIST Number Recognition",
      role: "Developer",
      category: "Machine Learning",
      summary:
        "A neural-network implementation for recognizing handwritten digits from the MNIST dataset.",
      tags: ["Python", "NumPy", "Neural Networks", "Backpropagation", "MNIST"],
      details: {
        problem:
          "Recognizing handwritten digits requires mapping grayscale image inputs to one of ten digit classes and evaluating how well the model generalizes to unseen examples.",
        solution:
          "Implemented a neural-network-based digit recognition workflow and used a train/test split to evaluate predictions. The project notebook is available in Google Colab. Numerical performance claims are omitted here rather than inferred.",
        heuristicsApplied: [],
      },
      contextualInquiry: [],
      affinityNodes: [],
      workModels: [
        {
          type: "flow",
          title: "Digit Recognition Pipeline",
          description:
            "Conceptual model of the machine-learning pipeline, not a claim of measured user behavior.",
          steps: [
            "Load and validate the digit dataset",
            "Prepare image features and labels for training",
            "Train the neural network using forward propagation and backpropagation",
            "Evaluate predictions on held-out test data",
            "Inspect prediction errors and model behavior",
          ],
        },
      ],
      gomsAnalysis: [],
      fittsLawData: [],
      links: [
        {
          label: "Google Colab",
          url: "https://colab.research.google.com/drive/1JbepqS5_wAovJjahU_b9DgXz8KY3L2mu?usp=sharing",
        },
      ],
    },
    {
      id: "image-segmentation",
      title: "Comparative Image Segmentation and Object Measurement System",
      role: "Developer",
      category: "Computer Vision",
      summary:
        "A classical image-processing project comparing thresholding and edge-based segmentation methods and measuring detected objects.",
      tags: ["Python", "OpenCV", "NumPy", "Image Processing", "Benchmarking"],
      details: {
        problem:
          "Different segmentation techniques can produce different object masks depending on image characteristics, making it useful to compare methods under a consistent preprocessing and evaluation workflow.",
        solution:
          "Implemented a pipeline for preprocessing images and comparing global thresholding, Otsu thresholding, adaptive thresholding, and edge-based segmentation. The project also includes object-counting evaluation and benchmark-result consistency checks. The project is still being refined, so no unsupported performance claims are included.",
        heuristicsApplied: [],
      },
      contextualInquiry: [],
      affinityNodes: [],
      workModels: [
        {
          type: "flow",
          title: "Image Segmentation and Measurement Pipeline",
          description:
            "Conceptual processing pipeline for the implemented image-processing workflow.",
          steps: [
            "Load an input image and resize it to the chosen processing dimensions",
            "Convert the image to grayscale and apply noise reduction",
            "Run the selected segmentation method to produce a mask",
            "Extract or count detected objects from the resulting mask",
            "Compare method outputs using the project's evaluation results",
          ],
        },
      ],
      gomsAnalysis: [],
      fittsLawData: [],
      links: [{ label: "GitHub", url: "https://github.com/snaksartrate/ip_project" }],
    },
    {
      id: "government-welfare-scheme-system",
      title: "Government Welfare Scheme Application System",
      role: "Developer",
      category: "Database Systems",
      summary:
        "A centralized platform for beneficiaries, government officers, and administrators to apply for and manage welfare schemes.",
      tags: ["MySQL", "DBMS", "System Design", "Software Documentation"],
      details: {
        problem:
          "Welfare-scheme applications involve multiple user roles and information flows that benefit from a centralized system for application and administration workflows.",
        solution:
          "Built a database-backed application system with role-oriented workflows and an interactive web interface, supported by software documentation. The repository is maintained in the linked project branch.",
        heuristicsApplied: [],
      },
      contextualInquiry: [],
      affinityNodes: [],
      workModels: [
        {
          type: "flow",
          title: "Welfare Scheme Application Workflow",
          description:
            "High-level workflow model based on the project's stated purpose; not based on formal user research.",
          steps: [
            "A beneficiary views available welfare schemes",
            "The beneficiary submits an application with the required information",
            "The system stores the application in the database",
            "An authorized officer reviews the application",
            "An administrator or authorized officer manages the resulting application status",
          ],
        },
      ],
      gomsAnalysis: [],
      fittsLawData: [],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/Ninjabeam20/Government-welfare-scheme-tracker-/tree/sanskar",
        },
      ],
    },
    {
      id: "hand-cricket-ai",
      title: "Hand Cricket (AI Opponent)",
      role: "Developer",
      category: "Machine Learning & Game AI",
      summary:
        "A command-line hand-cricket game with an MLP-based opponent that learns from an opponent's past moves to predict future plays.",
      tags: ["Python", "Multilayer Perceptron", "Backpropagation", "Game AI"],
      details: {
        problem:
          "A game opponent can use a player's move history to estimate likely future choices rather than selecting moves without considering previous behavior.",
        solution:
          "Developed a command-line game with a multilayer perceptron trained using backpropagation to predict future plays from past moves. The project is still in progress.",
        heuristicsApplied: [],
      },
      contextualInquiry: [],
      affinityNodes: [],
      workModels: [
        {
          type: "flow",
          title: "AI Opponent Prediction Workflow",
          description:
            "Conceptual model of the prediction loop described for the project.",
          steps: [
            "Record the opponent's previous moves",
            "Prepare the available move history as model input",
            "Use the MLP to estimate the opponent's next move",
            "Choose the AI response based on the prediction and game rules",
            "Record the new move for subsequent predictions",
          ],
        },
      ],
      gomsAnalysis: [],
      fittsLawData: [],
      links: [{ label: "GitHub", url: "https://github.com/snaksartrate/hand_cricket" }],
    },
  ],
};

// Other Projects (display in a separate section if supported by the portfolio UI):
// Theatre Booking Management System — Python, Tkinter, JSON
