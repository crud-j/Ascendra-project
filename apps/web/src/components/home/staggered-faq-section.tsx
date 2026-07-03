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

      // Left column
      const leftCol = section?.querySelector<HTMLElement>(".faq-left");
      if (leftCol) {
        gsap.fromTo(
          leftCol,
          { opacity: 0, x: -32, filter: "blur(8px)" },
          {
            opacity: 1, x: 0, filter: "blur(0px)",
            duration: 1, ease: "power3.out",
            clearProps: "filter,transform",
            scrollTrigger: { trigger: section, start: "top 80%", once: true },
          }
        );
      }

      // Accordion items stagger
      const items = section?.querySelectorAll<HTMLElement>(".faq-item");
      if (items?.length) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 28, filter: "blur(6px)" },
          {
            opacity: 1, y: 0, filter: "blur(0px)",
            duration: 0.8, stagger: 0.1, ease: "power3.out",
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
      className={cn("relative overflow-hidden py-24 md:py-32", className)}
      style={{ backgroundColor: "#041E37" }}
    >
      {/* Top: seamless continuation from JourneySection (#041E37 → transparent) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{ background: "linear-gradient(to bottom, #041E37 0%, transparent 100%)" }}
      />



      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-5 md:gap-16">

          {/* Left column */}
          <div className="faq-left md:col-span-2">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-7 bg-[#C19562]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#C19562]">
                FAQ
              </span>
            </div>

            <h2 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl">
              {title}
            </h2>
            <p className="mt-5 text-[15px] leading-[1.75] text-white/50 text-balance">
              {subtitle}
            </p>

            {!hideSupport && (
              <p className="mt-8 hidden text-[13.5px] leading-relaxed text-white/35 md:block">
                {supportText}{" "}
                <Link
                  href={supportLink}
                  className="font-medium text-[#C19562] hover:text-[#FCE8C0] transition-colors underline-offset-2 hover:underline"
                >
                  {supportLinkText}
                </Link>{" "}
                for assistance.
              </p>
            )}
          </div>

          {/* Accordion */}
          <div className="md:col-span-3">
            <Accordion defaultValue={defaultOpen ? [defaultOpen] : undefined}>
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="faq-item border-b border-white/8"
                >
                  <AccordionTrigger className="cursor-pointer py-5 text-left text-[15px] font-semibold text-white/90 hover:text-white hover:no-underline transition-colors duration-200 [&[data-state=open]]:text-white">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-[14px] leading-[1.8] text-white/50">
                    <BlurredStagger text={item.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {!hideSupport && (
            <p className="text-[13.5px] text-white/35 md:hidden">
              {supportText}{" "}
              <Link
                href={supportLink}
                className="font-medium text-[#C19562] hover:underline"
              >
                {supportLinkText}
              </Link>
            </p>
          )}
        </div>
      </div>

    </section>
  );
}
