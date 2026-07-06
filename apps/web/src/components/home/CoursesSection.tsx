"use client";

import React, { useState, useRef, useMemo } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Link from "next/link";

// ─── Color tokens — charcoal family matching #18181C ─────────────────────────
const C = {
  bg:        "#18181C",
  card:      "#1C1C1E",
  deep:      "#121214",
  gold:      "#C19562",
  goldText:  "#1A0E00",
} as const;

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = {
  Laptop: () => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
    </svg>
  ),
  BarChart: () => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
    </svg>
  ),
  Robot: () => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h-2c0-2.76-2.24-5-5-5H7c-2.76 0-5 2.24-5 5H0a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5A2.5 2.5 0 0 0 7.5 18a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5a2.5 2.5 0 0 0-2.5-2.5z" />
    </svg>
  ),
  Palette: () => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path d="M12 3a9 9 0 0 0 0 18c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1-.23-.27-.38-.62-.38-1 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  ),
  LinkChain: () => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
    </svg>
  ),
  MemoryChip: () => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path d="M22 9V7h-2V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v2H2v2h2v2H2v2h2v2c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2zm-4 6H6V5h12v10zM8 7h8v2H8zm0 4h8v2H8z" />
    </svg>
  ),
  Mobile: () => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
    </svg>
  ),
  Server: () => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path d="M20 1H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zM4 7V3h16v4H4zM4 11h16c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2zm0 6h16v-4H4v4zM7 4.5c-.83 0-1.5.67-1.5 1.5S6.17 7.5 7 7.5 8.5 6.83 8.5 6 7.83 4.5 7 4.5zm0 8c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S7.83 12.5 7 12.5z" />
    </svg>
  ),
  Database: () => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.59 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.47 6 2s-2.13 2-6 2-6-1.47-6-2 2.13-2 6-2zm0 14c-3.87 0-6-1.47-6-2v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V17c0 .53-2.13 2-6 2zm0-4c-3.87 0-6-1.47-6-2v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V13c0 .53-2.13 2-6 2z" />
    </svg>
  ),
  Sparkle: () => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path d="M12 1L9.18 9.18 1 12l8.18 2.82L12 23l2.82-8.18L23 12l-8.18-2.82z" />
    </svg>
  ),
  Layers: () => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z" />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 15c-3.17-.85-6-4.17-6-7.91V6.3l6-2.25 6 2.25v2.79c0 3.74-2.83 7.06-6 7.91z" />
    </svg>
  ),
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "popular",      label: "Popular" },
  { id: "web-dev",      label: "Web Development" },
  { id: "data-science", label: "Data Science" },
  { id: "ai-ml",        label: "AI / ML" },
  { id: "design",       label: "Design" },
  { id: "blockchain",   label: "Blockchain" },
];

type Level = "Beginner" | "Intermediate" | "Advanced";

interface Course {
  id: number;
  title: string;
  instructor: string;
  category: string;
  categoryLabel: string;
  duration: string;
  level: Level;
  students: number;
  rating: number;
  xpReward: number;
  coinReward: number;
  accent: string;
  icon: React.ReactNode;
  tags: readonly string[];
  description?: string;
  popular?: boolean;
}

