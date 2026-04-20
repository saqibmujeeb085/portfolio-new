"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useUiStore } from "@/store/ui-store";
import { cn } from "@/lib/utils/cn";
import type { NavigationLink } from "@/types/site-settings";

const defaultNavLinks: NavigationLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Technologies", href: "/technologies" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

interface MobileDrawerProps {
  navLinks?: NavigationLink[];
}

export function MobileDrawer({ navLinks = defaultNavLinks }: MobileDrawerProps) {
  const pathname = usePathname();
  const { mobileMenuOpen, setMobileMenuOpen } = useUiStore();

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-all duration-300 lg:hidden",
          mobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      <aside
        className={cn(
          "fixed top-0 right-0 z-[70] flex h-dvh w-full max-w-[420px] flex-col border-l border-surface-border bg-background text-foreground shadow-2xl transition-transform duration-500 ease-out lg:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-surface-border px-5 py-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em]"
          >
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent" />
            AI Portfoliq
          </Link>

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
            className="ds-button ds-button-secondary h-11 w-11 shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col px-5 py-8">
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-2xl px-4 py-4 text-base font-medium tracking-[-0.02em] transition-colors duration-200",
                    isActive
                      ? "bg-foreground text-background"
                      : "hover:bg-secondary text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-auto space-y-4 border-t border-surface-border pt-6">
            <div className="flex items-center justify-between rounded-2xl border border-surface-border px-4 py-3">
              <span className="text-sm font-medium">Appearance</span>
              <ThemeToggle />
            </div>

            <Link
              href="/contact"
              className="ds-button ds-button-primary h-12 w-full px-5 text-sm font-medium"
            >
              Start Your Project
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
