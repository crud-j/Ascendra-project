"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text";
import Link from "next/link";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface StaggeredFAQProps {
  title?: string;
  subtitle?: string;
  supportText?: string;
  supportLink?: string;
  supportLinkText?: string;
  faqItems: FAQItem[];
  className?: string;
  hideSupport?: boolean;
  defaultOpen?: string;
}

// ─── Corner cross icon ────────────────────────────────────────────────────────
// Transitions from dim white → bright white on group hover → gold when open.
function PlusIcon({ position, activeClass = "" }: { position: string; activeClass?: string }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 15 15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={cn(
        "absolute text-white/[0.12] transition-all duration-300 group-hover:text-white/[0.35]",
        position,
        activeClass
      )}
    >
      <path d="M7.5 0V15M0 7.5H15" />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function StaggeredFAQSection({
  title = "FAQ",
  subtitle = "Everything you need to know about Ascendra.",
  supportText = "Can't find what you're looking for? Reach out to our",
  supportLink = "#",
  supportLinkText = "support team",
  faqItems,
  className,
  hideSupport = false,
  defaultOpen,
}: StaggeredFAQProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;

      const leftCol = section?.querySelector<HTMLElement>(".faq-left");
      if (leftCol) {
        gsap.fromTo(
          leftCol,
          { opacity: 0, x: -32, filter: "blur(8px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            clearProps: "filter,transform",
            scrollTrigger: { trigger: section, start: "top 80%", once: true },
          }
        );
      }

      const items = section?.querySelectorAll<HTMLElement>(".faq-item");
      if (items?.length) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 32, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "filter,transform",
            scrollTrigger: { trigger: section, start: "top 75%", once: true },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn("relative overflow-hidden pt-24 pb-24 sm:pt-32 sm:pb-32", className)}
      style={{ backgroundColor: "#18181C" }}
    >
      {/* Top separator line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center px-6 lg:px-8">
        <svg width="13" height="13" viewBox="0 0 15 15" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" className="shrink-0">
          <path d="M7.5 0V15M0 7.5H15" />
        </svg>
        <div className="flex-1 border-t border-dashed border-white/[0.07]" />
        <div className="mx-4 h-2.5 w-2.5 rotate-45 border border-dashed border-[#C19562]/40" />
        <div className="flex-1 border-t border-dashed border-white/[0.07]" />
        <svg width="13" height="13" viewBox="0 0 15 15" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" className="shrink-0">
          <path d="M7.5 0V15M0 7.5H15" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 md:grid-cols-12 md:gap-12 lg:gap-20">

          {/* ── Left column ── */}
          <div className="faq-left flex flex-col md:col-span-5 lg:col-span-5">
            <div>
              {/* Eyebrow */}
              <div className="mb-8 inline-flex items-center gap-2 rounded-sm border border-dashed border-white/[0.10] bg-white/[0.03] px-3 py-1.5">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#C19562]" />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C19562]"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  Questions
                </span>
              </div>

              {/* Title */}
              <h2
                className="text-[2.25rem] font-extrabold leading-[1.1] tracking-[-0.025em] text-white sm:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                {title}
              </h2>

              {/* Subtitle */}
              <p
                className="mt-6 max-w-md text-balance text-[14px] leading-relaxed text-white/45"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                {subtitle}
              </p>
            </div>

            {/* Support card */}
            {!hideSupport && (
              <div className="mt-14 md:mt-auto md:pt-24">
                {/* Outer group — dashed border that glows gold on hover */}
                <div className="group relative border border-dashed border-white/[0.09] bg-[#1C1C1E] p-8 transition-all duration-300 hover:border-[#C19562]/40 hover:shadow-[0_0_24px_-4px_rgba(193,149,98,0.12)]">
                  {/* Corners */}
                  <PlusIcon position="top-0 left-0 -translate-x-1/2 -translate-y-1/2" activeClass="group-hover:text-[#C19562]/60" />
                  <PlusIcon position="top-0 right-0 translate-x-1/2 -translate-y-1/2"  activeClass="group-hover:text-[#C19562]/60" />
                  <PlusIcon position="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" activeClass="group-hover:text-[#C19562]/60" />
                  <PlusIcon position="bottom-0 right-0 translate-x-1/2 translate-y-1/2" activeClass="group-hover:text-[#C19562]/60" />

                  {/* Subtle inner glow */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(193,149,98,0.06) 0%, transparent 70%)" }}
                  />

                  <div className="relative z-10">
                    <h3
                      className="mb-3 text-xl font-bold tracking-tight text-white"
                      style={{ fontFamily: "var(--font-plus-jakarta)" }}
                    >
                      Still have questions?
                    </h3>
                    <p
                      className="mb-8 max-w-[260px] text-[13.5px] leading-relaxed text-white/40"
                      style={{ fontFamily: "var(--font-plus-jakarta)" }}
                    >
                      {supportText}
                    </p>

                    {/* CTA button */}
                    <Link
                      href={supportLink}
                      className="group/btn relative inline-flex h-11 items-center gap-2.5 border border-dashed border-white/[0.10] bg-white/[0.04] px-7 text-sm font-semibold text-white/50 transition-all duration-300 hover:border-[#C19562]/50 hover:bg-[#C19562]/[0.06] hover:text-white/85"
                      style={{ fontFamily: "var(--font-plus-jakarta)" }}
                    >
                      <PlusIcon position="top-0 left-0 -translate-x-1/2 -translate-y-1/2" activeClass="group-hover/btn:text-[#C19562]/70" />
                      <PlusIcon position="bottom-0 right-0 translate-x-1/2 translate-y-1/2" activeClass="group-hover/btn:text-[#C19562]/70" />

                      {supportLinkText}
                      <svg
                        className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Accordion (right column) ── */}
          <div className="flex flex-col justify-center md:col-span-7 lg:col-span-7">
            <Accordion
              multiple={false}
              defaultValue={defaultOpen ? [defaultOpen] : undefined}
              className="flex flex-col gap-5"
            >
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className={cn(
                    "faq-item group relative border border-dashed border-white/[0.09] bg-[#1C1C1E]",
                    "transition-all duration-300",
                    // Hover: brighten border + subtle gold tint
                    "hover:border-white/[0.20] hover:shadow-[0_0_20px_-6px_rgba(255,255,255,0.06)]",
                    // Open: gold border + gold glow
                    "data-[state=open]:border-[#C19562]/40 data-[state=open]:shadow-[0_0_24px_-4px_rgba(193,149,98,0.10)]"
                  )}
                >
                  {/* Corner crosses — dim at rest, bright on hover, gold when open */}
                  <PlusIcon position="top-0 left-0 -translate-x-1/2 -translate-y-1/2"  activeClass="group-data-[state=open]:text-[#C19562]/70" />
                  <PlusIcon position="top-0 right-0 translate-x-1/2 -translate-y-1/2"   activeClass="group-data-[state=open]:text-[#C19562]/70" />
                  <PlusIcon position="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" activeClass="group-data-[state=open]:text-[#C19562]/70" />
                  <PlusIcon position="bottom-0 right-0 translate-x-1/2 translate-y-1/2" activeClass="group-data-[state=open]:text-[#C19562]/70" />

                  {/* Left gold accent stripe — slides in when open */}
                  <div className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-gradient-to-b from-[#FCE8C0] via-[#C19562] to-transparent transition-transform duration-500 ease-out group-data-[state=open]:scale-y-100" />

                  {/* Radial glow when open */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-data-[state=open]:opacity-100"
                    style={{ background: "radial-gradient(ellipse 80% 50% at 0% 50%, rgba(193,149,98,0.06) 0%, transparent 70%)" }}
                  />

                  <AccordionTrigger
                    className={cn(
                      "relative z-10 cursor-pointer px-6 py-6 text-left transition-all duration-200 hover:no-underline md:px-8",
                      // Chevron icon: dashed border style matching the charcoal palette
                      "[&>svg]:box-content [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0",
                      "[&>svg]:border [&>svg]:border-dashed [&>svg]:border-white/[0.10]",
                      "[&>svg]:bg-white/[0.03] [&>svg]:p-2 [&>svg]:text-white/40",
                      "[&>svg]:transition-all [&>svg]:duration-300",
                      "hover:[&>svg]:border-white/[0.22] hover:[&>svg]:text-white/75",
                      "group-data-[state=open]:[&>svg]:border-[#C19562]/50 group-data-[state=open]:[&>svg]:text-[#C19562]"
                    )}
                  >
                    <span
                      className="pr-6 text-[15px] font-bold leading-snug text-white/80 transition-colors duration-200 group-hover:text-white group-data-[state=open]:text-white"
                      style={{ fontFamily: "var(--font-plus-jakarta)" }}
                    >
                      {item.question}
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="relative z-10 max-w-[95%] px-6 pb-7 pt-0 text-[14px] leading-relaxed text-white/45 md:px-8">
                    <BlurredStagger text={item.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

        </div>
      </div>
    </section>
  );
}
