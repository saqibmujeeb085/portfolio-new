"use client";

import { RefObject, useEffect } from "react";
import gsap from "gsap";

type UseMagneticOptions = {
  strength?: number;
  enterScale?: number;
};

export function useMagnetic<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: UseMagneticOptions = {},
) {
  const { strength = 0.14, enterScale = 1.02 } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!finePointer || reducedMotion) return;

    const xTo = gsap.quickTo(element, "x", {
      duration: 0.35,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo(element, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    const handleMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      xTo(x * strength);
      yTo(y * strength);
    };

    const handleEnter = () => {
      gsap.to(element, {
        scale: enterScale,
        duration: 0.28,
        ease: "power3.out",
      });
    };

    const handleLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.55,
        ease: "power4.out",
      });
    };

    element.addEventListener("mousemove", handleMove);
    element.addEventListener("mouseenter", handleEnter);
    element.addEventListener("mouseleave", handleLeave);

    return () => {
      element.removeEventListener("mousemove", handleMove);
      element.removeEventListener("mouseenter", handleEnter);
      element.removeEventListener("mouseleave", handleLeave);
    };
  }, [ref, strength, enterScale]);
}
