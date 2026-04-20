"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const phases = [
  {
    title: "Presence starts with clarity.",
    copy: "A strong digital presence begins when the message is clear, the structure is intentional, and the experience feels instantly understood.",
    tag: "Clarity",
  },
  {
    title: "Presence grows through motion.",
    copy: "Movement adds rhythm, attention, and emotion. The right interaction design turns a static screen into something people actually feel.",
    tag: "Motion",
  },
  {
    title: "Presence earns attention.",
    copy: "In a crowded digital space, presence is not noise. It is precision — knowing what to show, when to show it, and how to hold attention.",
    tag: "Attention",
  },
  {
    title: "Presence turns into conversion.",
    copy: "The final layer is performance. Beautiful experiences should not stop at aesthetics — they should guide action and move the business forward.",
    tag: "Conversion",
  },
];

export function PresenceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const copyRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const progressVerticalRef = useRef<HTMLDivElement | null>(null);
  const progressHorizontalRef = useRef<HTMLDivElement | null>(null);
  const countDesktopRef = useRef<HTMLSpanElement | null>(null);
  const countMobileRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const progressVertical = progressVerticalRef.current;
    const progressHorizontal = progressHorizontalRef.current;
    const countDesktop = countDesktopRef.current;
    const countMobile = countMobileRef.current;

    if (!section || !pin) return;

    const titles = titleRefs.current.filter(Boolean) as HTMLHeadingElement[];
    const copies = copyRefs.current.filter(Boolean) as HTMLParagraphElement[];
    const tags = tagRefs.current.filter(Boolean) as HTMLSpanElement[];
    const glows = glowRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!titles.length || !copies.length || !tags.length || !glows.length)
      return;

    const countState = { value: 1 };

    const ctx = gsap.context(() => {
      gsap.set([...titles, ...copies, ...tags], {
        opacity: 0,
      });

      gsap.set(titles, {
        yPercent: 18,
      });

      gsap.set(copies, {
        y: 28,
      });

      gsap.set(tags, {
        y: 18,
      });

      gsap.set(glows, {
        opacity: 0,
        scale: 1.12,
      });

      if (progressVertical) {
        gsap.set(progressVertical, {
          scaleY: 0,
          transformOrigin: "top center",
        });
      }

      if (progressHorizontal) {
        gsap.set(progressHorizontal, {
          scaleX: 0,
          transformOrigin: "left center",
        });
      }

      gsap.set([titles[0], copies[0], tags[0]], {
        opacity: 1,
        yPercent: 0,
        y: 0,
      });

      gsap.set(glows[0], {
        opacity: 1,
        scale: 1,
      });

      if (countDesktop) countDesktop.textContent = "01";
      if (countMobile) countMobile.textContent = "01";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${phases.length * 900}`,
          scrub: 1,
          pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (progressVertical) {
        tl.to(
          progressVertical,
          {
            scaleY: 1,
            duration: phases.length,
            ease: "none",
          },
          0,
        );
      }

      if (progressHorizontal) {
        tl.to(
          progressHorizontal,
          {
            scaleX: 1,
            duration: phases.length,
            ease: "none",
          },
          0,
        );
      }

      phases.forEach((_, index) => {
        if (index === 0) return;

        tl.to(
          [titles[index - 1], copies[index - 1], tags[index - 1]],
          {
            opacity: 0,
            y: -24,
            duration: 0.45,
            ease: "power2.out",
            stagger: 0.03,
          },
          index,
        );

        tl.to(
          glows[index - 1],
          {
            opacity: 0,
            scale: 1.08,
            duration: 0.45,
            ease: "power2.out",
          },
          index,
        );

        tl.fromTo(
          titles[index],
          {
            opacity: 0,
            yPercent: 18,
          },
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          index + 0.12,
        );

        tl.fromTo(
          tags[index],
          {
            opacity: 0,
            y: 18,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
          },
          index + 0.16,
        );

        tl.fromTo(
          copies[index],
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
          },
          index + 0.2,
        );

        tl.to(
          glows[index],
          {
            opacity: 1,
            scale: 1,
            duration: 0.65,
            ease: "power2.out",
          },
          index + 0.08,
        );

        tl.to(
          countState,
          {
            value: index + 1,
            duration: 0.2,
            ease: "none",
            onUpdate: () => {
              const value = String(Math.round(countState.value)).padStart(
                2,
                "0",
              );
              if (countDesktop) countDesktop.textContent = value;
              if (countMobile) countMobile.textContent = value;
            },
          },
          index + 0.12,
        );
      });

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background text-foreground"
    >
      <div ref={pinRef} className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          {phases.map((phase, index) => (
            <div
              key={phase.tag}
              ref={(el) => {
                glowRefs.current[index] = el;
              }}
              className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl md:h-[480px] md:w-[480px]"
              style={{
                background:
                  index % 2 === 0
                    ? "color-mix(in srgb, var(--accent) 16%, transparent)"
                    : "color-mix(in srgb, var(--foreground) 6%, transparent)",
              }}
            />
          ))}
        </div>

        <div className="ds-container relative">
          <div className="grid min-h-screen grid-cols-1 items-end gap-12 py-16 md:py-20 xl:grid-cols-[1.1fr_0.9fr] xl:gap-16 xl:py-24">
            <div className="flex min-h-[58vh] flex-col justify-between">
              <div className="flex items-start gap-6 md:gap-8">
                <div className="hidden xl:flex xl:flex-col xl:items-center xl:gap-5">
                  <span
                    ref={countDesktopRef}
                    className="text-xs uppercase tracking-[0.24em] text-foreground/40"
                  >
                    01
                  </span>

                  <div className="relative h-[220px] w-px overflow-hidden bg-surface-border">
                    <div
                      ref={progressVerticalRef}
                      className="absolute inset-x-0 top-0 h-full w-full bg-foreground"
                    />
                  </div>
                </div>

                <div className="min-h-[260px] md:min-h-[320px] xl:min-h-[360px]">
                  <p className="mb-6 text-sm uppercase tracking-[0.24em] text-foreground/45">
                    Digital Presence
                  </p>

                  <div className="relative">
                    {phases.map((phase, index) => (
                      <h2
                        key={phase.tag}
                        ref={(el) => {
                          titleRefs.current[index] = el;
                        }}
                        className="absolute left-0 top-0 max-w-5xl text-[42px] font-semibold leading-[0.94] tracking-[-0.06em] md:text-[68px] xl:text-[104px]"
                      >
                        {phase.title}
                      </h2>
                    ))}

                    <div className="invisible max-w-5xl text-[42px] font-semibold leading-[0.94] tracking-[-0.06em] md:text-[68px] xl:text-[104px]">
                      Presence turns into conversion.
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 xl:hidden">
                <span
                  ref={countMobileRef}
                  className="text-xs uppercase tracking-[0.24em] text-foreground/40"
                >
                  01
                </span>

                <div className="relative h-px flex-1 overflow-hidden bg-surface-border">
                  <div
                    ref={progressHorizontalRef}
                    className="absolute left-0 top-0 h-full w-full bg-foreground"
                  />
                </div>
              </div>
            </div>

            <div className="flex min-h-[240px] flex-col items-start justify-end xl:pb-3">
              <div className="mb-6">
                <div className="relative min-h-[44px]">
                  {phases.map((phase, index) => (
                    <span
                      key={phase.tag}
                      ref={(el) => {
                        tagRefs.current[index] = el;
                      }}
                      className="absolute left-0 top-0 inline-flex rounded-full border border-surface-border px-4 py-2 text-xs uppercase tracking-[0.16em] text-foreground/55"
                    >
                      {phase.tag}
                    </span>
                  ))}

                  <span className="invisible inline-flex rounded-full border border-surface-border px-4 py-2 text-xs uppercase tracking-[0.16em] text-foreground/55">
                    Conversion
                  </span>
                </div>
              </div>

              <div className="relative min-h-[170px] w-full max-w-xl">
                {phases.map((phase, index) => (
                  <p
                    key={phase.tag}
                    ref={(el) => {
                      copyRefs.current[index] = el;
                    }}
                    className="absolute left-0 top-0 text-base leading-7 text-foreground/68 md:text-lg md:leading-8"
                  >
                    {phase.copy}
                  </p>
                ))}

                <p className="invisible text-base leading-7 text-foreground/68 md:text-lg md:leading-8">
                  The final layer is performance. Beautiful experiences should
                  not stop at aesthetics — they should guide action and move the
                  business forward.
                </p>
              </div>

              <p className="mt-10 text-xs uppercase tracking-[0.22em] text-foreground/36">
                Scroll to move through the system
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
