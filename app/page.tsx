import { AboutUsSection } from "@/components/sections/about-us-section";
import { CtaSection } from "@/components/sections/cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HomeBlogsSection } from "@/components/sections/home-blogs-section";
import { HomeContactSection } from "@/components/sections/home-contact-section";
import HomeProjectsSection from "@/components/sections/home-projects-section";
import { HomeTestimonialsSection } from "@/components/sections/home-testimonials-section";
import { PresenceSection } from "@/components/sections/presence-section";
import { TechnologyExpertiseSection } from "@/components/sections/technology-expertise-section";

export default function HomePage() {
  return (
    <>
      {/* other sections */}
      <HeroSection />
      <AboutUsSection />
      <HomeProjectsSection />
      <PresenceSection />
      <TechnologyExpertiseSection />
      <CtaSection />
      <HomeTestimonialsSection />
      <HomeBlogsSection />
      <HomeContactSection />
    </>
  );
}
