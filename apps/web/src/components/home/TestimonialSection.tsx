"use client";

import React, { useState, useEffect, useCallback, KeyboardEvent } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  quote: string;
  avatar: string;
  company?: string;
}

// Default data preserved from the original component
const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Marcus",
    title: "Frontend Engineer",
    company: "Self-taught via Ascendra",
    quote: "I went from zero coding knowledge to landing my first dev job in eight months. The projects I built on Ascendra were my entire portfolio — employers could see my Reputation score and knew I was the real deal.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    id: "2",
    name: "Sofia",
    title: "Senior Developer & Mentor",
    company: "TechBridge Labs",
    quote: "Mentoring on Ascendra doesn't just feel good — it actually pays. The Skill Coins I've earned from sessions have funded three of my own courses. It's the first platform that genuinely rewards teaching.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    id: "3",
    name: "Daniel",
    title: "Bootcamp Graduate",
    company: "Ascendra Alumni",
    quote: "Other platforms give you certificates that mean nothing. Ascendra gives you Reputation built from real contributions — my score opened doors that a certificate never could have.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    id: "4",
    name: "Priya",
    title: "Full-Stack Developer",
    company: "Freelance",
    quote: "The AI Mentor caught gaps in my understanding that I didn't even know I had. It felt like having a senior engineer review my thinking, not just my code. I leveled up faster than I thought possible.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    id: "5",
    name: "Ethan",
    title: "Guild Lead",
    company: "Ascendra BuildCraft Guild",
    quote: "Running a guild on Ascendra is incredible. We compete, we build together, and the top contributors actually earn from it. The community here is the most motivated I've ever been part of.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    id: "6",
    name: "Yara",
    title: "Product Designer turned Developer",
    company: "NovaSpark Studio",
    quote: "The learning paths are genuinely intelligent. Ascendra adapted to my design background and had me building real products within weeks, not months. I contributed my first accepted answer by week three.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    id: "7",
    name: "James",
    title: "Engineering Manager",
    company: "Nexus Systems",
    quote: "We use Ascendra Reputation scores as a pre-screen for junior hires. It tells us more in five seconds than a resume ever could — it's proof of what someone can actually build and contribute under pressure.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
  },
];

const mobileVariants: Variants = {
  active:      { x: "0%",    y: "0%",  scale: 1,    zIndex: 50, rotateZ:  0,  opacity: 1,   backgroundColor: "#EBEBEB", color: "#111827", boxShadow: "0 0 0 0px rgba(255,255,255,0), 0 30px 60px -10px rgba(0,0,0,0.9)" },
  left:        { x: "-88%",  y: "2%",  scale: 0.95, zIndex: 40, rotateZ: -3,  opacity: 0.8, backgroundColor: "#1C1C1E", color: "#D4D4D8", boxShadow: "0 15px 30px -10px rgba(0,0,0,0.7)" },
  right:       { x: "88%",   y: "2%",  scale: 0.95, zIndex: 40, rotateZ:  3,  opacity: 0.8, backgroundColor: "#1C1C1E", color: "#D4D4D8", boxShadow: "0 15px 30px -10px rgba(0,0,0,0.7)" },
  left1:       { x: "-88%",  y: "2%",  scale: 0.95, zIndex: 40, rotateZ: -3,  opacity: 0.8, backgroundColor: "#1C1C1E", color: "#D4D4D8", boxShadow: "0 15px 30px -10px rgba(0,0,0,0.7)" },
  right1:      { x: "88%",   y: "2%",  scale: 0.95, zIndex: 40, rotateZ:  3,  opacity: 0.8, backgroundColor: "#1C1C1E", color: "#D4D4D8", boxShadow: "0 15px 30px -10px rgba(0,0,0,0.7)" },
  left2:       { x: "-135%", y: "4%",  scale: 0.90, zIndex: 30, rotateZ: -6,  opacity: 0,   backgroundColor: "#151517", color: "#A1A1AA" },
  right2:      { x: "135%",  y: "4%",  scale: 0.90, zIndex: 30, rotateZ:  6,  opacity: 0,   backgroundColor: "#151517", color: "#A1A1AA" },
  left3:       { x: "-170%", y: "6%",  scale: 0.85, zIndex: 20, rotateZ: -9,  opacity: 0,   backgroundColor: "#0F0F11", color: "#71717A" },
  right3:      { x: "170%",  y: "6%",  scale: 0.85, zIndex: 20, rotateZ:  9,  opacity: 0,   backgroundColor: "#0F0F11", color: "#71717A" },
  center:      { x: "0%",    y: "0%",  scale: 1,    zIndex: 50, rotateZ:  0,  opacity: 1,   backgroundColor: "#EBEBEB", color: "#111827", boxShadow: "0 0 0 0px rgba(255,255,255,0), 0 30px 60px -10px rgba(0,0,0,0.9)" },
  hiddenLeft:  { x: "-200%", y: "8%",  scale: 0.80, zIndex: 10, rotateZ: -12, opacity: 0,   backgroundColor: "#0A0A0A", color: "#52525B" },
  hiddenRight: { x: "200%",  y: "8%",  scale: 0.80, zIndex: 10, rotateZ:  12, opacity: 0,   backgroundColor: "#0A0A0A", color: "#52525B" },
};

