"use client";

import { use } from "react";
import Link from "next/link";
import { useCourse, useLessons, useCompleteLesson } from "@/features/learning/hooks/use-learning";
import { cn } from "@/lib/utils";
import type { Lesson } from "@/types";

const DIFFICULTY_COLORS: Record<string, string> = {
  easy:   "text-emerald-600 bg-emerald-50 border-emerald-200",
  medium: "text-blue-600 bg-blue-50 border-blue-100",
  hard:   "text-violet-600 bg-violet-50 border-violet-100",
};

function LessonRow({ lesson, onComplete, completing, courseId }: {
  lesson: Lesson;
  onComplete: () => void;
  completing: boolean;
  courseId: string;
}) {
  return (
    <div className={cn(
      "flex items-center gap-4 rounded-xl border p-4 transition-all duration-200",
      lesson.is_completed
        ? "border-emerald-100 bg-emerald-50/40"
        : "border-gray-100 bg-white hover:border-gray-200"
    )}>
      {/* Completion icon */}
      <div className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
        lesson.is_completed
          ? "border-emerald-400 bg-emerald-400"
          : "border-gray-200 bg-white"
      )}>
        {lesson.is_completed ? (
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <span className="text-[11px] font-bold text-gray-300">{lesson.order}</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className={cn("text-[13.5px] font-semibold truncate", lesson.is_completed ? "text-gray-500 line-through" : "text-gray-900")}
          style={{ fontFamily: "var(--font-plus-jakarta)" }}>
          {lesson.title}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span className={cn("rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide", DIFFICULTY_COLORS[lesson.difficulty])}>
            {lesson.difficulty}
          </span>
          <span className="text-[11px] text-gray-400">+{lesson.xp_eligible} XP</span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={`/learn/${courseId}/lessons/${lesson.id}`}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-gray-700 transition-all hover:border-[#C19562] hover:text-[#C19562]"
        >
          Open IDE
        </Link>
        {!lesson.is_completed && (
          <button
            onClick={onComplete}
            disabled={completing}
            className="rounded-lg bg-gray-900 px-3.5 py-1.5 text-[11px] font-semibold text-white transition-all hover:bg-[#C19562] disabled:opacity-50"
          >
            {completing ? "Saving..." : "Complete"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function CourseLessonsPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  const { data: course, isLoading: courseLoading } = useCourse(courseId);
  const { data: lessons, isLoading: lessonsLoading } = useLessons(courseId);
  const completeLesson = useCompleteLesson();

  const isLoading = courseLoading || lessonsLoading;
  const completedCount = lessons?.filter((l) => l.is_completed).length ?? 0;
  const totalCount = lessons?.length ?? 0;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="h-8 w-64 animate-pulse rounded-lg bg-gray-100" />
        <div className="h-4 w-48 animate-pulse rounded-lg bg-gray-100" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 animate-pulse rounded-xl bg-gray-100" />
        ))}
      </div>
    );
  }

  if (!course) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-500">Course not found.</p>
        <Link href="/learn" className="mt-4 block text-sm text-[#C19562] hover:underline">← Back to Learn</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[12px] text-gray-400">
        <Link href="/learn" className="hover:text-gray-600 transition-colors">Learn</Link>
        <span>/</span>
        <span className="text-gray-700">{course.title}</span>
      </div>

      {/* Course header */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
          {course.title}
        </h1>
        <p className="mt-1.5 text-[13px] text-gray-500">{course.description}</p>

        {/* Progress */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-medium text-gray-500">
              {completedCount} of {totalCount} lessons complete
            </span>
            <span className="text-[12px] font-bold text-[#C19562]">{progressPercent}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#FCE8C0] to-[#C19562] transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lesson list */}
      <div>
        <h2 className="mb-3 text-[12px] font-bold uppercase tracking-[0.18em] text-gray-400" style={{ fontFamily: "var(--font-sora)" }}>
          Lessons
        </h2>
        {!lessons || lessons.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 p-8 text-center text-[13px] text-gray-400">
            No lessons available yet.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {lessons
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((lesson) => (
                <LessonRow
                  key={lesson.id}
                  lesson={lesson}
                  onComplete={() => completeLesson.mutate(lesson.id)}
                  completing={completeLesson.isPending}
                  courseId={courseId}
                />
              ))}
          </div>
        )}
      </div>

      {progressPercent === 100 && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-sm font-semibold text-emerald-700 text-center">Course complete! Your XP has been awarded.</p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link
              href={`/learn/${courseId}/certificate`}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#FCE8C0] to-[#C19562] px-5 py-2.5 text-[13px] font-bold text-[#1A0E00] shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Get Certificate
            </Link>
            <Link href="/learn" className="flex items-center justify-center rounded-xl border border-emerald-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-emerald-700 transition-all hover:bg-emerald-50">
              Browse more courses →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
