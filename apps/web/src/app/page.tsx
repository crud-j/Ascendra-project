"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GLSLHills } from "@/components/ui/glsl-hills";
import { AscendraNavbar } from "@/components/ui/navbar";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "12,400+", label: "learners climbing" },
  { value: "280", label: "courses across tracks" },
  { value: "540", label: "mentors earning" },
];

export default function Home() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const content = heroContentRef.current;
      if (!content) return;

      const children = Array.from(content.children) as HTMLElement[];

      // Staggered entrance from below with blur-to-sharp feel
      gsap.from(children, {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.11,
        ease: "power3.out",
        delay: 0.2,
        clearProps: "transform",
      });

      // Scroll-driven hero exit — content floats up and fades
      gsap.to(content, {
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "55% top",
          scrub: 1.4,
        },
        y: -56,
        opacity: 0,
        ease: "none",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full">
      {/* ── Section 1: Hero ─────────────────────────────────────────────── */}
      <section
        ref={heroSectionRef}
        className="relative h-screen w-full overflow-hidden bg-[#111111]"
      >
        <GLSLHills cameraZ={165} speed={0.4} planeSize={300} />

        <AscendraNavbar />

        <div
          ref={heroContentRef}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          {/* Eyebrow */}
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-white/50 uppercase backdrop-blur-sm">
            Learn&nbsp;·&nbsp;Build&nbsp;·&nbsp;Contribute&nbsp;·&nbsp;Earn
          </p>

          {/* Headline */}
          <h1 className="max-w-2xl text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            Climb from first lesson
            <br />
            to mastery—and earn
            <br />
            <span className="bg-gradient-to-r from-[#FCE8C0] via-[#C19562] to-[#A67C52] bg-clip-text text-transparent">
              real value on the way up.
            </span>
          </h1>

          {/* Body */}
          <p className="mt-5 max-w-lg text-sm font-normal leading-relaxed text-white/55 sm:text-base">
            Ascendra is a learning ecosystem where you don&apos;t just complete courses. You build, you help others,
            and your contributions earn Skill Coins you can actually withdraw.
          </p>

          {/* CTAs */}
          <div className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#FCE8C0] via-[#C19562] to-[#A67C52] px-7 text-sm font-bold text-black shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_28px_-4px_rgba(193,149,98,0.55)] active:scale-[0.98]"
            >
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-700 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20" />
              </div>
              <span className="relative z-10">Start climbing</span>
              <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href="/how-it-works"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.05] px-7 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.09] hover:text-white"
            >
              See how it works
              <svg className="h-4 w-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-8 sm:gap-12">
                <div className="text-center">
                  <p className="text-xl font-bold tracking-tight text-white sm:text-2xl">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium text-white/45">{stat.label}</p>
                </div>
                {i < stats.length - 1 && (
                  <div className="h-8 w-px bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