const desktopVariants: Variants = {
  center:      { x: "0%",    y: "0%",  scale: 1,    zIndex: 50, rotateZ:  0,  opacity: 1,   backgroundColor: "#EBEBEB", color: "#111827", boxShadow: "0 0 0 0px rgba(255,255,255,0), 0 30px 70px -10px rgba(0,0,0,1)"   },
  left1:       { x: "-62%",  y: "3%",  scale: 0.96, zIndex: 40, rotateZ: -4,  opacity: 1,   backgroundColor: "#19191B", color: "#E4E4E7", boxShadow: "0 20px 40px -10px rgba(0,0,0,0.8)" },
  right1:      { x: "62%",   y: "3%",  scale: 0.96, zIndex: 40, rotateZ:  4,  opacity: 1,   backgroundColor: "#19191B", color: "#E4E4E7", boxShadow: "0 20px 40px -10px rgba(0,0,0,0.8)" },
  left2:       { x: "-120%", y: "7%",  scale: 0.91, zIndex: 30, rotateZ: -8,  opacity: 1,   backgroundColor: "#141416", color: "#A1A1AA", boxShadow: "0 12px 25px -10px rgba(0,0,0,0.7)" },
  right2:      { x: "120%",  y: "7%",  scale: 0.91, zIndex: 30, rotateZ:  8,  opacity: 1,   backgroundColor: "#141416", color: "#A1A1AA", boxShadow: "0 12px 25px -10px rgba(0,0,0,0.7)" },
  left3:       { x: "-170%", y: "11%", scale: 0.86, zIndex: 20, rotateZ: -12, opacity: 0.8, backgroundColor: "#0E0E10", color: "#71717A", boxShadow: "0 6px 15px -10px rgba(0,0,0,0.6)"  },
  right3:      { x: "170%",  y: "11%", scale: 0.86, zIndex: 20, rotateZ:  12, opacity: 0.8, backgroundColor: "#0E0E10", color: "#71717A", boxShadow: "0 6px 15px -10px rgba(0,0,0,0.6)"  },
  hiddenLeft:  { x: "-210%", y: "15%", scale: 0.80, zIndex: 10, rotateZ: -16, opacity: 0,   backgroundColor: "#0A0A0A", color: "#52525B" },
  hiddenRight: { x: "210%",  y: "15%", scale: 0.80, zIndex: 10, rotateZ:  16, opacity: 0,   backgroundColor: "#0A0A0A", color: "#52525B" },
  active:      { x: "0%",    y: "0%",  scale: 1,    zIndex: 50, rotateZ:  0,  opacity: 1,   backgroundColor: "#EBEBEB", color: "#111827", boxShadow: "0 0 0 0px rgba(255,255,255,0), 0 30px 70px -10px rgba(0,0,0,1)"   },
  left:        { x: "-210%", y: "15%", scale: 0.80, zIndex: 10, rotateZ: -16, opacity: 0,   backgroundColor: "#0A0A0A", color: "#52525B" },
  right:       { x: "210%",  y: "15%", scale: 0.80, zIndex: 10, rotateZ:  16, opacity: 0,   backgroundColor: "#0A0A0A", color: "#52525B" },
};

