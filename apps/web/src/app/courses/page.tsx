"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { AscendraNavbar } from "@/components/ui/navbar";
import { ALL_COURSES, CATEGORIES, type Category, type CatalogCourse } from "@/data/course-catalog";
import { cn } from "@/lib/utils";

// ─── Motion variants ──────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

// ─── Difficulty config ────────────────────────────────────────────────────────
const DIFF_CONFIG: Record<string, { accent: string; dotColor: string; label: string; statusBg: string; statusBorder: string }> = {
  beginner: {
    accent: "#FFFFFF",
    dotColor: "#FFFFFF",
    label: "Beginner",
    statusBg: "rgba(255,255,255,0.08)",
    statusBorder: "rgba(255,255,255,0.25)",
  },
  intermediate: {
    accent: "#A3A3A3",
    dotColor: "#A3A3A3",
    label: "Intermediate",
    statusBg: "rgba(163,163,163,0.08)",
    statusBorder: "rgba(163,163,163,0.25)",
  },
  advanced: {
    accent: "#525252",
    dotColor: "#525252",
    label: "Advanced",
    statusBg: "rgba(82,82,82,0.08)",
    statusBorder: "rgba(82,82,82,0.2)",
  },
};

// ─── BentoCard (mirrors RoadmapSection) ──────────────────────────────────────
function BentoCard({
  children,
  accent = "#FFFFFF",
  className = "",
}: {
  children: React.ReactNode;
  accent?: string;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={`group relative overflow-hidden rounded-2xl bg-black/40 p-[1px] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,255,255,0.04)] ${className}`}
    >
      {/* Static border — fades on hover */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 transition-colors duration-500 group-hover:border-transparent" />

      {/* Spinning conic-gradient edge */}
      <div
        className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, ${accent} 50%, transparent 100%)`,
        }}
      />

      {/* Inner card surface */}
      <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-[15px] bg-[#151518] transition-colors duration-500 group-hover:bg-[#1a1a1e]">
        {/* Top-light shimmer on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative z-20 flex h-full flex-col">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function StatusDot({ color }: { color: string }) {
  return (
    <span
      className="flex h-2 w-2 shrink-0 rounded-full"
      style={{ backgroundColor: color, boxShadow: `0 0 8px 1px ${color}80` }}
    />
  );
}

// ─── Course Card ──────────────────────────────────────────────────────────────
function CourseCard({ course }: { course: CatalogCourse }) {
  const diff = DIFF_CONFIG[course.difficulty];

  return (
    <Link href={`/courses/${course.slug}`} className="block h-full">
      <BentoCard accent={diff.accent} className="h-full">
        <div className="flex h-full flex-col p-6">

          {/* Thumbnail monogram */}
          <div
            className="mb-5 flex h-28 items-center justify-center rounded-xl border border-white/5 text-4xl font-black tracking-tight select-none transition-colors duration-500 group-hover:border-white/10"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
              color: `${diff.accent}22`,
            }}
          >
            <span
              className="bg-gradient-to-br bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${diff.accent}55, ${diff.accent}18)`,
                fontSize: "2.5rem",
              }}
            >
              {course.title.slice(0, 2).toUpperCase()}
            </span>
          </div>

          {/* Badges row */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className="flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md"
              style={{
                backgroundColor: diff.statusBg,
                color: diff.dotColor,
                border: `1px solid ${diff.statusBorder}`,
              }}
            >
              <StatusDot color={diff.dotColor} />
              {diff.label}
            </span>
            {course.isPro && (
              <span className="rounded-full border border-neutral-500/40 bg-neutral-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-300">
                PRO
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className="text-[15px] font-bold leading-snug tracking-tight text-white/90 transition-colors duration-300 group-hover:text-white"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            {course.title}
          </h3>

          {/* Description */}
          <p
            className="mt-2 flex-1 text-[13px] leading-relaxed text-neutral-500 line-clamp-2 transition-colors duration-300 group-hover:text-neutral-400"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            {course.description}
          </p>

          {/* Footer meta */}
          <div className="mt-5 flex items-center gap-4 border-t border-white/[0.06] pt-4 text-[11px] text-neutral-600 transition-colors duration-300 group-hover:text-neutral-500">
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {course.lessonCount} lessons
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {course.estimatedHours}h
            </span>
            <span className="ml-auto flex items-center gap-1 text-[10px] font-medium tracking-wide text-white/20 transition-colors duration-300 group-hover:text-white/50">
              View course
              <svg className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </BentoCard>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");

  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.05 });

  const filtered = useMemo(() => {
    return ALL_COURSES.filter((c) => {
      if (activeCategory !== "All" && c.category !== activeCategory) return false;
      if (difficulty !== "all" && c.difficulty !== difficulty) return false;
      if (search) {
        const q = search.toLowerCase();
        return c.title.toLowerCase().includes(q) || c.tags.some((t) => t.toLowerCase().includes(q));
      }
      return true;
    });
  }, [activeCategory, search, difficulty]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#18181C" }}>
      <AscendraNavbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div
        ref={heroRef}
        className="relative overflow-hidden pt-32 pb-20 px-6"
      >
        {/* Top breakpoint line — mirrors RoadmapSection */}
        <div className="absolute inset-x-0 top-0 flex items-center px-6 lg:px-8">
          <svg width="13" height="13" viewBox="0 0 15 15" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" className="shrink-0">
            <path d="M7.5 0V15M0 7.5H15" />
          </svg>
          <div className="flex-1 border-t border-dashed border-white/10" />
          <div className="mx-4 h-2.5 w-2.5 rotate-45 border border-dashed border-white/40" />
          <div className="flex-1 border-t border-dashed border-white/10" />
          <svg width="13" height="13" viewBox="0 0 15 15" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" className="shrink-0">
            <path d="M7.5 0V15M0 7.5H15" />
          </svg>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Eyebrow pill */}
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              {ALL_COURSES.length} Courses Available
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div variants={fadeUp} className="mb-5 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-white/70" />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/70"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Course Catalog
            </span>
            <div className="h-px w-8 bg-white/70" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Find your next{" "}
            <span className="bg-gradient-to-br from-white via-neutral-400 to-neutral-700 bg-clip-text text-transparent drop-shadow-sm">
              skill.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-[15px] leading-[1.75] text-neutral-400"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Structured courses built by practitioners. Every lesson awards XP and moves your career forward.
          </motion.p>

          {/* Search */}
          <motion.div variants={fadeUp} className="mt-8 relative mx-auto max-w-md">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search courses or tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-neutral-600 backdrop-blur-md transition-colors duration-200 focus:border-white/25 focus:outline-none focus:ring-2 focus:ring-white/10"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* ── Filters & Grid ────────────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-7xl px-6 pb-28 lg:px-8">

        {/* Section divider */}
        <div className="mb-10 flex items-center gap-4">
          <div className="flex-1 border-t border-white/[0.06]" />
          <div className="h-1.5 w-1.5 rotate-45 border border-white/20" />
          <div className="flex-1 border-t border-white/[0.06]" />
        </div>

        {/* Category pills */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {(["All", ...CATEGORIES] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as Category | "All")}
              className={cn(
                "rounded-full border px-4 py-1.5 text-[12px] font-semibold transition-all duration-200",
                activeCategory === cat
                  ? "border-white/30 bg-white/10 text-white"
                  : "border-white/8 bg-white/[0.03] text-neutral-500 hover:border-white/15 hover:text-neutral-300"
              )}
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              {cat}
            </button>
          ))}

          {/* Difficulty filter — pushed right */}
          <div className="ml-auto flex items-center gap-2">
            {(["all", "beginner", "intermediate", "advanced"] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-[11px] font-semibold capitalize transition-all duration-200",
                  difficulty === d
                    ? "border-white/25 bg-white/10 text-white"
                    : "border-white/8 bg-transparent text-neutral-600 hover:text-neutral-300"
                )}
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                {d === "all" ? "All Levels" : d}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p
          className="mb-8 text-[12px] text-neutral-600"
          style={{ fontFamily: "var(--font-sora)" }}
        >
          {filtered.length} course{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-32 text-center">
            <p className="text-neutral-600" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              No courses match your filters.
            </p>
            <button
              onClick={() => { setSearch(""); setDifficulty("all"); setActiveCategory("All"); }}
              className="mt-4 text-sm text-white/40 underline underline-offset-4 transition-colors hover:text-white/70"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div
            ref={gridRef}
            variants={stagger}
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </motion.div>
        )}

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={gridInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 border-t border-white/[0.06] pt-10 text-center"
        >
          <p className="text-[13px] text-neutral-600" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            New courses ship every sprint.{" "}
            <span className="font-medium text-white/50">Pro members get early access to all new content.</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
