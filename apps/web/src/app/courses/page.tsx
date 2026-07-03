"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AscendraNavbar } from "@/components/ui/navbar";
import { ALL_COURSES, CATEGORIES, type Category, type CatalogCourse } from "@/data/course-catalog";
import { cn } from "@/lib/utils";

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner:     "bg-emerald-50 text-emerald-700 border-emerald-200",
  intermediate: "bg-blue-50 text-blue-700 border-blue-100",
  advanced:     "bg-violet-50 text-violet-700 border-violet-100",
};

function CourseCard({ course }: { course: CatalogCourse }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-lg"
    >
      {/* Thumbnail placeholder */}
      <div className="mb-4 flex h-36 items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 text-3xl font-black text-gray-200 select-none">
        {course.title.slice(0, 2).toUpperCase()}
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className={cn("rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide", DIFFICULTY_COLORS[course.difficulty])}>
          {course.difficulty}
        </span>
        {course.isPro && (
          <span className="rounded-full border border-amber-300 bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
            PRO
          </span>
        )}
      </div>

      <h3 className="text-[15px] font-bold tracking-tight text-gray-900 group-hover:text-[#C19562] transition-colors duration-200"
        style={{ fontFamily: "var(--font-plus-jakarta)" }}>
        {course.title}
      </h3>
      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-gray-500 line-clamp-2"
        style={{ fontFamily: "var(--font-plus-jakarta)" }}>
        {course.description}
      </p>

      <div className="mt-4 flex items-center gap-4 text-[11px] text-gray-400 border-t border-gray-50 pt-4">
        <span className="flex items-center gap-1">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          {course.lessonCount} lessons
        </span>
        <span className="flex items-center gap-1">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {course.estimatedHours}h
        </span>
      </div>
    </Link>
  );
}

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");

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
    <div className="min-h-screen bg-white">
      <AscendraNavbar />

      {/* Hero */}
      <div className="pt-32 pb-16 px-6 text-center bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C19562] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500" style={{ fontFamily: "var(--font-sora)" }}>
              {ALL_COURSES.length} Courses Available
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Find your next skill.
          </h1>
          <p className="mt-4 text-[15px] text-gray-500 leading-relaxed" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Structured courses built by practitioners. Every lesson awards XP and moves your career forward.
          </p>
          <div className="mt-6 relative mx-auto max-w-md">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-[#C19562] focus:outline-none focus:ring-2 focus:ring-[#C19562]/20"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(["All", ...CATEGORIES] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as Category | "All")}
              className={cn(
                "rounded-full border px-4 py-1.5 text-[12px] font-semibold transition-all duration-200",
                activeCategory === cat
                  ? "border-[#C19562] bg-[#C19562] text-white shadow-sm"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900"
              )}
            >
              {cat}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            {(["all", "beginner", "intermediate", "advanced"] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-[11px] font-semibold capitalize transition-all duration-200",
                  difficulty === d
                    ? "border-gray-800 bg-gray-900 text-white"
                    : "border-gray-200 bg-white text-gray-500 hover:text-gray-800"
                )}
              >
                {d === "all" ? "All Levels" : d}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="mb-6 text-[13px] text-gray-400" style={{ fontFamily: "var(--font-sora)" }}>
          {filtered.length} course{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-gray-400">No courses match your filters.</p>
            <button onClick={() => { setSearch(""); setDifficulty("all"); setActiveCategory("All"); }}
              className="mt-4 text-sm text-[#C19562] underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
