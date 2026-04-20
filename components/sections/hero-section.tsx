"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const marqueeItems = [
  "Next.js Development",
  "UI/UX Systems",
  "Sanity CMS",
  "Performance Marketing",
  "Custom Web Platforms",
  "AI Integrations",
  "Brand-led Digital Products",
  "Scalable Backend Systems",
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const marqueeTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const intro = introRef.current;
    const marqueeTrack = marqueeTrackRef.current;

    if (!section || !intro || !marqueeTrack) return;

    const ctx = gsap.context(() => {
      const introItems = intro.querySelectorAll("[data-hero-item]");

      gsap.set(introItems, {
        y: 60,
        opacity: 0,
      });

      gsap.set(marqueeTrack, {
        y: 30,
        opacity: 0,
      });

      const tl = gsap.timeline();

      tl.to(introItems, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
      });

      tl.to(
        marqueeTrack,
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.45",
      );

      gsap.to(marqueeTrack, {
        xPercent: -50,
        duration: 32,
        ease: "none",
        repeat: -1,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background text-foreground"
    >
      <div className="ds-container">
        <div className="flex min-h-[calc(100vh-120px)] flex-col justify-end py-14 md:py-16 xl:min-h-full xl:py-20">
          <div
            ref={introRef}
            className="grid min-h-[70vh] grid-cols-1 items-end gap-10 xl:grid-cols-[1.2fr_0.8fr] xl:gap-16"
          >
            <div className="max-w-4xl">
              <p
                data-hero-item
                className="mb-5 text-sm uppercase tracking-[0.24em] text-foreground/50"
              >
                Full-stack engineering & growth
              </p>

              <h1
                data-hero-item
                className="max-w-5xl text-[42px] font-semibold leading-[0.95] tracking-[-0.06em] md:text-[72px] xl:text-[112px]"
              >
                We build digital experiences that look premium and perform even
                better.
              </h1>
            </div>

            <div className="xl:pb-3">
              <p
                data-hero-item
                className="max-w-xl text-base leading-7 text-foreground/68 md:text-lg md:leading-8"
              >
                From high-converting websites to scalable product ecosystems, we
                combine strategy, design, development, and motion to create
                digital systems that move brands forward.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-y border-surface-border">
        <div className="overflow-hidden py-5 md:py-6">
          <div
            ref={marqueeTrackRef}
            className="hero-marquee-track flex w-max items-center gap-4 whitespace-nowrap"
          >
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex items-center gap-10 px-4"
              >
                <span className="text-sm uppercase tracking-[0.18em] text-foreground font-bold md:text-base">
                  {item}
                </span>
                <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
