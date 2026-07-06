"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";

const guilds = [
  {
    id: 1,
    name: "Frontend Guild",
    tagline: "Pixel-perfect. Always.",
    description: "Build interfaces, debate design patterns, and push the web forward together.",
    members: 312,
    totalXP: "1.2M",
    projects: 89,
    weeklyRank: 1,
    color: "#3B82F6",
    colorRGB: "59,130,246",
    topics: ["React", "Next.js", "CSS", "Animation"],
    trophy: "Gold",
  },
  {
    id: 2,
    name: "AI Guild",
    tagline: "Build what thinks.",
    description: "LLMs, agents, fine-tuning, and the future of intelligent systems.",
    members: 278,
    totalXP: "940K",
    projects: 67,
    weeklyRank: 2,
    color: "#8B5CF6",
    colorRGB: "139,92,246",
    topics: ["LangChain", "PyTorch", "GPT-4", "RAG"],
    trophy: "Silver",
  },
  {
    id: 3,
    name: "Blockchain Guild",
    tagline: "On-chain or offline.",
    description: "Smart contracts, DeFi mechanics, and the architecture of trustless systems.",
    members: 156,
    totalXP: "680K",
    projects: 44,
    weeklyRank: 4,
    color: "#F59E0B",
    colorRGB: "245,158,11",
    topics: ["Move", "Solidity", "Aptos", "DeFi"],
    trophy: "Bronze",
  },
  {
    id: 4,
    name: "Cybersecurity Guild",
    tagline: "Hack to protect.",
    description: "CTFs, ethical hacking, threat modeling, and secure system design.",
    members: 198,
    totalXP: "820K",
    projects: 58,
    weeklyRank: 3,
    color: "#EF4444",
    colorRGB: "239,68,68",
    topics: ["CTF", "Pen Testing", "OWASP", "Crypto"],
    trophy: "Silver",
  },
] as const;

const RANK_MEDALS: Record<number, string> = {
  1: "#C19562",
  2: "#9CA3AF",
  3: "#CD7F32",
  4: "#6B7280",
};

const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: cinematicEase } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

// ─── High-Fidelity SVG Canvases (Continuous "Alive" Animations) ─────────────

function FrontendCanvas() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 200 120" className="h-full w-full max-w-55 drop-shadow-xl" aria-hidden="true">
        {/* Dark IDE Window */}
        <rect x="25" y="20" width="140" height="85" rx="6" fill="#121214" stroke="#27272A" strokeWidth="1" />
        
        {/* Window Controls */}
        <circle cx="37" cy="30" r="2.5" fill="#EF4444" />
        <circle cx="46" cy="30" r="2.5" fill="#EAB308" />
        <circle cx="55" cy="30" r="2.5" fill="#22C55E" />
        
        {/* Animated Code Lines responding to cursor proximity */}
        <motion.rect x="37" y="45" width="55" height="4" rx="2" fill="#A855F7" animate={!prefersReducedMotion ? { opacity: [1, 0.5, 1, 1], scaleX: [1, 0.98, 1, 1] } : {}} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.4, 1] }} />
        <motion.rect x="37" y="55" width="75" height="4" rx="2" fill="#3B82F6" animate={!prefersReducedMotion ? { opacity: [1, 1, 0.5, 1], scaleX: [1, 1, 0.98, 1] } : {}} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.6, 1] }} />
        <rect x="37" y="65" width="45" height="4" rx="2" fill="#10B981" />
        <motion.rect x="37" y="75" width="65" height="4" rx="2" fill="#52525B" animate={!prefersReducedMotion ? { width: [65, 80, 65, 65] } : {}} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.6, 0.8, 1] }} />
        <rect x="37" y="85" width="30" height="4" rx="2" fill="#A855F7" />

        {/* Cursor 1 (Tyler - Green) Continuous Path */}
        <motion.g
          animate={!prefersReducedMotion ? { x: [100, 45, 80, 100], y: [80, 40, 65, 80] } : { x: 80, y: 65 }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform" }}
        >
          <path d="M0 0 L11 11 L5 12 L0 18 Z" fill="#10B981" stroke="#FFFFFF" strokeWidth="1" strokeLinejoin="round" />
          <rect x="10" y="12" width="36" height="14" rx="7" fill="#10B981" />
          <circle cx="17" cy="19" r="4" fill="#047857" />
          <text x="31" y="21" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" textAnchor="middle" style={{ fontFamily: "sans-serif" }}>Tyler</text>
        </motion.g>

        {/* Cursor 2 (Sarah - Blue) Continuous Path */}
        <motion.g
          animate={!prefersReducedMotion ? { x: [40, 110, 90, 40], y: [60, 75, 45, 60] } : { x: 110, y: 55 }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform" }}
        >
          <path d="M0 0 L11 11 L5 12 L0 18 Z" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1" strokeLinejoin="round" />
          <rect x="10" y="12" width="38" height="14" rx="7" fill="#3B82F6" />
          <circle cx="17" cy="19" r="4" fill="#1D4ED8" />
          <text x="32" y="21" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" textAnchor="middle" style={{ fontFamily: "sans-serif" }}>Sarah</text>
        </motion.g>
      </svg>
    </div>
  );
}

