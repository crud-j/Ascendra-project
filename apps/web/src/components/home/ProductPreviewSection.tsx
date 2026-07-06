"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export function ProductPreviewSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-white py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-zinc-200" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-14 text-center"
        >
          <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-3">
            <div className="h-px w-8 bg-[#C19562]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C19562]" style={{ fontFamily: "var(--font-sora)" }}>
              Product Preview
            </span>
            <div className="h-px w-8 bg-[#C19562]" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl font-extrabold leading-[1.08] tracking-tight text-zinc-900 sm:text-5xl"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            A real product.{" "}
            <span className="text-zinc-400">Not just a concept.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-lg text-base leading-[1.75] text-zinc-500"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Every part of Ascendra is being built right now. Explore the interface and see what you&apos;ll have access to on day one.
          </motion.p>
        </motion.div>

        {/* Browser Chrome & Screenshot Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative z-10 mx-auto max-w-5xl overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-[0_20px_64px_-12px_rgba(0,0,0,0.15)] ring-1 ring-black/5"
        >
          {/* Browser Top Bar */}
          <div className="flex items-center gap-3 border-b border-zinc-200 bg-white/80 px-5 py-3.5 backdrop-blur-md">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-zinc-200" />
              <div className="h-3 w-3 rounded-full bg-zinc-200" />
              <div className="h-3 w-3 rounded-full bg-zinc-200" />
            </div>
            <div className="mx-auto flex w-full max-w-sm items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50/50 px-3 py-1.5 text-[11px] text-zinc-400">
              <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              app.ascendra.io/projects
            </div>
          </div>

          {/* Screenshot Area / Empty State Placeholder */}
          <div className="relative aspect-[16/10] w-full bg-zinc-100 sm:aspect-[16/9]">

            {/* Improvised UI: Glassmorphism Empty State Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[4px]">
              <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-200/50 bg-white/70 p-8 text-center shadow-xl backdrop-blur-xl sm:p-12">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#C19562]/10">
                  <svg className="h-6 w-6 text-[#C19562]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-zinc-900" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  Project Panel
                </h3>
                <p className="mt-2 max-w-xs text-sm text-zinc-500">
                  This section is currently being built. Check back soon for the full interactive experience.
                </p>
                <div className="mt-6 flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
                    In Development
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-6 text-center text-[12px] text-zinc-400"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          Screenshot preview • Full application launching soon
        </motion.p>
      </div>

      {/* Background Art Layer (Kept exact from original) */}
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
              className="absolute bottom-4 left-4 h-24 w-24 rounded-bl-[32px] border-b border-l blur-[0.5px] [mask-image:linear-gradient(to_top,transparent_15%,black_100%)]"
              style={{ borderColor: "rgba(127, 189, 218, 0.3)" }}
            />
            <div
              className="absolute bottom-4 right-4 h-24 w-24 rounded-br-[32px] border-b border-r blur-[0.5px] [mask-image:linear-gradient(to_top,transparent_15%,black_100%)]"
              style={{ borderColor: "rgba(127, 189, 218, 0.3)" }}
            />
            <div
              className="js-aurora-blob absolute left-[-15%] bottom-[-5%] h-[65%] w-[65%] rounded-full opacity-[0.18] blur-[140px] will-change-transform"
              style={{ background: "linear-gradient(45deg, #BAE6FD 0%, #0EA5E9 60%, transparent 100%)" }}
            />
            <div
              className="js-aurora-blob absolute right-[-15%] bottom-[-5%] h-[65%] w-[65%] rounded-full opacity-[0.18] blur-[140px] will-change-transform"
              style={{ background: "linear-gradient(-45deg, #BAE6FD 0%, #0EA5E9 60%, transparent 100%)" }}
            />
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[75%] w-[85%] rounded-t-[40px] border-b-0 border-t-32 border-x-32 blur-[50px] opacity-70"
              style={{ borderColor: "#7FBDDA" }}
            />
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[45%] w-[75%] rounded-t-[24px] blur-[70px]"
              style={{ backgroundColor: "rgba(127, 189, 218, 0.3)" }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-44"
              style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(127, 189, 218, 0.4) 25%, rgba(127, 189, 218, 0.8) 65%, #7FBDDA 100%)" }}
            />
          </div>
          <div className="relative z-10 h-full w-full"></div>
        </div>
      </div>
    </section>
  );
}