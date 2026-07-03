import type { CourseDifficulty } from "@/types";

export interface CatalogCourse {
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: CourseDifficulty;
  estimatedHours: number;
  lessonCount: number;
  isPro: boolean;
  tags: string[];
  whatYouLearn: string[];
  curriculum: { section: string; lessons: string[] }[];
}

// ---------------------------------------------------------------------------
// Web Development
// ---------------------------------------------------------------------------

const webDevCourses: CatalogCourse[] = [
  {
    slug: "html-css",
    title: "HTML & CSS",
    description: "Build the web from the ground up. Learn HTML structure and CSS styling to create beautiful, responsive pages.",
    category: "Web Development",
    difficulty: "beginner",
    estimatedHours: 12,
    lessonCount: 24,
    isPro: false,
    tags: ["HTML", "CSS", "Flexbox", "Grid", "Responsive"],
    whatYouLearn: [
      "Write semantic HTML5 markup",
      "Style pages with modern CSS",
      "Build responsive layouts with Flexbox and Grid",
      "Use CSS variables and custom properties",
      "Create animations with CSS transitions",
    ],
    curriculum: [
      { section: "HTML Fundamentals", lessons: ["Document structure", "Semantic elements", "Forms & inputs", "Tables & lists"] },
      { section: "CSS Basics", lessons: ["Selectors & specificity", "Box model", "Typography", "Colors & backgrounds"] },
      { section: "Layouts", lessons: ["Flexbox deep dive", "CSS Grid", "Positioning", "Responsive design & media queries"] },
      { section: "Modern CSS", lessons: ["CSS variables", "Animations & transitions", "Pseudo-classes", "Project: Portfolio page"] },
    ],
  },
  {
    slug: "js",
    title: "JavaScript",
    description: "Master the language of the web. From variables to async/await, learn JavaScript the right way.",
    category: "Web Development",
    difficulty: "beginner",
    estimatedHours: 18,
    lessonCount: 32,
    isPro: false,
    tags: ["JavaScript", "ES6+", "DOM", "Async", "APIs"],
    whatYouLearn: [
      "Core JS syntax — variables, functions, loops",
      "DOM manipulation and event handling",
      "Fetch data from APIs with async/await",
      "Understand closures, scope, and the prototype chain",
      "Write clean, modern ES6+ JavaScript",
    ],
    curriculum: [
      { section: "Core Language", lessons: ["Variables & types", "Functions", "Arrays & objects", "Control flow"] },
      { section: "Modern ES6+", lessons: ["Arrow functions", "Destructuring", "Spread/rest", "Modules"] },
      { section: "The Browser", lessons: ["DOM API", "Events", "Forms", "LocalStorage"] },
      { section: "Async JS", lessons: ["Callbacks", "Promises", "Async/await", "Fetch & REST APIs"] },
      { section: "Project", lessons: ["Build a weather app", "Deploy to Netlify"] },
    ],
  },
  {
    slug: "typescript",
    title: "TypeScript",
    description: "Add static types to JavaScript and catch bugs before they happen. Essential for modern frontend teams.",
    category: "Web Development",
    difficulty: "intermediate",
    estimatedHours: 14,
    lessonCount: 22,
    isPro: false,
    tags: ["TypeScript", "Types", "Generics", "Interfaces", "Tooling"],
    whatYouLearn: [
      "Configure TypeScript in any project",
      "Use interfaces, types, and enums",
      "Write generic functions and classes",
      "Understand strict mode and compiler options",
      "Integrate TypeScript with React and Node.js",
    ],
    curriculum: [
      { section: "Getting Started", lessons: ["Why TypeScript", "Setup & tsconfig", "Basic types", "Type inference"] },
      { section: "Intermediate Types", lessons: ["Interfaces vs types", "Union & intersection", "Generics", "Utility types"] },
      { section: "Classes & OOP", lessons: ["Classes", "Access modifiers", "Abstract classes", "Decorators"] },
      { section: "Real Projects", lessons: ["TS + React", "TS + Node.js", "Type-safe APIs", "Migration guide"] },
    ],
  },
  {
    slug: "react",
    title: "React Architecture",
    description: "Go beyond tutorials. Learn the patterns, state management strategies, and architecture decisions that scale.",
    category: "Web Development",
    difficulty: "intermediate",
    estimatedHours: 22,
    lessonCount: 38,
    isPro: true,
    tags: ["React", "Hooks", "State", "Performance", "Patterns"],
    whatYouLearn: [
      "Build component hierarchies that are easy to maintain",
      "Master hooks — useEffect, useCallback, useMemo",
      "Manage global state with Zustand and React Query",
      "Optimise rendering performance",
      "Write fully typed React with TypeScript",
    ],
    curriculum: [
      { section: "Component Model", lessons: ["JSX deep dive", "Props & children", "Component patterns", "Compound components"] },
      { section: "Hooks Mastery", lessons: ["useState & useReducer", "useEffect lifecycle", "Custom hooks", "useContext"] },
      { section: "State Management", lessons: ["Server state with React Query", "Client state with Zustand", "Form state", "URL state"] },
      { section: "Performance", lessons: ["Memoisation", "Code splitting", "Virtualization", "Profiling"] },
      { section: "Architecture", lessons: ["Feature folder structure", "Shared component library", "Testing strategy", "Capstone project"] },
    ],
  },
  {
    slug: "node",
    title: "Node.js Backend",
    description: "Build production-grade REST APIs with Node.js, Express, and PostgreSQL.",
    category: "Web Development",
    difficulty: "intermediate",
    estimatedHours: 20,
    lessonCount: 30,
    isPro: false,
    tags: ["Node.js", "Express", "PostgreSQL", "REST", "Auth"],
    whatYouLearn: [
      "Build REST APIs with Express and TypeScript",
      "Connect to PostgreSQL with Prisma ORM",
      "Implement JWT authentication and refresh tokens",
      "Write middleware for validation and error handling",
      "Deploy to Railway or Render",
    ],
    curriculum: [
      { section: "Node Fundamentals", lessons: ["Event loop", "Modules", "File system", "HTTP module"] },
      { section: "Express APIs", lessons: ["Routing", "Middleware", "Error handling", "Validation with Zod"] },
      { section: "Databases", lessons: ["PostgreSQL basics", "Prisma ORM", "Migrations", "Query optimisation"] },
      { section: "Auth & Security", lessons: ["JWT auth", "Refresh tokens", "RBAC", "Rate limiting"] },
      { section: "Production", lessons: ["Environment config", "Logging", "Docker", "Deploy"] },
    ],
  },
  {
    slug: "nextjs",
    title: "Full-Stack Next.js",
    description: "Ship full-stack applications with Next.js App Router, Server Components, and edge deployments.",
    category: "Web Development",
    difficulty: "advanced",
    estimatedHours: 28,
    lessonCount: 44,
    isPro: true,
    tags: ["Next.js", "React", "Server Components", "Vercel", "Full-Stack"],
    whatYouLearn: [
      "Master the App Router and Server Components",
      "Build type-safe API routes with Route Handlers",
      "Optimise images, fonts, and metadata for production",
      "Implement authentication with NextAuth or custom JWT",
      "Deploy to Vercel with edge functions",
    ],
    curriculum: [
      { section: "App Router", lessons: ["File-based routing", "Layouts & templates", "Loading & error UI", "Parallel routes"] },
      { section: "Server Components", lessons: ["RSC mental model", "Data fetching patterns", "Streaming", "Suspense"] },
      { section: "API Layer", lessons: ["Route Handlers", "Server Actions", "Middleware", "Edge runtime"] },
      { section: "Auth", lessons: ["Session management", "NextAuth.js", "Protected routes", "Role-based access"] },
      { section: "Production", lessons: ["Image optimisation", "Caching strategies", "ISR & SSG", "Vercel deploy", "Monitoring"] },
    ],
  },
];