function AICanvas() {
  const prefersReducedMotion = useReducedMotion();
  const transitionSettings = { duration: 8, repeat: Infinity, ease: "easeOut" } as const;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 200 120" className="h-full w-full max-w-55" aria-hidden="true">
        
        {/* Message 1: User 1 */}
        <motion.g
          animate={!prefersReducedMotion ? { opacity: [0, 1, 1, 0], y: [20, 10, 10, -10] } : { opacity: 1, y: 10 }}
          transition={{ ...transitionSettings, times: [0, 0.05, 0.85, 0.95] }}
          style={{ willChange: "transform, opacity" }}
        >
          <circle cx="30" cy="15" r="7" fill="#3B82F6" />
          <rect x="45" y="5" width="85" height="20" rx="10" fill="#27272A" />
          <rect x="55" y="13" width="55" height="4" rx="2" fill="#71717A" />
        </motion.g>

        {/* Message 2: AI Response */}
        <motion.g
           animate={!prefersReducedMotion ? { opacity: [0, 0, 1, 1, 0], y: [45, 45, 35, 35, 15] } : { opacity: 1, y: 35 }}
           transition={{ ...transitionSettings, times: [0, 0.15, 0.2, 0.85, 0.95] }}
           style={{ willChange: "transform, opacity" }}
        >
           <circle cx="170" cy="15" r="7" fill="#8B5CF6" />
           <rect x="75" y="5" width="85" height="20" rx="10" fill="#3F3F46" />
           <rect x="85" y="13" width="55" height="4" rx="2" fill="#A1A1AA" />
        </motion.g>

        {/* Message 3: User 2 */}
        <motion.g
           animate={!prefersReducedMotion ? { opacity: [0, 0, 1, 1, 0], y: [70, 70, 60, 60, 40] } : { opacity: 1, y: 60 }}
           transition={{ ...transitionSettings, times: [0, 0.35, 0.4, 0.85, 0.95] }}
           style={{ willChange: "transform, opacity" }}
        >
          <circle cx="30" cy="15" r="7" fill="#F59E0B" />
          <rect x="45" y="5" width="60" height="20" rx="10" fill="#27272A" />
          <rect x="55" y="13" width="30" height="4" rx="2" fill="#71717A" />
        </motion.g>

        {/* Message 4: Final AI Response */}
        <motion.g
           animate={!prefersReducedMotion ? { opacity: [0, 0, 1, 1, 0], y: [95, 95, 85, 85, 65] } : { opacity: 1, y: 85 }}
           transition={{ ...transitionSettings, times: [0, 0.55, 0.6, 0.85, 0.95] }}
           style={{ willChange: "transform, opacity" }}
        >
           <circle cx="170" cy="15" r="7" fill="#8B5CF6" />
           <rect x="65" y="5" width="95" height="20" rx="10" fill="#3F3F46" />
           <rect x="75" y="13" width="65" height="4" rx="2" fill="#A1A1AA" />
        </motion.g>

      </svg>
    </div>
  );
}

