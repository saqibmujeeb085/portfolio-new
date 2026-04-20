import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Technologies", href: "/technologies" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Payment Policy", href: "/payment-policy" },
];

export function Footer() {
  return (
    <footer className="border-t border-surface-border bg-background text-foreground">
      <div className="ds-container py-12 md:py-16 xl:py-20">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-[1.2fr_0.8fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em]">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              Aura Tech Solutions
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-foreground/60 md:text-base">
              We design and build high-performance digital products that look
              sharp, scale fast, and convert better.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 md:gap-12">
            {/* Navigation */}
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-foreground/50">
                Navigation
              </p>

              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-cursor="hover"
                    className="text-sm font-medium tracking-[-0.01em] transition hover:opacity-70"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-foreground/50">
                Legal
              </p>

              <div className="flex flex-col gap-3">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-cursor="hover"
                    className="text-sm font-medium tracking-[-0.01em] transition hover:opacity-70"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-surface-border" />

        {/* Bottom */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="text-xs text-foreground/50">
            © {new Date().getFullYear()} Aura Tech Solutions. All rights
            reserved.
          </p>

          <div className="flex items-center gap-5">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-cursor="hover"
                className="text-xs text-foreground/50 transition hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
