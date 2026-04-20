import Image from "next/image";
import Link from "next/link";
import { getFeaturedBlogs } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";

export async function HomeBlogsSection() {
  const blogs = await getFeaturedBlogs();

  return (
    <section className="bg-background text-foreground">
      <div className="ds-container py-16 md:py-20 xl:py-24">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-foreground/50">
              Insights & Articles
            </p>

            <h2 className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              Thinking, building, and sharing what moves digital forward.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-foreground/65 md:text-base">
              Explore selected articles around design, development, systems,
              product thinking, and modern digital experiences.
            </p>
          </div>

          <div>
            <Link
              href="/blogs"
              className="inline-flex rounded-full border border-surface-border px-5 py-3 text-sm font-medium transition hover:bg-secondary"
            >
              View All Blogs
            </Link>
          </div>
        </div>

        {blogs.length === 0 ? (
          <div className="rounded-[32px] border border-surface-border bg-card p-8 shadow-[var(--shadow-soft)]">
            <p className="text-sm uppercase tracking-[0.18em] text-foreground/45">
              No blog posts found
            </p>
            <p className="mt-3 text-sm leading-6 text-foreground/65 md:text-base">
              Add blog posts in Sanity Studio to display them here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {blogs.map((item) => {
              const imageUrl = item.coverImage
                ? urlFor(item.coverImage)
                    .width(800)
                    .height(500)
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

                    <h3 className="text-2xl font-semibold tracking-[-0.03em] line-clamp-1">
                      {item.title}
                    </h3>

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

        <div className="mt-8 md:hidden">
          <Link
            href="/blogs"
            className="inline-flex rounded-full border border-surface-border px-5 py-3 text-sm font-medium transition hover:bg-secondary"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
}
