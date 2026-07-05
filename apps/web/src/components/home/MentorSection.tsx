"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { value: "540+",  label: "Active Mentors",        accent: "#C19562" },
  { value: "5–50",  label: "Skill Coins / session",  accent: "#F59E0B" },
  { value: "+30",   label: "Reputation / session",   accent: "#8B5CF6" },
  { value: "1,000", label: "Rep. needed to qualify", accent: "#3B82F6" },
];

const benefits = [
  {
    accent: "#C19562",
    title: "Earn real income",
    body: "Every confirmed mentorship session mints 5–50 Skill Coins directly to your balance — withdrawable to fiat or spendable across the marketplace.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
  },
  {
    accent: "#8B5CF6",
    title: "Grow your reputation",
    body: "Each completed session awards +30 Reputation — accelerating your climb to Expert and Master tiers and unlocking new platform privileges.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    accent: "#3B82F6",
    title: "Teach on your terms",
    body: "Set your own availability, specializations, and session style. Ascendra's matching engine connects you with learners who fit your expertise.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const steps = [
  {
    number: "01",
    title: "Earn 1,000 Reputation",
    body: "Answer questions, publish articles, and review projects until you reach the Mentor reputation threshold.",
  },
  {
    number: "02",
    title: "Unlock automatically",
    body: "No application. When you cross 1,000 Rep the platform grants your Mentor badge — contribution earns access.",
  },
  {
    number: "03",
    title: "Open your availability",
    body: "Set your topics, preferred session format, and open time slots. Learners find you in the Mentor Marketplace.",
  },
  {
    number: "04",
    title: "Confirm & collect",
    body: "Both parties confirm the session. Skill Coins mint instantly to your balance, blockchain-anchored for proof.",
  },
];

// ─── Animation ────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

// ─── Reusable Bento Card ──────────────────────────────────────────────────────

function BentoCard({
  children,
  className = "",
  accent = "#C19562",
  colSpan = "col-span-1",
}: {
  children: React.ReactNode;
  className?: string;
  accent?: string;
  colSpan?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={`group relative overflow-hidden rounded-2xl bg-[#1C1C1E] p-0.5 ${colSpan}`}
    >
      {/* 
        The p-[2px] above creates a tiny gap between the outer container and the inner card. 
        When idle, it reveals the dark bg-[#1C1C1E] creating a natural static border. 
      */}
      <div className="absolute inset-0 rounded-2xl transition-colors duration-500 group-hover:bg-transparent" />
      
      {/* Animated Gradient Edge */}
      <div
        className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, ${accent} 50%, transparent 100%)`,
        }}
      />
      
      {/* Inner Container: Darker background perfectly nested using an exact 14px border radius */}
      <div className={`relative z-10 flex h-full flex-col overflow-hidden rounded-[14px] bg-[#121214] ${className}`}>
        {children}
      </div>
    </motion.div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MentorSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section
      ref={ref}
      className="relative w-full py-24 sm:py-32"
      style={{ backgroundColor: "#18181C" }}
    >
      {/* Custom breakpoint line */}
      <div className="absolute inset-x-0 top-0 flex items-center px-6 lg:px-8">
        <svg width="13" height="13" viewBox="0 0 15 15" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" className="shrink-0">
          <path d="M7.5 0V15M0 7.5H15" />
        </svg>
        <div className="flex-1 border-t border-dashed border-white/8" />
        <div className="mx-4 h-2.5 w-2.5 rotate-45 border border-dashed border-[#C19562]/50" />
        <div className="flex-1 border-t border-dashed border-white/8" />
        <svg width="13" height="13" viewBox="0 0 15 15" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" className="shrink-0">
          <path d="M7.5 0V15M0 7.5H15" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* ── Section eyebrow ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12"
        >
          <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
            <div className="h-px w-8 bg-[#C19562]" />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#C19562]"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Mentor Programme
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Come teach with us —{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #FCE8C0 0%, #C19562 50%, #A67C52 100%)",
              }}
            >
              and earn doing it.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-[15px] leading-[1.8] text-white/45"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Ascendra's Mentor Marketplace is the first platform where teaching doesn't just feel good — it pays. Share what you know, build your reputation, and collect Skill Coins for every session you deliver.
          </motion.p>
        </motion.div>

        {/* ── Advanced Bento Layout ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-6 lg:gap-8"
        >
          {/* Main Grid Wrapper */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
            
            {/* ROW 1: Hero & Quote */}
            <BentoCard colSpan="lg:col-span-2" className="justify-end p-8 lg:p-10 lg:min-h-105" accent="#C19562">
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full opacity-10 blur-3xl transition-opacity duration-700 group-hover:opacity-20"
                style={{ backgroundColor: "#C19562" }}
              />
              <div className="mb-12 inline-flex w-fit items-center gap-2 rounded-full border border-[#C19562]/20 bg-[#C19562]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C19562]" style={{ fontFamily: "var(--font-sora)" }}>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C19562]" />
                Become a Mentor
              </div>
              <div className="max-w-xl">
                <h3 className="mb-4 text-[1.9rem] font-extrabold leading-[1.1] tracking-tight text-white lg:text-4xl" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  You know something others are trying to learn.
                </h3>
                <p className="mb-8 text-[14px] leading-[1.8] text-white/45 lg:text-[15px]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  Reach 1,000 Reputation and the Mentor role unlocks automatically. No application, no gatekeeping — just recognition that you've consistently contributed value to the community.
                </p>
                <div className="flex flex-wrap items-center gap-3 relative z-10">
                  <Link href="/mentor" className="group/btn relative inline-flex h-11 items-center gap-2.5 overflow-hidden rounded-xl px-7 text-sm font-bold text-[#1A0E00] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_28px_-4px_rgba(193,149,98,0.5)] active:scale-[0.97]" style={{ background: "linear-gradient(135deg, #FCE8C0 0%, #C19562 50%, #A67C52 100%)", fontFamily: "var(--font-plus-jakarta)" }}>
                    <div className="absolute inset-0 flex justify-center transform-[skew(-12deg)_translateX(-100%)] group-hover/btn:duration-500 group-hover/btn:transform-[skew(-12deg)_translateX(100%)]">
                      <div className="relative h-full w-6 bg-white/20" />
                    </div>
                    <span className="relative z-10">Start mentoring</span>
                    <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </Link>
                  <Link href="/mentor/how-it-works" className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 px-6 text-sm font-semibold text-white/60 transition-all duration-300 hover:border-white/20 hover:text-white/90" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                    See how it works
                    <svg className="h-4 w-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>
            </BentoCard>

            <BentoCard colSpan="lg:col-span-1" className="justify-between p-8 lg:p-10" accent="#8B5CF6">
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-64 w-64 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: "#8B5CF6" }} />
              <svg className="mb-6 h-10 w-10 text-[#C19562]/40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391C14.017 10.459 16.48 8 19.541 8H20v2.4h-.459C17.94 10.4 16.8 11.56 16.8 13.2H20V21h-5.983zm-11.034 0v-7.391C2.983 10.459 5.446 8 8.508 8H9v2.4h-.492C6.907 10.4 5.767 11.56 5.767 13.2H9V21H2.983z" />
              </svg>
              <p className="relative z-10 text-[15px] font-medium leading-[1.8] text-white/75 italic" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                "Mentoring on Ascendra doesn't just feel good — it actually pays. The Skill Coins I've earned from sessions have funded three of my own courses. It's the first platform that genuinely rewards teaching."
              </p>
              <div className="relative z-10 mt-8 flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=48&h=48" alt="Sofia" className="h-10 w-10 rounded-full object-cover grayscale" />
                <div>
                  <p className="text-[13px] font-semibold text-white" style={{ fontFamily: "var(--font-plus-jakarta)" }}>Sofia</p>
                  <p className="text-[11px] text-white/35" style={{ fontFamily: "var(--font-sora)" }}>Senior Developer · Level 4 Mentor</p>
                </div>
              </div>
            </BentoCard>

            {/* ROW 2: The Core Benefits Grid */}
            {benefits.map((b) => (
              <BentoCard key={b.title} colSpan="lg:col-span-1" className="justify-center p-8 lg:p-10" accent={b.accent}>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 border border-white/5" style={{ color: b.accent }}>
                  {b.icon}
                </div>
                <h4 className="mb-3 text-[17px] font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  {b.title}
                </h4>
                <p className="text-[14px] leading-[1.75] text-white/40" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  {b.body}
                </p>
              </BentoCard>
            ))}

            {/* ROW 3: Stats Nodes */}
            <BentoCard colSpan="lg:col-span-3" className="items-center justify-center p-8 lg:p-12" accent="#ffffff">
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.15]">
                <div className="absolute h-px w-3/4 bg-linear-to-r from-transparent via-white to-transparent" />
                <div className="absolute h-3/4 w-px bg-linear-to-b from-transparent via-white to-transparent" />
              </div>
              <div className="grid w-full grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 relative z-10">
                {stats.map((s) => (
                  <div key={s.label} className="flex flex-col text-center">
                    <span className="text-[1.8rem] lg:text-[2.2rem] font-extrabold leading-none tracking-tight" style={{ color: s.accent, fontFamily: "var(--font-plus-jakarta)" }}>
                      {s.value}
                    </span>
                    <span className="mt-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white/35" style={{ fontFamily: "var(--font-sora)" }}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </BentoCard>

            {/* ROW 4: Steps Node */}
            <BentoCard colSpan="lg:col-span-3" className="p-8 lg:p-10" accent="#C19562">
              <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.22em] text-white/30 text-center sm:text-left" style={{ fontFamily: "var(--font-sora)" }}>
                How to begin
              </p>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                {steps.map((s) => (
                  <div key={s.number} className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C19562]/10 font-mono text-[10px] font-bold text-[#C19562]" style={{ fontFamily: "var(--font-sora)" }}>
                        {s.number}
                      </span>
                      <div className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent" />
                    </div>
                    <div>
                      <p className="mb-1.5 text-[14px] font-bold text-white" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                        {s.title}
                      </p>
                      <p className="text-[13px] leading-[1.75] text-white/40" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                        {s.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>

          </div>

          {/* ── Final Footer CTA ── */}
          <motion.div
            variants={fadeUp}
            className="group relative mx-auto mt-4 flex w-full flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl p-8 sm:flex-row lg:rounded-full lg:px-12 lg:py-8"
            style={{
              background: "linear-gradient(#1C1C1E, #1C1C1E) padding-box, linear-gradient(135deg, #3B82F6, #C19562, #8B5CF6) border-box",
              border: "2px solid transparent",
            }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-20 blur-2xl" style={{ background: "linear-gradient(90deg, transparent, #C19562, transparent)" }} />
            <div className="relative z-10 text-center sm:text-left max-w-lg">
              <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.24em] text-[#C19562]" style={{ fontFamily: "var(--font-sora)" }}>
                You won't have to do it alone
              </p>
              <h3 className="mb-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                Become a Mentor today
              </h3>
              <p className="text-[13px] leading-[1.7] text-white/50" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                Our Mentor Support Team is here to help you set up your profile, prepare sessions, and make your first match.
              </p>
            </div>
            <div className="relative z-10 flex shrink-0 flex-wrap items-center justify-center gap-3">
              <Link href="/mentor" className="group/cta relative inline-flex h-12 items-center gap-2.5 overflow-hidden rounded-xl px-8 text-sm font-bold text-[#1A0E00] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_32px_-4px_rgba(193,149,98,0.55)] active:scale-[0.97]" style={{ background: "linear-gradient(135deg, #FCE8C0 0%, #C19562 50%, #A67C52 100%)", fontFamily: "var(--font-plus-jakarta)" }}>
                <div className="absolute inset-0 flex justify-center transform-[skew(-12deg)_translateX(-100%)] group-hover/cta:duration-500 group-hover/cta:transform-[skew(-12deg)_translateX(100%)]">
                  <div className="relative h-full w-6 bg-white/20" />
                </div>
                <span className="relative z-10">Get started</span>
                <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
              <Link href="/mentor/faq" className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/10 px-6 text-sm font-semibold text-white/55 transition-all duration-300 hover:border-white/20 hover:text-white/90" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                Read the FAQ
              </Link>
            </div>
          </motion.div>

        </motion.div>

        {/* ── Informational text below grid ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 grid gap-6 border-t border-white/6 pt-12 sm:grid-cols-3"
        >
          {[
            {
              heading: "Reputation gates access, not money",
              body: "The Mentor role is earned through validated contributions — answers, reviews, and articles. There is no way to purchase access, ever.",
            },
            {
              heading: "Every session is blockchain-anchored",
              body: "Completed sessions and their Skill Coin rewards are anchored on Aptos — giving you a portable, independently verifiable record of your mentoring history.",
            },
            {
              heading: "AI handles the admin",
              body: "Ascendra's AI Coach helps you prepare session plans, summarise learner progress, and suggest follow-up resources — so you focus on teaching, not logistics.",
            },
          ].map((item) => (
            <motion.div key={item.heading} variants={fadeUp}>
              <h4 className="mb-2 text-[13px] font-bold text-white/80" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                {item.heading}
              </h4>
              <p className="text-[12.5px] leading-[1.8] text-white/35" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                {item.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}