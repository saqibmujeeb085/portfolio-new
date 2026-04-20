"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function AboutUsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      const items = content.querySelectorAll("[data-about-item]");

      gsap.set(items, {
        y: 40,
        opacity: 0,
      });

      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.1,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-background text-foreground">
      <div className="ds-container py-16 md:py-20 xl:py-24">
        <div className="rounded-[32px] border border-surface-border bg-card p-6 shadow-[var(--shadow-soft)] md:p-8 xl:p-10">
          <div
            ref={contentRef}
            className="grid grid-cols-1 gap-10 xl:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="flex flex-col justify-between">
              <div>
                <p
                  data-about-item
                  className="mb-4 text-sm uppercase tracking-[0.22em] text-foreground/50"
                >
                  About Us
                </p>

                <h2
                  data-about-item
                  className="max-w-md text-4xl font-semibold leading-[0.98] tracking-[-0.05em] md:text-5xl xl:text-6xl"
                >
                  We don’t just build websites. We build digital momentum.
                </h2>
              </div>

              <div className="mt-8 xl:mt-12">
                <Link
                  data-about-item
                  href="/about"
                  data-cursor="accent"
                  className="ds-button ds-button-primary h-12 px-6 text-sm font-medium"
                >
                  Explore About Us
                </Link>
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <p
                data-about-item
                className="max-w-2xl text-base leading-7 text-foreground/72 md:text-lg md:leading-8"
              >
                We are a modern digital team focused on building experiences
                that feel sharp, strategic, and built for growth. Our work sits
                at the intersection of design, development, storytelling, and
                performance — helping brands launch stronger, scale smarter, and
                connect better.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div
                  data-about-item
                  className="rounded-[24px] border border-surface-border bg-secondary p-5"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-foreground/45">
                    Focus
                  </p>
                  <p className="mt-2 text-base font-medium tracking-[-0.02em]">
                    Strategy-led execution
                  </p>
                </div>

                <div
                  data-about-item
                  className="rounded-[24px] border border-surface-border bg-secondary p-5"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-foreground/45">
                    Strength
                  </p>
                  <p className="mt-2 text-base font-medium tracking-[-0.02em]">
                    Premium digital systems
                  </p>
                </div>

                <div
                  data-about-item
                  className="rounded-[24px] border border-surface-border bg-secondary p-5"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-foreground/45">
                    Outcome
                  </p>
                  <p className="mt-2 text-base font-medium tracking-[-0.02em]">
                    Better growth, clearer identity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
