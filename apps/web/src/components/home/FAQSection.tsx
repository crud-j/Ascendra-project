// Named re-export wrapper so page.tsx can use { FAQSection } import style
import StaggeredFAQSection, { type StaggeredFAQProps } from "./staggered-faq-section";

export function FAQSection(props: StaggeredFAQProps) {
  return <StaggeredFAQSection {...props} />;
}
