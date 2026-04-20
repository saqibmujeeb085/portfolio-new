import { ContactForm } from "@/components/forms/contact-form";
import { ContactInfo } from "@/components/sections/contact-info";

export default function ContactPage() {
  return (
    <section className="bg-background text-foreground">
      <div className="ds-container py-16 md:py-20 xl:py-24">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-foreground/50">
            Contact
          </p>
          <h1 className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl xl:text-7xl">
            Let’s talk about your next digital move
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-foreground/65 md:text-base">
            Share your requirements, timeline, and service needs. We’ll help you
            shape the right digital solution for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </section>
  );
}
