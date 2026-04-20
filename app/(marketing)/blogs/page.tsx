import Image from "next/image";
import Link from "next/link";
import {
  getBlogCategories,
  getBlogsCount,
  getPaginatedBlogs,
} from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";

type Props = {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
};

export const revalidate = 300;

const PAGE_SIZE = 6;

export default async function BlogsPage({ searchParams }: Props) {
  const params = await searchParams;

  const category = params.category?.trim() || undefined;

  const parsedPage = Number(params.page ?? "1");
  const currentPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1;

  const [categories, blogs, totalCount] = await Promise.all([
    getBlogCategories(),
    getPaginatedBlogs({
      category,
      page: currentPage,
      pageSize: PAGE_SIZE,
    }),
    getBlogsCount(category),
  ]);

  const totalPages = Math.max(Math.ceil(totalCount / PAGE_SIZE), 1);

  return (
    <section className="bg-background text-foreground">
      <div className="ds-container py-16 md:py-20 xl:py-24">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-foreground/50">
            Blogs
          </p>
          <h1 className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl xl:text-7xl">
            Insights, ideas, and digital thinking
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-foreground/65 md:text-base">
            Explore articles across categories and discover our thinking around
            design, development, product systems, growth, and modern digital
            experiences.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          <Link
            href="/blogs"
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
                href={`/blogs?category=${item.slug}`}
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

        {blogs.length === 0 ? (
          <div className="rounded-[32px] border border-surface-border bg-card p-8 shadow-[var(--shadow-soft)]">
            <p className="text-sm uppercase tracking-[0.18em] text-foreground/45">
              No blogs found
            </p>
            <p className="mt-3 text-sm leading-6 text-foreground/65 md:text-base">
              {category
                ? "No blog posts are available in this category yet."
                : "No blog posts have been added yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {blogs.map((item) => {
              const imageUrl = item.coverImage
                ? urlFor(item.coverImage)
                    .width(900)
                    .height(560)
                    .fit("crop")
                    .auto("format")
                    .url()
                : null;

              return (
                <Link
                  key={item._id}
                  href={`/blogs/${item.slug}`}
                  className="group overflow-hidden rounded-[32px] border border-surface-border bg-card shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-surface-border bg-secondary">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm text-foreground/40">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="mb-5 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-foreground/55">
                      <span className="rounded-full border border-surface-border px-3 py-1">
                        {item.category?.title ?? "Uncategorized"}
                      </span>
                      {item.publishedAt ? (
                        <span>
                          {new Date(item.publishedAt).toLocaleDateString()}
                        </span>
                      ) : null}
                    </div>

                    <h2 className="text-2xl font-semibold tracking-[-0.03em] line-clamp-1">
                      {item.title}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-foreground/65 md:text-base line-clamp-2">
                      {item.excerpt ?? "No excerpt added yet."}
                    </p>

                    <span className="mt-8 inline-flex text-sm font-medium transition group-hover:translate-x-1">
                      Read Article →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {totalPages > 1 ? (
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              const href = category
                ? `/blogs?category=${category}&page=${page}`
                : `/blogs?page=${page}`;

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