// ---------------------------------------------------------------------------
// Data Science
// ---------------------------------------------------------------------------

const dataScienceCourses: CatalogCourse[] = [
  {
    slug: "python",
    title: "Python Foundation",
    description: "Learn programming fundamentals with Python — the most beginner-friendly language in data science and AI.",
    category: "Data Science",
    difficulty: "beginner",
    estimatedHours: 14,
    lessonCount: 26,
    isPro: false,
    tags: ["Python", "Programming", "Data Structures"],
    whatYouLearn: ["Python syntax and data types", "Functions and modules", "File I/O", "OOP basics", "Intro to libraries"],
    curriculum: [
      { section: "Basics", lessons: ["Variables", "Control flow", "Functions", "Lists & dicts"] },
      { section: "Intermediate", lessons: ["OOP", "File I/O", "Error handling", "Modules"] },
      { section: "Project", lessons: ["CLI tool", "Data parser"] },
    ],
  },
  {
    slug: "python-intermediate",
    title: "Intermediate Python",
    description: "Advance your Python skills with generators, decorators, concurrency, and clean code patterns.",
    category: "Data Science",
    difficulty: "intermediate",
    estimatedHours: 16,
    lessonCount: 28,
    isPro: true,
    tags: ["Python", "Advanced", "Decorators", "Async"],
    whatYouLearn: ["Decorators and metaprogramming", "Generators and itertools", "Async/await in Python", "Testing with pytest"],
    curriculum: [
      { section: "Advanced Python", lessons: ["Decorators", "Generators", "Context managers", "Type hints"] },
      { section: "Concurrency", lessons: ["Threading", "Multiprocessing", "Asyncio", "Queues"] },
    ],
  },
  {
    slug: "data-analysis",
    title: "NumPy & Pandas",
    description: "Manipulate and analyse data at scale with NumPy arrays and Pandas DataFrames.",
    category: "Data Science",
    difficulty: "beginner",
    estimatedHours: 12,
    lessonCount: 20,
    isPro: false,
    tags: ["NumPy", "Pandas", "Data Analysis"],
    whatYouLearn: ["NumPy arrays and operations", "Pandas DataFrames", "Data cleaning", "Aggregation and groupby"],
    curriculum: [
      { section: "NumPy", lessons: ["Arrays", "Broadcasting", "Linear algebra"] },
      { section: "Pandas", lessons: ["DataFrames", "Filtering", "Groupby", "Merge & join"] },
    ],
  },
  {
    slug: "ml",
    title: "Machine Learning",
    description: "Build and evaluate ML models with scikit-learn, from linear regression to ensemble methods.",
    category: "Data Science",
    difficulty: "intermediate",
    estimatedHours: 24,
    lessonCount: 36,
    isPro: true,
    tags: ["ML", "scikit-learn", "Regression", "Classification"],
    whatYouLearn: ["Supervised and unsupervised learning", "Feature engineering", "Model evaluation", "Cross-validation"],
    curriculum: [
      { section: "Foundations", lessons: ["ML overview", "Data preprocessing", "Train/test split"] },
      { section: "Algorithms", lessons: ["Linear regression", "Decision trees", "Random forests", "SVM"] },
      { section: "Evaluation", lessons: ["Metrics", "Cross-validation", "Hyperparameter tuning"] },
    ],
  },
  {
    slug: "data-viz",
    title: "Data Visualisation",
    description: "Turn raw data into compelling charts with Matplotlib, Seaborn, and Plotly.",
    category: "Data Science",
    difficulty: "beginner",
    estimatedHours: 10,
    lessonCount: 18,
    isPro: false,
    tags: ["Matplotlib", "Seaborn", "Plotly", "Charts"],
    whatYouLearn: ["Matplotlib basics", "Statistical plots with Seaborn", "Interactive charts with Plotly", "Dashboard design"],
    curriculum: [
      { section: "Static Charts", lessons: ["Matplotlib", "Seaborn"] },
      { section: "Interactive", lessons: ["Plotly", "Dash basics"] },
    ],
  },
  {
    slug: "statistics",
    title: "Statistics for Data Science",
    description: "Build the mathematical intuition behind ML — probability, distributions, hypothesis testing, and Bayesian thinking.",
    category: "Data Science",
    difficulty: "intermediate",
    estimatedHours: 16,
    lessonCount: 24,
    isPro: false,
    tags: ["Statistics", "Probability", "Hypothesis Testing"],
    whatYouLearn: ["Descriptive statistics", "Probability distributions", "Hypothesis testing", "Bayesian inference"],
    curriculum: [
      { section: "Foundations", lessons: ["Descriptive stats", "Probability", "Distributions"] },
      { section: "Inference", lessons: ["Hypothesis testing", "p-values", "Confidence intervals", "Bayesian basics"] },
    ],
  },
];

