"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GLSLHills } from "@/components/ui/glsl-hills";
import { AscendraNavbar } from "@/components/ui/navbar";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { display: "12,400+", label: "Learners climbing" },
  { display: "280", label: "Courses across tracks" },
  { display: "540", label: "Mentors earning" },
];

export function HeroSection() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroChildren = heroContentRef.current
        ? Array.from(heroContentRef.current.children)
        : [];

      gsap.set(heroChildren, { opacity: 0, y: 40, filter: "blur(8px)" });
      gsap.to(heroChildren, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.1,
        stagger: 0.14,
        ease: "power3.out",
        delay: 0.15,
        clearProps: "filter,transform",
      });

      gsap.to(heroContentRef.current, {
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "55% top",
          scrub: 1.5,
        },
        y: -70,
        opacity: 0,
        ease: "none",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroSectionRef}
      data-section="hero"
      className="relative h-screen w-full overflow-hidden bg-[#0A0A0B]"
    >
      <GLSLHills cameraZ={165} speed={0.4} planeSize={300} />
      <AscendraNavbar />

      <div
        ref={heroContentRef}
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
      >
        {/* Eyebrow */}
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.05] px-4 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C19562]" />
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Learn&nbsp;·&nbsp;Build&nbsp;·&nbsp;Contribute&nbsp;·&nbsp;Earn
          </span>
        </div>

        <h1
          className="max-w-3xl text-[2.5rem] font-extrabold leading-[1.1] tracking-[-0.025em] text-white sm:text-5xl lg:text-[3.75rem]"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          Climb from first lesson
          <br />
          <span className="text-white/75">to mastery</span>
          <span className="text-white/30">&nbsp;—&nbsp;</span>
          <span className="text-white/75">and earn</span>
          <br />
          <span className="bg-gradient-to-r from-[#FCE8C0] via-[#C19562] to-[#A67C52] bg-clip-text text-transparent">
            real value on the way up.
          </span>
        </h1>

        <p
          className="mt-7 max-w-xl text-base font-normal leading-[1.75] text-white/48 sm:text-lg"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          Ascendra is a learning ecosystem where you don&apos;t just complete
          courses. You build, help others, and your contributions earn Skill
          Coins you can actually withdraw.
        </p>

        <div className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/signup"
            className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#FCE8C0] via-[#C19562] to-[#A67C52] px-8 text-sm font-bold text-[#1A0E00] shadow-lg transition-all duration-300 hover:scale-[1.035] hover:shadow-[0_0_36px_-4px_rgba(193,149,98,0.65)] active:scale-[0.97]"
          >
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-700 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-white/20" />
            </div>
            <span className="relative z-10" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              Start climbing
            </span>
            <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          <Link
            href="/how-it-works"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.05] px-8 text-sm font-semibold text-white/75 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.22] hover:bg-white/[0.09] hover:text-white"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            See how it works
            <svg className="h-4 w-4 opacity-55" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-12">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-6 sm:gap-12">
              <div className="text-center">
                <p className="text-2xl font-bold tracking-tight text-white sm:text-[1.75rem]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  {stat.display}
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35" style={{ fontFamily: "var(--font-sora)" }}>
                  {stat.label}
                </p>
              </div>
              {i < stats.length - 1 && <div className="h-8 w-px bg-white/[0.10]" />}
            </div>
          ))}
        </div>
      </div>

      {/* Dark bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-[#0A0A0B] to-transparent" />
    </section>
  );
}
