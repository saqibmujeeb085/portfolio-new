import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getLegalPageBySlug, getLegalPageSlugs } from "@/lib/sanity/fetch";
import { format } from "date-fns";
import type { Metadata } from "next";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getLegalPageSlugs();

  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLegalPageBySlug(slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.title,
    description: page.description || `Read our ${page.title}`,
  };
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params;
  const page = await getLegalPageBySlug(slug);

  if (!page) notFound();

  return (
    <section className="bg-background text-foreground">
      <div className="ds-container py-16 md:py-20 xl:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 border-b border-surface-border pb-8">
            <h1 className="text-4xl font-semibold tracking-[-0.05em] md:text-5xl xl:text-6xl">
              {page.title}
            </h1>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-foreground/60">
              {page.lastUpdated && (
                <div>
                  <span className="font-medium">Last Updated:</span>{" "}
                  {format(new Date(page.lastUpdated), "MMMM d, yyyy")}
                </div>
              )}
              {page.effectiveDate && (
                <div>
                  <span className="font-medium">Effective Date:</span>{" "}
                  {format(new Date(page.effectiveDate), "MMMM d, yyyy")}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg prose-neutral max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mb-4 prose-h2:mt-12 prose-h2:text-3xl prose-h3:mb-3 prose-h3:mt-8 prose-h3:text-2xl prose-h4:mb-2 prose-h4:mt-6 prose-h4:text-xl prose-p:leading-7 prose-p:text-foreground/80 prose-a:text-foreground prose-a:underline prose-a:decoration-foreground/30 prose-a:underline-offset-4 hover:prose-a:decoration-foreground/60 prose-strong:font-semibold prose-strong:text-foreground prose-ul:my-6 prose-ol:my-6 prose-li:my-2 prose-blockquote:border-l-4 prose-blockquote:border-foreground/20 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-foreground/70">
            <PortableText value={page.content} />
          </div>

          {/* Footer */}
          <div className="mt-12 rounded-[24px] border border-surface-border bg-secondary/30 p-6 text-sm text-foreground/60">
            <p>
              If you have any questions about this {page.title.toLowerCase()},
              please contact us through our{" "}
              <a
                href="/contact"
                className="font-medium text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground/60"
              >
                contact page
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