const ALL_COURSES: Course[] = [
  // ── Web Development ──────────────────────────────────────────────────────────
  {
    id: 1,
    title: "Full-Stack Web Development with Next.js 15",
    instructor: "Alex Rivera",
    category: "web-dev",
    categoryLabel: "Web Development",
    duration: "42 hrs",
    level: "Intermediate",
    students: 8420,
    rating: 4.9,
    xpReward: 1500,
    coinReward: 12,
    accent: "#3B82F6",
    icon: <Icon.Laptop />,
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    description: "Master modern full-stack development with the latest Next.js features. Build production-ready applications with server components, streaming, and edge runtime deployments.",
    popular: true,
  },
  {
    id: 7,
    title: "React Native Mobile Development",
    instructor: "Priya Nair",
    category: "web-dev",
    categoryLabel: "Web Development",
    duration: "30 hrs",
    level: "Beginner",
    students: 6150,
    rating: 4.7,
    xpReward: 900,
    coinReward: 8,
    accent: "#3B82F6",
    icon: <Icon.Mobile />,
    tags: ["React Native", "Expo", "iOS", "Android"],
    description: "Build cross-platform mobile apps with React Native. Ship to iOS and Android from a single codebase using the tools you already know.",
  },
  {
    id: 8,
    title: "Node.js & Express REST APIs",
    instructor: "Marcus Lee",
    category: "web-dev",
    categoryLabel: "Web Development",
    duration: "24 hrs",
    level: "Intermediate",
    students: 4820,
    rating: 4.8,
    xpReward: 1100,
    coinReward: 10,
    accent: "#3B82F6",
    icon: <Icon.Server />,
    tags: ["Node.js", "Express", "REST", "JWT"],
    description: "Design and build scalable REST APIs with Node.js and Express. Covers authentication, middleware, database integration, and deployment patterns.",
  },

  // ── Data Science ─────────────────────────────────────────────────────────────
  {
    id: 2,
    title: "Python for Data Science",
    instructor: "Mei Chen",
    category: "data-science",
    categoryLabel: "Data Science",
    duration: "28 hrs",
    level: "Beginner",
    students: 12300,
    rating: 4.8,
    xpReward: 900,
    coinReward: 8,
    accent: "#10B981",
    icon: <Icon.BarChart />,
    tags: ["Python", "Pandas", "NumPy"],
    description: "Get started with data analysis and visualization using Python. Learn Pandas, NumPy, and Matplotlib to extract insights from real-world datasets.",
    popular: true,
  },
  {
    id: 9,
    title: "SQL for Data Analytics",
    instructor: "Sara Okonkwo",
    category: "data-science",
    categoryLabel: "Data Science",
    duration: "18 hrs",
    level: "Beginner",
    students: 9340,
    rating: 4.7,
    xpReward: 700,
    coinReward: 6,
    accent: "#10B981",
    icon: <Icon.Database />,
    tags: ["SQL", "PostgreSQL", "Window Functions"],
  },
  {
    id: 10,
    title: "Deep Learning with TensorFlow",
    instructor: "Kai Tanaka",
    category: "data-science",
    categoryLabel: "Data Science",
    duration: "38 hrs",
    level: "Advanced",
    students: 3710,
    rating: 4.9,
    xpReward: 2000,
    coinReward: 18,
    accent: "#10B981",
    icon: <Icon.MemoryChip />,
    tags: ["TensorFlow", "Keras", "CNNs", "Transfer Learning"],
  },

  // ── AI / ML ──────────────────────────────────────────────────────────────────
  {
    id: 3,
    title: "Building AI Agents with LangChain",
    instructor: "Jordan Smith",
    category: "ai-ml",
    categoryLabel: "AI / ML",
    duration: "35 hrs",
    level: "Advanced",
    students: 5640,
    rating: 4.9,
    xpReward: 2000,
    coinReward: 18,
    accent: "#8B5CF6",
    icon: <Icon.Robot />,
    tags: ["LangChain", "GPT-4", "Agents"],
    description: "Build autonomous AI agents that can plan, use tools, and execute multi-step tasks. From simple chains to production-grade agentic systems.",
    popular: true,
  },
  {
    id: 11,
    title: "Prompt Engineering for GPT-4",
    instructor: "Nia Osei",
    category: "ai-ml",
    categoryLabel: "AI / ML",
    duration: "12 hrs",
    level: "Beginner",
    students: 11200,
    rating: 4.7,
    xpReward: 600,
    coinReward: 5,
    accent: "#8B5CF6",
    icon: <Icon.Sparkle />,
    tags: ["Prompt Design", "GPT-4", "Chain-of-Thought"],
    popular: true,
  },

  // ── Design ────────────────────────────────────────────────────────────────────
  {
    id: 4,
    title: "UI/UX Design Fundamentals",
    instructor: "Sofia Park",
    category: "design",
    categoryLabel: "Design",
    duration: "20 hrs",
    level: "Beginner",
    students: 9870,
    rating: 4.7,
    xpReward: 700,
    coinReward: 5,
    accent: "#F43F5E",
    icon: <Icon.Palette />,
    tags: ["Figma", "Prototyping", "Research"],
    description: "Learn the fundamentals of user interface and experience design. Go from wireframes to polished prototypes using industry-standard processes.",
    popular: true,
  },
  {
    id: 12,
    title: "Motion Design with Framer Motion",
    instructor: "Chloe Dubois",
    category: "design",
    categoryLabel: "Design",
    duration: "16 hrs",
    level: "Intermediate",
    students: 3200,
    rating: 4.8,
    xpReward: 900,
    coinReward: 8,
    accent: "#F43F5E",
    icon: <Icon.Layers />,
    tags: ["Framer Motion", "Animation", "React"],
  },

  // ── Blockchain ────────────────────────────────────────────────────────────────
  {
    id: 5,
    title: "Move Smart Contracts on Aptos",
    instructor: "Dev Patel",
    category: "blockchain",
    categoryLabel: "Blockchain",
    duration: "18 hrs",
    level: "Advanced",
    students: 2340,
    rating: 4.8,
    xpReward: 1800,
    coinReward: 20,
    accent: "#F59E0B",
    icon: <Icon.LinkChain />,
    tags: ["Move", "Aptos", "DeFi"],
    description: "Write, test, and deploy Move smart contracts on the Aptos blockchain. Covers resource-oriented programming, security patterns, and DeFi primitives.",
    popular: true,
  },
  {
    id: 13,
    title: "Solidity & Ethereum Smart Contracts",
    instructor: "Omar Khalil",
    category: "blockchain",
    categoryLabel: "Blockchain",
    duration: "22 hrs",
    level: "Beginner",
    students: 5480,
    rating: 4.6,
    xpReward: 1000,
    coinReward: 9,
    accent: "#F59E0B",
    icon: <Icon.Shield />,
    tags: ["Solidity", "Ethereum", "Hardhat", "ERC-20"],
  },
];

