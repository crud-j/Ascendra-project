"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Word-mask reveal helper ──────────────────────────────────────────────────

function WordReveal({ children, className }: { children: string; className?: string }) {
  return (
    <>
      {children.split(" ").map((word, i, arr) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.08em] mb-[-0.08em]"
          style={{ verticalAlign: "bottom" }}
        >
          <span className={`js-reveal-word inline-block${className ? ` ${className}` : ""}`}>
            {word}{i < arr.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </>
  );
}

// ─── Custom Premium SVG Accents ───────────────────────────────────────────────

function BackgroundGrid() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-[0.15]">
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="premium-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" className="text-zinc-400" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#premium-grid)" />
      </svg>
    </div>
  );
}

// ─── Mock UI Atoms ────────────────────────────────────────────────────────────

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200/50 shadow-inner">
      <div
        className="js-progress-bar h-full rounded-full will-change-[width] relative overflow-hidden"
        data-target={`${value}%`}
        style={{ width: "0%", backgroundColor: color }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      </div>
    </div>
  );
}

function XpPill({ amount }: { amount: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/50 border border-blue-200/60 px-2.5 py-1 text-[11px] font-bold text-blue-600 shadow-[0_2px_10px_-2px_rgba(59,130,246,0.15)] backdrop-blur-md">
      <svg className="h-2 w-2 fill-blue-500 animate-pulse" viewBox="0 0 8 8">
        <circle cx="4" cy="4" r="3" />
      </svg>
      +{amount} XP
    </span>
  );
}

function CoinPill({ amount }: { amount: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50/50 border border-amber-200/60 px-2.5 py-1 text-[11px] font-bold text-amber-600 shadow-[0_2px_10px_-2px_rgba(245,158,11,0.15)] backdrop-blur-md">
      <svg className="h-2 w-2 fill-amber-500 animate-pulse" viewBox="0 0 8 8">
        <circle cx="4" cy="4" r="3" />
      </svg>
      +{amount} SC
    </span>
  );
}

function RepPill({ amount }: { amount: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50/50 border border-purple-200/60 px-2.5 py-1 text-[11px] font-bold text-purple-600 shadow-[0_2px_10px_-2px_rgba(168,85,247,0.15)] backdrop-blur-md">
      <svg className="h-2 w-2 fill-purple-500 animate-pulse" viewBox="0 0 8 8">
        <circle cx="4" cy="4" r="3" />
      </svg>
      +{amount} Rep
    </span>
  );
}

// ─── Card 1: Learning Track ───────────────────────────────────────────────────

