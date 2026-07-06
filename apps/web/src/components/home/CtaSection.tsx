"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "I answered questions in the AI Guild, published two articles, and crossed 500 Reputation in my first month. The Skill Coins I earned paid for a mentorship session that landed me my first freelance contract.",
    name: "Rafael M.",
    role: "Trusted Contributor · AI Guild",
    accent: "#8B5CF6",
  },
  {
    id: 2,
    quote:
      "I went from watching tutorials to leading a Frontend Guild bounty in three months. Ascendra's reputation system made my skills visible to people who actually hired me.",
    name: "Yuna K.",
    role: "Mentor · Frontend Guild",
    accent: "#3B82F6",
  },
  {
    id: 3,
    quote:
      "The AI Coach re-routed my roadmap after I kept skipping the recursion module. Two weeks later I passed my first advanced assessment and earned 1,000 XP in a single session.",
    name: "Darien O.",
    role: "Builder · Cybersecurity Guild",
    accent: "#EF4444",
  },
  {
    id: 4,
    quote:
      "I deployed my first Move smart contract through the Blockchain Guild's weekly event. Winning that bounty earned me 25 Skill Coins and an on-chain credential I can share with anyone.",
    name: "Priya S.",
    role: "Contributor · Blockchain Guild",
    accent: "#F59E0B",
  },
  {
    id: 5,
    quote:
      "Reaching Mentor level at 1,000 Reputation unlocked paid mentorship sessions. Now I earn Skill Coins teaching the exact topics I was learning six months ago.",
    name: "Marcus T.",
    role: "Mentor · AI Guild",
    accent: "#10B981",
  },
] as const;

const INTERVAL_MS = 4500;

export function CtaSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.3 });
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, INTERVAL_MS);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const goTo = (i: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIndex(i);
    startTimer();
  };

  const current = TESTIMONIALS[index];

  return (
    <div className="relative w-full overflow-hidden" style={{ backgroundColor: "#18181C" }}>
      <div className="absolute inset-0 z-0 pointer-events-none flex flex-col items-center justify-center">
        <div className="relative flex w-full justify-center border-y border-dashed border-white/6 h-full md:h-[360px]">
          <div className="absolute -top-[50vh] flex h-[200vh] w-full max-w-5xl justify-between px-6 md:px-0">
            <div className="h-full w-px border-l border-dashed border-white/6" />
            <div className="absolute left-[60%] hidden h-full w-px border-l border-dashed border-white/6 md:block" />
            <div className="h-full w-px border-r border-dashed border-white/6" />
          </div>
        </div>
      </div>

      <section className="relative z-10 flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 md:py-0">
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto grid w-full max-w-5xl grid-cols-1 md:grid-cols-[60%_40%] md:min-h-[360px]"
        >
          {/* ── Left Column: Headline & Buttons ── */}
          <div className="flex flex-col justify-center py-12 md:pr-12 lg:pr-16 md:py-16">
            <h2
              className="text-[28px] sm:text-[34px] lg:text-[38px] font-medium leading-[1.3] tracking-tight text-white/90"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Learn free. Build real.{" "}
              <strong className="font-bold text-white">Earn what you create.</strong>

              <span className="block mt-4">
                Turn every <span className="text-[#3B82F6]">contribution</span> into
              </span>
              reputation, Skill Coins, and <span className="text-[#8B5CF6]">real opportunity</span>.
            </h2>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                suppressHydrationWarning
                className="group flex h-[42px] items-center justify-center gap-2 rounded-md bg-[#2563EB] px-5 text-[14px] font-medium text-white transition-all hover:bg-[#1D4ED8]"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                Start for Free
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <button
                suppressHydrationWarning
                className="flex h-[42px] items-center justify-center gap-2 rounded-md border border-white/10 bg-[#1A1A1E]/50 px-5 text-[14px] font-medium text-white transition-colors hover:bg-white/5"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                Explore the Platform
                <svg className="h-3.5 w-3.5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Right Column: Cycling Testimonials ── */}
          <div className="flex flex-col justify-center border-t border-dashed border-white/6 py-12 md:border-t-0 md:pl-12 lg:pl-16 md:py-16">

            {/* Accent bar that shifts colour per testimonial */}
            <motion.div
              className="mb-6 h-px w-10"
              animate={{ backgroundColor: current.accent }}
              transition={{ duration: 0.6 }}
            />

            {/* Testimonial body */}
            <div className="relative min-h-[160px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p
                    className="text-[14.5px] leading-[1.8] text-white/70"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    &quot;{current.quote}&quot;
                  </p>

                  <div className="mt-6">
                    <h4
                      className="text-[14px] font-bold text-white"
                      style={{ fontFamily: "var(--font-plus-jakarta)" }}
                    >
                      {current.name}
                    </h4>
                    <p
                      className="mt-1 text-[13px] text-white/40"
                      style={{ fontFamily: "var(--font-plus-jakarta)" }}
                    >
                      {current.role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot navigation */}
            <div className="mt-8 flex items-center gap-2">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  suppressHydrationWarning
                  onClick={() => goTo(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className="relative h-1.5 overflow-hidden rounded-full transition-all duration-300"
                  style={{ width: i === index ? 24 : 6, backgroundColor: "rgba(255,255,255,0.12)" }}
                >
                  {i === index && (
                    <motion.span
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ backgroundColor: current.accent }}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: INTERVAL_MS / 1000, ease: "linear" }}
                      key={current.id}
                    />
                  )}
                </button>
              ))}
            </div>

          </div>
        </motion.div>

        
      </section>
    </div>
  );
}