// ---------------------------------------------------------------------------
// AI & Machine Learning
// ---------------------------------------------------------------------------

const aiCourses: CatalogCourse[] = [
  {
    slug: "ai-coding",
    title: "AI Assisted Coding",
    description: "Use Claude, Copilot, and Cursor to write code faster. Learn prompting strategies that actually work.",
    category: "AI & Machine Learning",
    difficulty: "beginner",
    estimatedHours: 8,
    lessonCount: 16,
    isPro: false,
    tags: ["AI", "Copilot", "Claude", "Prompting"],
    whatYouLearn: ["Effective prompting for code", "AI pair programming", "Code review with AI", "Limitations and pitfalls"],
    curriculum: [
      { section: "Foundations", lessons: ["AI tools overview", "Prompting for code", "Context management"] },
      { section: "Workflows", lessons: ["Debugging with AI", "Refactoring", "Testing", "Documentation"] },
    ],
  },
  {
    slug: "prompting",
    title: "Prompt Engineering",
    description: "Master the craft of writing prompts that get reliable, high-quality results from LLMs.",
    category: "AI & Machine Learning",
    difficulty: "beginner",
    estimatedHours: 10,
    lessonCount: 18,
    isPro: false,
    tags: ["Prompting", "LLMs", "GPT", "Claude"],
    whatYouLearn: ["Prompt anatomy", "Chain-of-thought", "Few-shot examples", "Output formatting", "Evaluation"],
    curriculum: [
      { section: "Basics", lessons: ["What is a prompt", "Roles & context", "Instructions"] },
      { section: "Advanced", lessons: ["Chain-of-thought", "Few-shot", "Self-consistency", "RAG intro"] },
    ],
  },
  {
    slug: "llm-finetuning",
    title: "LLM Fine-Tuning",
    description: "Adapt foundation models to your domain using LoRA, QLoRA, and instruction tuning.",
    category: "AI & Machine Learning",
    difficulty: "advanced",
    estimatedHours: 24,
    lessonCount: 32,
    isPro: true,
    tags: ["LLM", "LoRA", "Fine-tuning", "HuggingFace"],
    whatYouLearn: ["Foundation model landscape", "LoRA and QLoRA", "Dataset preparation", "Evaluation & RLHF basics"],
    curriculum: [
      { section: "Foundations", lessons: ["Transformers recap", "HuggingFace ecosystem"] },
      { section: "Fine-tuning", lessons: ["LoRA", "QLoRA", "Dataset prep", "Training loop"] },
      { section: "Evaluation", lessons: ["Benchmarks", "Human eval", "Deployment"] },
    ],
  },
  {
    slug: "deep-learning",
    title: "Deep Learning",
    description: "Build neural networks from scratch with PyTorch — CNNs, RNNs, and Transformers.",
    category: "AI & Machine Learning",
    difficulty: "advanced",
    estimatedHours: 30,
    lessonCount: 42,
    isPro: true,
    tags: ["PyTorch", "Neural Networks", "CNN", "Transformers"],
    whatYouLearn: ["PyTorch fundamentals", "Backpropagation", "CNNs for vision", "Attention and Transformers"],
    curriculum: [
      { section: "Basics", lessons: ["Tensors", "Autograd", "Training loop"] },
      { section: "Architectures", lessons: ["MLP", "CNN", "RNN", "Transformer"] },
      { section: "Projects", lessons: ["Image classifier", "Text generation"] },
    ],
  },
  {
    slug: "cv",
    title: "Computer Vision",
    description: "Build image recognition, object detection, and segmentation models with PyTorch and OpenCV.",
    category: "AI & Machine Learning",
    difficulty: "intermediate",
    estimatedHours: 20,
    lessonCount: 28,
    isPro: false,
    tags: ["Computer Vision", "OpenCV", "YOLO", "PyTorch"],
    whatYouLearn: ["Image processing with OpenCV", "CNN architectures", "Object detection with YOLO", "Segmentation"],
    curriculum: [
      { section: "Image Processing", lessons: ["OpenCV basics", "Filters", "Edge detection"] },
      { section: "Deep CV", lessons: ["CNN", "Transfer learning", "YOLO", "Segmentation"] },
    ],
  },
  {
    slug: "nlp",
    title: "NLP Fundamentals",
    description: "Process, understand, and generate text — from tokenisation to transformers.",
    category: "AI & Machine Learning",
    difficulty: "intermediate",
    estimatedHours: 18,
    lessonCount: 26,
    isPro: false,
    tags: ["NLP", "Text", "BERT", "spaCy"],
    whatYouLearn: ["Text preprocessing", "Embeddings", "Sentiment analysis", "Named entity recognition", "BERT basics"],
    curriculum: [
      { section: "Text Basics", lessons: ["Tokenization", "Embeddings", "TF-IDF"] },
      { section: "Deep NLP", lessons: ["LSTM", "BERT", "Fine-tuning", "Pipeline"] },
    ],
  },
];

