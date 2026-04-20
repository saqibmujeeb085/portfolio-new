import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getProjectBySlug, getProjectSlugs } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import { isValidSanityImage } from "@/lib/sanity/is-valid-image";
import { ProjectCover } from "@/components/project/project-cover";
import { ProjectGallery } from "@/components/project/project-gallery";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();

  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const validGallery = (project.gallery ?? []).filter(isValidSanityImage);

  const coverImageUrl =
    project.coverImage && isValidSanityImage(project.coverImage)
      ? urlFor(project.coverImage)
          .width(1600)
          .height(1000)
          .fit("crop")
          .auto("format")
          .url()
      : null;

  // Prepare all images for lightbox (cover + gallery)
  const galleryImageUrls = validGallery.map((image) =>
    urlFor(image).width(1200).height(800).fit("crop").auto("format").url()
  );

  const allImages = coverImageUrl
    ? [coverImageUrl, ...galleryImageUrls]
    : galleryImageUrls;

  return (
    <section className="bg-background text-foreground">
      <div className="ds-container py-16 md:py-20 xl:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-foreground/55">
            <span className="rounded-full border border-surface-border px-3 py-1">
              {project.category?.title ?? "Uncategorized"}
            </span>
            {project.client ? <span>{project.client}</span> : null}
            {project.year ? <span>{project.year}</span> : null}
          </div>

          <h1 className="max-w-5xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl xl:text-7xl">
            {project.title}
          </h1>

          {project.excerpt ? (
            <p className="mt-5 max-w-3xl text-sm leading-6 text-foreground/65 md:text-lg">
              {project.excerpt}
            </p>
          ) : null}

          {project.services?.length ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.services.map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-surface-border px-4 py-2 text-xs uppercase tracking-[0.16em] text-foreground/55"
                >
                  {service}
                </span>
              ))}
            </div>
          ) : null}

          {coverImageUrl ? (
            <ProjectCover
              imageUrl={coverImageUrl}
              title={project.title}
              allImages={allImages}
            />
          ) : null}

          <div className="mt-14 grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              {project.challenge?.length ? (
                <div className="rounded-[32px] border border-surface-border bg-card p-6 shadow-[var(--shadow-soft)] md:p-8">
                  <p className="mb-4 text-sm uppercase tracking-[0.2em] text-foreground/50">
                    Challenge
                  </p>
                  <div className="prose prose-neutral max-w-none dark:prose-invert">
                    <PortableText value={project.challenge ?? []} />
                  </div>
                </div>
              ) : null}

              {project.solution?.length ? (
                <div className="rounded-[32px] border border-surface-border bg-card p-6 shadow-[var(--shadow-soft)] md:p-8">
                  <p className="mb-4 text-sm uppercase tracking-[0.2em] text-foreground/50">
                    Solution
                  </p>
                  <div className="prose prose-neutral max-w-none dark:prose-invert">
                    <PortableText value={project.solution ?? []} />
                  </div>
                </div>
              ) : null}

              {project.result?.length ? (
                <div className="rounded-[32px] border border-surface-border bg-card p-6 shadow-[var(--shadow-soft)] md:p-8">
                  <p className="mb-4 text-sm uppercase tracking-[0.2em] text-foreground/50">
                    Result
                  </p>
                  <div className="prose prose-neutral max-w-none dark:prose-invert">
                    <PortableText value={project.result ?? []} />
                  </div>
                </div>
              ) : null}
            </div>

            <div className="space-y-6">
              {validGallery.length > 0 ? (
                <ProjectGallery
                  images={galleryImageUrls}
                  projectTitle={project.title}
                />
              ) : null}

              {project.projectUrl ? (
                <div className="rounded-[32px] border border-surface-border bg-card p-6 shadow-[var(--shadow-soft)] md:p-8">
                  <p className="mb-4 text-sm uppercase tracking-[0.2em] text-foreground/50">
                    Project Link
                  </p>
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full border border-surface-border px-5 py-3 text-sm font-medium transition hover:bg-secondary"
                  >
                    Visit Project
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}