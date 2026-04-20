import Link from "next/link";

export function CtaSection() {
  return (
    <section className="bg-background text-foreground">
      <div className="ds-container py-16 md:py-20 xl:py-24">
        <div className="relative overflow-hidden rounded-[32px] border border-surface-border bg-card shadow-[var(--shadow-soft)]">
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl md:h-[420px] md:w-[420px]"
              style={{
                background:
                  "color-mix(in srgb, var(--accent) 16%, transparent)",
              }}
            />
          </div>

          <div className="relative px-6 py-12 text-center md:px-10 md:py-16 xl:px-16 xl:py-20">
            <p className="mb-4 text-sm uppercase tracking-[0.22em] text-foreground/50">
              Let’s Work Together
            </p>

            <h2 className="mx-auto max-w-5xl text-4xl font-semibold leading-[0.96] tracking-[-0.05em] md:text-6xl xl:text-[72px]">
              Ready to build something that looks sharp and performs harder?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-foreground/68 md:text-base md:leading-7">
              From premium marketing websites to scalable digital systems, we
              help brands create experiences that feel better, work smarter, and
              move business forward.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                data-cursor="accent"
                className="ds-button ds-button-primary h-12 px-6 text-sm font-medium"
              >
                Start Your Project
              </Link>

              <Link
                href="/about"
                data-cursor="hover"
                className="ds-button ds-button-secondary h-12 px-6 text-sm font-medium"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