// ---------------------------------------------------------------------------
// Computer Science
// ---------------------------------------------------------------------------

const csCourses: CatalogCourse[] = [
  {
    slug: "cpp",
    title: "C++ Fundamentals",
    description: "Learn systems programming, memory management, and the foundations that make every other language make sense.",
    category: "Computer Science",
    difficulty: "beginner",
    estimatedHours: 20,
    lessonCount: 30,
    isPro: false,
    tags: ["C++", "Systems", "Memory", "OOP"],
    whatYouLearn: ["C++ syntax and types", "Pointers and memory", "OOP with classes", "STL containers", "Templates intro"],
    curriculum: [
      { section: "Basics", lessons: ["Types & variables", "Control flow", "Functions", "Arrays"] },
      { section: "Memory", lessons: ["Pointers", "References", "Dynamic allocation", "RAII"] },
      { section: "OOP", lessons: ["Classes", "Inheritance", "Polymorphism", "Templates"] },
    ],
  },
  {
    slug: "java",
    title: "Java Masterclass",
    description: "Build enterprise-grade applications with Java — the language powering Android and backend systems worldwide.",
    category: "Computer Science",
    difficulty: "beginner",
    estimatedHours: 24,
    lessonCount: 36,
    isPro: false,
    tags: ["Java", "OOP", "Spring", "Android"],
    whatYouLearn: ["Java syntax and OOP", "Collections framework", "Exception handling", "Generics and streams", "Spring basics"],
    curriculum: [
      { section: "Java Basics", lessons: ["Syntax", "OOP", "Collections", "Generics"] },
      { section: "Modern Java", lessons: ["Lambdas", "Streams", "Optional", "Records"] },
      { section: "Frameworks", lessons: ["Spring Boot intro", "JPA", "REST API"] },
    ],
  },
  {
    slug: "dsa",
    title: "Data Structures & Algorithms",
    description: "Ace technical interviews and write faster code. Cover arrays, trees, graphs, sorting, and dynamic programming.",
    category: "Computer Science",
    difficulty: "intermediate",
    estimatedHours: 28,
    lessonCount: 48,
    isPro: true,
    tags: ["DSA", "Algorithms", "LeetCode", "Interviews"],
    whatYouLearn: ["Time & space complexity (Big O)", "Arrays, stacks, queues, trees, graphs", "Sorting algorithms", "Dynamic programming", "Interview problem patterns"],
    curriculum: [
      { section: "Foundations", lessons: ["Big O", "Arrays", "Linked lists", "Stacks & queues"] },
      { section: "Trees & Graphs", lessons: ["Binary trees", "BST", "Heaps", "Graphs & BFS/DFS"] },
      { section: "Algorithms", lessons: ["Sorting", "Binary search", "Two pointers", "Sliding window"] },
      { section: "DP", lessons: ["Memoization", "Tabulation", "Patterns", "Hard problems"] },
    ],
  },
  {
    slug: "system-design",
    title: "System Design",
    description: "Learn to design distributed systems — load balancers, databases, caches, message queues, and microservices.",
    category: "Computer Science",
    difficulty: "advanced",
    estimatedHours: 20,
    lessonCount: 28,
    isPro: false,
    tags: ["System Design", "Distributed", "Scalability", "Architecture"],
    whatYouLearn: ["CAP theorem and distributed systems", "SQL vs NoSQL tradeoffs", "Caching strategies", "Message queues", "Design case studies"],
    curriculum: [
      { section: "Foundations", lessons: ["Scalability basics", "CAP theorem", "Consistency models"] },
      { section: "Components", lessons: ["Load balancers", "Databases", "Caches", "Message queues"] },
      { section: "Case Studies", lessons: ["URL shortener", "Twitter feed", "Ride sharing", "Video streaming"] },
    ],
  },
  {
    slug: "algorithms",
    title: "Algorithms",
    description: "Deep dive into algorithm design — divide and conquer, greedy, graph algorithms, and NP-completeness.",
    category: "Computer Science",
    difficulty: "advanced",
    estimatedHours: 22,
    lessonCount: 32,
    isPro: true,
    tags: ["Algorithms", "Graph Theory", "Complexity", "Greedy"],
    whatYouLearn: ["Algorithm paradigms", "Graph algorithms (Dijkstra, Bellman-Ford)", "Greedy algorithms", "NP-completeness overview"],
    curriculum: [
      { section: "Paradigms", lessons: ["Divide & conquer", "Greedy", "DP review"] },
      { section: "Graphs", lessons: ["Shortest path", "MST", "Network flow"] },
      { section: "Complexity", lessons: ["P vs NP", "Reductions", "Approximation"] },
    ],
  },
  {
    slug: "os",
    title: "Operating Systems",
    description: "Understand what happens under the hood — processes, threads, memory, file systems, and the kernel.",
    category: "Computer Science",
    difficulty: "advanced",
    estimatedHours: 18,
    lessonCount: 26,
    isPro: false,
    tags: ["OS", "Processes", "Memory", "File Systems"],
    whatYouLearn: ["Processes and threads", "CPU scheduling", "Memory management & virtual memory", "File systems", "IPC and synchronisation"],
    curriculum: [
      { section: "Processes", lessons: ["Process lifecycle", "Threads", "Scheduling"] },
      { section: "Memory", lessons: ["Virtual memory", "Paging", "Segmentation"] },
      { section: "Storage", lessons: ["File systems", "I/O", "RAID"] },
    ],
  },
];

