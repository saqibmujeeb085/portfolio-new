import Link from "next/link";

const contactItems = [
  {
    label: "Email",
    value: "hello@auratechsolutions.com",
    href: "mailto:hello@auratechsolutions.com",
  },
  {
    label: "Phone",
    value: "+92 300 1234567",
    href: "tel:+923001234567",
  },
  {
    label: "Location",
    value: "Karachi, Pakistan",
    href: "/contact",
  },
];

export function HomeContactSection() {
  return (
    <section className="bg-background text-foreground">
      <div className="ds-container py-16 md:py-20 xl:py-24">
        <div className="overflow-hidden rounded-[32px] border border-surface-border bg-card shadow-[var(--shadow-soft)]">
          <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="border-b border-surface-border p-6 md:p-8 xl:border-b-0 xl:border-r xl:p-10">
              <p className="mb-4 text-sm uppercase tracking-[0.22em] text-foreground/50">
                Contact
              </p>

              <h2 className="max-w-3xl text-4xl font-semibold leading-[0.96] tracking-[-0.05em] md:text-6xl xl:text-[72px]">
                Let’s build something sharp, scalable, and built to perform.
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-6 text-foreground/68 md:text-base md:leading-7">
                Whether you need a premium marketing website, a scalable product
                system, or a stronger digital experience, we’re ready to shape
                it with you.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
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

            <div className="p-6 md:p-8 xl:p-10">
              <div className="grid grid-cols-1 gap-4">
                {contactItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    data-cursor="hover"
                    className="group rounded-[24px] border border-surface-border bg-secondary p-5 transition duration-300 hover:-translate-y-1"
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-foreground/45">
                      {item.label}
                    </p>

                    <div className="mt-3 flex items-center justify-between gap-4">
                      <p className="text-base font-medium tracking-[-0.02em] md:text-lg">
                        {item.value}
                      </p>

                      <span className="text-sm text-foreground/40 transition group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 rounded-[24px] border border-surface-border p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-foreground/45">
                  Availability
                </p>
                <p className="mt-3 text-sm leading-6 text-foreground/68 md:text-base">
                  Open for selected collaborations, digital builds, and
                  high-impact product experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