// ─── Level badge — charcoal-safe semi-transparent tints ──────────────────────
const LEVEL_CONFIG: Record<Level, { bg: string; border: string; color: string }> = {
  Beginner:     { bg: "rgba(52,211,153,0.08)",  border: "rgba(52,211,153,0.22)",  color: "#34D399" },
  Intermediate: { bg: "rgba(96,165,250,0.08)",  border: "rgba(96,165,250,0.22)",  color: "#60A5FA" },
  Advanced:     { bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.22)", color: "#A78BFA" },
};

// ─── Animation variants ───────────────────────────────────────────────────────
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

// Corner cross — dim at rest, brightens on group hover, gold variant available
function PlusIcon({ position, gold = false }: { position: string; gold?: boolean }) {
  return (
    <svg
      width="13" height="13" viewBox="0 0 15 15"
      fill="none" stroke="currentColor" strokeWidth="1"
      className={`absolute transition-all duration-300 ${gold
        ? "text-white/[0.12] group-hover:text-[#C19562]/70"
        : "text-white/[0.12] group-hover:text-white/[0.35]"
      } ${position}`}
    >
      <path d="M7.5 0V15M0 7.5H15" />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s} className="h-3 w-3"
          fill={s <= Math.floor(rating) ? C.gold : "transparent"}
          stroke={s <= Math.floor(rating) ? C.gold : "rgba(255,255,255,0.15)"}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-[11px] font-medium text-white/40" style={{ fontFamily: "var(--font-sora)" }}>
        {rating}
      </span>
    </div>
  );
}

