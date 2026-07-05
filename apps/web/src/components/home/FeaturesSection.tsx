"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useMotionValueEvent, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const features = [
  {
    number: "01",
    title: "Learn",
    body: "Structured courses built by practitioners. Every lesson awards XP that tracks your real progress — not just completions.",
    accent: "#3B82F6",
    borderGradient: "from-blue-400 to-blue-600",
    glowBg: "radial-gradient(ellipse at top left, rgba(59,130,246,0.06) 0%, transparent 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} className="h-5 w-5 stroke-blue-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    iconBg: "bg-blue-50",
  },
  {
    number: "02",
    title: "Build",
    body: "Apply skills on real bounties and projects. Build a portfolio that proves competence, not just credentials.",
    accent: "#8B5CF6",
    borderGradient: "from-violet-400 to-violet-600",
    glowBg: "radial-gradient(ellipse at top left, rgba(139,92,246,0.06) 0%, transparent 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} className="h-5 w-5 stroke-violet-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    iconBg: "bg-violet-50",
  },
  {
    number: "03",
    title: "Contribute",
    body: "Answer questions, mentor peers, review code. Every contribution earns Reputation — your live trust score in the ecosystem.",
    accent: "#10B981",
    borderGradient: "from-emerald-400 to-emerald-600",
    glowBg: "radial-gradient(ellipse at top left, rgba(16,185,129,0.06) 0%, transparent 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} className="h-5 w-5 stroke-emerald-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    iconBg: "bg-emerald-50",
  },
  {
    number: "04",
    title: "Earn",
    body: "Skill Coins accumulate from bounties and mentoring. Withdraw them, spend in the marketplace, or reinvest in learning.",
    accent: "#F59E0B",
    borderGradient: "from-amber-400 to-amber-600",
    glowBg: "radial-gradient(ellipse at top left, rgba(245,158,11,0.06) 0%, transparent 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} className="h-5 w-5 stroke-amber-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconBg: "bg-amber-50",
  },
];

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, scale: 0.96, filter: "blur(4px)", y: 20 },
  visible: {
    opacity: 1, scale: 1, filter: "blur(0px)", y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const headerVariant: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  const [isSticky, setIsSticky] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 100px", "end 100px"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsSticky(latest > 0 && latest < 1);
  });

  // ── Scroll button logic ──────────────────────────────────────────────────────
  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollBy = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = (card?.offsetWidth ?? 340) + 24; // card width + gap
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative bg-[#FAFAFA] py-24 sm:py-32"
    >
      {/* Dot pattern — clipped to its own wrapper so section needn't be overflow-hidden */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute right-0 top-0 h-full w-full opacity-[0.15]"
          style={{
            backgroundImage: "radial-gradient(#9CA3AF 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage: "radial-gradient(ellipse at top right, black 20%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at top right, black 20%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-6 lg:px-8 xl:flex-row xl:items-stretch">

        {/* ── Left Column: Sticky Header ── */}
        <div className="relative xl:w-75 xl:shrink-0">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-8 py-2 xl:sticky xl:top-28"
          >
            {/* Active sticky indicator */}
            <motion.div
              initial={false}
              animate={{ opacity: isSticky ? 1 : 0, scaleY: isSticky ? 1 : 0.4 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute -left-6 bottom-0 top-3 hidden w-0.5 origin-top rounded-full bg-blue-500 xl:block"
            />

            {/* Heading + CTA */}
            <div>
              <motion.h2
                variants={headerVariant}
                className={cn(
                  "mb-8 flex items-end gap-3 text-[4rem] font-medium leading-[1.05] tracking-tight transition-colors duration-500 sm:text-[5rem]",
                  isSticky ? "text-blue-950" : "text-gray-950"
                )}
              >
                What We Do
                <svg
                  className={cn("mb-2 h-8 w-8 transition-colors duration-500", isSticky ? "text-blue-950" : "text-gray-950")}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5h7a2 2 0 012 2v7M18 14l-6 6-6-6" />
                </svg>
              </motion.h2>

              <motion.button
                variants={headerVariant}
                className="group flex items-center gap-3 rounded-full border border-gray-300 bg-transparent px-5 py-2.5 text-sm font-medium text-gray-900 transition-all hover:bg-gray-900 hover:text-white"
              >
                About Us
                <svg className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                </svg>
              </motion.button>
            </div>

            {/* ── Slide nav buttons ── */}
            <motion.div variants={headerVariant} className="flex items-center gap-2.5">
              <button
                onClick={() => scrollBy("left")}
                disabled={!canScrollLeft}
                aria-label="Previous feature"
                suppressHydrationWarning
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200",
                  canScrollLeft
                    ? "border-gray-300 text-gray-600 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                    : "cursor-not-allowed border-gray-100 text-gray-300"
                )}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scrollBy("right")}
                disabled={!canScrollRight}
                aria-label="Next feature"
                suppressHydrationWarning
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200",
                  canScrollRight
                    ? "border-gray-300 text-gray-600 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                    : "cursor-not-allowed border-gray-100 text-gray-300"
                )}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              {/* Card count indicator */}
              <span className="ml-1 text-xs text-gray-400">
                {features.length} features
              </span>
            </motion.div>

            {/* Subtext */}
            <motion.div variants={headerVariant}>
              <p className="max-w-60 text-[13px] leading-relaxed text-gray-400">
                Design, develop and run any business software you need.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Right Column: Scroll container ── */}
        {/*
          min-w-0 prevents flex children from overflowing.
          The negative right margin + padding trick lets cards peek at the viewport edge
          without being clipped, while still allowing the section bg to show.
        */}
        <div className="min-w-0 flex-1">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            ref={scrollRef}
            onScroll={updateScrollState}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 pt-2 xl:pt-0"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              /* Right padding keeps a "peek" of the next card at the edge */
              paddingRight: "1.5rem",
            }}
          >
            {features.map((f, i) => {
              const isHeroCard = i === 0;
              return (
                <motion.div
                  key={f.number}
                  data-card
                  variants={cardVariant}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.06)",
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  className={cn(
                    "group relative flex w-75 shrink-0 snap-start flex-col overflow-hidden rounded-[2rem] border border-gray-100/60 bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] will-change-transform sm:w-[320px]",
                    isHeroCard ? "p-2" : "p-8"
                  )}
                >
                  {/* Hover ambient glow */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: f.glowBg }}
                  />

                  {isHeroCard ? (
                    <>
                      <motion.div
                        initial={{ height: "4rem" }}
                        animate={isInView ? { height: "15rem" } : {}}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                        className="relative w-full overflow-hidden rounded-[1.5rem] bg-linear-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] p-6 text-white flex flex-col justify-end"
                      >
                        <div className="absolute inset-0 opacity-30">
                          <div className="absolute -left-10 -top-10 h-40 w-40 rotate-12 rounded-2xl bg-white/20 backdrop-blur-3xl" />
                          <div className="absolute bottom-0 right-10 h-32 w-32 -rotate-12 rounded-2xl bg-white/10 backdrop-blur-xl" />
                        </div>
                        <div className="absolute right-0 top-0 z-20 flex h-18 w-18 items-start justify-end rounded-bl-[1.5rem] bg-white p-2">
                          <div className="absolute -left-4 top-0 h-4 w-4 rounded-tr-full bg-transparent shadow-[5px_-5px_0_5px_white]" />
                          <div className="absolute -bottom-4 right-0 h-4 w-4 rounded-tr-full bg-transparent shadow-[5px_-5px_0_5px_white]" />
                          <div className="relative z-30 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md transition-transform duration-500 group-hover:scale-110">
                            {f.icon}
                          </div>
                        </div>
                        <h3 className="relative z-10 w-4/5 text-[22px] font-medium leading-[1.2] tracking-tight text-white mb-2">
                          Building Your {f.title} Journey
                        </h3>
                      </motion.div>
                      <div className="flex flex-1 flex-col px-5 py-6">
                        <div className="mb-5 h-px w-6 bg-gray-200" />
                        <p className="text-[13.5px] leading-relaxed text-gray-500">{f.body}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative z-10 flex flex-1 flex-col">
                        <h3 className="mb-5 text-[20px] font-medium tracking-tight text-gray-900">{f.title}</h3>
                        <div className="mb-5 h-px w-6 bg-gray-200 transition-all duration-300 group-hover:w-10 group-hover:bg-gray-300" />
                        <p className="text-[13.5px] leading-[1.8] text-gray-500">{f.body}</p>
                      </div>
                      <div className="relative z-10 mt-10">
                        <div className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full border border-gray-100/50 shadow-sm transition-transform duration-300 group-hover:scale-110",
                          f.iconBg
                        )}>
                          {f.icon}
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        [data-card]::-webkit-scrollbar { display: none; }
        div[style*="scrollbarWidth"]::-webkit-scrollbar { display: none; }
      `}} />
    </section>
  );
}
