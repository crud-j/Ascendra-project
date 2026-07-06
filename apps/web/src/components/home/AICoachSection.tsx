"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";

// ─── Data & Context ───────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "ai" | "user";
  text: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "m1",
    role: "ai",
    text: "You've skipped the recursion module twice this week — want me to re-route your roadmap around it?",
  },
  {
    id: "m2",
    role: "user",
    text: "Yeah, it just stops making sense after the first call.",
  },
  {
    id: "m3",
    role: "ai",
    text: "Adapting your path now. We build the mental model first — no code yet.",
  },
];

const ACTION_BUTTONS = [
  { label: "Set My Goal",   icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
  { label: "Adapt Roadmap", icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" },
  { label: "Review Code",   icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

// ─── Shared UI Elements ───────────────────────────────────────────────────────

function AIAvatar({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <div className={`flex shrink-0 items-center justify-center rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6] ${className}`}>
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h-2c0-2.76-2.24-5-5-5H7c-2.76 0-5 2.24-5 5H0a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5A2.5 2.5 0 0 0 7.5 18a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5a2.5 2.5 0 0 0-2.5-2.5z" />
      </svg>
    </div>
  );
}

function UserAvatar({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <div className={`flex shrink-0 items-center justify-center rounded-full bg-[#10B981]/20 text-[#10B981] ${className}`}>
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </div>
  );
}

function CursorArrow({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={color} stroke="white" strokeWidth="1.5" className="drop-shadow-md">
      <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 01.35-.15h6.8c.45 0 .67-.54.35-.85L6.35 2.86a.5.5 0 00-.85.35z" />
    </svg>
  );
}

// ─── Micro-Animation Panels ───────────────────────────────────────────────────

function PanelChatLoop() {
  return (
    <div className="flex h-full w-full flex-col justify-end gap-3 p-6 pt-10">
      {INITIAL_MESSAGES.map((msg, i) => {
        const isAI = msg.role === "ai";
        return (
          <motion.div
            key={msg.id}
            animate={{ opacity: [0, 1, 1, 1, 1, 0], y: [10, 0, 0, 0, 0, -10] }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              times: [0, 0.05, 0.8, 0.85, 0.9, 1], 
              delay: i * 1.2 
            }}
            className={`flex gap-2.5 opacity-0 ${isAI ? "" : "justify-end"}`}
          >
            {isAI && <AIAvatar />}
            <div
              className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-[11px] leading-relaxed shadow-sm ${
                isAI
                  ? "rounded-tl-sm bg-[#1A1A1E] text-white/80 border border-white/[0.04]"
                  : "rounded-tr-sm bg-[#8B5CF6] text-white"
              }`}
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              {msg.text}
            </div>
            {!isAI && <UserAvatar />}
          </motion.div>
        );
      })}
    </div>
  );
}

// 🔥 UPGRADED MIDDLE PANEL (Interactive & Animated)
function PanelAnalysisInteractive() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      
      {/* Hover Ambient Glow */}
      <motion.div 
        variants={{
          rest: { opacity: 0, scale: 0.8 },
          hover: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
        }}
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.12)_0%,transparent_60%)]"
      />

      {/* Background Animated Grid */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center gap-6 px-4 opacity-40">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-full border-t border-dashed border-white/10" />
        ))}
      </div>

      <div className="relative z-10 flex w-[220px] items-center justify-between">
        
        {/* Animated Connecting Line (Visible & moving on hover) */}
        <svg className="absolute top-1/2 left-[60px] right-[50px] h-2 w-[110px] -translate-y-1/2" overflow="visible">
           <motion.line 
             x1="0" y1="4" x2="110" y2="4" 
             stroke="#8B5CF6" 
             strokeWidth="1.5" 
             strokeDasharray="4 4"
             variants={{
               rest: { opacity: 0, strokeDashoffset: 0 },
               hover: { 
                 opacity: 0.6, 
                 strokeDashoffset: -24, 
                 transition: { strokeDashoffset: { repeat: Infinity, duration: 1, ease: "linear" }, opacity: { duration: 0.3 } } 
               }
             }}
           />
        </svg>

        {/* 📁 Central Folder (Left) */}
        <motion.div 
          variants={{
            rest: { y: 0, filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.3))" },
            hover: { y: -4, filter: "drop-shadow(0px 10px 15px rgba(245, 158, 11, 0.2))" }
          }}
          className="relative h-[65px] w-[80px] z-20"
        >
          {/* Back Flap */}
          <div className="absolute inset-0 mt-2 rounded-lg bg-gradient-to-br from-[#D97706] to-[#B45309] shadow-inner" />
          <div className="absolute top-0 left-0 h-4 w-1/3 rounded-t-md bg-[#D97706]" />
          
          {/* Inner Glowing Document (Rises on Hover) */}
          <motion.div 
            variants={{ rest: { y: 6, opacity: 0.5 }, hover: { y: -6, opacity: 1 } }}
            className="absolute left-2 right-2 top-2 bottom-4 rounded border border-white/20 bg-[#1A1A1E] shadow-sm flex flex-col p-1.5 gap-1 overflow-hidden"
          >
             <div className="h-1 w-full bg-[#8B5CF6]/40 rounded-full" />
             <div className="h-1 w-2/3 bg-white/20 rounded-full" />
             <div className="h-1 w-4/5 bg-white/20 rounded-full" />
          </motion.div>

          {/* Front Flap (Opens wider on Hover) */}
          <motion.div
            variants={{ rest: { rotateX: -10 }, hover: { rotateX: -35 } }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ originY: 1 }}
            className="absolute inset-0 mt-2 rounded-lg bg-gradient-to-br from-[#F59E0B] to-[#D97706] shadow-xl border border-white/20 flex items-center justify-center"
          >
            <div className="h-1 w-8 rounded-full bg-white/30 backdrop-blur-sm" />
          </motion.div>
        </motion.div>

        {/* 🚀 Flying Data Packets (Looping + Hover Enhancement) */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ x: [40, -60], y: [0, -5], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.2, 0.6, 0.8], delay: i * 1.5 }}
            className="absolute right-[50px] z-10 h-8 w-10 flex flex-col opacity-0"
          >
             {/* Data Card Content - Scales and Glows on Hover */}
             <motion.div 
               variants={{
                 rest: { scale: 0.85, opacity: 0.7, backgroundColor: "#1A1A1E", borderColor: "rgba(255,255,255,0.08)" },
                 hover: { scale: 1.1, opacity: 1, backgroundColor: "#121214", borderColor: "rgba(139,92,246,0.4)" }
               }}
               className="h-full w-full rounded border overflow-hidden shadow-lg flex flex-col transition-colors duration-300"
             >
                <div className="h-2 w-full bg-[#8B5CF6]/20" />
                <div className="flex-1 p-1 flex flex-col gap-0.5 justify-center">
                  <div className="h-0.5 w-full bg-white/30 rounded" />
                  <div className="h-0.5 w-3/4 bg-white/30 rounded" />
                </div>
             </motion.div>
          </motion.div>
        ))}

        {/* 🖥️ AI Server Box (Right) */}
        <motion.div 
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.05 }
          }}
          className="relative z-20 flex h-[75px] w-[55px] flex-col justify-between rounded-xl border border-white/[0.12] bg-gradient-to-b from-[#18181B] to-[#0A0A0C] p-2.5 shadow-2xl"
        >
          <div className="h-1.5 w-full rounded-full bg-white/5 border border-white/5" />
          <div className="h-1.5 w-full rounded-full bg-white/5 border border-white/5" />
          
          {/* Active Server Rack */}
          <motion.div 
             variants={{ rest: { backgroundColor: "rgba(255,255,255,0.05)" }, hover: { backgroundColor: "rgba(16, 185, 129, 0.15)" } }}
             className="flex h-2.5 w-full items-center rounded bg-white/5 px-1 border border-white/5"
          >
             {/* Pulsing Light - Speeds up on Hover */}
             <motion.div 
               variants={{
                 rest: { opacity: [0.4, 1, 0.4], transition: { repeat: Infinity, duration: 2 } },
                 hover: { opacity: [0.4, 1, 0.4], transition: { repeat: Infinity, duration: 0.5 } }
               }}
               className="h-1 w-1 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" 
             />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function PanelCollabLoop() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      
      {/* Shared Code Workspace */}
      <div className="relative z-10 flex h-[110px] w-[180px] flex-col gap-2 rounded-xl border border-white/[0.08] bg-[#0A0A0C] p-3 shadow-2xl">
        <div className="mb-1 flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-[#EF4444]" />
          <div className="h-2 w-2 rounded-full bg-[#F59E0B]" />
          <div className="h-2 w-2 rounded-full bg-[#10B981]" />
        </div>
        <div className="h-2 w-[80%] rounded-full bg-[#8B5CF6]" />
        <div className="h-2 w-[60%] rounded-full bg-white/20" />
        <div className="h-2 w-[90%] rounded-full bg-[#3B82F6]" />
        <div className="h-2 w-[40%] rounded-full bg-[#10B981]" />
        <div className="h-2 w-[70%] rounded-full bg-white/20" />
      </div>

      {/* AI Coach Cursor */}
      <motion.div
        animate={{ x: [80, 0, 0, 80], y: [60, 0, 0, 60], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }}
        className="absolute left-1/2 top-1/3 z-20 flex flex-col opacity-0"
      >
        <CursorArrow color="#8B5CF6" />
        <div className="ml-3 mt-1 flex items-center gap-1.5 rounded-full bg-[#8B5CF6] px-2 py-0.5 shadow-md">
          <AIAvatar className="h-3 w-3 bg-transparent text-white" />
          <span className="text-[9px] font-bold text-white">AI Coach</span>
        </div>
      </motion.div>

      {/* User Cursor */}
      <motion.div
        animate={{ x: [100, 30, 30, 100], y: [100, 35, 35, 100], opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, times: [0, 0.1, 0.3, 0.8, 1], ease: "easeInOut" }}
        className="absolute left-[40%] top-1/4 z-30 flex flex-col opacity-0"
      >
        <CursorArrow color="#10B981" />
        <div className="ml-3 mt-1 flex items-center gap-1.5 rounded-full bg-[#10B981] px-2 py-0.5 shadow-md">
          <UserAvatar className="h-3 w-3 bg-transparent text-white" />
          <span className="text-[9px] font-bold text-white">You</span>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function AICoachSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden py-28 sm:py-36"
      style={{ backgroundColor: "#18181C" }}
    >
      {/* Top divider */}
      <div className="absolute inset-x-0 top-0 flex items-center px-6 lg:px-8">
        <svg width="13" height="13" viewBox="0 0 15 15" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" className="shrink-0">
          <path d="M7.5 0V15M0 7.5H15" />
        </svg>
        <div className="flex-1 border-t border-dashed border-white/8" />
        <div className="mx-4 h-2.5 w-2.5 rotate-45 border border-dashed border-[#8B5CF6]/50" />
        <div className="flex-1 border-t border-dashed border-white/8" />
        <svg width="13" height="13" viewBox="0 0 15 15" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" className="shrink-0">
          <path d="M7.5 0V15M0 7.5H15" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header Area */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-14"
        >
          <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
            <div className="h-px w-8 bg-[#8B5CF6]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B5CF6]" style={{ fontFamily: "var(--font-sora)" }}>
              AI Coach
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            A coach that knows{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #C4B5FD 0%, #8B5CF6 60%, #7C3AED 100%)" }}
            >
              where you&apos;re headed.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-[600px] text-[16px] leading-[1.8] text-white/45"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Ascendra&apos;s AI Coach runs across every session — detecting gaps, setting your next goal, and dynamically adapting your learning roadmap so you always know what to do next.
          </motion.p>
        </motion.div>

        {/* ─── 3-Panel Horizontal Interactive Demo ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0A0A0C] shadow-2xl"
        >
          {/* Panel 1: Chat */}
          <div className="group relative flex flex-col border-b border-white/[0.06] lg:border-b-0 lg:border-r">
            <div className="relative h-[250px] w-full overflow-hidden border-b border-white/[0.04] bg-[#121214]/50">
              <PanelChatLoop />
            </div>
            <div className="flex flex-1 flex-col p-8 pt-6">
              <h3 className="mb-2 text-[17px] font-bold text-white" style={{ fontFamily: "var(--font-plus-jakarta)" }}>Proactive Goal Chat</h3>
              <p className="text-[14px] leading-relaxed text-white/50" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                Get unstuck and re-directed. The AI Coach detects when you stall and opens a targeted conversation to re-route your path before you give up.
              </p>
            </div>
          </div>

          {/* Panel 2: Analysis (NOW FULLY INTERACTIVE) */}
          <motion.div 
            initial="rest"
            whileHover="hover"
            className="group relative flex flex-col border-b border-white/[0.06] cursor-crosshair lg:border-b-0 lg:border-r"
          >
            <div className="relative h-[250px] w-full overflow-hidden border-b border-white/[0.04] bg-[#121214]/50">
              <PanelAnalysisInteractive />
            </div>
            <div className="flex flex-1 flex-col p-8 pt-6 transition-colors duration-300 group-hover:bg-white/[0.02]">
              <h3 className="mb-2 text-[17px] font-bold text-white transition-colors duration-300 group-hover:text-[#8B5CF6]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                Roadmap Personalization
              </h3>
              <p className="text-[14px] leading-relaxed text-white/50" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                Your goals, gaps, and momentum feed a live adaptive roadmap. The AI re-orders and re-weights your path based on how you actually learn.
              </p>
            </div>
          </motion.div>

          {/* Panel 3: Collaboration */}
          <div className="group relative flex flex-col">
            <div className="relative h-[250px] w-full overflow-hidden border-b border-white/[0.04] bg-[#121214]/50">
              <PanelCollabLoop />
            </div>
            <div className="flex flex-1 flex-col p-8 pt-6">
              <h3 className="mb-2 text-[17px] font-bold text-white" style={{ fontFamily: "var(--font-plus-jakarta)" }}>AI + Human Mentorship</h3>
              <p className="text-[14px] leading-relaxed text-white/50" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                The AI Coach surfaces your patterns and suggests your next step. Human mentors validate, review, and earn the Reputation that AI never can.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer Band: Actions & Integrity Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="mt-6 flex flex-col justify-between gap-6 rounded-2xl border border-white/[0.06] bg-[#121214] p-6 lg:flex-row lg:items-center"
        >
          <div>
             <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-white/25" style={{ fontFamily: "var(--font-sora)" }}>Quick Actions</p>
             <div className="flex flex-wrap gap-2">
                {ACTION_BUTTONS.map((btn) => (
                  <button
                    key={btn.label}
                    suppressHydrationWarning
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[12px] font-semibold text-white/60 transition-all duration-200 hover:border-[#8B5CF6]/40 hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6]"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={btn.icon} />
                    </svg>
                    {btn.label}
                  </button>
                ))}
             </div>
          </div>

          <div className="max-w-sm rounded-xl bg-white/[0.02] p-4 border border-white/[0.04]">
             <p className="text-[9px] font-bold uppercase tracking-wider text-[#8B5CF6] mb-1.5" style={{ fontFamily: "var(--font-sora)" }}>Economy Integrity</p>
             <p className="text-[11px] leading-relaxed text-white/40" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                The AI Coach personalizes your roadmap but holds zero economic authority — it cannot mint Skill Coins or generate Reputation. Only validated human contribution earns real platform value.
             </p>
          </div>
        </motion.div>

      </div>
      
    

    </section>
  );
}