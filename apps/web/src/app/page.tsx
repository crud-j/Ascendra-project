import { HeroSection }          from "@/components/home/HeroSection";
import { WhyAscendraSection }   from "@/components/home/WhyAscendraSection";
import { ProductPreviewSection } from "@/components/home/ProductPreviewSection";
import { JourneySection }       from "@/components/home/JourneySection";
import { EconomySection }       from "@/components/home/EconomySection";
import { PortfolioSection }     from "@/components/home/PortfolioSection";
import { GuildSection }         from "@/components/home/GuildSection";
import { MentorSection }        from "@/components/home/MentorSection";
import { AICoachSection }       from "@/components/home/AICoachSection";
import { CoursesSection }       from "@/components/home/CoursesSection";
import { TestimonialSection }   from "@/components/home/TestimonialSection";
import { FAQSection }           from "@/components/home/FAQSection";
import { RoadmapSection }       from "@/components/home/RoadmapSection";
import { CtaSection }           from "@/components/home/CtaSection";
import { SiteFooter }           from "@/components/home/SiteFooter";

const ASCENDRA_FAQS = [
  {
    id: "faq-1",
    question: "What is Ascendra?",
    answer:
      "Ascendra is a learning ecosystem where you don't just complete courses. You build real projects, contribute to a community, and earn Skill Coins you can actually withdraw — backed by validated contribution, not speculation.",
  },
  {
    id: "faq-2",
    question: "How does the three-currency economy work?",
    answer:
      "Ascendra uses three strictly separated currencies: XP tracks your lifetime learning progress, Reputation reflects your community trust and can rise or fall based on your conduct, and Skill Coins are real transferable value earned through validated contributions like mentorship, bounties, and accepted answers.",
  },
  {
    id: "faq-3",
    question: "Do I need a crypto wallet to use Ascendra?",
    answer:
      "No. You can use Ascendra entirely without a wallet for day-to-day activity. A wallet is only required if you want to hold Skill Coins on-chain or access blockchain-anchored credentials on Aptos.",
  },
  {
    id: "faq-4",
    question: "How do I become a mentor?",
    answer:
      "There's no application. When your Reputation reaches 1,000 — earned through answering questions, submitting projects, publishing articles, and other validated contributions — the Mentor role unlocks automatically. Contribution earns access, not payment.",
  },
  {
    id: "faq-5",
    question: "Can learning alone earn me Skill Coins?",
    answer:
      "No — and this is by design. Learning earns XP only. Skill Coins are minted exclusively through validated contribution events: accepted answers, completed mentorship sessions, bounties, and community projects. This keeps the economy honest and valuable.",
  },
  {
    id: "faq-6",
    question: "What are Guilds?",
    answer:
      "Guilds are discipline-specific communities (Frontend, AI, Blockchain, Cybersecurity, etc.) that compete weekly for XP and run collaborative bounties. Joining a guild connects you with peers at your level and opens access to group projects and guild-exclusive competitions.",
  },
  {
    id: "faq-7",
    question: "Is Ascendra available on mobile?",
    answer:
      "The web app is mobile-responsive. Native iOS and Android apps are on the roadmap and planned for a future release. Early access members will get first access.",
  },
];

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <div data-section="hero"><HeroSection /></div>
      <div data-section="why-ascendra"><WhyAscendraSection /></div>
      <div data-section="product-preview"><ProductPreviewSection /></div>
      <div data-section="journey"><JourneySection /></div>
      <div data-section="economy"><EconomySection /></div>
      <div data-section="portfolio"><PortfolioSection /></div>
      <div data-section="guild"><GuildSection /></div>
      <div data-section="mentor"><MentorSection /></div>
      <div data-section="ai-coach"><AICoachSection /></div>
      <div data-section="courses"><CoursesSection /></div>
      <div data-section="testimonial"><TestimonialSection /></div>
      <div data-section="faq">
        <FAQSection
          title="FAQs"
          subtitle="Common questions about Ascendra answered."
          supportText="Still have questions? Reach out to our"
          supportLinkText="support team"
          supportLink="/support"
          faqItems={ASCENDRA_FAQS}
          defaultOpen="faq-1"
        />
      </div>
      <div data-section="roadmap"><RoadmapSection /></div>
      <div data-section="cta"><CtaSection /></div>
      <div data-section="footer"><SiteFooter /></div>
    </div>
  );
}
