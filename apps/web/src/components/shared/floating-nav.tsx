"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  MessageSquare,
  Users,
  GraduationCap,
  ShoppingBag,
  LayoutDashboard,
  User,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/",            label: "Home",       icon: LayoutDashboard },
  { href: "/learn",       label: "Learn",      icon: BookOpen },
  { href: "/contribute",  label: "Contribute", icon: MessageSquare },
  { href: "/guilds",      label: "Guilds",     icon: Users },
  { href: "/mentor",      label: "Mentor",     icon: GraduationCap },
  { href: "/marketplace", label: "Market",     icon: ShoppingBag },
  { href: "/profile",     label: "Profile",    icon: User },
] as const;

// Adjusted angles for a visually balanced semi-circle
const ARC_RADIUS = 145;      
const ARC_ANGLE_START = 15;  
const ARC_ANGLE_END = 165;

function arcPosition(index: number, total: number): { x: number; y: number } {
  const t = index / (total - 1);
  const deg = ARC_ANGLE_START + t * (ARC_ANGLE_END - ARC_ANGLE_START);
  const rad = (deg * Math.PI) / 180;
  return {
    x: Math.cos(rad) * ARC_RADIUS,
    y: -Math.sin(rad) * ARC_RADIUS,
  };
}

const BUBBLE_SIZE = 48;
const HALF_BUBBLE = BUBBLE_SIZE / 2;

// Apple-like fluid spring physics
const BUBBLE_SPRING = {
  type: "spring" as const,
  stiffness: 400,
  damping: 28,
  mass: 0.8,
};

export function FloatingNav() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setHoveredLabel(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setHoveredLabel(null);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Clear hover state when menu closes
  useEffect(() => {
    if (!open) setHoveredLabel(null);
  }, [open]);

  if (!mounted) return null;

  const isLesson = pathname.includes("/lessons/");

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  const TRIGGER_SIZE = 56;

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed left-1/2 z-50 -translate-x-1/2 transition-[bottom] duration-300",
        isLesson ? "bottom-16" : "bottom-8"
      )}
      style={{ width: TRIGGER_SIZE, height: TRIGGER_SIZE }}
    >
      {/* ── Central Hover Label ── */}
      <AnimatePresence mode="wait">
        {open && hoveredLabel && (
          <motion.div
            key={hoveredLabel}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
            style={{ bottom: "calc(100% + 24px)" }}
          >
            <div className="rounded-full border border-white/10 bg-neutral-900/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-neutral-200 shadow-xl backdrop-blur-xl">
              {hoveredLabel}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Arc bubbles ── */}
      <AnimatePresence>
        {open &&
          NAV_ITEMS.map((item, i) => {
            const { x, y } = arcPosition(i, NAV_ITEMS.length);
            return (
              <motion.div
                key={item.href}
                className="absolute"
                style={{
                  left: TRIGGER_SIZE / 2 - HALF_BUBBLE,
                  bottom: TRIGGER_SIZE / 2 - HALF_BUBBLE,
                }}
                initial={{ x: 0, y: 0, scale: 0.4, opacity: 0 }}
                animate={{ x, y, scale: 1, opacity: 1 }}
                exit={{ x: 0, y: 0, scale: 0.3, opacity: 0 }}
                transition={{ ...BUBBLE_SPRING, delay: i * 0.03 }}
              >
                <NavBubble
                  item={item}
                  active={isActive(item.href)}
                  onNavigate={() => {
                    setOpen(false);
                    setHoveredLabel(null);
                  }}
                  onHoverChange={(isHovering) => {
                    setHoveredLabel(isHovering ? item.label : null);
                  }}
                />
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* ── Trigger circle ── */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close navigation" : "Open navigation"}
        whileTap={{ scale: 0.92 }}
        className={cn(
          "absolute inset-0 flex items-center justify-center rounded-full border backdrop-blur-xl",
          "transition-all duration-300",
          open
            ? "border-white/10 bg-neutral-900/80 text-neutral-100 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ring-1 ring-black/10"
            : "border-white/10 bg-neutral-950/90 text-neutral-400 shadow-[0_4px_20px_rgba(0,0,0,0.35)] ring-1 ring-black/10 hover:border-white/20 hover:text-neutral-200"
        )}
      >
        {/* Hamburger → X */}
        <motion.div
          animate={open ? "open" : "closed"}
          className="flex flex-col items-center justify-center gap-[5px]"
        >
          <motion.span
            variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 6.5 } }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="block h-[1.5px] origin-center rounded-full bg-current"
            style={{ width: 16 }}
          />
          <motion.span
            variants={{ closed: { opacity: 1, scaleX: 1 }, open: { opacity: 0, scaleX: 0 } }}
            transition={{ duration: 0.2 }}
            className="block h-[1.5px] rounded-full bg-current"
            style={{ width: 12 }}
          />
          <motion.span
            variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -6.5 } }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="block h-[1.5px] origin-center rounded-full bg-current"
            style={{ width: 16 }}
          />
        </motion.div>
      </motion.button>
    </div>
  );
}

// ── NavBubble ────────────────────────────────────────────────────────────────

interface NavBubbleProps {
  item: { href: string; label: string; icon: LucideIcon };
  active: boolean;
  onNavigate: () => void;
  onHoverChange: (isHovering: boolean) => void;
}

function NavBubble({ item, active, onNavigate, onHoverChange }: NavBubbleProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      className="group relative flex items-center justify-center outline-none"
    >
      <motion.div
        initial="initial"
        whileHover="hover"
        animate={active ? "active" : "initial"}
        className={cn(
          "relative flex items-center justify-center rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.3)] ring-1 ring-black/10 backdrop-blur-xl transition-colors duration-300",
          active
            ? "border border-white/20 bg-white/20"
            : "border border-white/10 bg-neutral-900/70 group-hover:bg-neutral-800/80"
        )}
        style={{ width: BUBBLE_SIZE, height: BUBBLE_SIZE }}
      >
        <Icon
          className={cn(
            "relative z-10 h-[20px] w-[20px] transition-colors duration-300",
            active ? "text-white" : "text-neutral-400 group-hover:text-neutral-100"
          )}
        />
      </motion.div>
    </Link>
  );
}