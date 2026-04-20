import { AboutPageHero } from "@/components/sections/about-page-hero";
import { AboutStorySection } from "@/components/sections/about-story-section";
import { AboutPillarsSection } from "@/components/sections/about-pillars-section";
import { AboutProcessSection } from "@/components/sections/about-process-section";
import { AboutCtaSection } from "@/components/sections/about-cta-section";

export default function AboutPage() {
  return (
    <>
      <AboutPageHero />
      <AboutStorySection />
      <AboutPillarsSection />
      <AboutProcessSection />
      <AboutCtaSection />
    </>
  );
}
