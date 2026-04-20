"use client";

import { Moon, Sun } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";
import { useTheme } from "@/providers/theme-provider";

export function ThemeToggle() {
  const mounted = useMounted();
  const { resolvedTheme, toggleTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="ds-button ds-button-secondary h-11 w-11 shrink-0"
    >
      {mounted ? (
        isDark ? <Sun size={18} /> : <Moon size={18} />
      ) : (
        <span className="sr-only">Toggle theme</span>
      )}
    </button>
  );
}