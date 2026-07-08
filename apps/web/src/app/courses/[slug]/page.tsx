"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { AscendraNavbar } from "@/components/ui/navbar";
import { getCourseBySlug, type CatalogCourse } from "@/data/course-catalog";

// ─── Motion variants ──────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
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

// ─── BentoCard ────────────────────────────────────────────────────────────────
function BentoCard({
  children,
  accent = "#FFFFFF",
  className = "",
  hover = true,
}: {
  children: React.ReactNode;
  accent?: string;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-black/40 p-[1px] ${hover ? "transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,255,255,0.04)]" : ""} ${className}`}
    >
      <div className="absolute inset-0 rounded-2xl border border-white/10 transition-colors duration-500 group-hover:border-transparent" />
      {hover && (
        <div
          className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, ${accent} 50%, transparent 100%)`,
          }}
        />
      )}
      <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-[15px] bg-[#151518] transition-colors duration-500 group-hover:bg-[#1a1a1e]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative z-20 flex h-full flex-col">
          {children}
        </div>
      </div>
    </div>
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

// ─── Curriculum Section ───────────────────────────────────────────────────────
function CurriculumSection({ course, accent }: { course: CatalogCourse; accent: string }) {
  return (
    <div className="space-y-3">
      {course.curriculum.map((section, i) => (
        <motion.div key={i} variants={fadeUp}>
          <BentoCard accent={accent}>
            {/* Section header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 text-[10px] font-bold text-white/40"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <span
                  className="text-[13px] font-semibold text-white/90"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {section.section}
                </span>
              </div>
              <span
                className="text-[11px] text-neutral-600"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                {section.lessons.length} lessons
              </span>
            </div>

            {/* Lesson list */}
            <ul className="divide-y divide-white/[0.04]">
              {section.lessons.map((lesson, j) => (
                <li key={j} className="flex items-center gap-3 px-5 py-3 transition-colors duration-200 hover:bg-white/[0.02]">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] transition-all duration-300 group-hover:border-white/15">
                    <svg className="h-3 w-3 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span
                    className="text-[13px] text-neutral-500 transition-colors duration-200 hover:text-neutral-300"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    {lesson}
                  </span>
                  <span className="ml-auto text-[10px] text-neutral-700" style={{ fontFamily: "var(--font-sora)" }}>
                    {j + 1}/{section.lessons.length}
                  </span>
                </li>
              ))}
            </ul>
          </BentoCard>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CourseDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : Array.isArray(params.slug) ? params.slug[0] : "";
  const course = getCourseBySlug(slug);

  const heroRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const curriculumRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.1 });
  const bodyInView = useInView(bodyRef, { once: true, amount: 0.05 });
  const curriculumInView = useInView(curriculumRef, { once: true, amount: 0.05 });

  if (!course) return notFound();

  const diff = DIFF_CONFIG[course.difficulty];
  const totalLessons = course.curriculum.reduce((sum, s) => sum + s.lessons.length, 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#18181C" }}>
      <AscendraNavbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div ref={heroRef} className="relative overflow-hidden pt-28 pb-0">

        {/* Top breakpoint line */}
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

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:items-start">

            {/* Left — course info */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
            >
              {/* Breadcrumb */}
              <motion.div variants={fadeUp} className="mb-7 flex items-center gap-2 text-[12px] text-neutral-600">
                <Link href="/courses" className="transition-colors hover:text-neutral-300">Courses</Link>
                <span className="text-neutral-700">/</span>
                <span className="text-neutral-500">{course.category}</span>
                <span className="text-neutral-700">/</span>
                <span className="text-neutral-300">{course.title}</span>
              </motion.div>

              {/* Eyebrow */}
              <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
                <div className="h-px w-8 bg-white/70" />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/70"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  {course.category}
                </span>
              </motion.div>

              {/* Badges */}
              <motion.div variants={fadeUp} className="mb-4 flex flex-wrap items-center gap-2">
                <span
                  className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md"
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
                  <span className="rounded-full border border-neutral-500/40 bg-neutral-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-300">
                    PRO
                  </span>
                )}
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeUp}
                className="text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                {course.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="mt-4 text-[15px] leading-[1.75] text-neutral-400"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                {course.description}
              </motion.p>

              {/* Stats */}
              <motion.div variants={stagger} className="mt-10 flex flex-wrap gap-8 border-t border-white/[0.06] pt-8">
                {[
                  { label: "Lessons", value: totalLessons },
                  { label: "Hours", value: `${course.estimatedHours}h` },
                  { label: "XP awarded", value: `${totalLessons * 150}+` },
                  { label: "Certificate", value: "Yes" },
                ].map((stat) => (
                  <motion.div key={stat.label} variants={fadeUp}>
                    <p className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-600" style={{ fontFamily: "var(--font-sora)" }}>
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Tags */}
              <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-1.5">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] text-neutral-500"
                    style={{ fontFamily: "var(--font-sora)" }}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — enroll card (BentoCard) */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:sticky lg:top-24"
            >
              <BentoCard accent={diff.accent}>
                <div className="p-6">
                  {/* Monogram */}
                  <div
                    className="mb-5 flex h-36 items-center justify-center rounded-xl border border-white/[0.06] text-5xl font-black select-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                    }}
                  >
                    <span
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${diff.accent}55, ${diff.accent}18)`,
                      }}
                    >
                      {course.title.slice(0, 2).toUpperCase()}
                    </span>
                  </div>

                  {/* Pricing */}
                  {course.isPro ? (
                    <>
                      <p className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                        PRO Access
                      </p>
                      <p className="text-[13px] text-neutral-500 mb-5" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                        Included in Ascendra PRO — all courses, all features.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                        Free
                      </p>
                      <p className="text-[13px] text-neutral-500 mb-5" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                        No credit card required. Start learning immediately.
                      </p>
                    </>
                  )}

                  {/* Primary CTA */}
                  {course.slug === "html-css" ? (
                    <Link
                      href="/learn/html-css"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FCE8C0] via-[#C19562] to-[#A67C52] px-6 py-3.5 text-sm font-bold text-[#1A0E00] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_24px_-4px_rgba(193,149,98,0.5)]"
                      style={{ fontFamily: "var(--font-plus-jakarta)" }}
                    >
                      Start Learning Now
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  ) : (
                    <Link
                      href="/register"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FCE8C0] via-[#C19562] to-[#A67C52] px-6 py-3.5 text-sm font-bold text-[#1A0E00] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_24px_-4px_rgba(193,149,98,0.5)]"
                      style={{ fontFamily: "var(--font-plus-jakarta)" }}
                    >
                      {course.isPro ? "Unlock with PRO" : "Enroll for free"}
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  )}

                  {/* Secondary CTA */}
                  <Link
                    href="/login"
                    className="mt-3 flex w-full items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] px-6 py-3 text-sm font-medium text-neutral-400 transition-all duration-200 hover:bg-white/[0.07] hover:text-white"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    Already have an account? Log in
                  </Link>

                  {/* Checklist */}
                  <ul className="mt-6 space-y-2.5 border-t border-white/[0.06] pt-5">
                    {[
                      `${totalLessons} structured lessons`,
                      `${course.estimatedHours} hours of content`,
                      `${totalLessons * 150}+ XP on completion`,
                      "Certificate of completion",
                      "Community access",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-[12px] text-neutral-500">
                        <svg className="h-3.5 w-3.5 shrink-0 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </BentoCard>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <div ref={bodyRef} className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        {/* Divider */}
        <div className="mb-14 flex items-center gap-4">
          <div className="flex-1 border-t border-white/[0.06]" />
          <div className="h-1.5 w-1.5 rotate-45 border border-white/20" />
          <div className="flex-1 border-t border-white/[0.06]" />
        </div>

        <div className="grid gap-16 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="space-y-16">

            {/* What you'll learn */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={bodyInView ? "visible" : "hidden"}
            >
              <motion.div variants={fadeUp} className="mb-7 flex items-center gap-3">
                <div className="h-px w-8 bg-white/70" />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/70"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  What you&apos;ll learn
                </span>
              </motion.div>

              <motion.div variants={stagger} className="grid gap-3 sm:grid-cols-2">
                {course.whatYouLearn.map((item) => (
                  <motion.div key={item} variants={fadeUp}>
                    <BentoCard accent={diff.accent}>
                      <div className="flex items-start gap-3 p-4">
                        <div
                          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.04] transition-all duration-500 group-hover:border-white/20"
                          style={{ color: diff.accent }}
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span
                          className="text-[13px] leading-relaxed text-neutral-400 transition-colors duration-300 group-hover:text-neutral-300"
                          style={{ fontFamily: "var(--font-plus-jakarta)" }}
                        >
                          {item}
                        </span>
                      </div>
                    </BentoCard>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Curriculum */}
            <div ref={curriculumRef}>
              <motion.div
                variants={stagger}
                initial="hidden"
                animate={curriculumInView ? "visible" : "hidden"}
              >
                <motion.div variants={fadeUp} className="mb-7 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-white/70" />
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/70"
                      style={{ fontFamily: "var(--font-sora)" }}
                    >
                      Curriculum
                    </span>
                  </div>
                  <span className="text-[12px] text-neutral-600" style={{ fontFamily: "var(--font-sora)" }}>
                    {course.curriculum.length} sections · {totalLessons} lessons · {course.estimatedHours}h
                  </span>
                </motion.div>

                <CurriculumSection course={course} accent={diff.accent} />
              </motion.div>
            </div>
          </div>

          {/* Desktop sidebar spacer (enroll card is sticky in hero) */}
          <div className="hidden lg:block" />
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={curriculumInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 border-t border-white/[0.06] pt-10 text-center"
        >
          <p className="text-[13px] text-neutral-600" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Complete this course to earn your certificate and{" "}
            <span className="font-medium text-white/50">{totalLessons * 150}+ XP toward your next rank.</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
