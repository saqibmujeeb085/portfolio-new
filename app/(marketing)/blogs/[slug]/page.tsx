import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { getBlogBySlug, getBlogSlugs } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();

  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) notFound();

  const imageUrl = blog.coverImage
    ? urlFor(blog.coverImage)
        .width(1600)
        .height(900)
        .fit("crop")
        .auto("format")
        .url()
    : null;

  return (
    <section className="bg-background text-foreground">
      <div className="ds-container py-16 md:py-20 xl:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-foreground/55">
            <span className="rounded-full border border-surface-border px-3 py-1">
              {blog.category?.title ?? "Uncategorized"}
            </span>
            {blog.publishedAt ? (
              <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
            ) : null}
            {blog.author ? <span>{blog.author}</span> : null}
          </div>

          <h1 className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl xl:text-7xl">
            {blog.title}
          </h1>

          {blog.excerpt ? (
            <p className="mt-5 max-w-3xl text-sm leading-6 text-foreground/65 md:text-lg">
              {blog.excerpt}
            </p>
          ) : null}

          {imageUrl ? (
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[32px] border border-surface-border bg-secondary">
              <Image
                src={imageUrl}
                alt={blog.title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ) : null}

          <div className="prose prose-neutral mt-12 max-w-none dark:prose-invert">
            <PortableText value={(blog.content ?? []) as PortableTextBlock[]} />
          </div>
        </div>
      </div>
    </section>
  );
}