function LevelBadge({ level }: { level: Level }) {
  const cfg = LEVEL_CONFIG[level];
  return (
    <span
      className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
      style={{ backgroundColor: cfg.bg, border: `1px dashed ${cfg.border}`, color: cfg.color, fontFamily: "var(--font-sora)" }}
    >
      {level}
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function CoursesSection() {
  const [activeCategory, setActiveCategory] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 });

  const displayedCourses = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      return ALL_COURSES.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q) ||
          c.categoryLabel.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (activeCategory === "popular") return ALL_COURSES.filter((c) => c.popular);
    return ALL_COURSES.filter((c) => c.category === activeCategory);
  }, [activeCategory, searchQuery]);

  const featured = displayedCourses[0];
  const rest = displayedCourses.slice(1);
  const useBentoHeight = displayedCourses.length >= 3;

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 sm:py-32"
      style={{ backgroundColor: C.bg }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-14"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#C19562]"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Curated Learning Paths
          </motion.p>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <motion.h2
              variants={fadeUp}
              className="max-w-xl text-[2.25rem] font-extrabold leading-[1.1] tracking-[-0.025em] text-white sm:text-5xl"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Courses built for{" "}
              <span className="bg-gradient-to-r from-[#FCE8C0] via-[#C19562] to-[#A67C52] bg-clip-text text-transparent">
                real progress
              </span>
            </motion.h2>

            {/* Search */}
            <motion.div variants={fadeUp} className="group relative w-full shrink-0 sm:w-72">
              <svg
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/[0.22] transition-colors duration-200 group-focus-within:text-[#C19562]"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search courses…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                suppressHydrationWarning
                className="w-full border border-dashed border-white/[0.09] bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/25 hover:border-white/[0.18] focus:border-[#C19562]"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  suppressHydrationWarning
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/[0.22] transition-colors duration-200 hover:text-white/60"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </motion.div>
          </div>

          {/* Category tabs */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setSearchQuery(""); }}
                suppressHydrationWarning
                className="relative px-4 py-1.5 text-[12px] font-semibold transition-colors duration-200"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                {activeCategory === cat.id && !searchQuery ? (
                  <>
                    <motion.span
                      layoutId="courses-tab"
                      className="absolute inset-0"
                      style={{ backgroundColor: C.gold }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                    />
                    <span className="relative z-10" style={{ color: C.goldText }}>{cat.label}</span>
                  </>
                ) : (
                  <span className="relative z-10 border border-dashed border-white/[0.09] px-4 py-1.5 text-white/40 transition-all duration-300 hover:border-white/[0.22] hover:text-white/70">
                    {cat.label}
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Bento Grid ───────────────────────────────────────────────────── */}
        {displayedCourses.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center border border-dashed border-white/[0.09] bg-white/[0.04] text-white/[0.22]">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="mb-1 text-[15px] font-semibold text-white/70" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              No courses found
            </p>
            <p className="mb-6 text-[13px] text-white/35" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              Try a different search term or browse a category.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              suppressHydrationWarning
              className="group relative inline-flex h-9 items-center gap-2 border border-dashed border-white/[0.09] bg-white/[0.04] px-5 text-[12px] font-semibold text-white/50 transition-all duration-300 hover:border-[#C19562]/50 hover:text-white/80"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Clear search
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={`${activeCategory}-${searchQuery}`}
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {/* ── Featured Card ── */}
            <motion.article
              variants={fadeUp}
              className={`group relative flex flex-col bg-[#1C1C1E] border border-dashed border-white/[0.09] transition-all duration-300 col-span-1 hover:border-white/[0.20] hover:shadow-[0_0_28px_-6px_rgba(255,255,255,0.05)] ${
                displayedCourses.length === 1
                  ? "sm:col-span-2 lg:col-span-3"
                  : `sm:col-span-2 ${useBentoHeight ? "lg:row-span-2" : ""}`
              }`}
            >
              <PlusIcon position="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
              <PlusIcon position="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
              <PlusIcon position="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
              <PlusIcon position="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />

              {/* Header panel — one shade darker */}
              <div className="flex-none border-b border-dashed border-white/[0.07] bg-[#121214] p-6 transition-colors duration-300 group-hover:border-white/[0.14] sm:p-7">
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.14em]"
                    style={{ color: featured.accent, fontFamily: "var(--font-sora)" }}
                  >
                    {featured.categoryLabel}
                  </span>
                  <LevelBadge level={featured.level} />
                </div>
                <div className="mb-4 select-none text-4xl leading-none" style={{ color: featured.accent }}>
                  {featured.icon}
                </div>
                <h3
                  className="text-xl font-bold leading-snug text-white sm:text-[1.4rem]"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {featured.title}
                </h3>
              </div>

              {/* Card body */}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p
                  className="mb-5 text-[13.5px] leading-relaxed text-white/45"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {featured.description ?? `Learn ${featured.categoryLabel} from the ground up with hands-on projects and real-world examples guided by an expert instructor.`}
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-dashed border-white/[0.09] bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/50"
                      style={{ fontFamily: "var(--font-sora)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="flex h-7 w-7 items-center justify-center border border-dashed border-white/[0.09] bg-white/[0.04] text-[11px] font-bold text-white/55"
                      >
                        {featured.instructor.charAt(0)}
                      </div>
                      <span className="text-[12px] text-white/42" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                        {featured.instructor}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-[12px] text-white/30">
                      <span className="flex items-center gap-1.5">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {featured.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        {featured.students.toLocaleString()} enrolled
                      </span>
                    </div>
                  </div>

                  <Stars rating={featured.rating} />

                  <div className="border-t border-dashed border-white/[0.07] transition-colors duration-300 group-hover:border-white/[0.14]" />

                  <div className="flex items-center justify-between">
                    <span
                      className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/28"
                      style={{ fontFamily: "var(--font-sora)" }}
                    >
                      Earn on completion
                    </span>
                    <div className="flex items-center gap-3" style={{ fontFamily: "var(--font-sora)" }}>
                      <span className="text-[12px] font-bold text-blue-400">+{featured.xpReward.toLocaleString()} XP</span>
                      <span className="text-white/20">·</span>
                      <span className="text-[12px] font-bold text-[#C19562]">+{featured.coinReward} SC</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* ── Standard Cards ── */}
            {rest.map((course) => (
              <motion.article
                key={course.id}
                variants={fadeUp}
                className="group relative flex flex-col border border-dashed border-white/[0.09] bg-[#1C1C1E] p-6 transition-all duration-300 hover:border-white/[0.20] hover:shadow-[0_0_20px_-6px_rgba(255,255,255,0.05)]"
              >
                <PlusIcon position="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
                <PlusIcon position="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
                <PlusIcon position="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
                <PlusIcon position="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />

                <div className="mb-4 flex items-center justify-between">
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.12em]"
                    style={{ color: course.accent, fontFamily: "var(--font-sora)" }}
                  >
                    {course.categoryLabel}
                  </span>
                  <span className="select-none text-2xl leading-none" style={{ color: course.accent }}>
                    {course.icon}
                  </span>
                </div>

                <h3 className="mb-1.5 text-[15px] font-bold leading-snug text-white" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  {course.title}
                </h3>

                <p className="mb-4 text-[12px] text-white/38" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  by {course.instructor}
                </p>

                <div className="mb-auto flex flex-wrap gap-1.5">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-dashed border-white/[0.09] bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-white/38"
                      style={{ fontFamily: "var(--font-sora)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="my-5 border-t border-dashed border-white/[0.07] transition-colors duration-300 group-hover:border-white/[0.16]" />

                <div className="flex items-center justify-between">
                  <Stars rating={course.rating} />
                  <LevelBadge level={course.level} />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[11px] text-white/30">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.duration}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] font-semibold" style={{ fontFamily: "var(--font-sora)" }}>
                    <span className="text-blue-400">+{course.xpReward.toLocaleString()} XP</span>
                    <span className="text-white/20">·</span>
                    <span className="text-[#C19562]">+{course.coinReward} SC</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* ── View all CTA ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/courses"
            className="group relative inline-flex h-11 items-center gap-2.5 border border-dashed border-white/[0.09] px-7 text-sm font-semibold text-white/55 transition-all duration-300 hover:border-[#C19562]/50 hover:bg-[#C19562]/[0.05] hover:text-white/90"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            <PlusIcon position="top-0 left-0 -translate-x-1/2 -translate-y-1/2" gold />
            <PlusIcon position="top-0 right-0 translate-x-1/2 -translate-y-1/2" gold />
            <PlusIcon position="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" gold />
            <PlusIcon position="bottom-0 right-0 translate-x-1/2 translate-y-1/2" gold />
            View all courses
            <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>

        {/* ── Section breakpoint ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-2 mt-16 flex items-center"
        >
          <svg width="13" height="13" viewBox="0 0 15 15" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" className="shrink-0">
            <path d="M7.5 0V15M0 7.5H15" />
          </svg>
          <div className="flex-1 border-t border-dashed border-white/[0.07]" />
          <div className="mx-4 h-2.5 w-2.5 rotate-45 border border-dashed border-[#C19562]/40" />
          <div className="flex-1 border-t border-dashed border-white/[0.07]" />
          <svg width="13" height="13" viewBox="0 0 15 15" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" className="shrink-0">
            <path d="M7.5 0V15M0 7.5H15" />
          </svg>
        </motion.div>

      </div>
    </section>
  );
}
