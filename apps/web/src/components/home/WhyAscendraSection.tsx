"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const traditionalSteps = [
  "Complete a course",
  "Receive a certificate",
  "Leave the platform",
  "Skills rarely get verified",
];

const ascendraSteps = [
  { label: "Learn", color: "#3B82F6", colorRGB: "59,130,246" },
  { label: "Build real projects", color: "#10B981", colorRGB: "16,185,129" },
  { label: "Contribute to community", color: "#8B5CF6", colorRGB: "139,92,246" },
  { label: "Earn Reputation", color: "#F59E0B", colorRGB: "245,158,11" },
  { label: "Become a Mentor", color: "#EC4899", colorRGB: "236,72,153" },
  { label: "Earn Skill Coins", color: "#C19562", colorRGB: "193,149,98" },
];

// Animation Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } },
};

// --- Custom SVGs for Stats & UI Elements ---

function CoinIcon() {
  return (
    <svg className="h-5 w-5 text-zinc-700 transition-colors duration-300 group-hover:text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6" />
      <circle cx="16" cy="16" r="6" />
      <path d="M12 2v20M2 12h20" className="opacity-20" />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg className="h-5 w-5 text-zinc-700 transition-colors duration-300 group-hover:text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}

function MentorIcon() {
  return (
    <svg className="h-5 w-5 text-zinc-700 transition-colors duration-300 group-hover:text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 14 14" fill="none" stroke="#EF4444" strokeWidth={2.2} strokeLinecap="round">
      <path d="M2 2l10 10M12 2L2 12" />
    </svg>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 14 14" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 7l3.5 3.5L12 3" />
    </svg>
  );
}

export function WhyAscendraSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-[#FAFAFA] py-24 sm:py-32 selection:bg-zinc-900 selection:text-white">
      {/* Background Polish Line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200/80 to-transparent" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-6 lg:grid-cols-12 auto-rows-[1fr]"
        >
          {/* ==========================================
              LEFT AREA (Spans 7 columns) 
              Contains Dark Hero Card + Two Bottom Cards
          =========================================== */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* 1. Large Dark Card: "Learn" & Intro */}
            <motion.div 
              variants={fadeUp} 
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative overflow-hidden rounded-[36px] bg-[#09090B] p-10 lg:p-14 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.3)] flex-grow flex flex-col justify-between min-h-[460px] border border-zinc-800/40"
            >
              {/* Complex fluid lighting simulations */}
              <div className="pointer-events-none absolute -right-40 -bottom-40 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-zinc-700/20 to-zinc-800/40 blur-[100px] transition-transform duration-1000 ease-out group-hover:scale-110" />
              <div className="pointer-events-none absolute left-1/3 top-[-10%] h-[350px] w-[350px] rounded-full bg-zinc-900/80 blur-[80px]" />

              <div className="relative z-10">
                <h2 
                  className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white uppercase sm:text-5xl lg:text-[56px] max-w-2xl" 
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  Learning that actually <br />
                  <span className="text-zinc-600 transition-colors duration-500 group-hover:text-zinc-500">goes somewhere.</span>
                </h2>
                <p 
                  className="mt-6 max-w-lg text-[15px] leading-relaxed text-zinc-400 font-medium tracking-wide"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  Most platforms stop when you finish a course. Ascendra turns every lesson, every project, and every peer interaction into a stake in a real economy.
                </p>
              </div>

              <div className="relative z-10 mt-12 flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-zinc-800/60">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#09090B] bg-[#C19562] text-[11px] font-bold text-white shadow-md transition-transform duration-300 hover:scale-105 hover:z-20 cursor-default">M1</div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#09090B] bg-zinc-700 text-[11px] font-bold text-white shadow-md transition-transform duration-300 hover:scale-105 hover:z-20 cursor-default">M2</div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#09090B] bg-zinc-800 text-[11px] font-bold text-zinc-400 shadow-md transition-transform duration-300 hover:scale-105 hover:z-20 cursor-default">5k+</div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500" style={{ fontFamily: "var(--font-sora)" }}>
                    Our Mentors
                  </span>
                </div>
                
                <motion.div 
                  whileHover={{ rotate: 45, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/50 text-white transition-all duration-300 hover:bg-white hover:text-black cursor-pointer shadow-lg"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </motion.div>
              </div>
            </motion.div>

            {/* Bottom Sub-Row: Traditional vs Earn */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-auto">
              
              {/* 2. Cyan Striped Card: Traditional Learning */}
              <motion.div 
                variants={fadeUp} 
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#D9F6FA] to-[#BCEEF5] p-8 flex flex-col justify-between border border-cyan-200/40 shadow-sm"
              >
                {/* Horizontal premium structural graphics overlay */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay transition-opacity duration-500 group-hover:opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 6px, #000 6px, #000 12px)' }} />
                
                <div className="relative z-10 flex items-center justify-between">
                  <span className="rounded-full bg-white/80 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-cyan-950 shadow-sm border border-white/40">Traditional Platform</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="text-cyan-900"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                  </div>
                </div>

                <div className="relative z-10 mt-8">
                  <p className="text-[13.5px] font-semibold leading-relaxed text-cyan-950 mb-5" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                    You finish. You get a PDF. But your skills stay locked in the platform — unverifiable and unseen.
                  </p>
                  <ul className="flex flex-col gap-3">
                    {traditionalSteps.slice(0, 3).map((step) => (
                      <li key={step} className="flex items-center gap-2.5 text-xs font-bold text-cyan-900/80">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/60 shadow-sm"><XIcon /></div>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* 3. Purple Card: Earn Feature */}
              <motion.div 
                variants={fadeUp} 
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#ECE3FF] to-[#DCCEFF] p-8 flex flex-col justify-between border border-purple-200/40 shadow-sm"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/20 blur-2xl transition-transform duration-700 group-hover:scale-125" />
                
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/80 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-purple-950 shadow-sm border border-white/40">New Release</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="text-purple-900"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="text-[26px] font-extrabold leading-[1.2] tracking-tight text-purple-950" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                    Get ready to <br /> take on a new <br /> workload.
                  </h3>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ==========================================
              MIDDLE AREA (Spans 3 columns)
              Contains Tag/Build Card + Flywheel/Process Card
          =========================================== */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* 4. Soft Blue Tags Card: Build / Features */}
            <motion.div 
              variants={fadeUp} 
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="relative flex flex-col rounded-[36px] bg-[#EEF2F9] p-8 h-auto sm:min-h-[290px] border border-zinc-200/60 shadow-sm overflow-hidden"
            >
              <div className="flex items-start justify-between w-full mb-6 relative z-10">
                <span className="rounded-full bg-zinc-950 px-4 py-1.5 text-xs font-bold text-white shadow-sm">Our Service</span>
                <span className="text-xs font-bold text-zinc-400 tracking-wider" style={{ fontFamily: "var(--font-sora)" }}>2025-26</span>
              </div>
              
              <div className="relative mt-auto flex h-full flex-wrap content-center justify-center gap-2">
                {ascendraSteps.map((step) => (
                  <motion.div 
                    key={step.label} 
                    whileHover={{ scale: 1.04, y: -2 }}
                    className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-2 text-[11px] font-bold text-zinc-800 shadow-[0_3px_12px_-4px_rgba(0,0,0,0.04)] cursor-default transition-all duration-200 hover:border-zinc-300"
                  >
                    <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `rgba(${step.colorRGB}, 0.12)` }}>
                      <CheckIcon color={step.color} />
                    </div>
                    {step.label}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 5. Process/Flywheel Card (Inner White Card Style) */}
            <motion.div 
              variants={fadeUp} 
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="flex-grow rounded-[36px] bg-gradient-to-b from-[#E1ECFF] to-[#F1F6FF] p-3.5 flex flex-col min-h-[340px] border border-blue-100 shadow-sm"
            >
              <div className="flex h-full flex-col justify-between rounded-[26px] bg-white p-6 shadow-sm border border-zinc-100/80">
                <span className="self-start rounded-full border border-zinc-200 bg-zinc-50/50 px-4 py-1.5 text-xs font-bold text-zinc-600">
                  Work process
                </span>
                
                <div className="mt-12 group/process">
                  <div className="relative mb-5 h-9 w-9 overflow-hidden rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 p-0.5 shadow-md shadow-blue-500/10">
                    <div className="h-full w-full rounded-[10px] bg-white opacity-20 animate-pulse" />
                  </div>
                  <h4 className="text-[18px] font-extrabold leading-snug text-zinc-900 mb-2.5" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                    We help our client's to shine in a digital way
                  </h4>
                  <p className="text-[12.5px] leading-relaxed text-zinc-500 font-medium">
                    This will provide you with an in-depth investigation based on transparent criteria.
                  </p>
                  
                  <div className="mt-5 flex justify-end">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-50 border border-zinc-200 text-zinc-400 transition-colors duration-300 group-hover/process:bg-zinc-950 group-hover/process:text-white">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ==========================================
              RIGHT AREA (Spans 2 columns)
              Contains Stats Column + Beige Differentiator
          =========================================== */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* 6. Vertical Stats Card */}
            <motion.div 
              variants={fadeUp} 
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="flex-grow flex flex-col justify-between rounded-[36px] bg-[#F3F4F7] p-8 min-h-[480px] border border-zinc-200/60 shadow-sm"
            >
              <div className="flex flex-col gap-9 h-full justify-center">
                {[
                  { value: "125+", label: "Successful Projects", sub: "Verified validation", renderIcon: () => <CoinIcon /> },
                  { value: "12+", label: "Years Experience", sub: "Reputation layers", renderIcon: () => <BadgeIcon /> },
                  { value: "30+", label: "Strong Partners", sub: "Active validation", renderIcon: () => <MentorIcon /> },
                  { value: "98%", label: "Positive Users", sub: "Global retention", renderIcon: () => (
                    <svg className="h-5 w-5 text-zinc-700 transition-colors duration-300 group-hover:text-pink-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  ) },
                ].map((stat) => (
                  <div key={stat.label} className="group relative">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <h4 className="text-2xl font-black text-zinc-950 tracking-tight sm:text-3xl" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                        {stat.value}
                      </h4>
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-zinc-100 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:bg-zinc-50">
                        {stat.renderIcon()}
                      </div>
                    </div>
                    <p className="text-[12px] font-bold text-zinc-800">{stat.label}</p>
                    <p className="text-[10px] font-medium text-zinc-400 mt-0.5">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 7. Bottom Small Beige Card */}
            <motion.div 
              variants={fadeUp} 
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative flex h-[160px] cursor-pointer flex-col justify-between rounded-[36px] bg-gradient-to-br from-[#F6ECD9] to-[#EFE1D3] p-7 transition-all border border-amber-200/30 shadow-sm"
            >
              <h4 className="text-[18px] font-extrabold leading-tight text-[#4A3D2A]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                Have a projects?
              </h4>
              
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold text-[#4A3D2A] border-b border-[#4A3D2A]/30 pb-0.5 transition-colors duration-300 group-hover:border-[#4A3D2A]">
                  Contact us
                </span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="text-[#4A3D2A] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}