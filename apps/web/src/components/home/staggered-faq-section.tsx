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

// ─── Sub-components ───────────────────────────────────────────────────────────
function PlusIcon({ position, activeClass = "" }: { position: string; activeClass?: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={cn(
        "absolute text-[#133C58] transition-colors duration-200 group-hover:text-[#1E527A]",
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
      className={cn("relative overflow-hidden pt-2 pb-8 md:pt-1 md:pb-20", className)}
      style={{ backgroundColor: "#041E37" }}
    >
      {/* Seamless top fade */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 z-10"
        style={{
          background: "linear-gradient(to bottom, #041E37 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">

        <div className="grid gap-16 md:grid-cols-12 md:gap-12 lg:gap-20">
          
          {/* ── Left column ── */}
          <div className="faq-left flex flex-col md:col-span-5 lg:col-span-5">
            <div>
              {/* Eyebrow Label */}
              <div 
                className="mb-8 inline-flex items-center gap-2 border border-dashed border-[#133C58] bg-[#062238] px-3 py-1.5"
              >
                <span className="flex h-2 w-2 items-center justify-center border border-[#C19562]">
                  <span className="h-0.5 w-0.5 bg-[#C19562]" />
                </span>
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
                className="mt-6 text-[14px] leading-relaxed text-white/50 max-w-md text-balance"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                {subtitle}
              </p>
            </div>

            {/* Support Card */}
            {!hideSupport && (
              <div className="mt-14 md:mt-auto md:pt-24">
                <div className="group relative border border-dashed border-[#133C58] bg-[#062238] p-8 transition-colors duration-200 hover:border-[#1E527A]">
                  <PlusIcon position="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
                  <PlusIcon position="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
                  <PlusIcon position="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
                  <PlusIcon position="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />
                  
                  <div className="relative z-10">
                    <h3 
                      className="mb-3 text-xl font-bold tracking-tight text-white"
                      style={{ fontFamily: "var(--font-plus-jakarta)" }}
                    >
                      Still have questions?
                    </h3>
                    <p 
                      className="mb-8 max-w-[260px] text-[13.5px] leading-relaxed text-white/45"
                      style={{ fontFamily: "var(--font-plus-jakarta)" }}
                    >
                      {supportText}
                    </p>
                    <Link
                      href={supportLink}
                      className="group/btn relative inline-flex h-11 items-center gap-2.5 border border-dashed border-[#133C58] bg-[#0A2D48] px-7 text-sm font-semibold text-white/55 transition-colors duration-200 hover:border-[#C19562] hover:text-white/90"
                      style={{ fontFamily: "var(--font-plus-jakarta)" }}
                    >
                      <PlusIcon position="top-0 left-0 -translate-x-1/2 -translate-y-1/2 group-hover/btn:text-[#C19562]" />
                      <PlusIcon position="bottom-0 right-0 translate-x-1/2 translate-y-1/2 group-hover/btn:text-[#C19562]" />
                      
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

          {/* ── Accordion (Right Column) ── */}
          <div className="flex flex-col justify-center md:col-span-7 lg:col-span-7">
            <Accordion
              multiple={false}
              defaultValue={defaultOpen ? [defaultOpen] : undefined}
              className="flex flex-col gap-6"
            >
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className={cn(
                    "faq-item group relative border border-dashed border-[#133C58] bg-[#0A2D48] transition-colors duration-200",
                    "hover:border-[#1E527A] data-[state=open]:border-[#1E527A]"
                  )}
                >
                  {/* Plus Overlays */}
                  <PlusIcon position="top-0 left-0 -translate-x-1/2 -translate-y-1/2" activeClass="group-data-[state=open]:text-[#C19562]" />
                  <PlusIcon position="top-0 right-0 translate-x-1/2 -translate-y-1/2" activeClass="group-data-[state=open]:text-[#C19562]" />
                  <PlusIcon position="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" activeClass="group-data-[state=open]:text-[#C19562]" />
                  <PlusIcon position="bottom-0 right-0 translate-x-1/2 translate-y-1/2" activeClass="group-data-[state=open]:text-[#C19562]" />

                  {/* Active Gold Edge Accent */}
                  <div className="absolute left-0 top-0 h-full w-[2px] bg-[#C19562] opacity-0 transition-opacity duration-300 group-data-[state=open]:opacity-100" />

                  <AccordionTrigger
                    className={cn(
                      "relative z-10 cursor-pointer px-6 py-6 text-left transition-all duration-200 hover:no-underline md:px-8",
                      // Technical sharp chevron styling
                      "[&>svg]:box-content [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0 [&>svg]:border [&>svg]:border-dashed [&>svg]:border-[#133C58] [&>svg]:bg-[#062238] [&>svg]:p-2 [&>svg]:text-white/50 [&>svg]:transition-all",
                      "hover:[&>svg]:border-[#1E527A] hover:[&>svg]:text-white/90 group-data-[state=open]:[&>svg]:border-[#C19562] group-data-[state=open]:[&>svg]:text-[#C19562]"
                    )}
                  >
                    <span 
                      className="pr-6 text-[15px] font-bold leading-snug text-white transition-colors duration-200"
                      style={{ fontFamily: "var(--font-plus-jakarta)" }}
                    >
                      {item.question}
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="relative z-10 max-w-[95%] px-6 pb-7 pt-0 text-[14px] leading-relaxed text-white/50 md:px-8">
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