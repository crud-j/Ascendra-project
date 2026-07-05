"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export function CtaSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.3 });

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <div className="relative" style={{ backgroundColor: "#000000" }}>
      <section
        className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-10 py-15 text-center"
        style={{ backgroundColor: "#041E37" }}
      >

        {/* ── Content ─────────────────────────────────────────────────── */}
        <div
          ref={contentRef}
          className="relative z-10 mx-auto flex max-w-4xl flex-col items-center"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C19562]" />
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Early Access
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Your climb starts
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #FCE8C0 0%, #C19562 40%, #A67C52 100%)",
              }}
            >
              with an invite.
            </span>
          </motion.h2>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-md text-[15px] leading-[1.75] text-white/40 sm:text-base"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Drop your email. We&apos;ll send your invite when your spot opens —
            no spam, no waitlist purgatory.
          </motion.p>

          {/* Email form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit}
            className="mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            {submitted ? (
              <div
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border text-[14px] font-semibold"
                style={{
                  borderColor: "rgba(193,149,98,0.30)",
                  backgroundColor: "rgba(193,149,98,0.08)",
                  color: "#C19562",
                  fontFamily: "var(--font-plus-jakarta)",
                }}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                You&apos;re on the list.
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  suppressHydrationWarning
                  className="h-12 flex-1 rounded-xl border border-white/12 bg-white/5 px-4 text-[14px] text-white outline-none transition-colors duration-200 placeholder:text-white/25 focus:border-white/25 focus:bg-white/8"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                />
                <button
                  type="submit"
                  suppressHydrationWarning
                  className="group relative h-12 overflow-hidden rounded-xl px-7 text-[14px] font-bold text-[#1A0E00] transition-all duration-300 hover:scale-[1.035] hover:shadow-[0_0_28px_-4px_rgba(193,149,98,0.55)] active:scale-[0.97] sm:shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #FCE8C0 0%, #C19562 50%, #A67C52 100%)",
                    fontFamily: "var(--font-plus-jakarta)",
                  }}
                >
                  <div className="absolute inset-0 flex justify-center transform-[skew(-12deg)_translateX(-100%)] group-hover:duration-500 group-hover:transform-[skew(-12deg)_translateX(100%)]">
                    <div className="relative h-full w-6 bg-white/20" />
                  </div>
                  <span className="relative z-10">Request invite</span>
                </button>
              </>
            )}
          </motion.form>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-4 text-[11px] tracking-wide text-white/28"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Free forever · No credit card · Unsubscribe anytime
          </motion.p>
        </div>

        {/* U-shaped dark vignette */}
{/* U-shaped dark vignette - High Contrast */}
<div className="pointer-events-none absolute bottom-0 left-[-50%] h-[55%] w-[85%] rounded-full bg-[#18181C]/75 blur-[90px]" />
<div className="pointer-events-none absolute bottom-0 right-[-50%] h-[55%] w-[85%] rounded-full bg-[#18181C]/75 blur-[90px]" />
<div className="pointer-events-none absolute bottom-[-20%] left-1/2 h-[55%] w-[180%] -translate-x-1/2 rounded-full bg-[#18181C]/65 blur-[100px]" />
<div className="pointer-events-none absolute bottom-[-10%] left-1/2 h-[35%] w-full -translate-x-1/2 rounded-full bg-[#18181C]/50 blur-[70px]" />



        {/* Black bottom gradient */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, #18181C 100%)",
          }}
        />
      </section>
    </div>
  );
}