// ---------------------------------------------------------------------------
// Mobile Development
// ---------------------------------------------------------------------------

const mobileCourses: CatalogCourse[] = [
  {
    slug: "react-native",
    title: "React Native",
    description: "Build native iOS and Android apps with React Native — one codebase, two platforms.",
    category: "Mobile Development",
    difficulty: "intermediate",
    estimatedHours: 22,
    lessonCount: 34,
    isPro: false,
    tags: ["React Native", "iOS", "Android", "Expo"],
    whatYouLearn: ["React Native core components", "Navigation with Expo Router", "Native device APIs", "State management", "App Store deployment"],
    curriculum: [
      { section: "Basics", lessons: ["Setup with Expo", "Core components", "Styling"] },
      { section: "Navigation", lessons: ["Stack navigation", "Tab navigation", "Deep linking"] },
      { section: "Native Features", lessons: ["Camera", "Notifications", "Storage"] },
    ],
  },
  {
    slug: "swift",
    title: "iOS with Swift",
    description: "Build native iOS apps with Swift and SwiftUI — the modern way to develop for Apple platforms.",
    category: "Mobile Development",
    difficulty: "intermediate",
    estimatedHours: 28,
    lessonCount: 40,
    isPro: true,
    tags: ["Swift", "SwiftUI", "iOS", "Xcode"],
    whatYouLearn: ["Swift language fundamentals", "SwiftUI declarative UI", "Core Data", "Networking with URLSession", "App Store submission"],
    curriculum: [
      { section: "Swift", lessons: ["Syntax", "Optionals", "Protocols", "Generics"] },
      { section: "SwiftUI", lessons: ["Views", "State management", "Navigation", "Animations"] },
      { section: "APIs & Storage", lessons: ["URLSession", "Core Data", "CloudKit"] },
    ],
  },
  {
    slug: "kotlin",
    title: "Android with Kotlin",
    description: "Build modern Android apps with Kotlin and Jetpack Compose.",
    category: "Mobile Development",
    difficulty: "intermediate",
    estimatedHours: 26,
    lessonCount: 38,
    isPro: false,
    tags: ["Kotlin", "Android", "Jetpack Compose"],
    whatYouLearn: ["Kotlin language", "Jetpack Compose UI", "ViewModel and LiveData", "Room database", "Play Store deployment"],
    curriculum: [
      { section: "Kotlin", lessons: ["Basics", "Coroutines", "Extensions"] },
      { section: "Compose", lessons: ["Composables", "State", "Navigation", "Theming"] },
      { section: "Backend", lessons: ["Room", "Retrofit", "WorkManager"] },
    ],
  },
  {
    slug: "flutter",
    title: "Flutter & Dart",
    description: "Build beautiful cross-platform apps with Flutter — iOS, Android, Web, and Desktop from one codebase.",
    category: "Mobile Development",
    difficulty: "beginner",
    estimatedHours: 20,
    lessonCount: 30,
    isPro: false,
    tags: ["Flutter", "Dart", "Cross-platform"],
    whatYouLearn: ["Dart language basics", "Flutter widget tree", "State management with Bloc", "Firebase integration", "Deployment"],
    curriculum: [
      { section: "Dart", lessons: ["Basics", "Classes", "Async"] },
      { section: "Flutter UI", lessons: ["Widgets", "Layouts", "Navigation", "Animations"] },
      { section: "Data", lessons: ["State management", "Firebase", "REST APIs"] },
    ],
  },
  {
    slug: "mobile-ui",
    title: "Mobile UI Design",
    description: "Design intuitive mobile interfaces that users love — HIG, Material Design, and prototyping.",
    category: "Mobile Development",
    difficulty: "beginner",
    estimatedHours: 10,
    lessonCount: 16,
    isPro: false,
    tags: ["UI Design", "UX", "Figma", "Mobile"],
    whatYouLearn: ["iOS Human Interface Guidelines", "Material Design 3", "Figma prototyping", "Usability testing"],
    curriculum: [
      { section: "Fundamentals", lessons: ["Design systems", "Typography", "Color", "Spacing"] },
      { section: "Platforms", lessons: ["iOS HIG", "Material Design", "Accessibility"] },
      { section: "Prototyping", lessons: ["Figma basics", "Interactive prototypes", "Handoff"] },
    ],
  },
  {
    slug: "app-store",
    title: "App Store Strategy",
    description: "Get your app discovered and convert downloads to revenue — ASO, monetisation, and growth.",
    category: "Mobile Development",
    difficulty: "beginner",
    estimatedHours: 8,
    lessonCount: 14,
    isPro: false,
    tags: ["ASO", "Monetisation", "Growth", "Marketing"],
    whatYouLearn: ["App Store Optimisation (ASO)", "Screenshot and preview video design", "Pricing strategies", "User acquisition", "Analytics"],
    curriculum: [
      { section: "ASO", lessons: ["Keywords", "Screenshots", "Reviews"] },
      { section: "Monetisation", lessons: ["IAP", "Subscriptions", "Ads"] },
      { section: "Growth", lessons: ["Analytics", "Retention", "A/B testing"] },
    ],
  },
];

