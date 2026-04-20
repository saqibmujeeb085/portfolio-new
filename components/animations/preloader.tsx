"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePreloaderStore } from "@/store/preloader-store";

export function Preloader() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLDivElement | null>(null);
  const titleWrapRef = useRef<HTMLDivElement | null>(null);
  const progressTrackRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const { isLoading, setIsLoading } = usePreloaderStore();

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.set(titleWrapRef.current?.children || [], {
        yPercent: 120,
        opacity: 0,
      });

      tl.set(progressBarRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      tl.fromTo(
        containerRef.current,
        { opacity: 1 },
        { opacity: 1, duration: 0.2 },
      );

      tl.to(
        titleWrapRef.current?.children || [],
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: "power4.out",
        },
        0,
      );

      tl.to(
        progressBarRef.current,
        {
          scaleX: 1,
          duration: 2.8,
          ease: "power2.inOut",
        },
        0.15,
      );
    }, containerRef);

    const counterObject = { value: 0 };

    const counterTween = gsap.to(counterObject, {
      value: 100,
      duration: 2.8,
      ease: "power2.out",
      onUpdate: () => {
        setCount(Math.round(counterObject.value));
      },
      onComplete: () => {
        const exitTl = gsap.timeline({
          onComplete: () => {
            setIsLoading(false);
          },
        });

        exitTl.to(titleWrapRef.current?.children || [], {
          yPercent: -120,
          opacity: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: "power4.inOut",
        });

        exitTl.to(
          counterRef.current,
          {
            y: -20,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          0.1,
        );

        exitTl.to(
          progressTrackRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          0.12,
        );

        exitTl.to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut",
          },
          0.45,
        );
      },
    });

    return () => {
      ctx.revert();
      counterTween.kill();
    };
  }, [setIsLoading]);

  if (!isLoading) return null;

  const words = ["Aura", "Tech", "Solutions"];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] flex h-screen w-screen flex-col justify-between overflow-hidden bg-background text-foreground"
    >
      <div className="flex items-start justify-end px-5 pt-5 md:px-[50px] md:pt-8 xl:px-[100px]">
        <div
          ref={counterRef}
          className="text-right text-sm font-medium tracking-[0.2em] text-foreground/70 tabular-nums sm:text-base"
        >
          {String(count).padStart(2, "0")}
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-5 md:px-[50px] xl:px-[100px]">
        <div
          ref={titleWrapRef}
          className="overflow-hidden text-center text-4xl font-semibold tracking-[-0.06em] sm:text-6xl md:text-7xl xl:text-[110px] xl:leading-[0.95]"
        >
          {words.map((word) => (
            <div key={word} className="overflow-hidden">
              <span className="inline-block">{word}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={progressTrackRef}
        className="px-5 pb-5 md:px-[50px] md:pb-8 xl:px-[100px]"
      >
        <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-foreground/50 sm:text-xs">
          <span>Loading Experience</span>
          <span>Process</span>
        </div>

        <div className="h-[2px] w-full overflow-hidden rounded-full bg-foreground/10">
          <div
            ref={progressBarRef}
            className="h-full w-full origin-left scale-x-0 bg-foreground"
          />
        </div>
      </div>
    </div>
  );
}
