import Link from "next/link";
import { getFeaturedTechnologies } from "@/lib/sanity/fetch";

export async function TechnologyPreviewSection() {
  const technologies = await getFeaturedTechnologies();

  return (
    <section className="bg-background text-foreground">
      <div className="ds-container py-16 md:py-20 xl:py-24">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-foreground/50">
              Technology Expertise
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              Built on modern, scalable technologies
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-foreground/65 md:text-base">
              Explore the technologies we use to build high-performance digital
              products.
            </p>
          </div>

          <Link
            href="/technologies"
            className="hidden rounded-full border border-surface-border px-5 py-3 text-sm font-medium transition hover:bg-secondary md:inline-flex"
          >
            View All Technologies
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {technologies.map((item) => (
            <Link
              key={item._id}
              href={`/technologies/${item.slug}`}
              className="group rounded-[32px] border border-surface-border bg-card p-6 shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 md:p-8"
            >
              <div className="mb-5 inline-flex rounded-full border border-surface-border px-3 py-1 text-xs uppercase tracking-[0.16em] text-foreground/55">
                {item.category?.title}
              </div>

              <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-foreground/65 md:text-base line-clamp-2">
                {item.shortDescription}
              </p>

              <span className="mt-8 inline-flex text-sm font-medium transition group-hover:translate-x-1">
                Explore Technology →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href="/technologies"
            className="inline-flex rounded-full border border-surface-border px-5 py-3 text-sm font-medium transition hover:bg-secondary"
          >
            View All Technologies
          </Link>
        </div>
      </div>
    </section>
  );
}
