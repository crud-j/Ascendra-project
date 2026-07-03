"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface ScrollTextRiseProps {
  leftText: string;
  rightText: string;
  leftLabel?: string;
  rightLabel?: string;
  className?: string;
}

const ScrollTextRise: FC<ScrollTextRiseProps> = ({
  leftText,
  rightText,
  leftLabel,
  rightLabel,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Outer div is 280vh — provides the scroll runway.
  // Inner div is sticky at 100vh — stays pinned while the page scrolls through.
  // scrollYProgress: 0 when section top hits viewport top, 1 when section bottom
  // hits viewport bottom. This makes the animation bidirectional and accurate.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const leftWords = leftText.split(" ");
  const rightWords = rightText.split(" ");

  return (
    <div ref={containerRef} className={cn("relative h-[280vh]", className)}>
      {/* Pinned viewport — freezes in place while outer container scrolls */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative flex h-full flex-col justify-between px-8 py-16 md:px-16 md:py-20">

          {/* ── Top-left block ── */}
          <div className="max-w-[62%]">
            {leftLabel && (
              <span className="font-body mb-5 block text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {leftLabel}
              </span>
            )}
            <p className="font-heading flex flex-wrap text-[2.6rem] font-semibold leading-[1.1] tracking-tight md:text-[3.2rem] lg:text-[4rem]">
              {leftWords.map((word, i) => {
                const total = leftWords.length;
                // Left text reveals over the first 45% of scroll progress
                const start = 0.02 + (i / total) * 0.38;
                const end = Math.min(start + 0.08, 0.48);
                return (
                  <RevealWord key={`left-${i}`} progress={scrollYProgress} range={[start, end]}>
                    {word}
                  </RevealWord>
                );
              })}
            </p>
          </div>

          {/* ── Bottom-right block ── */}
          <div className="flex flex-col items-end self-end max-w-[58%] text-right">
            {rightLabel && (
              <span className="font-body mb-5 block text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {rightLabel}
              </span>
            )}
            <p className="font-heading flex flex-wrap justify-end text-[2.6rem] font-semibold leading-[1.1] tracking-tight md:text-[3.2rem] lg:text-[4rem]">
              {rightWords.map((word, i) => {
                const total = rightWords.length;
                // Right text reveals over the second 45% of scroll progress,
                // creating a two-act narrative as the user scrolls through.
                const start = 0.52 + (i / total) * 0.38;
                const end = Math.min(start + 0.08, 0.97);
                return (
                  <RevealWord key={`right-${i}`} progress={scrollYProgress} range={[start, end]}>
                    {word}
                  </RevealWord>
                );
              })}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

interface RevealWordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const RevealWord: FC<RevealWordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [32, 0]);

  return (
    <span className="relative mr-[0.28em] overflow-hidden">
      {/* Ghost keeps layout stable and hints at the unrevealed text */}
      <span className="text-foreground/[0.12] select-none" aria-hidden>
        {children}
      </span>
      <motion.span
        style={{ opacity, y }}
        className="absolute inset-0 text-foreground"
      >
        {children}
      </motion.span>
    </span>
  );
};

export { ScrollTextRise };
