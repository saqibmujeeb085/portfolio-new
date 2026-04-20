import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getTechnologyBySlug, getTechnologySlugs } from "@/lib/sanity/fetch";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getTechnologySlugs();
  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export default async function TechnologyDetailPage({ params }: Props) {
  const { slug } = await params;
  const technology = await getTechnologyBySlug(slug);

  if (!technology) notFound();

  return (
    <section className="bg-background text-foreground">
      <div className="ds-container py-16 md:py-20 xl:py-24">
        <div className="max-w-4xl">
          <div className="mb-5 inline-flex rounded-full border border-surface-border px-3 py-1 text-xs uppercase tracking-[0.16em] text-foreground/55">
            {technology?.category?.title}
          </div>

          <h1 className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl xl:text-7xl">
            {technology.title}
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-6 text-foreground/65 md:text-lg">
            {technology.shortDescription}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[32px] border border-surface-border bg-card p-6 shadow-[var(--shadow-soft)] md:p-8">
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-foreground/50">
              Overview
            </p>

            <div className="prose prose-neutral max-w-none dark:prose-invert">
              <PortableText value={technology.overview ?? []} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-surface-border bg-card p-6 shadow-[var(--shadow-soft)] md:p-8">
              <p className="mb-4 text-sm uppercase tracking-[0.2em] text-foreground/50">
                Benefits
              </p>

              <ul className="space-y-3">
                {(technology.benefits || []).map((item) => (
                  <li
                    key={item}
                    className="rounded-[18px] bg-secondary px-4 py-3 text-sm leading-6"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[32px] border border-surface-border bg-card p-6 shadow-[var(--shadow-soft)] md:p-8">
              <p className="mb-4 text-sm uppercase tracking-[0.2em] text-foreground/50">
                Project Scoping
              </p>

              <ul className="space-y-3">
                {(technology.projectScoping || []).map((item) => (
                  <li
                    key={item}
                    className="rounded-[18px] bg-secondary px-4 py-3 text-sm leading-6"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
