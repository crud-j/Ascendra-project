"use client";

import { cn } from "@/lib/utils";

const themeMap = {
  dark:   "bg-[#18181C] text-white",
  light:  "bg-[#FAFAFA] text-zinc-900",
  accent: "bg-[#041E37] text-white",
};

const spacingMap = {
  lg: "py-24 sm:py-28",
  xl: "py-32 sm:py-40",
};

interface SectionContainerProps {
  children: React.ReactNode;
  theme?: "dark" | "light" | "accent";
  divider?: "none" | "gradient" | "fade";
  spacing?: "lg" | "xl";
  className?: string;
  id?: string;
}

export function SectionContainer({
  children,
  theme = "dark",
  divider = "none",
  spacing = "lg",
  className,
  id,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full overflow-hidden",
        themeMap[theme],
        spacingMap[spacing],
        className
      )}
    >
      {divider === "gradient" && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      )}
      {divider === "fade" && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-black/25 to-transparent" />
      )}
      {children}
    </section>
  );
}