interface TestimonialSectionProps {
  testimonials?: Testimonial[];
  autoPlayInterval?: number;
  className?: string;
}

export function TestimonialSection({
  testimonials = defaultTestimonials,
  autoPlayInterval = 4000,
  className,
}: TestimonialSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered,  setIsHovered]  = useState(false);
  const [isMobile,   setIsMobile]   = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const total = testimonials.length;

  const handleNext = useCallback(() => setActiveIndex((p) => (p + 1) % total), [total]);
  const handlePrev = useCallback(() => setActiveIndex((p) => (p - 1 + total) % total), [total]);

  useEffect(() => {
    if (isHovered || total <= 1) return;
    const timer = setInterval(handleNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isHovered, autoPlayInterval, handleNext, total]);

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowLeft")  handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  const getOffset = (index: number) => {
    let offset = (index - activeIndex) % total;
    if (offset >  Math.floor(total / 2)) offset -= total;
    if (offset < -Math.floor(total / 2)) offset += total;
    return offset;
  };

  const variants: Variants = isMobile ? mobileVariants : desktopVariants;

  return (
    <section
      className={cn(
        "relative w-full flex flex-col items-center justify-center overflow-hidden py-16 md:py-24 2xl:py-32 select-none focus:outline-none",
        className
      )}
      style={{ background: "#18181C", minHeight: "clamp(740px, 80vh, 1000px)" }}
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Section Header ── */}
      <div className="flex flex-col items-center text-center mb-12 md:mb-16 px-6 pointer-events-none select-none">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C19562]/30 bg-[#C19562]/10 text-[#C19562] text-xs font-medium tracking-widest uppercase mb-4">
          Ascendra Community
        </span>
        <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-semibold tracking-tight text-white leading-tight">
          Trusted by builders &amp; learners
        </h2>
        <p className="mt-3 text-sm md:text-base text-white/40 max-w-md">
          Real stories from people who learned, contributed, and grew their careers on Ascendra.
        </p>
      </div>

      {/* ── Card Stage ── */}
      <div className="relative w-full h-80 md:h-96 2xl:h-120 flex items-center justify-center">
        <AnimatePresence initial={false}>
          {testimonials.map((t, index) => {
            const offset   = getOffset(index);
            const isCenter = offset === 0;
            const absOffset = Math.abs(offset);

            let animateState: string;
            if (isMobile) {
              if      (offset ===  0)  animateState = "active";
              else if (offset === -1)  animateState = "left";
              else if (offset ===  1)  animateState = "right";
              else                     animateState = offset < 0 ? "hiddenLeft" : "hiddenRight";
            } else {
              if      (offset ===  0)  animateState = "center";
              else if (offset === -1)  animateState = "left1";
              else if (offset ===  1)  animateState = "right1";
              else if (offset === -2)  animateState = "left2";
              else if (offset ===  2)  animateState = "right2";
              else if (offset === -3)  animateState = "left3";
              else if (offset ===  3)  animateState = "right3";
              else                     animateState = offset < 0 ? "hiddenLeft" : "hiddenRight";
            }

            return (
              <motion.div
                key={t.id}
                variants={variants}
                initial={false}
                animate={animateState}
                whileHover={
                  isCenter
                    ? {
                        scale: 1.015,
                        y: "-1%",
                        boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.4), inset 0 0 20px rgba(255,255,255,0.1), 0 45px 90px -10px rgba(0,0,0,1)",
                      }
                    : {}
                }
                // Smoother, premium spring physics
                transition={{
                  x: { type: "spring", stiffness: 220, damping: 28, mass: 1 },
                  y: { type: "spring", stiffness: 220, damping: 28, mass: 1 },
                  rotateZ: { type: "spring", stiffness: 220, damping: 28, mass: 1 },
                  scale: { type: "spring", stiffness: 220, damping: 28, mass: 1 },
                  opacity: { duration: 0.2, ease: "easeInOut" },
                  backgroundColor: { duration: 0.2 },
                  boxShadow: { duration: 0.25 }
                }}
                onClick={() => {
                  if (!isCenter && absOffset <= 3) {
                    setActiveIndex((p) => (p + offset + total) % total);
                  }
                }}
                className={cn(
                  // Responsive sizing up to 2xl for 27" monitors
                  "absolute w-[320px] md:w-110 2xl:w-135 h-85 md:h-100 2xl:h-120",
                  "flex flex-col p-6 md:p-10 2xl:p-12 justify-between",
                  "overflow-hidden cursor-pointer group",
                  !isCenter && "border border-white/5 hover:border-white/10 transition-colors duration-300"
                )}
                style={{
                  clipPath: isCenter
                    ? "polygon(0% 0%, calc(100% - 60px) 0%, 100% 60px, 100% 100%, 0% 100%)"
                    : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                }}
                aria-hidden={!isCenter}
              >
                {/* ── Interactive Dog-Ear Flap ── */}
                <AnimatePresence>
                  {isCenter && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.12 } }}
                      transition={{ delay: 0.1, duration: 0.2, ease: "easeOut" }}
                      className="absolute top-0 right-0 w-15 h-15 z-20 shadow-sm transition-transform duration-300 origin-top-right group-hover:scale-110 group-hover:bg-white"
                      style={{
                        backgroundColor: "#D4D4D4",
                        clipPath: "polygon(100% 0%, 0% 100%, 100% 100%)",
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* ── Avatar ── */}
                <motion.div
                  className="relative z-10 shrink-0 mb-6 2xl:mb-8"
                  animate={{ opacity: isCenter ? 1 : 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 md:w-12 md:h-12 2xl:w-14 2xl:h-14 object-cover"
                    style={{ filter: isCenter ? "none" : "grayscale(0.6)" }}
                    loading="lazy"
                  />
                </motion.div>

                {/* ── Quote ── */}
                <motion.div
                  className="relative z-10 grow flex items-start"
                  animate={{ opacity: isCenter ? 1 : absOffset === 1 ? 0.9 : 0.6 }}
                  transition={{ duration: 0.2 }}
                >
                  <p
                    className={cn(
                      "font-medium leading-relaxed tracking-tight",
                      isCenter
                        ? "text-lg md:text-[22px] 2xl:text-[26px]"
                        : "text-base md:text-lg 2xl:text-xl line-clamp-4"
                    )}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </motion.div>

                {/* ── Signature ── */}
                <motion.div
                  className="relative z-10 shrink-0 flex flex-col text-[13px] md:text-[14px] 2xl:text-base italic mt-6 2xl:mt-8"
                  animate={{ opacity: isCenter ? 0.75 : 0.4 }}
                  transition={{ duration: 0.2 }}
                >
                  <p>- {t.name}, {t.title}</p>
                  {t.company && <p>at {t.company}</p>}
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ── Navigation Controls ── */}
      <div className="flex items-center gap-4 mt-8 2xl:mt-12 z-50">
        <button
          onClick={handlePrev}
          aria-label="Previous testimonial"
          suppressHydrationWarning
          className="flex items-center justify-center w-11 h-11 2xl:w-12 2xl:h-12 bg-[#151515] border border-[#2A2A2A] text-white hover:bg-white hover:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          aria-label="Next testimonial"
          suppressHydrationWarning
          className="flex items-center justify-center w-11 h-11 2xl:w-12 2xl:h-12 bg-[#151515] border border-[#2A2A2A] text-white hover:bg-white hover:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}