function BlockchainCanvas() {
  const prefersReducedMotion = useReducedMotion();
  const fileTransition = { duration: 5, repeat: Infinity, ease: "easeInOut" } as const;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 200 120" className="h-full w-full max-w-55" aria-hidden="true">
        
        {/* Background Network Lines */}
        <path d="M 10 40 L 190 40" stroke="#27272A" strokeWidth="1" strokeDasharray="2 4" />
        <path d="M 10 60 L 190 60" stroke="#27272A" strokeWidth="1" strokeDasharray="2 4" />
        <path d="M 10 80 L 190 80" stroke="#27272A" strokeWidth="1" strokeDasharray="2 4" />

        {/* Server Rack (Right) */}
        <g transform="translate(145, 25)">
           <rect x="0" y="0" width="35" height="70" rx="4" fill="#121214" stroke="#27272A" strokeWidth="1" />
           <rect x="5" y="10" width="25" height="10" rx="2" fill="#27272A" />
           <rect x="5" y="30" width="25" height="10" rx="2" fill="#27272A" />
           <rect x="5" y="50" width="25" height="10" rx="2" fill="#27272A" />
           {/* Blinking LEDs */}
           <motion.circle cx="24" cy="15" r="1.5" fill="#3B82F6" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity }} />
           <motion.circle cx="24" cy="35" r="1.5" fill="#F59E0B" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />
           <motion.circle cx="24" cy="55" r="1.5" fill="#10B981" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }} />
        </g>

        {/* Secure Folder & Files (Center-Left) */}
        <g transform="translate(45, 40)">
          
          {/* Back of Folder */}
          <path d="M0 4 C0 1.79 1.79 0 4 0 L20 0 L25 6 L46 6 C48.21 6 50 7.79 50 10 L50 35 C50 37.21 48.21 39 46 39 L4 39 C1.79 39 0 37.21 0 35 L0 4 Z" fill="#D97706" />

          {/* Fanning File 1 (Left - Purple) */}
          <motion.g 
            animate={!prefersReducedMotion ? { y: [0, -22, -22, 0, 0], x: [0, -18, -18, 0, 0], rotate: [0, -15, -15, 0, 0] } : {}} 
            transition={{ ...fileTransition, times: [0, 0.2, 0.8, 1, 1] }}
          >
            <rect x="10" y="6" width="30" height="24" rx="3" fill="#8B5CF6" />
            <circle cx="25" cy="14" r="4" fill="#C4B5FD" />
            <rect x="16" y="21" width="18" height="3" rx="1.5" fill="#C4B5FD" />
          </motion.g>

          {/* Fanning File 3 (Right - Blue) */}
          <motion.g 
            animate={!prefersReducedMotion ? { y: [0, -22, -22, 0, 0], x: [0, 18, 18, 0, 0], rotate: [0, 15, 15, 0, 0] } : {}} 
            transition={{ ...fileTransition, times: [0, 0.2, 0.8, 1, 1] }}
          >
            <rect x="10" y="6" width="30" height="24" rx="3" fill="#3B82F6" />
            <circle cx="25" cy="14" r="4" fill="#93C5FD" />
            <rect x="16" y="21" width="18" height="3" rx="1.5" fill="#93C5FD" />
          </motion.g>

          {/* Fanning File 2 (Center - Orange) */}
          <motion.g 
            animate={!prefersReducedMotion ? { y: [0, -28, -28, 0, 0] } : {}} 
            transition={{ ...fileTransition, times: [0, 0.2, 0.8, 1, 1] }}
          >
            <rect x="10" y="6" width="30" height="24" rx="3" fill="#F97316" />
            <circle cx="25" cy="14" r="4" fill="#FDBA74" />
            <rect x="16" y="21" width="18" height="3" rx="1.5" fill="#FDBA74" />
          </motion.g>

          {/* Front of Folder */}
          <motion.path 
            d="M0 14 C0 11.79 1.79 10 4 10 L46 10 C48.21 10 50 11.79 50 14 L50 35 C50 37.21 48.21 39 46 39 L4 39 C1.79 39 0 37.21 0 35 L0 14 Z" 
            fill="#F59E0B"
            animate={!prefersReducedMotion ? { scaleY: [1, 0.9, 0.9, 1, 1] } : {}}
            transition={{ ...fileTransition, times: [0, 0.2, 0.8, 1, 1] }}
            style={{ transformOrigin: "bottom" }}
          />
          {/* Folder Lock Icon */}
          <rect x="21" y="20" width="8" height="6" rx="1" fill="#FEF3C7" />
          <path d="M23 20 V18 A2 2 0 0 1 27 18 V20" fill="none" stroke="#FEF3C7" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function CybersecurityCanvas() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 200 120" className="h-full w-full max-w-55" aria-hidden="true">
        
        {/* Base Dashboard Console */}
        <rect x="30" y="20" width="140" height="85" rx="6" fill="#121214" stroke="#27272A" strokeWidth="1" />
        <path d="M30 28 Q30 20 38 20 L162 20 Q170 20 170 28 L170 35 L30 35 Z" fill="#18181B" />
        <circle cx="40" cy="27.5" r="3" fill="#EF4444" />
        <text x="50" y="30" fill="#71717A" fontSize="7" fontWeight="bold" style={{ fontFamily: "sans-serif" }}>Threat_Monitor</text>

        {/* Dashboard Blocks */}
        <rect x="40" y="45" width="55" height="12" rx="3" fill="#27272A" />
        <rect x="105" y="45" width="55" height="12" rx="3" fill="#27272A" />

        {/* Scanning Radar Line (Continuous Sweep) */}
        <motion.line 
           x1="35" x2="165" y1="40" y2="40" 
           stroke="#EF4444" strokeWidth="1.5" opacity="0.3"
           animate={!prefersReducedMotion ? { y: [40, 95, 40] } : { y: 40 }}
           transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
           style={{ willChange: "transform" }}
        />

        {/* Threat Alert Bubble 1 (Appears, pulses, resolves to green, fades) */}
        <motion.g
          animate={!prefersReducedMotion ? { opacity: [0, 1, 1, 1, 0], scale: [0.9, 1, 1.05, 1, 0.9], y: [75, 65, 65, 65, 75] } : { opacity: 0 }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.1, 0.5, 0.9, 1] }}
          style={{ willChange: "transform, opacity", transformOrigin: "80px 70px" }}
        >
           {/* Color changes from Red to Green midway through */}
           <motion.rect x="40" y="65" width="70" height="20" rx="10" animate={{ fill: ["#EF4444", "#EF4444", "#10B981", "#10B981"] }} transition={{ duration: 6, repeat: Infinity, times: [0, 0.4, 0.5, 1] }} opacity="0.15" />
           <motion.rect x="40" y="65" width="70" height="20" rx="10" fill="transparent" strokeWidth="1" animate={{ stroke: ["#EF4444", "#EF4444", "#10B981", "#10B981"] }} transition={{ duration: 6, repeat: Infinity, times: [0, 0.4, 0.5, 1] }} />
           <motion.circle cx="52" cy="75" r="3.5" animate={{ fill: ["#EF4444", "#EF4444", "#10B981", "#10B981"] }} transition={{ duration: 6, repeat: Infinity, times: [0, 0.4, 0.5, 1] }} />
           <motion.rect x="62" y="73" width="35" height="4" rx="2" animate={{ fill: ["#EF4444", "#EF4444", "#10B981", "#10B981"] }} transition={{ duration: 6, repeat: Infinity, times: [0, 0.4, 0.5, 1] }} />
        </motion.g>

        {/* Threat Alert Bubble 2 (Offset Timing) */}
        <motion.g
          animate={!prefersReducedMotion ? { opacity: [0, 0, 1, 1, 1, 0], scale: [0.9, 0.9, 1, 1.05, 1, 0.9], y: [55, 55, 45, 45, 45, 55] } : { opacity: 0 }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.4, 0.7, 0.9, 1] }}
          style={{ willChange: "transform, opacity", transformOrigin: "110px 60px" }}
        >
           <motion.rect x="90" y="45" width="70" height="20" rx="10" animate={{ fill: ["#EF4444", "#EF4444", "#10B981", "#10B981"] }} transition={{ duration: 6, repeat: Infinity, times: [0, 0.6, 0.7, 1] }} opacity="0.15" />
           <motion.rect x="90" y="45" width="70" height="20" rx="10" fill="transparent" strokeWidth="1" animate={{ stroke: ["#EF4444", "#EF4444", "#10B981", "#10B981"] }} transition={{ duration: 6, repeat: Infinity, times: [0, 0.6, 0.7, 1] }} />
           <motion.circle cx="102" cy="55" r="3.5" animate={{ fill: ["#EF4444", "#EF4444", "#10B981", "#10B981"] }} transition={{ duration: 6, repeat: Infinity, times: [0, 0.6, 0.7, 1] }} />
           <motion.rect x="112" y="53" width="35" height="4" rx="2" animate={{ fill: ["#EF4444", "#EF4444", "#10B981", "#10B981"] }} transition={{ duration: 6, repeat: Infinity, times: [0, 0.6, 0.7, 1] }} />
        </motion.g>

      </svg>
    </div>
  );
}

