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
    href: "#",
  },
];

export function ContactInfo() {
  return (
    <div className="rounded-[32px] border border-surface-border bg-card p-6 text-card-foreground shadow-[var(--shadow-soft)] md:p-8">
      <p className="mb-3 text-sm uppercase tracking-[0.2em] text-foreground/50">
        Contact Information
      </p>

      <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
        Let’s connect and build something meaningful
      </h2>

      <p className="mt-4 max-w-md text-sm leading-6 text-foreground/65 md:text-base">
        Whether you need a high-converting website, a scalable digital product,
        or a stronger brand experience, we’d love to hear from you.
      </p>

      <div className="mt-8 space-y-5">
        {contactItems.map((item) => (
          <div
            key={item.label}
            className="rounded-[22px] border border-surface-border bg-secondary p-5"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-foreground/45">
              {item.label}
            </p>

            {item.href === "#" ? (
              <p className="mt-2 text-base font-medium tracking-[-0.02em] md:text-lg">
                {item.value}
              </p>
            ) : (
              <Link
                href={item.href}
                className="mt-2 block text-base font-medium tracking-[-0.02em] transition hover:opacity-70 md:text-lg"
              >
                {item.value}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
