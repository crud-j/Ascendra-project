"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

// Translated phases to a premium Grayscale/Silver palette to match the Hero section
const phases = [
  {
    id: "completed",
    status: "Completed",
    statusColor: "#FFFFFF",
    statusBg: "rgba(255,255,255,0.08)",
    statusBorder: "rgba(255,255,255,0.25)",
    accent: "#FFFFFF",
    label: "Foundation",
    items: [
      { title: "Courses & Learning Paths", body: "Full course library across 6 tracks with XP rewards on every lesson." },
      { title: "AI Mentor (Coach)",         body: "Adaptive AI that tracks progress and intervenes before learners fall behind." },
      { title: "Skill Economy",            body: "Three-currency model (XP / Reputation / Skill Coins) fully live." },
      { title: "Wallet System",            body: "In-app wallet with Skill Coin balances, transaction history, and fiat withdrawal." },
    ],
  },
  {
    id: "in-progress",
    status: "In Progress",
    statusColor: "#A3A3A3", // Neutral 400
    statusBg: "rgba(163,163,163,0.08)",
    statusBorder: "rgba(163,163,163,0.25)",
    accent: "#A3A3A3",
    label: "Community Layer",
    items: [
      { title: "Guild Competitions",  body: "Weekly leaderboard competitions between discipline-specific guilds with bonus bounties." },
      { title: "Mentor Marketplace", body: "Open marketplace where Trusted+ members list availability and learners book sessions." },
    ],
  },
  {
    id: "coming-soon",
    status: "Coming Soon",
    statusColor: "#525252", // Neutral 600
    statusBg: "rgba(82,82,82,0.08)",
    statusBorder: "rgba(82,82,82,0.2)",
    accent: "#525252",
    label: "Scale & Beyond",
    items: [
      { title: "Hackathons",           body: "Platform-hosted hackathons with Skill Coin prize pools and company sponsorships." },
      { title: "Company Hiring",       body: "Companies post talent briefs; learners apply using verified on-chain reputation." },
      { title: "Mobile App",           body: "Native iOS and Android with full feature parity and offline lesson support." },
      { title: "On-chain Credentials", body: "Blockchain-anchored certificates and skill badges, verifiable by anyone, anywhere." },
    ],
  },
] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

// ─── Improvised BentoCard — Premium Monochrome Hover Animation ────────────────
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
      // Added a subtle upward lift and drop-shadow on hover for a tactile feel
      className={`group relative overflow-hidden rounded-2xl bg-black/40 p-[1px] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,255,255,0.04)] ${className}`}
    >
      {/* Static border layer — fades on hover to reveal the gradient edge */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 transition-colors duration-500 group-hover:border-transparent" />

      {/* Animated spinning conic-gradient edge (now acts as a sleek metallic sweep) */}
      <div
        className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, ${accent} 50%, transparent 100%)`,
        }}
      />

      {/* Inner card surface with an added hover shimmer effect */}
      <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-[15px] bg-[#151518] transition-colors duration-500 group-hover:bg-[#1a1a1e]">
        {/* Subtle top-light gradient inside the card on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        <div className={`relative z-20 flex h-full flex-col ${className}`}>
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

// ─── Section ──────────────────────────────────────────────────────────────────
export function RoadmapSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden py-28 sm:py-36"
      style={{ backgroundColor: "#18181C" }} // Retained original requested background[cite: 2]
    >
      {/* Top breakpoint line — Grayscale translated */}
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

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-white/70" />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/70"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                Product Roadmap
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              We&apos;re building this{" "}
              {/* Updated gradient to match the Hero section's silver/gray look */}
              <span className="bg-gradient-to-br from-white via-neutral-400 to-neutral-700 bg-clip-text text-transparent drop-shadow-sm">
                right now.
              </span>
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUp}
            className="max-w-sm text-base leading-[1.75] text-neutral-400 md:pb-1"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Ascendra ships in layers. The foundation is live. The community layer ships next. Here&apos;s exactly what&apos;s coming and when.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connector line — Translated to a white-to-gray fade */}
          <div
            className="absolute left-[22px] top-0 hidden h-full w-px sm:block"
            style={{
              background: "linear-gradient(to bottom, #FFFFFF 0%, #A3A3A3 40%, rgba(82,82,82,0.3) 80%, transparent 100%)",
            }}
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-14"
          >
            {phases.map((phase, phaseIndex) => (
              <motion.div key={phase.id} variants={fadeUp} className="relative sm:pl-14">

                {/* Phase node on the line */}
                <div
                  className="absolute left-0 top-1 hidden h-11 w-11 items-center justify-center rounded-full border border-white/5 backdrop-blur-sm sm:flex"
                  style={{ backgroundColor: phase.statusBg, borderColor: phase.statusBorder }}
                >
                  {phase.id === "completed" ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke={phase.statusColor} strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : phase.id === "in-progress" ? (
                    <div className="h-3 w-3 animate-pulse rounded-full" style={{ backgroundColor: phase.statusColor, boxShadow: `0 0 10px ${phase.statusColor}` }} />
                  ) : (
                    <svg className="h-4 w-4 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>

                {/* Phase header */}
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span
                    className="flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md"
                    style={{
                      backgroundColor: phase.statusBg,
                      color: phase.statusColor,
                      border: `1px solid ${phase.statusBorder}`,
                    }}
                  >
                    <StatusDot color={phase.statusColor} />
                    {phase.status}
                  </span>
                  <span
                    className="text-[15px] font-semibold text-white"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    {phase.label}
                  </span>
                  {phaseIndex === 1 && (
                    <span className="rounded-full border border-neutral-400/25 bg-neutral-400/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-neutral-300">
                      Active Development
                    </span>
                  )}
                </div>

                {/* Phase item cards — BentoCard grid */}
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="grid gap-4 sm:grid-cols-2"
                >
                  {phase.items.map((item) => (
                    <BentoCard key={item.title} accent={phase.accent} className="p-6">
                      {/* Icon + title row */}
                      <div className="mb-3 flex items-start gap-3">
                        <div
                          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/5 bg-white/5 transition-all duration-500 group-hover:scale-110 group-hover:border-white/20"
                          style={{ color: phase.accent }}
                        >
                          {phase.id === "completed" ? (
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : phase.id === "in-progress" ? (
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          ) : (
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                        </div>
                        <p
                          className="text-[14px] font-semibold text-white/90 transition-colors duration-300 group-hover:text-white"
                          style={{ fontFamily: "var(--font-plus-jakarta)" }}
                        >
                          {item.title}
                        </p>
                      </div>

                      {/* Body */}
                      <p
                        className="pl-10 text-[13px] leading-[1.75] text-neutral-500 transition-colors duration-300 group-hover:text-neutral-400"
                        style={{ fontFamily: "var(--font-plus-jakarta)" }}
                      >
                        {item.body}
                      </p>
                    </BentoCard>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 border-t border-white/[0.06] pt-10 text-center"
        >
          <p className="text-[13px] text-neutral-500" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Roadmap reflects current engineering priorities and may shift based on community feedback and technical discovery.{" "}
            <span className="text-white/80 font-medium">Early access members vote on feature priorities.</span>
          </p>
        </motion.div>

      </div>
    </section>
  );
}