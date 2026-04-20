import Image from "next/image";
import Link from "next/link";
import {
  getPaginatedTestimonials,
  getTestimonialsCount,
} from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export const revalidate = 300;

const PAGE_SIZE = 6;

function renderStars(rating?: number | null) {
  const safeRating = Math.max(1, Math.min(5, rating ?? 5));

  return Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={index < safeRating ? "text-foreground" : "text-foreground/20"}
    >
      ★
    </span>
  ));
}

export default async function TestimonialsPage({ searchParams }: Props) {
  const params = await searchParams;

  const parsedPage = Number(params.page ?? "1");
  const currentPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1;

  const [testimonials, totalCount] = await Promise.all([
    getPaginatedTestimonials({
      page: currentPage,
      pageSize: PAGE_SIZE,
    }),
    getTestimonialsCount(),
  ]);

  const totalPages = Math.max(Math.ceil(totalCount / PAGE_SIZE), 1);

  return (
    <section className="bg-background text-foreground">
      <div className="ds-container py-16 md:py-20 xl:py-24">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-foreground/50">
            Testimonials
          </p>

          <h1 className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl xl:text-7xl">
            What our clients say about working with us
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-foreground/65 md:text-base">
            Real feedback from brands, teams, and clients we’ve worked with
            across digital strategy, design, development, and product builds.
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className="rounded-[32px] border border-surface-border bg-card p-8 shadow-[var(--shadow-soft)]">
            <p className="text-sm uppercase tracking-[0.18em] text-foreground/45">
              No testimonials found
            </p>
            <p className="mt-3 text-sm leading-6 text-foreground/65 md:text-base">
              Add testimonials in Sanity Studio to display them here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((item) => {
              const imageUrl = item.image
                ? urlFor(item.image)
                    .width(160)
                    .height(160)
                    .fit("crop")
                    .auto("format")
                    .url()
                : null;

              return (
                <article
                  key={item._id}
                  className="flex h-full flex-col justify-between rounded-[32px] border border-surface-border bg-card p-6 shadow-[var(--shadow-soft)] md:p-8"
                >
                  <div>
                    <div className="mb-5 flex items-center gap-1 text-lg">
                      {renderStars(item.rating)}
                    </div>

                    <blockquote className="text-base leading-7 text-foreground/78 md:text-lg md:leading-8">
                      “{item.quote}”
                    </blockquote>
                  </div>

                  <div className="mt-8 border-t border-surface-border pt-5">
                    <div className="flex items-center gap-4">
                      {imageUrl ? (
                        <div className="relative h-14 w-14 overflow-hidden rounded-full border border-surface-border">
                          <Image
                            src={imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-surface-border bg-secondary text-sm font-medium">
                          {item.name.charAt(0)}
                        </div>
                      )}

                      <div>
                        <p className="text-lg font-semibold tracking-[-0.02em]">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm text-foreground/55">
                          {[item.designation, item.company]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {totalPages > 1 ? (
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              const href = `/testimonials?page=${page}`;
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
