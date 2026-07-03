"use client";

import Link from "next/link";
import { HTML_CSS_LESSONS } from "@/data/lessons/html-css";
import { cn } from "@/lib/utils";

const DIFFICULTY_COLORS: Record<string, string> = {
  easy:   "bg-emerald-50 text-emerald-700 border-emerald-200",
  medium: "bg-blue-50 text-blue-700 border-blue-100",
  hard:   "bg-violet-50 text-violet-700 border-violet-100",
};

export default function HtmlCssCoursePage() {
  const totalXp = HTML_CSS_LESSONS.reduce(
    (sum, l) => sum + (l.exercise ? l.exercise.hints.length * 100 + 150 : 0),
    0
  );

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      {/* Header */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                Beginner
              </span>
              <span className="text-[11px] text-gray-400">Web Development</span>
            </div>
            <h1
              className="text-2xl font-extrabold tracking-tight text-gray-900"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              HTML &amp; CSS
            </h1>
            <p className="mt-2 text-[14px] text-gray-500 leading-relaxed max-w-lg">
              Build the web from the ground up. Learn HTML structure and CSS styling to create
              beautiful, responsive pages — from scratch to portfolio.
            </p>
          </div>
          <Link
            href={`/learn/html-css/lessons/${HTML_CSS_LESSONS[0].slug}`}
            className="shrink-0 rounded-xl bg-gradient-to-r from-[#FCE8C0] via-[#C19562] to-[#A67C52] px-5 py-2.5 text-[13px] font-bold text-[#1A0E00] shadow-sm transition-all hover:scale-[1.03] hover:shadow-md"
          >
            Start Learning →
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-5 flex flex-wrap gap-6 border-t border-gray-50 pt-5">
          {[
            { label: "Lessons", value: HTML_CSS_LESSONS.length },
            { label: "Estimated", value: "12h" },
            { label: "XP available", value: `${totalXp.toLocaleString()}+` },
            { label: "Certificate", value: "Yes" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-lg font-bold text-gray-900">{s.value}</p>
              <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400"
                style={{ fontFamily: "var(--font-sora)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Lesson list */}
      <div>
        <h2
          className="mb-4 text-[12px] font-bold uppercase tracking-[0.18em] text-gray-400"
          style={{ fontFamily: "var(--font-sora)" }}
        >
          {HTML_CSS_LESSONS.length} Lessons
        </h2>
        <div className="flex flex-col gap-2">
          {HTML_CSS_LESSONS.map((lesson, i) => (
            <Link
              key={lesson.slug}
              href={`/learn/html-css/lessons/${lesson.slug}`}
              className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:border-[#C19562]/30 hover:shadow-md"
            >
              {/* Step number */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FCE8C0] to-[#C19562] text-[13px] font-extrabold text-[#1A0E00] shadow-sm">
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-[14px] font-semibold text-gray-900 group-hover:text-[#C19562] transition-colors"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {lesson.title}
                </p>
                {lesson.exercise && (
                  <p className="mt-0.5 text-[12px] text-gray-400 truncate">
                    {lesson.exercise.instructions.split("\n")[0].replace(/\*\*/g, "")}
                  </p>
                )}
              </div>

              {/* Badges */}
              <div className="flex shrink-0 items-center gap-2">
                {lesson.exercise && (
                  <>
                    <span className={cn(
                      "rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide",
                      DIFFICULTY_COLORS[lesson.exercise.startCode.html.length > 200 ? "medium" : "easy"]
                    )}>
                      {i < 4 ? "easy" : i < 10 ? "medium" : "hard"}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      +{150 + lesson.exercise.hints.length * 100} XP
                    </span>
                  </>
                )}
                <svg
                  className="h-4 w-4 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[#C19562]"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
