import { getFeaturedTestimonials } from "@/lib/sanity/fetch";
import { TestimonialsSliderSection } from "@/components/sections/testimonials-slider-section";

export async function HomeTestimonialsSection() {
  const testimonials = await getFeaturedTestimonials();

  return <TestimonialsSliderSection testimonials={testimonials} />;
}
