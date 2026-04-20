import Link from "next/link";

export function AboutCtaSection() {
  return (
    <section className="bg-background text-foreground">
      <div className="ds-container py-16 md:py-20 xl:py-24">
        <div className="rounded-[32px] border border-surface-border bg-card p-8 text-center shadow-[var(--shadow-soft)] md:p-12 xl:p-16">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-foreground/50">
            Let’s Build Something Great
          </p>

          <h2 className="mx-auto max-w-4xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
            Ready to create a digital experience that actually moves your brand
            forward?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-foreground/68 md:text-base">
            Whether you need a sharp marketing website, a scalable product
            system, or a stronger digital presence, we’re ready to shape it with
            you.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              data-cursor="accent"
              className="ds-button ds-button-primary h-12 px-6 text-sm font-medium"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
