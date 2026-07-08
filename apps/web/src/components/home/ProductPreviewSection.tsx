"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Mock UI Atoms ────────────────────────────────────────────────────────────

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
      {/* GSAP will animate this element's width from 0% to its data-target width */}
      <div
        className="js-progress-bar h-full rounded-full will-change-[width]"
        data-target={`${value}%`}
        style={{ width: "0%", backgroundColor: color }}
      />
    </div>
  );
}

function XpPill({ amount }: { amount: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 border border-blue-100/50 px-2.5 py-1 text-[11px] font-bold text-blue-600 shadow-xs backdrop-blur-xs">
      <svg className="h-2 w-2 fill-blue-500 animate-pulse" viewBox="0 0 8 8">
        <circle cx="4" cy="4" r="3" />
      </svg>
      +{amount} XP
    </span>
  );
}

function CoinPill({ amount }: { amount: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50/80 border border-amber-100/50 px-2.5 py-1 text-[11px] font-bold text-amber-600 shadow-xs backdrop-blur-xs">
      <svg className="h-2 w-2 fill-amber-500 animate-pulse" viewBox="0 0 8 8">
        <circle cx="4" cy="4" r="3" />
      </svg>
      +{amount} SC
    </span>
  );
}

function RepPill({ amount }: { amount: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50/80 border border-purple-100/50 px-2.5 py-1 text-[11px] font-bold text-purple-600 shadow-xs backdrop-blur-xs">
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
    <div className="flex h-full flex-col gap-6 rounded-[32px] bg-white p-7 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.05)] border border-zinc-100 relative overflow-hidden">
      {/* Decorative Top Highlight Line */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-blue-400 to-blue-600 opacity-80" />

      {/* Track Header */}
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 block mb-1">
            Frontend Track
          </span>
          <h4 className="text-lg font-black text-zinc-900 tracking-tight" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            React Mastery
          </h4>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50/80 border border-blue-100/50 shadow-xs">
          <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.25}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
      </div>

      {/* Progress Box Layout */}
      <div className="bg-zinc-50/60 rounded-2xl p-4 border border-zinc-100">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Progress</span>
          <span className="text-[12px] font-extrabold text-zinc-800 bg-white border border-zinc-200/60 rounded-full px-2.5 py-0.5 shadow-xs">
            2 / 4 lessons
          </span>
        </div>
        <ProgressBar value={50} color="#3B82F6" />
      </div>

      {/* Lesson List */}
      <ul className="flex flex-col gap-3">
        {lessons.map((l) => (
          <li
            key={l.title}
            className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-[13px] font-bold border transition-all ${
              l.done
                ? "bg-blue-50/30 border-blue-100/40 text-blue-900"
                : "bg-white border-zinc-100 text-zinc-400"
            }`}
          >
            <div className="flex items-center gap-3">
              {l.done ? (
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white shadow-xs">
                  <svg className="h-3 w-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 7l3.5 3.5L12 3" />
                  </svg>
                </div>
              ) : (
                <div className="h-5 w-5 shrink-0 rounded-full border-2 border-zinc-200 bg-white" />
              )}
              <span className="tracking-tight">{l.title}</span>
            </div>
            {l.done && <XpPill amount={l.xp} />}
          </li>
        ))}
      </ul>

      {/* Next Lesson Interactive Footer CTA */}
      <div className="mt-auto flex items-center justify-between rounded-2xl bg-zinc-900 px-4.5 py-4 shadow-sm border border-zinc-800 group cursor-pointer transition-colors hover:bg-zinc-850">
        <div className="flex flex-col">
          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Up Next</span>
          <span className="text-[13px] font-extrabold text-white tracking-tight">Continue: Custom Hook Patterns</span>
        </div>
        <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-zinc-800 text-white border border-zinc-700/50 group-hover:translate-x-0.5 transition-transform">
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
    <div className="flex h-full flex-col gap-6 rounded-[32px] bg-white p-7 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.05)] border border-zinc-100 relative overflow-hidden">
      {/* Decorative Top Highlight Line */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-purple-400 to-purple-600 opacity-80" />

      {/* Question Header Area */}
      <div className="rounded-2xl bg-zinc-50/80 p-4.5 border border-zinc-100/80">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 text-[10px] font-bold text-white flex items-center justify-center border border-white shadow-sm">
            JK
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-extrabold text-zinc-800 leading-none">jkimani</span>
            <span className="text-[10px] font-semibold text-zinc-400 tracking-tight mt-0.5">Frontend Guild</span>
          </div>
        </div>
        <p className="text-[13px] font-bold text-zinc-800 leading-relaxed tracking-tight">
          Why does <code className="rounded-md bg-zinc-200/60 border border-zinc-200 px-1.5 py-0.5 font-mono text-[11px] text-zinc-900">useEffect</code> run twice in React 18 strict mode? Is my API call broken?
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-lg bg-zinc-200/50 border border-zinc-200/40 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-zinc-500">React</span>
          <span className="rounded-lg bg-zinc-200/50 border border-zinc-200/40 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-zinc-500">Hooks</span>
        </div>
      </div>

      {/* High-Fidelity Accepted Answer Block */}
      <div className="relative rounded-2xl border border-emerald-100 bg-emerald-50/30 p-5 shadow-xs">
        <div className="absolute -top-3 left-5">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-sm border border-emerald-400">
            <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Accepted
          </span>
        </div>
        
        <div className="mt-1 flex items-center gap-3 mb-3">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-[10px] font-bold text-white flex items-center justify-center border border-white shadow-sm">
            AR
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-extrabold text-zinc-800 leading-none">aravind_r</span>
            <span className="text-[10px] font-medium text-zinc-400 mt-0.5">Contributor</span>
          </div>
          <span className="ml-auto text-[10px] font-bold text-purple-600 bg-purple-50 border border-purple-100 rounded-full px-2.5 py-0.5 shadow-xs">
            Rep 2,340
          </span>
        </div>

        <p className="text-[12.5px] leading-relaxed font-medium text-zinc-600 tracking-tight">
          This is intentional in React 18. Strict Mode mounts → unmounts → remounts components to surface side effects. Use a cleanup function to cancel your fetch.
        </p>

        {/* Clean Code Editor Canvas */}
        <div className="mt-4 rounded-xl bg-zinc-900 p-4 border border-zinc-800 font-mono text-[11.5px] text-zinc-300 shadow-inner relative">
          <div className="absolute right-3.5 top-3.5 flex gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
            <div className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
            <div className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
          </div>
          <span className="text-zinc-500 font-bold">useEffect</span>(<span className="text-blue-400">() =&gt;</span> <span className="text-zinc-200">{`{`}</span><br />
          &nbsp;&nbsp;<span className="text-zinc-500 italic">{'// cleanup cancels fetch'}</span><br />
          &nbsp;&nbsp;<span className="text-purple-400 font-semibold">return</span> <span className="text-blue-400">() =&gt;</span> controller.<span className="text-emerald-400">abort</span>();<br />
          <span className="text-zinc-200">{`}`}</span>, []);
        </div>
      </div>

      {/* Rewards Standardized Interface Row */}
      <div className="mt-auto flex items-center justify-between rounded-2xl bg-zinc-50 px-4.5 py-3.5 border border-zinc-100">
        <span className="text-[11.5px] font-bold text-zinc-500 tracking-tight">Answer accepted — rewards issued</span>
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
    { 
      label: "XP", 
      value: "14,820", 
      sub: "Lifetime progress", 
      color: "#3B82F6", 
      bar: 74, 
      svgPath: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" 
    },
    { 
      label: "Reputation", 
      value: "2,340", 
      sub: "Community trust", 
      color: "#8B5CF6", 
      bar: 58, 
      svgPath: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" 
    },
    { 
      label: "Skill Coins", 
      value: "183 SC", 
      sub: "Withdrawable value", 
      color: "#C19562", 
      bar: 42, 
      svgPath: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
    },
  ];

  const recentActivity = [
    { event: "Answer accepted", reward: "+15 Rep  +1 SC", time: "2m ago" },
    { event: "Lesson completed", reward: "+120 XP", time: "1h ago" },
    { event: "Mentor session", reward: "+30 Rep  +8 SC", time: "3h ago" },
  ];

  return (
    <div className="flex h-full flex-col gap-6 rounded-[32px] bg-white p-7 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.05)] border border-zinc-100 relative overflow-hidden">
      {/* Decorative Top Highlight Line */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-amber-400 to-amber-600 opacity-80" />

      {/* Account Info Profile Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 block mb-1">Your Economy</span>
          <h4 className="text-lg font-black text-zinc-900 tracking-tight" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            aravind_r
          </h4>
        </div>
        <span className="rounded-full bg-purple-50 border border-purple-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-purple-700 shadow-xs">
          Contributor Tier
        </span>
      </div>

      {/* Multi-Currency Ledger Breakdown */}
      <div className="flex flex-col gap-4 bg-zinc-50/50 border border-zinc-100 rounded-2xl p-4.5">
        {currencies.map((c) => (
          <div key={c.label} className="js-currency-row">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white border border-zinc-200/60 text-zinc-500 shadow-xs">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={c.svgPath} />
                  </svg>
                </div>
                <span className="text-[12px] font-black text-zinc-800 tracking-tight">{c.label}</span>
                <span className="text-[10px] font-medium text-zinc-400">{c.sub}</span>
              </div>
              <span className="text-[13px] font-black text-zinc-900 bg-white border border-zinc-100 px-2 py-0.5 rounded-md shadow-xs">
                {c.value}
              </span>
            </div>
            <ProgressBar value={c.bar} color={c.color} />
          </div>
        ))}
      </div>

      {/* Ledger Activity Stream */}
      <div>
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-2.5">Recent Activity</span>
        <ul className="flex flex-col gap-2">
          {recentActivity.map((a, i) => (
            <li key={i} className="flex items-center justify-between rounded-xl bg-white border border-zinc-100 px-3.5 py-2.5 shadow-xs transition-colors hover:bg-zinc-50/40">
              <span className="text-[12px] font-bold text-zinc-700 tracking-tight">{a.event}</span>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50/50 px-2 py-0.5 rounded-md border border-emerald-100/40">
                  {a.reward}
                </span>
                <span className="text-[10px] font-semibold text-zinc-400 w-12 text-right">{a.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Premium Multi-Channel Payment Integration Segment */}
      <div className="mt-auto flex flex-col gap-3 rounded-2xl border border-amber-200/70 bg-amber-50/40 p-4.5 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-amber-500 text-white shadow-xs">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-[12px] font-bold text-amber-900 tracking-tight leading-tight">
            183 SC ready to withdraw via GCash, Maya, or Stripe
          </span>
        </div>

        {/* Dynamic Vector Core Gateways */}
        <div className="flex flex-wrap items-center gap-3 pt-2.5 border-t border-amber-200/40">
          <span className="text-[9px] font-black uppercase tracking-wider text-amber-800/60 block mr-1">Withdraw via:</span>
          <div className="flex items-center gap-2">
            {/* GCash Crisp Vector */}
            <div className="h-5 w-14 rounded bg-[#005BF6] flex items-center justify-center px-1 text-[8px] font-black text-white tracking-tighter uppercase shadow-xs">
              GCASH
            </div>
            {/* Maya Crisp Vector */}
            <div className="h-5 w-14 rounded bg-[#00E676] flex items-center justify-center px-1 text-[8px] font-black text-black tracking-tighter uppercase shadow-xs">
              MAYA
            </div>
            {/* Stripe Crisp Vector */}
            <div className="h-5 w-14 rounded bg-[#635BFF] flex items-center justify-center px-1 text-[8px] font-black text-white tracking-widest uppercase shadow-xs">
              STRIPE
            </div>
          </div>
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
      // 1. Synchronized Header ScrollTrigger Intro Entrance
      gsap.from(".js-header-el", {
        scrollTrigger: {
          trigger: ".js-header-trigger",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 35,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      // 2. Bento Block Sequence Iteration Triggering
      const dynamicRows = gsap.utils.toArray<HTMLElement>(".js-act-row");
      dynamicRows.forEach((row) => {
        const structuralText = row.querySelectorAll(".js-act-text-el");
        const interfaceCard = row.querySelector(".js-act-card-el");
        const automatedBars = row.querySelectorAll<HTMLElement>(".js-progress-bar");

        const structuralTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        // Sliding and fading side copy descriptors
        structuralTimeline.from(structuralText, {
          opacity: 0,
          y: 25,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        });

        // Dashboard presentation engine card float reveals
        structuralTimeline.from(interfaceCard, {
          opacity: 0,
          y: 45,
          scale: 0.98,
          duration: 0.8,
          ease: "power3.out",
        }, "-=0.4");

        // Targeted micro metrics internal progress width scaling activation
        if (automatedBars.length > 0) {
          structuralTimeline.to(automatedBars, {
            width: (i, el) => el.getAttribute("data-target") || "0%",
            duration: 1.4,
            ease: "power4.out",
            stagger: 0.15,
          }, "-=0.6");
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

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
            className="js-header-el text-4xl font-extrabold leading-[1.08] tracking-tight text-zinc-900 sm:text-5xl"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            From first lesson to first <span className="text-zinc-400">withdrawal.</span>
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
                  className="js-act-text-el text-3xl font-extrabold leading-[1.12] tracking-tight text-zinc-900 sm:text-4xl"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {act.headline}
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
              <div className="js-act-card-el relative w-full max-w-lg mx-auto lg:max-w-none">
                {/* Radial Multi-Angle Core Vector Aura Backlights */}
                <div
                  className="pointer-events-none absolute -inset-4 rounded-[40px] blur-[40px] opacity-[0.06]"
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

      {/* Continuity System Ambient Backdrop Design Mapping */}
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