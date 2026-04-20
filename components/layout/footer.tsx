import Link from "next/link";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { getFooterLegalPages } from "@/lib/sanity/fetch";

// Default fallback navigation
const defaultNavLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Technologies", href: "/technologies" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export async function Footer() {
  // Fetch site settings and legal pages
  const [siteSettings, legalPages] = await Promise.all([
    getSiteSettings(),
    getFooterLegalPages(),
  ]);

  const navLinks = siteSettings?.navigationLinks || defaultNavLinks;
  const siteTitle = siteSettings?.title || "Aura Tech Solutions";
  const siteDescription =
    siteSettings?.description ||
    "We design and build high-performance digital products that look sharp, scale fast, and convert better.";
  const copyrightText =
    siteSettings?.copyrightText || "Aura Tech Solutions. All rights reserved.";
  const showLegal = siteSettings?.showLegalInFooter !== false;

  return (
    <footer className="border-t border-surface-border bg-background text-foreground">
      <div className="ds-container py-12 md:py-16 xl:py-20">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-[1.2fr_0.8fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em]">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              {siteTitle}
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-foreground/60 md:text-base">
              {siteDescription}
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

            {/* Legal - Only show if enabled and has pages */}
            {showLegal && legalPages.length > 0 && (
              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.2em] text-foreground/50">
                  Legal
                </p>

                <div className="flex flex-col gap-3">
                  {legalPages.map((page) => (
                    <Link
                      key={page._id}
                      href={`/legal/${page.slug}`}
                      data-cursor="hover"
                      className="text-sm font-medium tracking-[-0.01em] transition hover:opacity-70"
                    >
                      {page.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-surface-border" />

        {/* Bottom - Copyright only, no duplicate legal links */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="text-xs text-foreground/50">
            © {new Date().getFullYear()} {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
}