function LearningCard() {
  const lessons = [
    { title: "Intro to React Hooks", done: true, xp: "120" },
    { title: "State & Side Effects", done: true, xp: "90" },
    { title: "Custom Hook Patterns", done: false, xp: "150" },
    { title: "Performance Optimization", done: false, xp: "200" },
  ];

  return (
    <div className="flex h-full flex-col gap-6 rounded-[32px] bg-white/70 p-8 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] border border-white/60 ring-1 ring-zinc-100/50 relative overflow-hidden">
      <BackgroundGrid />
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600 opacity-90" />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 block mb-1">
            Frontend Track
          </span>
          <h4 className="text-xl font-black text-zinc-900 tracking-tight" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            React Mastery
          </h4>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-b from-blue-50 to-white border border-blue-100/80 shadow-sm ring-1 ring-white">
          <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.25}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/80 shadow-sm ring-1 ring-zinc-100/50">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Progress</span>
          <span className="text-[12px] font-extrabold text-zinc-800 bg-white border border-zinc-200/60 rounded-full px-3 py-1 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
            2 / 4 lessons
          </span>
        </div>
        <ProgressBar value={50} color="#3B82F6" />
      </div>

      <ul className="relative z-10 flex flex-col gap-3">
        {lessons.map((l) => (
          <li
            key={l.title}
            className={`flex items-center justify-between rounded-2xl px-4 py-4 text-[13px] font-bold border transition-all ${
              l.done
                ? "bg-blue-50/40 border-blue-200/50 text-blue-950 shadow-sm backdrop-blur-sm"
                : "bg-white/40 border-zinc-100/80 text-zinc-400 backdrop-blur-sm"
            }`}
          >
            <div className="flex items-center gap-3">
              {l.done ? (
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-md">
                  <svg className="h-3 w-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 7l3.5 3.5L12 3" />
                  </svg>
                </div>
              ) : (
                <div className="h-5 w-5 shrink-0 rounded-full border-2 border-zinc-200/80 bg-white/50" />
              )}
              <span className="tracking-tight">{l.title}</span>
            </div>
            {l.done && <XpPill amount={l.xp} />}
          </li>
        ))}
      </ul>

      <div className="relative z-10 mt-auto flex items-center justify-between rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 px-5 py-4.5 shadow-lg shadow-zinc-900/20 border border-zinc-800 ring-1 ring-white/10 group cursor-pointer transition-all hover:shadow-xl hover:shadow-zinc-900/30">
        <div className="flex flex-col">
          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Up Next</span>
          <span className="text-[13px] font-extrabold text-white tracking-tight mt-0.5">Continue: Custom Hook Patterns</span>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-800 text-white border border-zinc-700/80 shadow-inner group-hover:translate-x-1 transition-transform duration-300 ease-out">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Card 2: Community Answer ─────────────────────────────────────────────────

function CommunityCard() {
  return (
    <div className="flex h-full flex-col gap-6 rounded-[32px] bg-white/70 p-8 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] border border-white/60 ring-1 ring-zinc-100/50 relative overflow-hidden">
      <BackgroundGrid />
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-600 opacity-90" />

      <div className="relative z-10 rounded-2xl bg-white/60 backdrop-blur-md p-5 border border-white/80 shadow-sm ring-1 ring-zinc-100/50">
        <div className="flex items-center gap-3 mb-3.5">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 text-[10px] font-bold text-white flex items-center justify-center border-2 border-white shadow-md">
            JK
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-extrabold text-zinc-800 leading-none">jkimani</span>
            <span className="text-[10px] font-semibold text-zinc-400 tracking-tight mt-1">Frontend Guild</span>
          </div>
        </div>
        <p className="text-[13.5px] font-bold text-zinc-800 leading-relaxed tracking-tight">
          Why does <code className="rounded-md bg-zinc-200/50 border border-zinc-200 px-1.5 py-0.5 font-mono text-[11.5px] text-zinc-900 shadow-sm">useEffect</code> run twice in React 18 strict mode? Is my API call broken?
        </p>
      </div>

      <div className="relative z-10 rounded-2xl border border-emerald-200/60 bg-gradient-to-b from-emerald-50/50 to-white/30 backdrop-blur-md p-6 shadow-sm ring-1 ring-white/80">
        <div className="absolute -top-3.5 left-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 px-3.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-md shadow-emerald-500/20 border border-emerald-300/50">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Accepted
          </span>
        </div>
        
        <div className="mt-2 flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-[10px] font-bold text-white flex items-center justify-center border-2 border-white shadow-md">
            AR
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-extrabold text-zinc-800 leading-none">aravind_r</span>
            <span className="text-[10px] font-medium text-zinc-500 mt-1">Contributor</span>
          </div>
        </div>

        <p className="text-[13px] leading-relaxed font-semibold text-zinc-700 tracking-tight">
          This is intentional in React 18. Strict Mode mounts → unmounts → remounts components to surface side effects. Use a cleanup function to cancel your fetch.
        </p>

        <div className="mt-5 rounded-xl bg-zinc-950 p-5 border border-zinc-800 font-mono text-[11.5px] text-zinc-300 shadow-xl shadow-black/10 ring-1 ring-white/10 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute right-4 top-4 flex gap-1.5">
            <div className="h-2 w-2 rounded-full bg-zinc-700/80" />
            <div className="h-2 w-2 rounded-full bg-zinc-700/80" />
            <div className="h-2 w-2 rounded-full bg-zinc-700/80" />
          </div>
          <span className="text-zinc-400 font-bold">useEffect</span>(<span className="text-blue-400">() =&gt;</span> <span className="text-zinc-200">{`{`}</span><br />
          &nbsp;&nbsp;<span className="text-zinc-500 italic">{'// cleanup cancels fetch'}</span><br />
          &nbsp;&nbsp;<span className="text-purple-400 font-semibold">return</span> <span className="text-blue-400">() =&gt;</span> controller.<span className="text-emerald-400">abort</span>();<br />
          <span className="text-zinc-200">{`}`}</span>, []);
        </div>
      </div>

      <div className="relative z-10 mt-auto flex items-center justify-between rounded-2xl bg-white/80 backdrop-blur-md px-5 py-4 border border-zinc-100 shadow-sm ring-1 ring-white">
        <span className="text-[11.5px] font-bold text-zinc-500 tracking-tight">Rewards issued</span>
        <div className="flex items-center gap-2">
          <RepPill amount="15" />
          <CoinPill amount="1" />
        </div>
      </div>
    </div>
  );
}

// ─── Card 3: Economy Dashboard ────────────────────────────────────────────────

function EconomyCard() {
  const currencies = [
    { label: "XP", value: "14,820", sub: "Lifetime progress", color: "#3B82F6", bar: 74, svgPath: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
    { label: "Reputation", value: "2,340", sub: "Community trust", color: "#8B5CF6", bar: 58, svgPath: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" },
    { label: "Skill Coins", value: "183 SC", sub: "Withdrawable value", color: "#C19562", bar: 42, svgPath: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  ];

  return (
    <div className="flex h-full flex-col gap-6 rounded-[32px] bg-white/70 p-8 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] border border-white/60 ring-1 ring-zinc-100/50 relative overflow-hidden">
      <BackgroundGrid />
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-amber-400 via-orange-400 to-amber-600 opacity-90" />

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 block mb-1">Your Economy</span>
          <h4 className="text-xl font-black text-zinc-900 tracking-tight" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            aravind_r
          </h4>
        </div>
        <span className="rounded-full bg-purple-50/80 border border-purple-200/60 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-purple-700 shadow-sm backdrop-blur-md">
          Contributor Tier
        </span>
      </div>

      <div className="relative z-10 flex flex-col gap-5 bg-white/60 backdrop-blur-md border border-white/80 shadow-sm ring-1 ring-zinc-100/50 rounded-2xl p-5">
        {currencies.map((c) => (
          <div key={c.label} className="js-currency-row group">
            <div className="mb-2.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-white border border-zinc-200/80 text-zinc-500 shadow-sm group-hover:scale-105 transition-transform">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={c.svgPath} />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[12.5px] font-black text-zinc-800 tracking-tight leading-none">{c.label}</span>
                  <span className="text-[10px] font-medium text-zinc-400 mt-1">{c.sub}</span>
                </div>
              </div>
              <span className="text-[13px] font-black text-zinc-900 bg-zinc-50 border border-zinc-200/60 px-2.5 py-1 rounded-lg shadow-sm">
                {c.value}
              </span>
            </div>
            <ProgressBar value={c.bar} color={c.color} />
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-auto flex flex-col gap-3.5 rounded-2xl border border-amber-200/60 bg-gradient-to-b from-amber-50/50 to-white/40 backdrop-blur-md p-5 shadow-sm ring-1 ring-white/80">
        <div className="flex items-center gap-3">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-md shadow-amber-500/20">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-[12.5px] font-bold text-amber-900 tracking-tight leading-tight">
            183 SC ready to withdraw via GCash, Maya, or Stripe
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section Wrapper ─────────────────────────────────────────────────────

export function ProductPreviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Section eyebrow + paragraph fade-up
      gsap.from(".js-header-el", {
        scrollTrigger: {
          trigger: ".js-header-trigger",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.14,
        ease: "power3.out",
      });

      // 2. Section headline — word-mask curtain lift
      gsap.from(".js-header-headline .js-reveal-word", {
        scrollTrigger: {
          trigger: ".js-header-trigger",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: "110%",
        duration: 0.9,
        stagger: 0.038,
        ease: "power4.out",
        delay: 0.18,
      });

      // 3. Act rows with upgraded 3D perspective reveal
      const dynamicRows = gsap.utils.toArray<HTMLElement>(".js-act-row");
      dynamicRows.forEach((row) => {
        const supportText = row.querySelectorAll(".js-act-text-el");
        const headlineWords = row.querySelectorAll<HTMLElement>(".js-act-headline .js-reveal-word");
        const interfaceCard = row.querySelector(".js-act-card-el");
        const automatedBars = row.querySelectorAll<HTMLElement>(".js-progress-bar");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        tl.from(supportText, {
          opacity: 0,
          y: 20,
          duration: 0.55,
          stagger: 0.09,
          ease: "power2.out",
        });

        if (headlineWords.length > 0) {
          tl.from(headlineWords, {
            y: "110%",
            duration: 0.75,
            stagger: 0.035,
            ease: "power4.out",
          }, "<0.05");
        }

        // High-Fidelity 3D Blur Entrance Animation
        tl.from(interfaceCard, {
          opacity: 0,
          y: 50,
          scale: 0.96,
          rotationX: 8,
          transformOrigin: "top center",
          transformPerspective: 1000,
          filter: "blur(12px)",
          duration: 1.2,
          ease: "power3.out",
        }, "-=0.6");

        if (automatedBars.length > 0) {
          tl.to(automatedBars, {
            width: (i, el) => el.getAttribute("data-target") || "0%",
            duration: 1.4,
            ease: "power4.out",
            stagger: 0.15,
          }, "-=0.7");
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const acts = [
    {
      step: "01",
      label: "Learn",
      headline: "Every lesson moves the needle.",
      body: "Pick a track, start a lesson, earn XP. Progress is visible, structured, and yours forever — no resets, no paywalls past the first tier.",
      card: <LearningCard />,
      accent: "#3B82F6",
    },
    {
      step: "02",
      label: "Contribute",
      headline: "Your knowledge becomes someone else's breakthrough.",
      body: "Answer questions in the community. When your answer gets accepted, the system validates it — and issues Reputation and Skill Coins automatically.",
      card: <CommunityCard />,
      accent: "#8B5CF6",
    },
    {
      step: "03",
      label: "Earn",
      headline: "Three currencies. One truth about your value.",
      body: "XP tracks growth, Reputation tracks trust, Skill Coins track real economic contribution. Every number is a ledger entry — not a badge you grinded for.",
      card: <EconomyCard />,
      accent: "#C19562",
    },
  ];

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden py-28 sm:py-36" style={{ background: "#FAFAFA" }}>
      {/* Top Interface Boundary Track Rule Line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-zinc-200/60" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Module Master Header Component */}
        <div className="js-header-trigger mb-24 text-center">
          <div className="js-header-el mb-5 inline-flex items-center gap-3">
            <div className="h-px w-8 bg-[#C19562]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C19562]" style={{ fontFamily: "var(--font-sora)" }}>
              The Platform in Three Acts
            </span>
            <div className="h-px w-8 bg-[#C19562]" />
          </div>

          <h2
            className="js-header-headline text-4xl font-extrabold leading-[1.08] tracking-tight text-zinc-900 sm:text-5xl"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            <WordReveal>From first lesson to first </WordReveal>
            <WordReveal className="text-zinc-400">withdrawal.</WordReveal>
          </h2>

          <p
            className="js-header-el mx-auto mt-5 max-w-xl text-base leading-[1.75] text-zinc-500"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            This is what actually happens when you join Ascendra — not a pitch deck, but the real screen-by-screen story of how learning becomes income.
          </p>
        </div>

        {/* Alternating Bento Structure Flow Wrapper */}
        <div className="flex flex-col gap-32">
          {acts.map((act, i) => (
            <div
              key={act.step}
              className="js-act-row grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
            >
              {/* Product Functional Description Details Column */}
              <div className={`flex flex-col gap-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="js-act-text-el flex items-center gap-3">
                  <span
                    className="text-[11px] font-black uppercase tracking-[0.2em]"
                    style={{ color: act.accent, fontFamily: "var(--font-sora)" }}
                  >
                    Act {act.step}
                  </span>
                  <div className="h-px flex-1" style={{ backgroundColor: `${act.accent}20` }} />
                  <span
                    className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide"
                    style={{ backgroundColor: `${act.accent}12`, color: act.accent }}
                  >
                    {act.label}
                  </span>
                </div>

                <h3
                  className="js-act-headline text-3xl font-extrabold leading-[1.12] tracking-tight text-zinc-900 sm:text-4xl"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  <WordReveal>{act.headline}</WordReveal>
                </h3>

                <p className="js-act-text-el text-base leading-relaxed text-zinc-500" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  {act.body}
                </p>

                {/* Flow Sequence Tracker Metric Indicators */}
                <div className="js-act-text-el flex items-center gap-2 pt-2">
                  {acts.map((_, j) => (
                    <div
                      key={j}
                      className="h-1.5 rounded-full transition-all duration-500"
                      style={{
                        width: j === i ? "2rem" : "0.375rem",
                        backgroundColor: j === i ? act.accent : "#E4E4E7",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* High-Fidelity UI Interactive Canvas Column */}
              <div className="js-act-card-el relative w-full max-w-lg mx-auto lg:max-w-none [perspective:1000px]">
                {/* Radial Multi-Angle Core Vector Aura Backlights */}
                <div
                  className="pointer-events-none absolute -inset-4 rounded-[40px] blur-[40px] opacity-[0.08]"
                  style={{ backgroundColor: act.accent }}
                />
                <div className="relative z-10 w-full h-full transform">
                  {act.card}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Continuity System Ambient Backdrop Design Mapping [Unchanged] */}
      <div className="absolute inset-x-0 bottom-0 h-[50%] overflow-hidden pointer-events-none">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 z-[-1]">
            <div
              className="absolute inset-x-4 top-12 bottom-4 rounded-[32px] border blur-[0.5px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_40%,black_75%,transparent_95%)]"
              style={{ borderColor: "rgba(127, 189, 218, 0.15)" }}
            >
              <div
                className="absolute left-0 top-1/4 bottom-12 w-[1.5px] blur-[1px]"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(127, 189, 218, 0.35), transparent)" }}
              />
              <div
                className="absolute right-0 top-1/4 bottom-12 w-[1.5px] blur-[1px]"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(127, 189, 218, 0.35), transparent)" }}
              />
            </div>
            <div
              className="js-aurora-blob absolute left-[-15%] bottom-[-5%] h-[65%] w-[65%] rounded-full opacity-[0.18] blur-[140px] will-change-transform"
              style={{ background: "linear-gradient(45deg, #BAE6FD 0%, #0EA5E9 60%, transparent 100%)" }}
            />
            <div
              className="js-aurora-blob absolute right-[-15%] bottom-[-5%] h-[65%] w-[65%] rounded-full opacity-[0.18] blur-[140px] will-change-transform"
              style={{ background: "linear-gradient(-45deg, #BAE6FD 0%, #0EA5E9 60%, transparent 100%)" }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-44"
              style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(127, 189, 218, 0.4) 25%, rgba(127, 189, 218, 0.8) 65%, #7FBDDA 100%)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}