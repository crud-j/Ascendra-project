"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ───────────────────────────────────────────────────────────────────
const currencies = [
  {
    id: "xp",
    symbol: "XP",
    name: "Experience Points",
    tagline: "How far along am I?",
    description:
      "XP only grows. Every lesson, every contribution, every milestone adds to your permanent score. It never resets — it's your lifelong record of growth inside Ascendra.",
    color: "#3b82f6",
    colorRGB: "59,130,246",
    displayValue: 48920,
    pct: 68,
    trait: "Permanent · Non-transferable",
    attributes: ["Grows with every action", "Never resets or expires", "Unlocks tier milestones"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} className="h-6 w-6" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    id: "rep",
    symbol: "REP",
    name: "Reputation",
    tagline: "Should others trust me?",
    description:
      "Reputation is earned through contribution and can decrease through misconduct. A live signal of your ecosystem standing — dynamic, responsive, and always honest.",
    color: "#8b5cf6",
    colorRGB: "139,92,246",
    displayValue: 3240,
    pct: 42,
    trait: "Dynamic · Bidirectional",
    attributes: ["Community-driven score", "Responds to conduct", "Visible trust signal"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} className="h-6 w-6" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    id: "sc",
    symbol: "SC",
    name: "Skill Coins",
    tagline: "What value have I created?",
    description:
      "Skill Coins are real transferable value. Earn them from bounties, spend in the marketplace, or withdraw. Every coin is backed by real contribution — not speculation.",
    color: "#f59e0b",
    colorRGB: "245,158,11",
    displayValue: 1875,
    pct: 55,
    trait: "Transferable · Withdrawable",
    attributes: ["Spendable in marketplace", "Backed by contribution", "Withdraw anytime"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} className="h-6 w-6" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
  },
];

// ─── Animated Counter ────────────────────────────────────────────────────────
function useCounter(target: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    setValue(0);
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, active]);
  return value;
}

