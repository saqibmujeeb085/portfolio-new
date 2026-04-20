"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Testimonial } from "@/types/testimonial";
import { urlFor } from "@/lib/sanity/image";
import { cn } from "@/lib/utils/cn";

type Props = {
  testimonials: Testimonial[];
};

function renderStars(rating?: number | null) {
  const safeRating = Math.max(1, Math.min(5, rating ?? 5));

  return Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={index < safeRating ? "text-foreground" : "text-foreground/18"}
    >
      ★
    </span>
  ));
}

export function TestimonialsSliderSection({ testimonials }: Props) {
  const items = useMemo(() => testimonials ?? [], [testimonials]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (items.length <= 1 || isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [items.length, isPaused]);

  if (!items.length) return null;

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <section className="bg-background text-foreground">
      <div className="ds-container py-16 md:py-20 xl:py-24">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-foreground/50">
            Testimonials
          </p>

          <h2 className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
            What it feels like to build with us
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-foreground/65 md:text-base">
            Real words from clients and collaborators across strategy, design,
            development, and product systems.
          </p>
        </div>

        <div
          className="testimonial-surface overflow-hidden rounded-[32px] border border-surface-border bg-card shadow-[var(--shadow-soft)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 gap-8 p-6 md:p-8 xl:grid-cols-[0.18fr_0.57fr_0.25fr] xl:gap-10 xl:p-10">
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-[72px] leading-none text-foreground/10 md:text-[110px] xl:text-[140px]">
                  “
                </p>

                <p className="mt-4 text-xs uppercase tracking-[0.24em] text-foreground/38">
                  Client Voice
                </p>
              </div>

              <div className="mt-8 hidden xl:block">
                <p className="text-xs uppercase tracking-[0.24em] text-foreground/38">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(items.length).padStart(2, "0")}
                </p>
              </div>
            </div>

            <div className="flex min-h-[390px] flex-col justify-between md:min-h-[430px] xl:min-h-[470px]">
              <div className="relative min-h-[240px] md:min-h-[270px] xl:min-h-[300px]">
                {items.map((item, index) => {
                  const active = index === activeIndex;

                  return (
                    <div
                      key={item._id}
                      className={cn(
                        "absolute inset-0 transition-all duration-700 ease-out",
                        active
                          ? "translate-y-0 opacity-100"
                          : "pointer-events-none translate-y-4 opacity-0",
                      )}
                    >
                      <div className="mb-5 flex items-center gap-1 text-lg">
                        {renderStars(item.rating)}
                      </div>

                      <blockquote className="max-w-4xl text-2xl font-medium leading-[1.4] tracking-[-0.03em] md:text-4xl xl:text-[46px] xl:leading-[1.22] line-clamp-3">
                        {item.quote}
                      </blockquote>
                    </div>
                  );
                })}
              </div>

              <div className="relative min-h-[110px] border-t border-surface-border pt-5">
                {items.map((item, index) => {
                  const active = index === activeIndex;
                  const imageUrl = item.image
                    ? urlFor(item.image)
                        .width(160)
                        .height(160)
                        .fit("crop")
                        .auto("format")
                        .url()
                    : null;

                  return (
                    <div
                      key={`${item._id}-meta`}
                      className={cn(
                        "absolute inset-x-0 top-5 flex items-center gap-4 transition-all duration-700 ease-out",
                        active
                          ? "translate-y-0 opacity-100"
                          : "pointer-events-none translate-y-3 opacity-0",
                      )}
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-surface-border bg-secondary">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm font-medium">
                            {item.name.charAt(0)}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-lg font-semibold tracking-[-0.02em]">
                          {item.name}
                        </p>
                        <p className="truncate text-sm text-foreground/55">
                          {[item.designation, item.company]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div className="grid grid-cols-3 gap-3 xl:grid-cols-1">
                {items.map((item, index) => {
                  const thumb = item.image
                    ? urlFor(item.image)
                        .width(120)
                        .height(120)
                        .fit("crop")
                        .auto("format")
                        .url()
                    : null;

                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={item._id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={cn(
                        "group flex items-center gap-3 rounded-[22px] border p-3 text-left transition-all duration-300",
                        isActive
                          ? "border-foreground/14 bg-secondary"
                          : "border-surface-border hover:bg-secondary/70",
                      )}
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-surface-border bg-background">
                        {thumb ? (
                          <Image
                            src={thumb}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs font-medium">
                            {item.name.charAt(0)}
                          </div>
                        )}
                      </div>

                      <div className="hidden min-w-0 xl:block">
                        <p className="truncate text-sm font-medium">
                          {item.name}
                        </p>
                        <p className="truncate text-xs text-foreground/45">
                          {item.company ?? item.designation ?? "Client"}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 xl:hidden">
                  {items.map((item, index) => (
                    <button
                      key={item._id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={
                        index === activeIndex
                          ? "h-2 w-7 rounded-full bg-foreground transition"
                          : "h-2 w-2 rounded-full bg-foreground/20 transition"
                      }
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="ml-auto flex items-center gap-3">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-surface-border transition hover:bg-secondary"
                    aria-label="Previous testimonial"
                  >
                    ←
                  </button>

                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-surface-border transition hover:bg-secondary"
                    aria-label="Next testimonial"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
