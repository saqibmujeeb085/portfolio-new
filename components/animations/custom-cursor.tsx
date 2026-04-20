"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type CursorMode = "default" | "hover" | "accent";

export function CustomCursor() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!wrap || !dot || !ring) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!finePointer || reducedMotion) return;

    document.documentElement.classList.add("has-custom-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringXCurrent = mouseX;
    let ringYCurrent = mouseY;

    let velocityX = 0;
    let velocityY = 0;

    let currentMode: CursorMode = "default";

    const dotX = gsap.quickTo(dot, "x", {
      duration: 0.08,
      ease: "power3.out",
    });

    const dotY = gsap.quickTo(dot, "y", {
      duration: 0.08,
      ease: "power3.out",
    });

    const setMode = (mode: CursorMode) => {
      currentMode = mode;
      wrap.dataset.mode = mode;

      if (mode === "default") {
        gsap.to(dot, {
          scale: 1,
          duration: 0.24,
          ease: "power3.out",
        });

        gsap.to(ring, {
          scale: 1,
          duration: 0.32,
          ease: "power3.out",
        });
      }

      if (mode === "hover") {
        gsap.to(dot, {
          scale: 0.72,
          duration: 0.24,
          ease: "power3.out",
        });

        gsap.to(ring, {
          scale: 1.65,
          duration: 0.32,
          ease: "power3.out",
        });
      }

      if (mode === "accent") {
        gsap.to(dot, {
          scale: 0.9,
          duration: 0.24,
          ease: "power3.out",
        });

        gsap.to(ring, {
          scale: 2.15,
          duration: 0.34,
          ease: "power3.out",
        });
      }
    };

    const showCursor = () => {
      gsap.to([dot, ring], {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const hideCursor = () => {
      gsap.to([dot, ring], {
        opacity: 0,
        duration: 0.18,
        ease: "power2.out",
      });
    };

    const handleMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      dotX(mouseX);
      dotY(mouseY);

      showCursor();
    };

    const handlePointerOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      if (target.closest("[data-cursor='accent']")) {
        setMode("accent");
        return;
      }

      if (
        target.closest(
          "a, button, [role='button'], input, textarea, select, [data-cursor='hover']",
        )
      ) {
        setMode("hover");
        return;
      }

      setMode("default");
    };

    const handlePointerDown = () => {
      gsap.to(dot, {
        scale: "+=0.2",
        duration: 0.12,
        ease: "power2.out",
      });

      gsap.to(ring, {
        scale: "+=0.12",
        duration: 0.14,
        ease: "power2.out",
      });
    };

    const handlePointerUp = () => {
      setMode(currentMode);
    };

    const handleWindowLeave = () => {
      hideCursor();
    };

    const render = () => {
      const lerpFactor = 0.18;

      const prevX = ringXCurrent;
      const prevY = ringYCurrent;

      ringXCurrent += (mouseX - ringXCurrent) * lerpFactor;
      ringYCurrent += (mouseY - ringYCurrent) * lerpFactor;

      velocityX = ringXCurrent - prevX;
      velocityY = ringYCurrent - prevY;

      const speed = Math.min(
        Math.sqrt(velocityX * velocityX + velocityY * velocityY),
        42,
      );

      const stretchX = 1 + speed * 0.02;
      const stretchY = 1 - speed * 0.008;

      const angle = Math.atan2(velocityY, velocityX) * (180 / Math.PI);

      gsap.set(ring, {
        x: ringXCurrent,
        y: ringYCurrent,
        rotate: angle || 0,
        scaleX: stretchX,
        scaleY: stretchY,
      });
    };

    gsap.ticker.add(render);

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointerleave", handleWindowLeave);
    document.addEventListener("pointerover", handlePointerOver);

    setMode("default");

    return () => {
      gsap.ticker.remove(render);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointerleave", handleWindowLeave);
      document.removeEventListener("pointerover", handlePointerOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div ref={wrapRef} className="custom-cursor-wrap" aria-hidden="true">
      <div ref={ringRef} className="custom-cursor-ring" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </div>
  );
}
