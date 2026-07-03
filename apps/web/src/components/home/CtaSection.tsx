"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CtaSection() {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const ctaKids = ctaRef.current
        ? Array.from(ctaRef.current.children as HTMLCollectionOf<HTMLElement>)
        : [];
      if (ctaKids.length) {
        gsap.set(ctaKids, { opacity: 0, y: 44, filter: "blur(10px)" });
        gsap.to(ctaKids, {
          scrollTrigger: { trigger: ctaRef.current, start: "top 82%", once: true },
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.0,
          stagger: 0.13,
          ease: "power3.out",
          clearProps: "filter,transform",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden bg-white px-6 py-36 text-center">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Warm radial accent */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(circle, rgba(193,149,98,0.07) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <div ref={ctaRef} className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
        {/* Eyebrow */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 shadow-sm">
          <div className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </div>
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-500"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Join 12,400+ learners
          </span>
        </div>

        <h2
          className="text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-5xl lg:text-[3.5rem]"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          Your first lesson is
          <br />
          <span className="bg-gradient-to-r from-[#FCE8C0] via-[#C19562] to-[#A67C52] bg-clip-text text-transparent">
            waiting for you.
          </span>
        </h2>

        <p
          className="mt-6 max-w-md text-[15px] leading-[1.75] text-gray-500"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          Start for free. No credit card. Build something real on day one.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/signup"
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-[#FCE8C0] via-[#C19562] to-[#A67C52] px-9 text-sm font-bold text-[#1A0E00] shadow-lg transition-all duration-300 hover:scale-[1.035] hover:shadow-[0_8px_32px_-6px_rgba(193,149,98,0.6)] active:scale-[0.97]"
            style={{ height: "3.25rem", fontFamily: "var(--font-plus-jakarta)" }}
          >
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-700 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-white/20" />
            </div>
            <span className="relative z-10">Create free account</span>
            <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-8 text-sm font-semibold text-gray-600 shadow-sm transition-all duration-300 hover:border-gray-300 hover:text-gray-900 hover:shadow-md"
            style={{ height: "3.25rem", fontFamily: "var(--font-plus-jakarta)" }}
          >
            Learn more
            <svg className="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
