import { notFound } from "next/navigation";
import Link from "next/link";
import { AscendraNavbar } from "@/components/ui/navbar";
import { getCourseBySlug, type CatalogCourse } from "@/data/course-catalog";
import { cn } from "@/lib/utils";

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner:     "bg-emerald-50 text-emerald-700 border-emerald-200",
  intermediate: "bg-blue-50 text-blue-700 border-blue-100",
  advanced:     "bg-violet-50 text-violet-700 border-violet-100",
};

function CurriculumSection({ course }: { course: CatalogCourse }) {
  return (
    <div className="space-y-3">
      {course.curriculum.map((section, i) => (
        <div key={i} className="rounded-xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between bg-gray-50 px-5 py-3.5">
            <span className="text-[13px] font-semibold text-gray-800" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              {section.section}
            </span>
            <span className="text-[11px] text-gray-400">{section.lessons.length} lessons</span>
          </div>
          <ul className="divide-y divide-gray-50">
            {section.lessons.map((lesson, j) => (
              <li key={j} className="flex items-center gap-3 px-5 py-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white">
                  <svg className="h-3 w-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-[13px] text-gray-600">{lesson}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const totalLessons = course.curriculum.reduce((sum, s) => sum + s.lessons.length, 0);

  return (
    <div className="min-h-screen bg-white">
      <AscendraNavbar />

      {/* Hero */}
      <div className="pt-28 pb-0 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:items-start">
            {/* Left */}
            <div>
              {/* Breadcrumb */}
              <div className="mb-6 flex items-center gap-2 text-[12px] text-gray-400">
                <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
                <span>/</span>
                <span className="text-gray-300">{course.category}</span>
                <span>/</span>
                <span className="text-white">{course.title}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={cn("rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide", DIFFICULTY_COLORS[course.difficulty])}>
                  {course.difficulty}
                </span>
                {course.isPro && (
                  <span className="rounded-full border border-amber-400 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-400">
                    PRO
                  </span>
                )}
                <span className="text-[11px] text-gray-400">{course.category}</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                {course.title}
              </h1>
              <p className="mt-4 text-[15px] leading-relaxed text-gray-300" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                {course.description}
              </p>

              {/* Stats row */}
              <div className="mt-8 flex flex-wrap gap-6">
                {[
                  { label: "Lessons", value: totalLessons },
                  { label: "Hours", value: course.estimatedHours },
                  { label: "XP awarded", value: `${totalLessons * 150}+` },
                  { label: "Certificate", value: "Yes" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400" style={{ fontFamily: "var(--font-sora)" }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-1.5">
                {course.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — enroll card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:sticky lg:top-24">
              <div className="mb-4 flex h-40 items-center justify-center rounded-xl bg-gradient-to-br from-[#C19562]/20 to-[#A67C52]/10 text-5xl font-black text-[#C19562]/30 select-none">
                {course.title.slice(0, 2).toUpperCase()}
              </div>

              {course.isPro ? (
                <>
                  <p className="text-2xl font-bold text-white mb-1">PRO Access</p>
                  <p className="text-[13px] text-gray-400 mb-4">Included in Ascendra PRO — all courses, all features.</p>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold text-white mb-1">Free</p>
                  <p className="text-[13px] text-gray-400 mb-4">No credit card required. Start learning immediately.</p>
                </>
              )}

              {/* Direct "Start Learning" for HTML & CSS (no auth needed) */}
              {course.slug === "html-css" ? (
                <Link
                  href="/learn/html-css"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FCE8C0] via-[#C19562] to-[#A67C52] px-6 py-3.5 text-sm font-bold text-[#1A0E00] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_24px_-4px_rgba(193,149,98,0.5)]"
                >
                  Start Learning Now
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              ) : (
                <Link
                  href="/signup"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FCE8C0] via-[#C19562] to-[#A67C52] px-6 py-3.5 text-sm font-bold text-[#1A0E00] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_24px_-4px_rgba(193,149,98,0.5)]"
                >
                  {course.isPro ? "Unlock with PRO" : "Enroll for free"}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              )}

              <Link
                href="/login"
                className="mt-3 flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
              >
                Already have an account? Log in
              </Link>

              <ul className="mt-5 space-y-2.5 text-[12px] text-gray-400">
                {[
                  `${totalLessons} structured lessons`,
                  `${course.estimatedHours} hours of content`,
                  `${totalLessons * 150}+ XP on completion`,
                  "Certificate of completion",
                  "Community access",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <svg className="h-3.5 w-3.5 shrink-0 text-[#C19562]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="space-y-12">
            {/* What you'll learn */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-5" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                What you&apos;ll learn
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {course.whatYouLearn.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#C19562]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[13px] text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  Curriculum
                </h2>
                <span className="text-[12px] text-gray-400">
                  {course.curriculum.length} sections · {totalLessons} lessons · {course.estimatedHours}h
                </span>
              </div>
              <CurriculumSection course={course} />
            </div>
          </div>

          {/* Sidebar placeholder on desktop (empty — sticky card is in the hero) */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </div>
  );
}
