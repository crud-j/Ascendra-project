"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const projects = [
  {
    id: 1,
    title: "Netflix Clone",
    description: "Full-stack streaming platform with auth, real-time search, and video playback.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    difficulty: "Advanced",
    difficultyColor: "#A78BFA",
    likes: 312,
    mentorApproved: true,
    color: "#EF4444",
    colorRGB: "239,68,68",
    author: "Carlos M.",
    xpEarned: "1,800 XP",
  },
  {
    id: 2,
    title: "AI Resume Builder",
    description: "GPT-4 powered resume generator that adapts to job descriptions automatically.",
    stack: ["React", "OpenAI API", "FastAPI", "Tailwind"],
    difficulty: "Intermediate",
    difficultyColor: "#60A5FA",
    likes: 219,
    mentorApproved: true,
    color: "#8B5CF6",
    colorRGB: "139,92,246",
    author: "Anya K.",
    xpEarned: "1,200 XP",
  },
  {
    id: 3,
    title: "Expense Tracker",
    description: "Real-time budget dashboard with charts, category breakdowns, and CSV exports.",
    stack: ["Vue 3", "Chart.js", "Node.js", "SQLite"],
    difficulty: "Beginner",
    difficultyColor: "#34D399",
    likes: 147,
    mentorApproved: false,
    color: "#10B981",
    colorRGB: "16,185,129",
    author: "Trần H.",
    xpEarned: "800 XP",
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Animated personal portfolio with GSAP scroll triggers and WebGL background.",
    stack: ["Next.js", "GSAP", "Framer Motion", "Three.js"],
    difficulty: "Intermediate",
    difficultyColor: "#60A5FA",
    likes: 498,
    mentorApproved: true,
    color: "#3B82F6",
    colorRGB: "59,130,246",
    author: "Sofia R.",
    xpEarned: "1,100 XP",
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

export function PortfolioSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-[#041E37] py-10 sm:py-10 lg:py-5">
      <div className="mx-auto max-w-7xl px-1 lg:px-1">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
              <div className="h-0.5 w-8 rounded-full bg-[#C19562]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C19562]" style={{ fontFamily: "var(--font-sora)" }}>
                Learner Portfolio
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Real projects.
              <br />
              <span className="text-zinc-400">Built by real learners.</span>
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUp}
            className="max-w-sm text-base leading-[1.75] text-zinc-400 md:pb-1"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Learners don&apos;t just complete assignments — they ship real work, earn Reputation, and build a portfolio employers can verify on-chain.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.ul
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
        >
          {projects.map((project) => (
            <motion.li
              key={project.id}
              variants={fadeUp}
              className="list-none"
            >
              <div className="relative h-full rounded-2xl border border-white/[0.07] p-2 md:rounded-3xl md:p-3">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={1}
                />
              {/* Inner card surface */}
              <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.05] bg-[#092540] shadow-[0px_0px_27px_0px_#071524]">

                {/* Thumbnail */}
                <div
                  className="relative flex h-36 items-center justify-center overflow-hidden border-b border-zinc-700"
                  style={{
                    background: `linear-gradient(135deg, rgba(${project.colorRGB},0.08) 0%, rgba(${project.colorRGB},0.02) 100%)`,
                  }}
                >
                  {/* Decorative grid */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, ${project.color} 20px, ${project.color} 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, ${project.color} 20px, ${project.color} 21px)`,
                    }}
                  />

                  {/* Centered icon block */}
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-xl shadow-sm transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundColor: `rgba(${project.colorRGB},0.15)`,
                      border: `1.5px solid rgba(${project.colorRGB},0.3)`,
                    }}
                  >
                    <div
                      className="h-5 w-5 rounded-md"
                      style={{ backgroundColor: project.color, opacity: 0.8 }}
                    />
                  </div>

                  {/* Mentor approved badge */}
                  {project.mentorApproved && (
                    <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/50 px-2.5 py-1 text-[9px] font-bold text-emerald-400 backdrop-blur-sm">
                      <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Mentor Approved
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h3 className="text-[15px] font-bold text-zinc-100 leading-snug" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                      {project.title}
                    </h3>
                    <span
                      className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold"
                      style={{
                        backgroundColor: `${project.difficultyColor}22`,
                        color: project.difficultyColor,
                      }}
                    >
                      {project.difficulty}
                    </span>
                  </div>

                  <p className="mb-4 text-[12px] leading-relaxed text-zinc-400" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                    {project.description}
                  </p>

                  {/* Stack badges */}
                  <div className="mb-auto flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-zinc-700 bg-[#05182b] px-2 py-0.5 text-[9px] font-medium text-zinc-400"
                        style={{ fontFamily: "var(--font-sora)" }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex h-6 w-6 items-center justify-center rounded-full text-[8px] font-bold text-white"
                        style={{ backgroundColor: project.color }}
                      >
                        {project.author.charAt(0)}
                      </div>
                      <span className="text-[11px] text-zinc-400">{project.author}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-[11px] font-medium text-zinc-500">
                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.106-1.79l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        {project.likes}
                      </span>
                      <span className="text-[10px] font-semibold text-blue-400">{project.xpEarned}</span>
                    </div>
                  </div>
                </div>

              </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-zinc-400" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Every accepted project earns XP, builds your portfolio, and can unlock Skill Coins.{" "}
            <span className="font-semibold text-[#C19562]">Start building on day one.</span>
          </p>
        </motion.div>

      </div>
    </section>
  );
}