// ─── Premium Bento Card ───────────────────────────────────────────────────────

function BentoCard({ guild }: { guild: typeof guilds[number] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl bg-[#071E33] p-[1.5px]"
    >
      {/* Static dark border at rest */}
      <div className="absolute inset-0 rounded-2xl transition-colors duration-500 group-hover:bg-transparent" />

      {/* Layer 1: Wide, blurred spinning glow for diffuse light */}
      <div
        className="absolute inset-[-150%] animate-[spin_5s_linear_infinite] opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-60"
        style={{
          background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, ${guild.color} 40%, transparent 60%)`,
        }}
      />
      {/* Layer 2: Sharp, tight spinning line for precision edge */}
      <div
        className="absolute inset-[-150%] animate-[spin_5s_linear_infinite] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, ${guild.color} 50%, transparent 100%)`,
        }}
      />

      {/* Inner Card Surface */}
      <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-[14px] bg-linear-to-b from-[#061A2D] to-[#04111F] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        
        {/* Rank Badge */}
        <div
          className="absolute right-4 top-4 z-30 flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-black text-white shadow-md shadow-black/20"
          style={{ backgroundColor: RANK_MEDALS[guild.weeklyRank] ?? "#6B7280" }}
        >
          #{guild.weeklyRank}
        </div>

        {/* Live Demo Canvas Area */}
        <div className="relative h-37.5 w-full shrink-0 overflow-hidden border-b border-white/5 bg-[#09090B]">
          {/* Reactive Ambient Canvas Glow based on hover to make interaction "pop" */}
          <div 
            className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[50px] transition-all duration-700 ease-out"
            style={{ 
              backgroundColor: guild.color,
              opacity: isHovered ? 0.25 : 0.05,
              transform: isHovered ? 'scale(1.4)' : 'scale(1)'
            }}
          />
          
          {guild.id === 1 && <FrontendCanvas />}
          {guild.id === 2 && <AICanvas />}
          {guild.id === 3 && <BlockchainCanvas />}
          {guild.id === 4 && <CybersecurityCanvas />}
        </div>

        {/* Color Band Header */}
        <div
          className="relative z-20 flex h-16 shrink-0 items-center gap-3 px-5 shadow-sm"
          style={{
            background: `linear-gradient(135deg, rgba(${guild.colorRGB},0.12) 0%, rgba(${guild.colorRGB},0.03) 100%)`,
            borderBottom: `1px solid rgba(${guild.colorRGB},0.1)`,
          }}
        >
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-white transition-transform duration-500 ease-out group-hover:scale-[1.08] shadow-inner"
            style={{
              background: `linear-gradient(135deg, rgba(${guild.colorRGB},0.85), rgba(${guild.colorRGB},0.40))`,
              boxShadow: `0 4px 12px -2px rgba(${guild.colorRGB}, 0.3), inset 0 1px 1px rgba(255,255,255,0.2)`
            }}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p
              className="truncate text-[14px] font-bold leading-tight text-white/95"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              {guild.name}
            </p>
            <p className="text-[11px] italic text-white/50">{guild.tagline}</p>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex flex-1 flex-col p-5">
          <p
            className="mb-5 text-[13px] leading-relaxed text-white/60"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            {guild.description}
          </p>

          {/* Stats Grid */}
          <div className="mb-5 grid grid-cols-3 gap-2">
            {[
              { k: "Members",  v: guild.members },
              { k: "Total XP", v: guild.totalXP },
              { k: "Projects", v: guild.projects },
            ].map((stat) => (
              <div
                key={stat.k}
                className="rounded-[10px] px-2 py-2.5 text-center transition-colors duration-300 hover:bg-white/5"
                style={{ backgroundColor: `rgba(${guild.colorRGB},0.06)`, border: `1px solid rgba(${guild.colorRGB},0.04)` }}
              >
                <p
                  className="text-[13px] font-bold text-white/90"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {stat.v}
                </p>
                <p className="mt-0.5 text-[9px] font-medium tracking-wide text-white/40 uppercase" style={{ fontFamily: "var(--font-sora)" }}>
                  {stat.k}
                </p>
              </div>
            ))}
          </div>

          {/* Topics Tag Cloud */}
          <div className="mb-auto flex flex-wrap gap-1.5">
            {guild.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-md px-2.5 py-1 text-[10px] font-semibold transition-colors duration-300"
                style={{
                  backgroundColor: `rgba(${guild.colorRGB},0.08)`,
                  color: `rgba(${guild.colorRGB},0.9)`,
                  border: `1px solid rgba(${guild.colorRGB},0.15)`,
                }}
              >
                {topic}
              </span>
            ))}
          </div>

          {/* Card Footer */}
          <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
            <span
              className="text-[10px] font-semibold uppercase tracking-wider text-white/30"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Weekly Rank
            </span>
            <span
              className="text-[12px] font-bold"
              style={{ color: RANK_MEDALS[guild.weeklyRank] ?? "#6B7280" }}
            >
              {guild.trophy} League
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section Layout ───────────────────────────────────────────────────────────

export function GuildSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden py-28 sm:py-36"
      style={{ backgroundColor: "#041E37" }}
    >
      {/* Top breakpoint line */}
      <div className="absolute inset-x-0 top-0 flex items-center px-6 lg:px-8">
        <svg width="13" height="13" viewBox="0 0 15 15" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" className="shrink-0">
          <path d="M7.5 0V15M0 7.5H15" />
        </svg>
        <div className="flex-1 border-t border-dashed border-white/6" />
        <div className="mx-4 h-2.5 w-2.5 rotate-45 border border-dashed border-[#C19562]/40" />
        <div className="flex-1 border-t border-dashed border-white/6" />
        <svg width="13" height="13" viewBox="0 0 15 15" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" className="shrink-0">
          <path d="M7.5 0V15M0 7.5H15" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-[#C19562]" />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C19562]"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                Guild System
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl drop-shadow-sm"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Compete together.
              <br />
              <span className="text-white/40">Build each other up.</span>
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUp}
            className="max-w-sm pb-1 text-base leading-[1.75] text-white/50"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Guilds are discipline-specific communities that compete weekly for XP, run bounties, and collaborate on large-scale projects.
          </motion.p>
        </motion.div>

        {/* Bento Guild Cards Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative z-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {guilds.map((guild) => (
            <BentoCard key={guild.id} guild={guild} />
          ))}
        </motion.div>

        {/* Bottom CTA Element */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="group relative z-10 mt-8 overflow-hidden rounded-2xl bg-[#071E33] p-[1.5px]"
        >
          {/* CTA Dual Spinning Edge Glow */}
          <div
            className="absolute -inset-full animate-[spin_6s_linear_infinite] opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-40"
            style={{ background: "conic-gradient(from 90deg at 50% 50%, transparent 0%, #C19562 40%, transparent 60%)" }}
          />
          <div
            className="absolute -inset-full animate-[spin_6s_linear_infinite] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{ background: "conic-gradient(from 90deg at 50% 50%, transparent 0%, #C19562 50%, transparent 100%)" }}
          />
          
          <div className="relative z-10 rounded-[14px] bg-linear-to-b from-[#051729] to-[#04111F] px-8 py-7 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <p
              className="text-[15px] font-semibold text-white/90"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Guild competitions run every week.{" "}
              <span className="text-[#C19562] drop-shadow-sm">
                Top guilds earn exclusive bounties, extra XP, and platform recognition.
              </span>
            </p>
            <p className="mt-2.5 text-[12.5px] font-medium text-white/40" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              You can only join one Guild at a time — choose your discipline.
            </p>
          </div>
        </motion.div>

      </div>

      {/* ── Background Void Overlays ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* The Outer Glowing "U" Track */}
        <div className="absolute inset-x-4 top-12 bottom-4 rounded-[32px] border border-[#18181C]/12 mask-[linear-gradient(to_bottom,transparent_0%,black_40%,black_75%,transparent_95%)]">
          {/* Left Side Glow */}
          <div className="absolute left-0 top-1/4 bottom-8 w-[1.5px] bg-linear-to-b from-transparent via-[#18181C]/30 to-transparent" />
          {/* Right Side Glow */}
          <div className="absolute right-0 top-1/4 bottom-8 w-[1.5px] bg-linear-to-b from-transparent via-[#18181C]/30 to-transparent" />
        </div>

        {/* Softened Corner Accent Flares */}
        <div className="absolute bottom-4 left-4 h-24 w-24 rounded-bl-[32px] border-b border-l border-[#18181C]/20 blur-[0.5px] mask-[linear-gradient(to_top,transparent_10%,black_100%)]" />
        <div className="absolute bottom-4 right-4 h-24 w-24 rounded-br-[32px] border-b border-r border-[#18181C]/20 blur-[0.5px] mask-[linear-gradient(to_top,transparent_10%,black_100%)]" />

        {/* Left Vignette Curve */}
        <div className="pointer-events-none absolute bottom-0 left-[-70%] h-[65%] w-[65%] rounded-full bg-[#18181C]/75 blur-[90px]" />

        {/* Right Vignette Curve */}
        <div className="pointer-events-none absolute bottom-0 right-[-70%] h-[65%] w-[65%] rounded-full bg-[#18181C]/75 blur-[90px]" />

        {/* Deep Ambient Foundation */}
        <div className="pointer-events-none absolute bottom-[-30%] left-1/2 h-[70%] w-[160%] -translate-x-1/2 rounded-full bg-[#18181C]/70 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-[-15%] left-1/2 h-[45%] w-full -translate-x-1/2 rounded-full bg-[#18181C]/50 blur-[80px]" />

        {/* Flawless Section Blending Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent via-[#18181C]/80 to-[#18181C]" />
      </div>

    </section>
  );
}