// ─── SVG Arc Ring ────────────────────────────────────────────────────────────
function ArcRing({ pct, color }: { pct: number; color: string }) {
  const R = 72;
  const C = 2 * Math.PI * R;
  return (
    <div className="relative flex items-center justify-center">
      <svg width="180" height="180" viewBox="0 0 180 180" style={{ transform: "rotate(-90deg)" }} className="drop-shadow-sm">
        <circle cx="90" cy="90" r={R} fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="10" />
        <motion.circle
          cx="90" cy="90" r={R}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: C - (pct / 100) * C }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </svg>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export function EconomySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgGlowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [selected, setSelected] = useState(0);
  const currency = currencies[selected];
  const count = useCounter(currency.displayValue, isInView);

  // ─── GSAP Scroll-Driven Effects ────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(".js-eco-eyebrow",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 82%", end: "top 62%", scrub: 1 } }
      );

      gsap.fromTo(".js-eco-h2",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 78%", end: "top 58%", scrub: 1 } }
      );

      gsap.fromTo(".js-eco-desc",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 74%", end: "top 54%", scrub: 1 } }
      );

      gsap.fromTo(".js-eco-tabs",
        { opacity: 0, y: 15, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, ease: "power2.out", scrollTrigger: { trigger: ".js-eco-tabs", start: "top 90%", end: "top 75%", scrub: 1 } }
      );

      gsap.fromTo(".js-eco-panel",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, ease: "power2.out", scrollTrigger: { trigger: ".js-eco-panel", start: "top 85%", end: "top 60%", scrub: 1.2 } }
      );

      if (bgGlowRef.current) {
        gsap.to(bgGlowRef.current.querySelectorAll(".js-aurora-blob"), {
          yPercent: () => -8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="economy-section"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FAFAFA] pt-32 sm:pt-40 pb-64 select-none"
    >
      {/* ── Subtle Aurora Canvas (Restricted to bottom 60% of section) ── */}
      <div 
        ref={bgGlowRef} 
        className="absolute inset-x-0 bottom-0 top-[40%] pointer-events-none overflow-hidden z-0"
      >
        <div 
          className="js-aurora-blob absolute left-[-10%] bottom-[-5%] w-[65%] h-[60%] rounded-full opacity-[0.20] blur-[120px] will-change-transform"
          style={{
            background: "linear-gradient(45deg, #BAE6FD 0%, #0EA5E9 60%, transparent 100%)"
          }}
        />
      </div>

      <div className="relative mx-auto max-w-340 px-6 lg:px-8 z-10">

        {/* ── Header (Completely clear of gradients) ── */}
        <div className="mb-16">
          <div className="js-eco-eyebrow mb-6 flex items-center gap-4">
            <div className="h-0.5 w-8 rounded-full bg-[#C19562]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C19562]">
              The Economy
            </span>
          </div>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h2 className="js-eco-h2 text-5xl font-semibold leading-[1.1] tracking-tight text-zinc-900 lg:text-6xl">
              Three currencies.<br />
              <span className="text-zinc-400">One ecosystem.</span>
            </h2>
            <p className="js-eco-desc max-w-sm shrink-0 text-base leading-relaxed text-zinc-500 md:pb-2">
              Unlike basic badges or streaks, Ascendra's three-currency model creates tangible value, trust, and real incentives.
            </p>
          </div>
        </div>

        {/* ── Modern Segmented Tab Switcher ── */}
        <div className="js-eco-tabs mb-12 flex justify-start">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/80 bg-white/90 p-1.5 shadow-sm backdrop-blur-md">
            {currencies.map((c, i) => {
              const isSelected = selected === i;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelected(i)}
                  suppressHydrationWarning
                  className={cn(
                    "relative flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300",
                    isSelected ? "text-white" : "text-zinc-500 hover:text-zinc-900"
                  )}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full shadow-md"
                      style={{ backgroundColor: c.color }}
                      transition={{ type: "spring", bounce: 0.15, duration: 0.55 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {c.symbol}
                    <span className={cn("hidden sm:inline transition-opacity duration-300", isSelected ? "opacity-90" : "opacity-0 w-0 overflow-hidden sm:w-auto")}>
                      · {c.name}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Refined Bento Grid Panel ── */}
        <div className="js-eco-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={currency.id}
              initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6"
            >
              
              {/* ── Tile 1: Main Stat Card ── */}
              <div 
                className="group relative flex min-h-97.5ex-col justify-between overflow-hidden rounded-[2rem] border border-zinc-200/70 bg-bg-linear-to-bom-white to-zinc-50/50 p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/50 md:col-span-2 lg:col-span-5 lg:row-span-2 backdrop-blur-sm"
              >
                <div 
                  className="absolute -top-24 -right-24 h-80 w-80 rounded-full opacity-[0.08] blur-3xl transition-opacity duration-700 group-hover:opacity-[0.15]"
                  style={{ backgroundColor: currency.color }}
                />
                
                <div className="relative z-10 flex items-center justify-between">
                  <div 
                    className="flex h-13 w-13 items-center justify-center rounded-2xl border border-zinc-100 shadow-sm transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundColor: `rgba(${currency.colorRGB}, 0.08)`, color: currency.color }}
                  >
                    {currency.icon}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">System Asset</span>
                    <span className="text-xs font-bold tracking-wider" style={{ color: currency.color }}>{currency.symbol}</span>
                  </div>
                </div>

                <div className="relative z-10 mt-auto">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="text-[4.25rem] font-bold leading-none tracking-tight text-zinc-900 sm:text-[4.75rem]"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {count.toLocaleString()}
                  </motion.div>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Your Accumulated {currency.symbol} Balance
                  </p>
                </div>

                <div className="pointer-events-none absolute bottom-2 right-2 opacity-50 transition-all duration-700 group-hover:scale-105 group-hover:opacity-80">
                  <ArcRing pct={currency.pct} color={currency.color} />
                </div>
              </div>

              {/* ── Tile 2: Description & Philosophy ── */}
              <div className="group flex flex-col justify-center rounded-[2rem] border border-zinc-200/70 bg-linear-to-brom-white to-zinc-50/50 p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/50 md:col-span-2 lg:col-span-7 lg:row-span-1 lg:p-10 backdrop-blur-sm">
                <span className="mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Core Objective</span>
                <h3 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                  {currency.tagline}
                </h3>
                <p className="max-w-2xl text-base leading-relaxed text-zinc-500 sm:text-lg">
                  {currency.description}
                </p>
              </div>

              {/* ── Tile 3: Key Attributes ── */}
              <div className="group rounded-[2rem] border border-zinc-200/70 bg-linear-to-b from-white to-zinc-50/50 p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/50 md:col-span-1 lg:col-span-4 lg:row-span-1 backdrop-blur-sm">
                 <span className="mb-5 block text-[10px] font-bold uppercase tracking-widest text-zinc-400">Behaviors & Traits</span>
                 <ul className="flex flex-col gap-3.5">
                  {currency.attributes.map((attr, i) => (
                    <motion.li
                      key={attr}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + (i * 0.06), duration: 0.35 }}
                      className="flex items-center gap-3"
                    >
                      <div 
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full shadow-sm border border-zinc-100"
                        style={{ backgroundColor: `rgba(${currency.colorRGB}, 0.08)` }}
                      >
                        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: currency.color }} />
                      </div>
                      <span className="text-sm font-medium text-zinc-600">{attr}</span>
                    </motion.li>
                  ))}
                 </ul>
              </div>

              {/* ── Tile 4: Asset Class Card ── */}
              <div 
                className="group relative flex flex-col items-center justify-center overflow-hidden rounded-[2rem] p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/50 md:col-span-1 lg:col-span-3 lg:row-span-1"
                style={{ 
                  background: `linear-gradient(180deg, rgba(${currency.colorRGB}, 0.04) 0%, rgba(${currency.colorRGB}, 0.01) 100%)`, 
                  borderColor: `rgba(${currency.colorRGB}, 0.16)`,
                  borderWidth: "1px"
                }}
              >
                <div 
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-10 pointer-events-none"
                  style={{ backgroundImage: `radial-gradient(circle at center, ${currency.color} 0%, transparent 70%)` }}
                />
                <span className="relative z-10 mb-2.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: currency.color }}>
                  Asset Class
                </span>
                <span className="relative z-10 text-lg font-semibold text-zinc-800">
                  {currency.trait.split('·')[0].trim()}
                </span>
                <span className="relative z-10 mt-0.5 text-xs font-medium text-zinc-400">
                  {currency.trait.split('·')[1]?.trim()}
                </span>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

     {/* Place this directly after your </GridComponent> closing tag */}

{/* Place this directly after your </GridComponent> closing tag */}

{/* ── Shortened Inverted Bracket Transition Zone (#7FBDDA) ── */}
<div className="absolute inset-x-0 bottom-0 pointer-events-none overflow-hidden h-[50%]">
  
  {/* The Inverted Bracket Shape Glow */}
  <div 
    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[75%] rounded-t-[40px] border-t-32 border-x-32 border-b-0 blur-[45px] opacity-75"
    style={{ borderColor: "#7FBDDA" }}
  />

  {/* Soft core glow inside the bracket valley */}
  <div
    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75%] h-[40%] rounded-t-[24px] blur-[60px]"
    style={{ backgroundColor: "rgba(127, 189, 218, 0.35)" }}
  />

  {/* Smoothed linear seal — Fades the bracket baseline into the next section */}
  <div 
  className="absolute inset-x-0 bottom-0 z-30 h-28" 
  style={{ 
    background: "linear-gradient(to bottom, transparent 0%, rgba(127, 189, 218, 0.7) 40%, #7FBDDA 85%, rgba(127, 189, 218) 100%)" 
  }} 
/>
</div>



    </section>
  );
}