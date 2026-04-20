import Link from "next/link";
import {
  getPaginatedTechnologies,
  getTechnologiesCount,
  getTechnologyCategories,
} from "@/lib/sanity/fetch";

type Props = {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
};

export const revalidate = 300;

const PAGE_SIZE = 6;

export default async function TechnologiesPage({ searchParams }: Props) {
  const params = await searchParams;

  const category = params.category || undefined;
  const currentPage = Math.max(Number(params.page || "1"), 1);

  const [categories, technologies, totalCount] = await Promise.all([
    getTechnologyCategories(),
    getPaginatedTechnologies({
      category,
      page: currentPage,
      pageSize: PAGE_SIZE,
    }),
    getTechnologiesCount(category),
  ]);

  const totalPages = Math.max(Math.ceil(totalCount / PAGE_SIZE), 1);

  return (
    <section className="bg-background text-foreground">
      <div className="ds-container py-16 md:py-20 xl:py-24">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-foreground/50">
            Technologies
          </p>
          <h1 className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl xl:text-7xl">
            Explore our technology stack
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-foreground/65 md:text-base">
            Browse technologies by category and explore how we use each one in
            product development, project scoping, and delivery.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          <Link
            href="/technologies"
            className={
              !category
                ? "rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
                : "rounded-full border border-surface-border px-5 py-3 text-sm font-medium transition hover:bg-secondary"
            }
          >
            All
          </Link>

          {categories.map((item) => {
            const isActive = category === item.slug;

            return (
              <Link
                key={item._id}
                href={`/technologies?category=${item.slug}`}
                className={
                  isActive
                    ? "rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
                    : "rounded-full border border-surface-border px-5 py-3 text-sm font-medium transition hover:bg-secondary"
                }
              >
                {item.title}
              </Link>
            );
          })}
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

              <h2 className="text-2xl font-semibold tracking-[-0.03em]">
                {item.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-foreground/65 md:text-base line-clamp-2">
                {item.shortDescription}
              </p>

              <span className="mt-8 inline-flex text-sm font-medium transition group-hover:translate-x-1">
                Explore Technology →
              </span>
            </Link>
          ))}
        </div>

        {totalPages > 1 ? (
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              const href = category
                ? `/technologies?category=${category}&page=${page}`
                : `/technologies?page=${page}`;

              const isActive = page === currentPage;

              return (
                <Link
                  key={page}
                  href={href}
                  className={
                    isActive
                      ? "inline-flex h-11 min-w-11 items-center justify-center rounded-full bg-foreground px-4 text-sm font-medium text-background"
                      : "inline-flex h-11 min-w-11 items-center justify-center rounded-full border border-surface-border px-4 text-sm font-medium transition hover:bg-secondary"
                  }
                >
                  {page}
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
