"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type ServiceSelectProps = {
  label: string;
  options: readonly string[];
  value?: string;
  error?: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export function ServiceSelect({
  label,
  options,
  value,
  error,
  placeholder = "Select a service",
  onChange,
}: ServiceSelectProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!wrapperRef.current?.contains(target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <label className="mb-2 block text-sm font-medium text-foreground/80">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex h-13 w-full items-center justify-between rounded-[18px] border bg-transparent px-4 text-left text-sm outline-none transition",
          error
            ? "border-red-500"
            : "border-surface-border focus:border-foreground/25",
          open && "border-foreground/25",
        )}
      >
        <span className={cn(!value && "text-foreground/45")}>
          {value || placeholder}
        </span>

        <ChevronDown
          size={18}
          className={cn(
            "shrink-0 transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        className={cn(
          "absolute left-0 top-[calc(100%+10px)] z-30 w-full overflow-hidden rounded-[22px] border border-surface-border bg-card shadow-[var(--shadow-soft)] transition-all duration-200",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <div className="max-h-[280px] overflow-y-auto p-2">
          {options.map((option) => {
            const isSelected = value === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center rounded-[16px] px-4 py-3 text-left text-sm transition",
                  isSelected
                    ? "bg-foreground text-background"
                    : "text-foreground hover:bg-secondary",
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {error ? <p className="mt-2 text-xs text-red-500">{error}</p> : null}
    </div>
  );
}
