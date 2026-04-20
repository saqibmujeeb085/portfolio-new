"use client";

import { ReactLenis } from "lenis/react";
import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import "lenis/dist/lenis.css";

type LenisProviderProps = {
  children: React.ReactNode;
};

export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.2,
        allowNestedScroll: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
