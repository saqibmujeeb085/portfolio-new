"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function AboutPageHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      const items = content.querySelectorAll("[data-about-hero-item]");

      gsap.set(items, {
        y: 50,
        opacity: 0,
      });

      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-background text-foreground">
      <div className="ds-container py-16 md:py-20 xl:py-24">
        <div
          ref={contentRef}
          className="grid min-h-[70vh] grid-cols-1 items-end gap-10 xl:grid-cols-[1.2fr_0.8fr]"
        >
          <div>
            <p
              data-about-hero-item
              className="mb-5 text-sm uppercase tracking-[0.24em] text-foreground/50"
            >
              About Aura Tech Solutions
            </p>

            <h1
              data-about-hero-item
              className="max-w-5xl text-[42px] font-semibold leading-[0.95] tracking-[-0.06em] md:text-[72px] xl:text-[110px]"
            >
              We create digital experiences with clarity, depth, and momentum.
            </h1>
          </div>

          <div className="xl:pb-3">
            <p
              data-about-hero-item
              className="max-w-xl text-base leading-7 text-foreground/68 md:text-lg md:leading-8"
            >
              We are a digital-first team focused on building premium websites,
              scalable systems, and thoughtful brand experiences that do more
              than just look good — they work hard for the business behind them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
