import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { EconomySection } from "@/components/home/EconomySection";
import { JourneySection } from "@/components/home/JourneySection";
import { CoursesSection } from "@/components/home/CoursesSection";
import { CtaSection } from "@/components/home/CtaSection";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { SiteFooter } from "@/components/home/SiteFooter";
import StaggeredFAQSection from "@/components/home/staggered-faq-section";

const ASCENDRA_FAQS = [
  {
    id: "faq-1",
    question: "What is Ascendra?",
    answer:
      "Ascendra is a creator economy platform that lets you monetize your skills, knowledge, and content through a three-currency ecosystem — combining on-chain assets with platform credits and engagement rewards.",
  },
  {
    id: "faq-2",
    question: "How does the three-currency economy work?",
    answer:
      "Ascendra uses three currencies: ASC (the on-chain governance and value token), Credits (spendable platform currency for services and subscriptions), and Sparks (earned through engagement and contributions). Each currency serves a distinct role so creators and fans both benefit from growth on the platform.",
  },
  {
    id: "faq-3",
    question: "Do I need a crypto wallet to use Ascendra?",
    answer:
      "No. You can use Ascendra entirely without a wallet for day-to-day activity. A wallet is only required if you want to hold or transfer ASC tokens on-chain or participate in governance.",
  },
  {
    id: "faq-4",
    question: "How do creators get paid?",
    answer:
      "Creators earn Credits directly from subscriptions, tips, and content sales on the platform. Credits can be cashed out or exchanged for ASC tokens. Sparks earned through community engagement can also be converted under platform rules.",
  },
  {
    id: "faq-5",
    question: "What AI tools are available on Ascendra?",
    answer:
      "Ascendra ships with a built-in AI ecosystem that helps creators generate content ideas, analyse audience engagement, automate scheduling, and personalise fan experiences — all without leaving the platform.",
  },
  {
    id: "faq-6",
    question: "Is Ascendra available on mobile?",
    answer:
      "Yes. Ascendra is designed mobile-first. Native iOS and Android apps are planned for launch alongside the web platform.",
  },
];

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <EconomySection />
      <JourneySection />
      <CoursesSection />
      <StaggeredFAQSection
        title="FAQs"
        subtitle="Common questions about Ascendra answered."
        supportText="Still have questions? Reach out to our"
        supportLinkText="support team"
        supportLink="/support"
        faqItems={ASCENDRA_FAQS}
        defaultOpen="faq-1"
      />
      <CtaSection />
      <TestimonialSection />
      <SiteFooter />
    </div>
  );
}
