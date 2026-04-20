"use client";

import { ThemeProvider } from "@/providers/theme-provider";
import { LenisProvider } from "@/providers/lenis-provider";
import { CustomCursor } from "@/components/animations/custom-cursor";

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <LenisProvider>
        <CustomCursor />
        {children}
      </LenisProvider>
    </ThemeProvider>
  );
}