"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const NAV_ITEMS = [
  { label: "Home",         href: "/",            icon: "M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75v-4.5h-4.5V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z",       desc: "Back to landing" },
  { label: "Why Ascendra", href: "/#why-ascendra",icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z", desc: "The platform story" },
  { label: "Courses",      href: "/#courses",     icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25", desc: "Learn any track" },
  { label: "Economy",      href: "/#economy",     icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z", desc: "XP · Rep · Coins" },
  { label: "Mentors",      href: "/#mentor",      icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z", desc: "Teach & earn" },
  { label: "AI Coach",     href: "/#ai-coach",    icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.309 48.309 0 01-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5", desc: "Adaptive roadmaps" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">

      {/* ── Trigger ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open navigation"
        suppressHydrationWarning
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#121214] text-white/50 transition-all duration-200 hover:border-white/20 hover:text-white"
      >
        <motion.div
          animate={open ? "open" : "closed"}
          className="flex flex-col items-center justify-center gap-[5px]"
        >
          <motion.span
            variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 7 } }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="block h-[1.5px] origin-center rounded-full bg-current"
            style={{ width: 14 }}
          />
          <motion.span
            variants={{ closed: { opacity: 1, x: 0 }, open: { opacity: 0, x: -4 } }}
            transition={{ duration: 0.2 }}
            className="block h-[1.5px] rounded-full bg-current"
            style={{ width: 10 }}
          />
          <motion.span
            variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -7 } }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="block h-[1.5px] origin-center rounded-full bg-current"
            style={{ width: 14 }}
          />
        </motion.div>
      </button>

      {/* ── Dropdown panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,   scale: 1 }}
            exit={{    opacity: 0, y: -10,  scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-12 z-50 w-72"
          >
            {/* Outer GlowingEffect wrapper — matches MentorSection card pattern */}
            <div className="relative rounded-2xl border border-white/[0.07] p-2 md:rounded-3xl md:p-3">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={1}
              />

              {/* Inner solid card — same as MentorSection */}
              <div className="relative flex flex-col overflow-hidden rounded-xl border border-white/[0.05] bg-[#121214] shadow-[0px_0px_27px_0px_#0d0d0d]">

                {/* Header label */}
                <div className="border-b border-white/[0.05] px-4 py-3">
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/25">
                    Navigate
                  </p>
                </div>

                {/* Nav items grid — 2 columns */}
                <div className="grid grid-cols-2 gap-px bg-white/[0.04] p-px">
                  {NAV_ITEMS.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18, delay: i * 0.035, ease: [0.16, 1, 0.3, 1] }}
                      className="bg-[#121214]"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="group flex flex-col gap-2.5 p-3.5 transition-colors duration-150 hover:bg-white/[0.04]"
                      >
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03] text-white/35 transition-colors group-hover:border-white/[0.12] group-hover:text-white/60">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                            <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                          </svg>
                        </span>
                        <div>
                          <p className="text-[12px] font-semibold leading-none text-white/70 transition-colors group-hover:text-white">
                            {item.label}
                          </p>
                          <p className="mt-1 text-[10px] leading-none text-white/25 transition-colors group-hover:text-white/40">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Footer CTA */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: NAV_ITEMS.length * 0.035 + 0.05 }}
                  className="border-t border-white/[0.05] p-3"
                >
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 transition-all duration-150 hover:border-white/[0.12] hover:bg-white/[0.06]"
                  >
                    <div>
                      <p className="text-[12px] font-semibold text-white/70 group-hover:text-white">
                        Create free account
                      </p>
                      <p className="mt-0.5 text-[10px] text-white/25">
                        Start as a Learner · No card needed
                      </p>
                    </div>
                    <svg className="h-4 w-4 shrink-0 text-white/25 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </motion.div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
