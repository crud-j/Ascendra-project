"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const content = contentRef.current;

      if (content) {
        const kids = Array.from(content.children as HTMLCollectionOf<HTMLElement>);
        gsap.fromTo(
          kids,
          { opacity: 0, y: 30, filter: "blur(8px)", scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            clearProps: "filter,transform",
            scrollTrigger: { trigger: section, start: "top 85%", once: true },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[65vh] flex-col items-center justify-center overflow-hidden px-6 py-32 text-center"
      style={{ backgroundColor: "#041E37" }}
    >
      {/* Left arm */}
      <div className="pointer-events-none absolute bottom-0 left-[-30%] h-[55%] w-[65%] rounded-full bg-white/35 blur-[100px]" />

      {/* Right arm */}
      <div className="pointer-events-none absolute bottom-0 right-[-30%] h-[55%] w-[65%] rounded-full bg-white/35 blur-[100px]" />

      {/* Wide base ellipse — connects the arms and floods the bottom */}
      <div className="pointer-events-none absolute bottom-[-20%] left-1/2 h-[55%] w-[180%] -translate-x-1/2 rounded-full bg-white/45 blur-[110px]" />

      {/* Inner brighten — center bottom punch */}
      <div className="pointer-events-none absolute bottom-[-10%] left-1/2 h-[35%] w-[100%] -translate-x-1/2 rounded-full bg-white/30 blur-[80px]" />

      {/* Floor fade — seamless merge into white footer */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
        style={{ background: "linear-gradient(to bottom, transparent 0%, white 100%)" }}
      />


      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center"
      >
        {/* Headline */}
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[4.25rem] lg:leading-[1.05]">
          Your first lesson is<br className="hidden sm:block" />{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #FCE8C0 0%, #C19562 40%, #A67C52 100%)" }}
          >
            waiting for you.
          </span>
        </h2>

        {/* Sub-copy */}
        <p className="mt-7 max-w-2xl text-[17px] font-light tracking-wide text-white/60 sm:text-lg">
          Join 12,400+ learners. Start free — no credit card, no commitments. Build real skills from day one.
        </p>

        {/* CTA Button */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/signup"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-9 py-4 text-[15px] font-bold transition-all duration-300 hover:scale-105 hover:bg-white/95 hover:shadow-[0_0_40px_rgba(255,255,255,0.35)] active:scale-95"
            style={{ color: "#041E37" }}
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative z-10">Create free account</span>
          </Link>
        </div>

        {/* Trust line */}
        <p className="mt-6 text-[12px] text-black/70 tracking-wide">
          Free forever · No credit card · Cancel anytime
        </p>
      </div>
    </section>
  );
}