"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useMotionValueEvent, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const features = [
  {
    number: "01",
    title: "Learn",
    body: "Structured courses built by practitioners. Every lesson awards XP that tracks your real progress — not just completions.",
    accent: "#3B82F6",
    borderGradient: "from-blue-400 to-blue-600",
    iconBg: "bg-blue-50",
    glowBg: "radial-gradient(ellipse at top left, rgba(59,130,246,0.06) 0%, transparent 70%)",
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
    glowBg: "radial-gradient(ellipse at top left, rgba(139,92,246,0.06) 0%, transparent 70%)",
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
    glowBg: "radial-gradient(ellipse at top left, rgba(16,185,129,0.06) 0%, transparent 70%)",
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
    glowBg: "radial-gradient(ellipse at top left, rgba(245,158,11,0.06) 0%, transparent 70%)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} className="h-5 w-5 stroke-amber-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

// Refined animation variants for a smoother, premium feel
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
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  const [isSticky, setIsSticky] = useState(false);

  // Track the vertical scroll position of the section to manage the sticky UI state dynamically
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // "start 100px": When the top of the section reaches 100px from the top of the viewport
    // "end 100px": When the bottom of the section passes 100px from the top of the viewport
    offset: ["start 100px", "end 100px"] 
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 0 = section top hasn't reached offset. 1 = section bottom has passed offset.
    setIsSticky(latest > 0 && latest < 1);
  });

  return (
    <section 
      ref={containerRef}
      className="relative overflow-hidden bg-[#FAFAFA] py-24 sm:py-32"
    >
      {/* Premium subtle dot pattern mimicking the reference background */}
      <div 
        className="pointer-events-none absolute right-0 top-0 h-full w-[800px] opacity-[0.15]"
        style={{ 
          backgroundImage: 'radial-gradient(#9CA3AF 1px, transparent 1px)', 
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse at top right, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at top right, black 20%, transparent 70%)'
        }}
      />

      <div className="mx-auto flex max-w-7xl flex-col xl:flex-row xl:items-stretch gap-12 px-6 lg:px-8">
        
        {/* ── Left Column: Sticky Header ── */}
        {/* Outer wrapper allows the flex child to stretch the full height of the section */}
        <div className="xl:w-[320px] flex-shrink-0 relative">
          
          {/* Inner motion div acts as the sticky element within the stretched parent */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="xl:sticky xl:top-[100px] flex flex-col gap-10 xl:gap-[120px] py-2 z-10"
          >
            {/* Visual indicator (vertical line) when sticky is active */}
            <motion.div
              initial={false}
              animate={{ 
                opacity: isSticky ? 1 : 0, 
                scaleY: isSticky ? 1 : 0.4
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute -left-6 top-3 bottom-0 w-[3px] rounded-full bg-blue-500 origin-top hidden xl:block"
            />

            <div>
              <motion.h2 
                variants={headerVariant}
                className={cn(
                  "text-[4rem] sm:text-[5rem] font-medium leading-[1.05] tracking-tight flex items-end gap-3 mb-10 transition-colors duration-500",
                  isSticky ? "text-blue-950" : "text-gray-950"
                )}
              >
                What We Do
                {/* Corner-down arrow matching reference */}
                <svg className={cn("mb-2 h-8 w-8 transition-colors duration-500", isSticky ? "text-blue-950" : "text-gray-950")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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

            {/* Subtext anchored below in desktop layout via gap spacing */}
            <motion.div variants={headerVariant} className="mt-4 xl:mt-0">
              <p className="max-w-[240px] text-[13px] leading-relaxed text-gray-400">
                Design, Develop And Run Any Business Software You Need.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Right Column: Horizontal Scroller / Grid ── */}
        {/* Uses flex horizontal scrolling on desktop to replicate the reference's row structure perfectly */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex-1 flex gap-6 overflow-x-auto pb-8 pt-2 xl:pt-0 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none' }} // Firefox hidden scrollbar
        >
          {features.map((f, i) => {
            const isHeroCard = i === 0;

            return (
              <motion.div
                key={f.number}
                variants={cardVariant}
                whileHover={{ 
                  y: -6, 
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.06)",
                  transition: { duration: 0.3, ease: "easeOut" } 
                }}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100/60 w-[300px] sm:w-[340px] flex-shrink-0 snap-start transition-all will-change-transform",
                  isHeroCard ? "p-2" : "p-8"
                )}
              >
                {/* Ambient Hover Glow (Preserves user's brand colors gracefully) */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: f.glowBg }}
                />

                {isHeroCard ? (
                  // ── Hero Card Design (Card 1) ──
                  <>
                    <motion.div 
                      initial={{ height: "4rem" }}
                      animate={isInView ? { height: "15rem" } : {}}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                      className="relative w-full rounded-[1.5rem] bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] p-6 text-white overflow-hidden flex flex-col justify-end"
                    >
                      {/* Abstract geometric background to simulate the "Blocks" from reference */}
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute -top-10 -left-10 h-40 w-40 rotate-12 rounded-2xl bg-white/20 backdrop-blur-3xl" />
                        <div className="absolute bottom-0 right-10 h-32 w-32 -rotate-12 rounded-2xl bg-white/10 backdrop-blur-xl" />
                      </div>

                      {/* Top-Right "Folded Paper / Cutout" Effect */}
                      <div className="absolute top-0 right-0 h-[72px] w-[72px] rounded-bl-[1.5rem] bg-white z-20 flex items-start justify-end p-2">
                        {/* CSS trick to create smooth inverted corners connecting the white box to the blue container */}
                        <div className="absolute -left-4 top-0 h-4 w-4 rounded-tr-full bg-transparent shadow-[5px_-5px_0_5px_white]" />
                        <div className="absolute -bottom-4 right-0 h-4 w-4 rounded-tr-full bg-transparent shadow-[5px_-5px_0_5px_white]" />
                        
                        {/* Original Icon placed in the cutout */}
                        <div className="relative z-30 h-10 w-10 flex items-center justify-center rounded-xl bg-blue-600 shadow-md text-white transition-transform duration-500 group-hover:scale-110">
                           {f.icon}
                        </div>
                      </div>

                      {/* Image Text */}
                      <h3 className="relative z-10 w-4/5 text-[22px] font-medium leading-[1.2] tracking-tight text-white mb-2">
                        Building Your {f.title} Journey
                      </h3>
                    </motion.div>
                    
                    <div className="flex flex-1 flex-col px-5 py-6">
                      <div className="mb-5 h-px w-6 bg-gray-200" />
                      <p className="text-[13.5px] leading-relaxed text-gray-500">
                        {f.body}
                      </p>
                    </div>
                  </>
                ) : (
                  // ── Standard Card Design (Cards 2-4) ──
                  <>
                    <div className="relative z-10 flex flex-1 flex-col">
                      <h3 className="mb-5 text-[20px] font-medium tracking-tight text-gray-900">
                        {f.title}
                      </h3>
                      <div className="mb-5 h-px w-6 bg-gray-200 transition-all duration-300 group-hover:w-10 group-hover:bg-gray-300" />
                      <p className="text-[13.5px] leading-[1.8] text-gray-500">
                        {f.body}
                      </p>
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

      {/* Global styles to hide scrollbar for webkit (since Tailwind `scrollbar-hide` requires a plugin) */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </section>
  );
}