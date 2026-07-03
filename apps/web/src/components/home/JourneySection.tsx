"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const journeySteps = [
  {
    step: "1",
    title: "Join free",
    body: "Create your account. No credit card. No commitments. Your learning journey begins on lesson one.",
  },
  {
    step: "2",
    title: "Pick a track",
    body: "Choose from Data Science, Web Dev, AI, or CS. Follow a structured path or explore freely.",
  },
  {
    step: "3",
    title: "Earn as you grow",
    body: "Complete lessons for XP, answer questions for Reputation, solve bounties for Skill Coins.",
  },
  {
    step: "4",
    title: "Reach mastery",
    body: "Climb six reputation tiers from Learner to Master. Each tier unlocks new opportunities and privileges.",
  },
];

const tiers = [
  { tier: "Learner", cls: "bg-slate-100 text-slate-500 border-slate-200" },
  { tier: "Contributor", cls: "bg-blue-50 text-blue-600 border-blue-100" },
  { tier: "Trusted", cls: "bg-green-50 text-green-600 border-green-100" },
  { tier: "Mentor", cls: "bg-purple-50 text-purple-600 border-purple-100" },
  { tier: "Expert", cls: "bg-orange-50 text-orange-600 border-orange-100" },
  { tier: "Master", cls: "bg-amber-50 text-amber-600 border-amber-100" },
];

export function JourneySection() {
  const journeyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const journeySection = journeyRef.current;

      const journeyHeader = journeySection?.querySelectorAll<HTMLElement>(".js-journey-header");
      if (journeyHeader?.length) {
        gsap.set(journeyHeader, { opacity: 0, y: 28, filter: "blur(6px)" });
        gsap.to(journeyHeader, {
          scrollTrigger: { trigger: journeySection, start: "top 80%", once: true },
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "filter,transform",
        });
      }

      const journeyItems = journeySection?.querySelectorAll<HTMLElement>(".js-journey");
      if (journeyItems?.length) {
        gsap.set(journeyItems, { opacity: 0, y: 44, filter: "blur(8px)" });
        gsap.to(journeyItems, {
          scrollTrigger: { trigger: journeySection, start: "top 74%", once: true },
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "filter,transform",
        });
      }

      const tierChips = journeySection?.querySelectorAll<HTMLElement>(".js-tier");
      if (tierChips?.length) {
        gsap.set(tierChips, { opacity: 0, scale: 0.85, filter: "blur(4px)" });
        gsap.to(tierChips, {
          scrollTrigger: { trigger: tierChips[0], start: "top 90%", once: true },
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.55,
          stagger: 0.07,
          ease: "back.out(1.4)",
          clearProps: "filter,transform",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={journeyRef} data-section="journey" className="relative bg-white px-6 py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="mx-auto max-w-7xl">
        {/* Centered header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="js-journey-header mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-[#C19562]" />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#A67C52]"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Your Journey
            </span>
            <div className="h-px w-8 bg-[#C19562]" />
          </div>
          <h2
            className="js-journey-header max-w-xl text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-5xl"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            From zero to master,
            <br />
            <span className="text-gray-400">on your terms.</span>
          </h2>
          <p
            className="js-journey-header mt-6 max-w-md text-[15px] leading-[1.75] text-gray-500"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Ascendra&apos;s progression system has six reputation tiers. Each
            unlocks new privileges, higher-value bounties, and deeper
            community trust.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {journeySteps.map((step, i) => (
            <div key={step.step} className="js-journey relative">
              {i < journeySteps.length - 1 && (
                <div
                  className="absolute top-[2.2rem] left-[calc(100%+0.75rem)] hidden h-px w-[calc(100%-1.5rem)] lg:block"
                  style={{ background: "linear-gradient(90deg, rgba(193,149,98,0.5), transparent)" }}
                />
              )}
              <div className="h-full rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gray-200 hover:shadow-md">
                <div
                  className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FCE8C0] to-[#C19562] text-sm font-extrabold text-[#1A0A00] shadow-sm"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {step.step}
                </div>
                <h3 className="text-[15px] font-bold tracking-tight text-gray-900" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  {step.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.75] text-gray-500" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tier chips */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-2.5">
          {tiers.map((t) => (
            <div
              key={t.tier}
              className={cn("js-tier rounded-full border px-4 py-1.5 text-[11px] font-bold", t.cls)}
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              {t.tier}
            </div>
          ))}
          <div
            className="js-tier rounded-full border border-dashed border-gray-300 px-4 py-1.5 text-[11px] font-semibold text-gray-400"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            + Unlock more
          </div>
        </div>
      </div>
    </section>
  );
}
