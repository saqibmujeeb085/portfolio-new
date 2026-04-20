import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import type { Project } from "@/types/project";

// Reusable ProjectsSection component
type ProjectsSectionProps = {
  projects: Project[];
};

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  return (
    <section className="bg-background text-foreground">
      <div className="ds-container py-16 md:py-20 xl:py-24">
    


<div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-foreground/50">
              Our Projects
            </p>

            <h2 className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
             Our Featured Projects
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-foreground/65 md:text-base">
              Explore some of the most exciting projects we’ve worked on.
            </p>
          </div>

          <div>
            <Link
              href="/Projects"
              className="inline-flex rounded-full border border-surface-border px-5 py-3 text-sm font-medium transition hover:bg-secondary"
            >
              View All Projects
            </Link>
          </div>
        </div>





        {/* Grid Layout */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => {
            const imageUrl = project.coverImage
              ? urlFor(project.coverImage)
                  .width(800)
                  .height(500)
                  .fit("crop")
                  .auto("format")
                  .url()
              : null;

            return (
              <Link
                key={project._id}
                href={`/projects/${project.slug}`}
                className="group flex flex-col md:flex-row rounded-[32px] border border-surface-border bg-card shadow-lg transition duration-300"
              >
                {/* Left: Image */}
                <div className="relative aspect-[16/9] w-full md:w-1/2 overflow-hidden rounded-t-[32px] md:rounded-t-none md:rounded-l-[32px] bg-secondary">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-foreground/40">
                      No Image
                    </div>
                  )}
                </div>

                {/* Right: Text */}
                <div className="p-6 md:p-8 flex flex-col justify-between w-full md:w-1/2 bg-card-light rounded-b-[32px] md:rounded-b-none md:rounded-r-[32px]">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-foreground/65 md:text-base">
                    {project.excerpt ?? "No description available."}
                  </p>

                  <span className="mt-8 inline-flex text-sm font-medium text-primary">
                    View Project →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        
      </div>
    </section>
  );
};

export default ProjectsSection;