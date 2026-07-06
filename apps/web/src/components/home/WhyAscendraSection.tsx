"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const traditionalSteps = [
  "Complete a course",
  "Receive a certificate",
  "Leave the platform",
  "Skills rarely get verified",
];

const ascendraSteps = [
  { label: "Learn",                    color: "#3B82F6", colorRGB: "59,130,246" },
  { label: "Build real projects",      color: "#10B981", colorRGB: "16,185,129" },
  { label: "Contribute to community",  color: "#8B5CF6", colorRGB: "139,92,246" },
  { label: "Earn Reputation",          color: "#F59E0B", colorRGB: "245,158,11" },
  { label: "Become a Mentor",          color: "#EC4899", colorRGB: "236,72,153" },
  { label: "Earn Skill Coins",         color: "#C19562", colorRGB: "193,149,98" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

function XIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 14 14" fill="none" stroke="#EF4444" strokeWidth={2} strokeLinecap="round">
      <path d="M2 2l10 10M12 2L2 12" />
    </svg>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 14 14" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 7l3.5 3.5L12 3" />
    </svg>
  );
}

export function WhyAscendraSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-[#FAFAFA] py-28 sm:py-36">

      {/* Subtle top fade from dark hero */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-zinc-200/60" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 text-center"
        >
          <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-3">
            <div className="h-px w-8 bg-[#C19562]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C19562]" style={{ fontFamily: "var(--font-sora)" }}>
              Why Ascendra
            </span>
            <div className="h-px w-8 bg-[#C19562]" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl font-extrabold leading-[1.08] tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Learning that actually{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #C19562 0%, #A67C52 100%)" }}
            >
              goes somewhere.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-xl text-base leading-[1.75] text-zinc-500"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Most platforms stop when you finish a course. Ascendra turns every lesson, every project, and every peer interaction into a stake in a real economy.
          </motion.p>
        </motion.div>

        {/* Comparison Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-6 md:grid-cols-2"
        >
          {/* Traditional Learning */}
          <motion.div
            variants={fadeUp}
            className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:shadow-md lg:p-10"
          >
            <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-red-50 opacity-60 blur-3xl" />

            <div className="relative z-10 mb-8 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100">
                <svg className="h-4.5 w-4.5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400" style={{ fontFamily: "var(--font-sora)" }}>Traditional Platform</p>
                <p className="text-sm font-semibold text-zinc-500" style={{ fontFamily: "var(--font-plus-jakarta)" }}>The old way</p>
              </div>
            </div>

            <ul className="relative z-10 flex flex-col gap-4">
              {traditionalSteps.map((step) => (
                <li key={step} className="flex items-center gap-3.5">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-red-200 bg-red-50">
                    <XIcon />
                  </div>
                  <span className="text-[14px] font-medium text-zinc-500" style={{ fontFamily: "var(--font-plus-jakarta)" }}>{step}</span>
                </li>
              ))}
            </ul>

            <div className="relative z-10 mt-10 rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 px-5 py-4">
              <p className="text-[12px] leading-relaxed text-zinc-400" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                You finish. You get a PDF. You move on. But your skills stay locked in the platform — unverifiable, untransferrable, unseen by anyone who matters.
              </p>
            </div>
          </motion.div>

          {/* Ascendra Way */}
          <motion.div
            variants={fadeUp}
            className="group relative overflow-hidden rounded-3xl border border-[#C19562]/20 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_-8px_rgba(193,149,98,0.18)] lg:p-10"
            style={{ background: "linear-gradient(145deg, #FFFDF9 0%, #FFFFFF 60%, #FDF8F0 100%)" }}
          >
            <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-25 blur-3xl" style={{ backgroundColor: "#C19562" }} />

            <div className="relative z-10 mb-8 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "linear-gradient(135deg, #FCE8C0, #C19562)" }}>
                <svg className="h-4.5 w-4.5 text-[#1A0E00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C19562]" style={{ fontFamily: "var(--font-sora)" }}>Ascendra</p>
                <p className="text-sm font-semibold text-zinc-700" style={{ fontFamily: "var(--font-plus-jakarta)" }}>The flywheel</p>
              </div>
            </div>

            <ul className="relative z-10 flex flex-col gap-4">
              {ascendraSteps.map((step, i) => (
                <li key={step.label} className="flex items-center gap-3.5">
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border"
                    style={{
                      borderColor: `rgba(${step.colorRGB}, 0.3)`,
                      backgroundColor: `rgba(${step.colorRGB}, 0.07)`,
                    }}
                  >
                    <CheckIcon color={step.color} />
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-4">
                    <span className="text-[14px] font-semibold text-zinc-800" style={{ fontFamily: "var(--font-plus-jakarta)" }}>{step.label}</span>
                    {/* Progression dot */}
                    {i < ascendraSteps.length - 1 && (
                      <div className="hidden h-px flex-1 max-w-8 sm:block" style={{ background: `linear-gradient(90deg, rgba(${step.colorRGB},0.4), transparent)` }} />
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="relative z-10 mt-10 rounded-2xl border border-[#C19562]/20 px-5 py-4" style={{ backgroundColor: "rgba(193,149,98,0.05)" }}>
              <p className="text-[12px] leading-relaxed text-zinc-500" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                Every action has a real consequence — in your reputation, your wallet, and your standing in the community. This is the flywheel that makes Ascendra different.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom differentiator stats */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4"
        >
          {[
            { value: "3", label: "Currencies",         sub: "XP · Rep · Skill Coins" },
            { value: "6",  label: "Reputation Tiers",  sub: "Learner → Master" },
            { value: "540+", label: "Active Mentors",  sub: "Earn while teaching" },
            { value: "100%", label: "Merit-gated",     sub: "No pay-to-win, ever" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="rounded-2xl border border-zinc-200 bg-white px-5 py-6 text-center shadow-sm"
            >
              <p className="text-3xl font-extrabold tracking-tight text-zinc-900" style={{ fontFamily: "var(--font-plus-jakarta)" }}>{stat.value}</p>
              <p className="mt-1 text-[12px] font-bold text-zinc-700" style={{ fontFamily: "var(--font-plus-jakarta)" }}>{stat.label}</p>
              <p className="mt-1 text-[10px] font-medium text-zinc-400" style={{ fontFamily: "var(--font-sora)" }}>{stat.sub}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
