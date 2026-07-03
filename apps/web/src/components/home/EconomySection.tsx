"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const currencies = [
  {
    symbol: "XP",
    name: "Experience Points",
    tagline: "How far along am I?",
    description:
      "XP only grows. Every lesson, every contribution, every milestone adds to your permanent score. It never resets.",
    textClass: "text-blue-500",
    borderClass: "border-blue-100",
    accentBar: "bg-blue-500",
    barClass: "from-blue-400 to-blue-600",
    barWidth: "68%",
    animTarget: 48920,
  },
  {
    symbol: "REP",
    name: "Reputation",
    tagline: "Should others trust me?",
    description:
      "Reputation is earned through contribution and can decrease through misconduct. A live signal of your ecosystem standing.",
    textClass: "text-violet-500",
    borderClass: "border-violet-100",
    accentBar: "bg-violet-500",
    barClass: "from-violet-400 to-violet-600",
    barWidth: "42%",
    animTarget: 3240,
  },
  {
    symbol: "SC",
    name: "Skill Coins",
    tagline: "What value have I created?",
    description:
      "Skill Coins are real transferable value. Earn them from bounties, spend in the marketplace, or withdraw. Backed by contribution.",
    textClass: "text-amber-500",
    borderClass: "border-amber-100",
    accentBar: "bg-amber-500",
    barClass: "from-amber-400 to-amber-500",
    barWidth: "55%",
    animTarget: 1875,
  },
];

export function EconomySection() {
  const economyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const econSection = economyRef.current;

      const econIntro = econSection?.querySelectorAll<HTMLElement>(".js-econ-intro");
      if (econIntro?.length) {
        gsap.set(econIntro, { opacity: 0, x: -32, filter: "blur(8px)" });
        gsap.to(econIntro, {
          scrollTrigger: { trigger: econSection, start: "top 78%", once: true },
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.13,
          ease: "power3.out",
          clearProps: "filter,transform",
        });
      }

      const econCols = econSection?.querySelectorAll<HTMLElement>(".js-econ-col");
      if (econCols?.length) {
        gsap.set(econCols, { opacity: 0, y: 48, filter: "blur(10px)" });
        gsap.to(econCols, {
          scrollTrigger: { trigger: econSection, start: "top 74%", once: true },
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.0,
          stagger: 0.15,
          ease: "power3.out",
          clearProps: "filter,transform",
        });
      }

      const econDetail = econSection?.querySelectorAll<HTMLElement>(".js-econ-detail");
      if (econDetail?.length) {
        gsap.set(econDetail, { opacity: 0, y: 24 });
        gsap.to(econDetail, {
          scrollTrigger: { trigger: econSection, start: "top 60%", once: true },
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: "power2.out",
        });
      }

      const counterEls = econSection?.querySelectorAll<HTMLElement>(".js-counter");
      counterEls?.forEach((el, i) => {
        const target = currencies[i]?.animTarget ?? 0;
        const obj = { val: 0 };
        gsap.to(obj, {
          scrollTrigger: { trigger: econSection, start: "top 70%", once: true },
          val: target,
          duration: 2.2,
          delay: i * 0.2,
          ease: "power2.out",
          onUpdate() {
            el.textContent = Math.round(obj.val).toLocaleString();
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={economyRef} className="relative bg-white px-6 py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Two-column intro */}
        <div className="mb-16 grid items-start gap-12 lg:grid-cols-[1fr_1.8fr]">
          <div>
            <div className="js-econ-intro mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-[#C19562]" />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#C19562]"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                The Economy
              </span>
            </div>
            <h2
              className="js-econ-intro text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-5xl"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Three currencies.
              <br />
              <span className="text-gray-400">One ecosystem.</span>
            </h2>
            <p
              className="js-econ-intro mt-6 text-[15px] leading-[1.78] text-gray-500"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Unlike badges or streaks, Ascendra&apos;s three-currency model
              creates real incentives. Each currency measures something
              distinct and serves a different purpose.
            </p>
          </div>

          {/* Currency cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {currencies.map((c) => (
              <div
                key={c.symbol}
                className={cn(
                  "js-econ-col relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-gray-200/80",
                  c.borderClass
                )}
              >
                <div className={cn("absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl", c.accentBar)} />
                <span
                  className={cn("mt-1 block text-[10px] font-bold uppercase tracking-[0.24em]", c.textClass)}
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  {c.symbol}
                </span>
                <div
                  className={cn("mt-2 text-3xl font-extrabold tracking-tight", c.textClass)}
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  <span className="js-counter">0</span>
                </div>
                <div className="mt-0.5 text-[11px] text-gray-400" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  {c.name}
                </div>
                <div className="my-4 h-px bg-gray-100" />
                <p className="text-[11px] leading-relaxed text-gray-500" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  {c.tagline}
                </p>
                <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={cn("h-full rounded-full bg-gradient-to-r", c.barClass)}
                    style={{ width: c.barWidth }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Currency detail row */}
        <div className="grid gap-8 border-t border-gray-200 pt-12 sm:grid-cols-3">
          {currencies.map((c) => (
            <div key={c.name} className="js-econ-detail">
              <p className={cn("mb-2.5 text-sm font-semibold", c.textClass)} style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                {c.name}
              </p>
              <p className="text-[13.5px] leading-[1.78] text-gray-500" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                {c.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
