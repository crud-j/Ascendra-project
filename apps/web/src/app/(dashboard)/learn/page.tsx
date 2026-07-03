"use client";

import { useState } from "react";
import Link from "next/link";
import { useCourses } from "@/features/learning/hooks/use-learning";
import { useEnroll } from "@/features/learning/hooks/use-learning";
import { CATEGORIES, getCoursesByCategory, type Category } from "@/data/course-catalog";
import type { Course } from "@/types";
import { cn } from "@/lib/utils";

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner:     "bg-emerald-50 text-emerald-700 border-emerald-200",
  intermediate: "bg-blue-50 text-blue-700 border-blue-100",
  advanced:     "bg-violet-50 text-violet-700 border-violet-100",
};

function EnrolledCourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/learn/${course.id}`}
      className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C19562]/20 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-[14px] font-bold text-gray-900 leading-tight group-hover:text-[#C19562] transition-colors"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}>
          {course.title}
        </h3>
        <span className={cn("shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide", DIFFICULTY_COLORS[course.difficulty])}>
          {course.difficulty}
        </span>
      </div>

      <p className="text-[12px] text-gray-500 line-clamp-2 flex-1 mb-4">{course.description}</p>

      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-medium text-gray-400">{course.progress_percent}% complete</span>
          <span className="text-[11px] text-gray-400">{course.lesson_count} lessons</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#FCE8C0] to-[#C19562] transition-all duration-500"
            style={{ width: `${course.progress_percent}%` }}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-[#C19562]">
        {course.progress_percent === 0 ? "Start learning" : "Continue"}
        <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </Link>
  );
}

function AvailableCourseCard({ course, onEnroll, enrolling }: {
  course: { slug: string; title: string; description: string; difficulty: string; lessonCount: number; estimatedHours: number; isPro: boolean };
  onEnroll?: () => void;
  enrolling?: boolean;
}) {
  return (
    <div className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-gray-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-[14px] font-bold text-gray-900 leading-tight" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
          {course.title}
        </h3>
        <div className="flex shrink-0 gap-1">
          <span className={cn("rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide", DIFFICULTY_COLORS[course.difficulty as string])}>
            {course.difficulty}
          </span>
          {course.isPro && (
            <span className="rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-700">PRO</span>
          )}
        </div>
      </div>
      <p className="text-[12px] text-gray-500 line-clamp-2 flex-1 mb-4">{course.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-gray-400">{course.lessonCount} lessons · {course.estimatedHours}h</span>
        <button
          onClick={onEnroll}
          disabled={enrolling}
          className="rounded-lg bg-gray-900 px-3.5 py-1.5 text-[11px] font-semibold text-white transition-all hover:bg-[#C19562] disabled:opacity-50"
        >
          {enrolling ? "Enrolling..." : "Enroll"}
        </button>
      </div>
    </div>
  );
}

export default function LearnPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Web Development");
  const { data, isLoading, isError } = useCourses();
  const enroll = useEnroll();

  const enrolledCourses = data?.items.filter((c) => c.is_enrolled) ?? [];
  const catalogForCategory = getCoursesByCategory(activeCategory);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900" style={{ fontFamily: "var(--font-plus-jakarta)" }}>Learn</h1>
        <p className="mt-1 text-sm text-gray-500">Browse courses, complete lessons, and earn XP.</p>
      </div>

      {/* ── Available Now (static, no backend required) ── */}
      <section>
        <h2 className="mb-4 text-[13px] font-bold uppercase tracking-[0.16em] text-gray-400" style={{ fontFamily: "var(--font-sora)" }}>
          Available Now
        </h2>
        <Link
          href="/learn/html-css"
          className="group flex items-center gap-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-[#C19562]/30 hover:shadow-md"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-red-500 text-2xl font-black text-white shadow-sm select-none">
            HT
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-bold text-gray-900 group-hover:text-[#C19562] transition-colors" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              HTML &amp; CSS
            </p>
            <p className="text-[12px] text-gray-500 mt-0.5">16 lessons · 12h · Beginner · Built-in IDE + AI Tutor</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
              Ready
            </span>
            <svg className="h-5 w-5 text-gray-300 group-hover:text-[#C19562] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </section>

      {/* In Progress */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl bg-gray-100" />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-sm text-red-600">
          Could not load courses — make sure the Learning Service is running.{" "}
          <Link href="/courses" className="underline">Browse the catalog</Link> instead.
        </div>
      ) : enrolledCourses.length > 0 ? (
        <section>
          <h2 className="mb-4 text-[13px] font-bold uppercase tracking-[0.16em] text-gray-400" style={{ fontFamily: "var(--font-sora)" }}>
            In Progress
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((c) => <EnrolledCourseCard key={c.id} course={c} />)}
          </div>
        </section>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
          <p className="text-[13px] text-gray-400 mb-3">You haven&apos;t enrolled in any courses yet.</p>
          <Link href="/courses" className="text-sm font-semibold text-[#C19562] hover:underline">
            Browse all courses →
          </Link>
        </div>
      )}

      {/* Catalog by category */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[13px] font-bold uppercase tracking-[0.16em] text-gray-400" style={{ fontFamily: "var(--font-sora)" }}>
            Browse Courses
          </h2>
          <Link href="/courses" className="text-[12px] font-semibold text-[#C19562] hover:underline">
            View all →
          </Link>
        </div>

        {/* Category tabs */}
        <div className="mb-5 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full border px-3.5 py-1 text-[11px] font-semibold transition-all",
                activeCategory === cat
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-800"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {catalogForCategory.map((course) => {
            const apiCourse = data?.items.find((c) => !c.is_enrolled && c.title === course.title);
            return (
              <AvailableCourseCard
                key={course.slug}
                course={course}
                onEnroll={apiCourse ? () => enroll.mutate(apiCourse.id) : undefined}
                enrolling={enroll.isPending}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
