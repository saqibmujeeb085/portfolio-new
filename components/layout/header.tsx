"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileDrawer } from "@/components/layout/mobile-drawer";
import { useUiStore } from "@/store/ui-store";
import { cn } from "@/lib/utils/cn";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Technologies", href: "/technologies" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const lastY = useRef(0);
  const { toggleMobileMenu, mobileMenuOpen } = useUiStore();

  const [isVisible, setIsVisible] = useState(true);
  const [isSolid, setIsSolid] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) return;

      const currentY = window.scrollY;
      const scrollingUp = currentY < lastY.current;
      const nearTop = currentY < 16;

      setIsSolid(currentY > 24);

      if (nearTop) {
        setIsVisible(true);
      } else {
        setIsVisible(scrollingUp);
      }

      lastY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out",
          isVisible || mobileMenuOpen ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="ds-container pt-5">
          <div
            className={cn(
              "flex h-[var(--header-height)] items-center justify-between rounded-full transition-all duration-300",
              isSolid || mobileMenuOpen
                ? "ds-glass ds-header-pill"
                : "border-transparent bg-transparent",
            )}
          >
            <div className="flex min-w-0 items-center pl-4 md:pl-6">
              <Link
                href="/"
                data-cursor="hover"
                className="inline-flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em]"
              >
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent" />
                AuraTechSolutions
              </Link>
            </div>

            <nav className="hidden items-center justify-center gap-8 xl:flex">
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
                      "ds-nav-link text-sm font-medium tracking-[-0.01em]",
                      isActive && "ds-nav-link-active",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center justify-end gap-3 pr-4 md:pr-6">
              <div className="hidden items-center gap-3 xl:flex">
                <ThemeToggle />

                <Link
                  data-cursor="accent"
                  href="/contact"
                  className="ds-button ds-button-primary h-11 px-5 text-sm font-medium"
                >
                  Start Your Project
                </Link>
              </div>

              <div className="flex items-center gap-3 xl:hidden">
                <ThemeToggle />

                <button
                  type="button"
                  aria-label="Open menu"
                  onClick={toggleMobileMenu}
                  className="ds-button ds-button-secondary h-11 w-11 shrink-0"
                >
                  <Menu size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileDrawer />
    </>
  );
}