// ---------------------------------------------------------------------------
// DevOps & Cloud
// ---------------------------------------------------------------------------

const devOpsCourses: CatalogCourse[] = [
  {
    slug: "docker",
    title: "Docker & Containers",
    description: "Package and run applications anywhere with Docker — containers, images, volumes, and Docker Compose.",
    category: "DevOps & Cloud",
    difficulty: "beginner",
    estimatedHours: 12,
    lessonCount: 20,
    isPro: false,
    tags: ["Docker", "Containers", "DevOps"],
    whatYouLearn: ["Container fundamentals", "Writing Dockerfiles", "Multi-stage builds", "Docker Compose", "Container networking"],
    curriculum: [
      { section: "Containers", lessons: ["Docker basics", "Images", "Volumes", "Networks"] },
      { section: "Compose", lessons: ["docker-compose.yml", "Multi-service apps", "Dev environments"] },
      { section: "Production", lessons: ["Multi-stage builds", "Security", "Registry"] },
    ],
  },
  {
    slug: "k8s",
    title: "Kubernetes",
    description: "Orchestrate containers at scale with Kubernetes — deployments, services, ingress, and helm.",
    category: "DevOps & Cloud",
    difficulty: "advanced",
    estimatedHours: 26,
    lessonCount: 38,
    isPro: true,
    tags: ["Kubernetes", "K8s", "Orchestration", "Helm"],
    whatYouLearn: ["Kubernetes architecture", "Pods, deployments, services", "ConfigMaps and Secrets", "Helm charts", "Horizontal pod autoscaling"],
    curriculum: [
      { section: "Core", lessons: ["Architecture", "Pods", "Deployments", "Services"] },
      { section: "Config", lessons: ["ConfigMaps", "Secrets", "Namespaces", "RBAC"] },
      { section: "Advanced", lessons: ["Ingress", "HPA", "StatefulSets", "Helm"] },
    ],
  },
  {
    slug: "aws",
    title: "AWS Essentials",
    description: "Get productive on AWS — EC2, S3, RDS, Lambda, and the core services every developer should know.",
    category: "DevOps & Cloud",
    difficulty: "beginner",
    estimatedHours: 18,
    lessonCount: 28,
    isPro: false,
    tags: ["AWS", "Cloud", "EC2", "Lambda"],
    whatYouLearn: ["AWS core services", "IAM and security", "S3 storage", "EC2 and Auto Scaling", "Lambda and serverless"],
    curriculum: [
      { section: "Foundations", lessons: ["AWS regions & AZs", "IAM", "VPC basics"] },
      { section: "Compute & Storage", lessons: ["EC2", "S3", "RDS", "ElastiCache"] },
      { section: "Serverless", lessons: ["Lambda", "API Gateway", "DynamoDB", "SQS"] },
    ],
  },
  {
    slug: "cicd",
    title: "CI/CD Pipelines",
    description: "Automate your build, test, and deploy workflows with GitHub Actions, GitLab CI, and ArgoCD.",
    category: "DevOps & Cloud",
    difficulty: "intermediate",
    estimatedHours: 14,
    lessonCount: 22,
    isPro: false,
    tags: ["CI/CD", "GitHub Actions", "DevOps", "Automation"],
    whatYouLearn: ["CI/CD concepts", "GitHub Actions workflows", "Test automation", "Docker in CI", "GitOps with ArgoCD"],
    curriculum: [
      { section: "CI", lessons: ["Concepts", "GitHub Actions", "Test stages", "Docker builds"] },
      { section: "CD", lessons: ["Environments", "Deployment strategies", "GitOps", "Rollbacks"] },
    ],
  },
  {
    slug: "linux",
    title: "Linux for Developers",
    description: "Command the terminal — filesystem, processes, networking, shell scripting, and server administration.",
    category: "DevOps & Cloud",
    difficulty: "beginner",
    estimatedHours: 10,
    lessonCount: 18,
    isPro: false,
    tags: ["Linux", "Bash", "Terminal", "Shell"],
    whatYouLearn: ["Linux filesystem hierarchy", "Essential commands", "Process management", "Shell scripting", "SSH and networking"],
    curriculum: [
      { section: "Foundations", lessons: ["Filesystem", "Commands", "Permissions", "Users"] },
      { section: "Scripting", lessons: ["Bash basics", "Scripts", "Cron jobs"] },
      { section: "Networking", lessons: ["SSH", "Firewall", "Logs"] },
    ],
  },
  {
    slug: "terraform",
    title: "Terraform & IaC",
    description: "Provision cloud infrastructure as code with Terraform — reproducible, version-controlled, and scalable.",
    category: "DevOps & Cloud",
    difficulty: "intermediate",
    estimatedHours: 16,
    lessonCount: 24,
    isPro: true,
    tags: ["Terraform", "IaC", "AWS", "Infrastructure"],
    whatYouLearn: ["HCL syntax", "Terraform state management", "Modules and reusability", "Remote state", "CI/CD integration"],
    curriculum: [
      { section: "Basics", lessons: ["HCL", "Providers", "Resources", "Variables"] },
      { section: "Intermediate", lessons: ["State", "Modules", "Outputs", "Data sources"] },
      { section: "Production", lessons: ["Remote state", "Workspaces", "CI/CD"] },
    ],
  },
];

// ---------------------------------------------------------------------------
// Master catalog
// ---------------------------------------------------------------------------

export const ALL_COURSES: CatalogCourse[] = [
  ...webDevCourses,
  ...dataScienceCourses,
  ...aiCourses,
  ...csCourses,
  ...mobileCourses,
  ...devOpsCourses,
];

export const CATEGORIES = [
  "Web Development",
  "Data Science",
  "AI & Machine Learning",
  "Computer Science",
  "Mobile Development",
  "DevOps & Cloud",
] as const;

export type Category = (typeof CATEGORIES)[number];

export function getCourseBySlug(slug: string): CatalogCourse | undefined {
  return ALL_COURSES.find((c) => c.slug === slug);
}

export function getCoursesByCategory(category: Category): CatalogCourse[] {
  return ALL_COURSES.filter((c) => c.category === category);
}

const DIFFICULTY_ORDER: Record<string, number> = { beginner: 0, intermediate: 1, advanced: 2 };

export function sortedCourses(courses: CatalogCourse[]): CatalogCourse[] {
  return [...courses].sort((a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty]);
}
