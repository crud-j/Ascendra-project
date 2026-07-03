"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const features = [
  {
    number: "01",
    title: "Learn",
    body: "Structured courses built by practitioners. Every lesson awards XP that tracks your real progress — not just completions.",
    accent: "#3B82F6",
    borderGradient: "from-blue-400 to-blue-600",
    iconBg: "bg-blue-50",
    glowBg: "radial-gradient(ellipse at top left, rgba(59,130,246,0.10) 0%, transparent 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} className="h-5 w-5 stroke-blue-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Build",
    body: "Apply skills on real bounties and projects. Build a portfolio that proves competence, not just credentials.",
    accent: "#8B5CF6",
    borderGradient: "from-violet-400 to-violet-600",
    iconBg: "bg-violet-50",
    glowBg: "radial-gradient(ellipse at top left, rgba(139,92,246,0.10) 0%, transparent 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} className="h-5 w-5 stroke-violet-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Contribute",
    body: "Answer questions, mentor peers, review code. Every contribution earns Reputation — your live trust score in the ecosystem.",
    accent: "#10B981",
    borderGradient: "from-emerald-400 to-emerald-600",
    iconBg: "bg-emerald-50",
    glowBg: "radial-gradient(ellipse at top left, rgba(16,185,129,0.10) 0%, transparent 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} className="h-5 w-5 stroke-emerald-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Earn",
    body: "Skill Coins accumulate from bounties and mentoring. Withdraw them, spend in the marketplace, or reinvest in learning.",
    accent: "#F59E0B",
    borderGradient: "from-amber-400 to-amber-600",
    iconBg: "bg-amber-50",
    glowBg: "radial-gradient(ellipse at top left, rgba(245,158,11,0.10) 0%, transparent 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} className="h-5 w-5 stroke-amber-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.75, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 52, filter: "blur(12px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.85, ease: "easeOut" },
  },
};

export function FeaturesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.15 });

  return (
    <section className="relative overflow-hidden bg-white px-6 py-28 lg:py-36">
      {/* Top hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Decorative background blobs */}
      <div
        className="pointer-events-none absolute -top-32 left-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, rgba(193,149,98,0.06) 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] translate-x-1/4 translate-y-1/4 rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          variants={stagger}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="mb-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            {/* Section label */}
            <motion.div variants={fadeUp} className="mb-7 flex items-center gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-[#C19562] to-[#FCE8C0]" />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#C19562]"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                The Ascendra Way
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-5xl lg:text-[3.5rem]"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Four steps.
              <br />
              <span className="bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
                One compounding loop.
              </span>
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUp}
            className="max-w-xs text-[15px] leading-[1.82] text-gray-400 lg:text-right"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Every action feeds back into the system. Learning builds skills,
            skills unlock opportunities, opportunities earn coins, coins fund
            more learning.
          </motion.p>
        </motion.div>

        {/* ── Cards ── */}
        <motion.div
          ref={cardsRef}
          variants={stagger}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.number}
              variants={cardVariant}
              whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
              style={{
                boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
              }}
            >
              {/* Hover glow background */}
              <motion.div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: f.glowBg }}
              />

              {/* Animated top border */}
              <div className="absolute left-0 right-0 top-0 h-[3px] overflow-hidden rounded-t-2xl">
                <motion.div
                  className={cn("h-full w-full bg-gradient-to-r", f.borderGradient)}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={cardsInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: "easeOut" }}
                />
              </div>

              {/* Connecting arrow between cards (desktop only) */}
              {i < features.length - 1 && (
                <motion.div
                  className="pointer-events-none absolute -right-3 top-[2.4rem] z-20 hidden items-center lg:flex"
                  initial={{ opacity: 0, x: -4 }}
                  animate={cardsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.12, duration: 0.4 }}
                >
                  <div className="h-px w-4 bg-gradient-to-r from-gray-200 to-transparent" />
                  <svg className="h-3 w-3 -ml-0.5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" strokeWidth={2.5} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              )}

              {/* Background number */}
              <span
                className="pointer-events-none absolute right-4 top-3 select-none text-[5rem] font-black leading-none text-gray-900/[0.025] transition-colors duration-500 group-hover:text-gray-900/[0.04]"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
                aria-hidden
              >
                {f.number}
              </span>

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col">
                {/* Icon */}
                <div className={cn("mb-6 flex h-11 w-11 items-center justify-center rounded-xl shadow-sm", f.iconBg)}>
                  {f.icon}
                </div>

                {/* Step badge */}
                <span
                  className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: f.accent, fontFamily: "var(--font-sora)" }}
                >
                  Step {f.number}
                </span>

                <h3
                  className="text-[18px] font-bold tracking-tight text-gray-900"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {f.title}
                </h3>

                <p
                  className="mt-3 flex-1 text-[13.5px] leading-[1.78] text-gray-400 transition-colors duration-300 group-hover:text-gray-600"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {f.body}
                </p>

                {/* Explore footer */}
                <div
                  className="mt-8 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 transition-all duration-300 group-hover:gap-3 group-hover:text-[#C19562]"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  <span>Explore</span>
                  <svg className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>

              {/* Hover shadow overlay */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ boxShadow: `0 20px 60px -12px ${f.accent}22, 0 8px 24px -4px rgba(0,0,0,0.08)` }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Loop indicator ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={cardsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 0.6, ease: "easeOut" }}
          className="mt-14 flex items-center justify-center gap-3"
        >
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-gray-200" />
          <div className="inline-flex items-center gap-2.5 rounded-full border border-gray-100 bg-gray-50 px-5 py-2 shadow-sm">
            <svg className="h-3.5 w-3.5 text-[#C19562]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span
              className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              The loop repeats — compounding your growth
            </span>
          </div>
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-gray-200" />
        </motion.div>

      </div>
    </section>
  );
}
