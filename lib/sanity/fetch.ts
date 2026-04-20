import { sanityClient } from "@/lib/sanity/client";
import {
  technologyCategoriesQuery,
  paginatedTechnologiesQuery,
  technologiesCountQuery,
  technologyBySlugQuery,
  technologySlugsQuery,
  featuredTechnologiesQuery,
  blogCategoriesQuery,
  paginatedBlogsQuery,
  blogsCountQuery,
  blogBySlugQuery,
  blogSlugsQuery,
  featuredBlogsQuery,
  paginatedTestimonialsQuery,
  testimonialsCountQuery,
  featuredTestimonialsQuery,
  projectCategoriesQuery,
  paginatedProjectsQuery,
  projectsCountQuery,
  projectSlugsQuery,
  projectBySlugQuery,
  featuredProjectsQuery,
  legalPageBySlugQuery,
  legalPageSlugsQuery,
  footerLegalPagesQuery,
  allLegalPagesQuery,
} from "@/lib/sanity/queries";

import type {
  Technology,
  TechnologyCategory,
  TechnologyDetail,
} from "@/types/technology";
import type { Blog, BlogCategory, BlogDetail } from "@/types/blog";
import type { Testimonial } from "@/types/testimonial";
import type { Project, ProjectCategory, ProjectDetail } from "@/types/project";
// Legal page types
import type { LegalPage, LegalPageDetail } from "../../types/legal-page";

export async function getTechnologyCategories() {
  return sanityClient.fetch<TechnologyCategory[]>(
    technologyCategoriesQuery,
    {},
    {
      next: {
        revalidate: 300,
        tags: ["technologyCategories"],
      },
    },
  );
}

export async function getFeaturedTechnologies() {
  return sanityClient.fetch<Technology[]>(
    featuredTechnologiesQuery,
    {},
    {
      next: {
        revalidate: 300,
        tags: ["technologies", "technologyCategories"],
      },
    },
  );
}

export async function getPaginatedTechnologies({
  category,
  page,
  pageSize,
}: {
  category?: string;
  page: number;
  pageSize: number;
}) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return sanityClient.fetch<Technology[]>(
    paginatedTechnologiesQuery,
    {
      category: category ?? null,
      start,
      end,
    },
    {
      next: {
        revalidate: 300,
        tags: ["technologies", "technologyCategories"],
      },
    },
  );
}

export async function getTechnologiesCount(category?: string) {
  return sanityClient.fetch<number>(
    technologiesCountQuery,
    {
      category: category ?? null,
    },
    {
      next: {
        revalidate: 300,
        tags: ["technologies"],
      },
    },
  );
}

export async function getTechnologyBySlug(slug: string) {
  return sanityClient.fetch<TechnologyDetail | null>(
    technologyBySlugQuery,
    { slug },
    {
      next: {
        revalidate: 300,
        tags: ["technologies", `technology:${slug}`],
      },
    },
  );
}

export async function getTechnologySlugs() {
  return sanityClient.fetch<{ slug: string }[]>(
    technologySlugsQuery,
    {},
    {
      next: {
        revalidate: 300,
        tags: ["technologies"],
      },
    },
  );
}

export async function getBlogCategories() {
  return sanityClient.fetch<BlogCategory[]>(
    blogCategoriesQuery,
    {},
    {
      next: {
        revalidate: 300,
        tags: ["blogCategories"],
      },
    },
  );
}

export async function getPaginatedBlogs({
  category,
  page,
  pageSize,
}: {
  category?: string;
  page: number;
  pageSize: number;
}) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return sanityClient.fetch<Blog[]>(
    paginatedBlogsQuery,
    {
      category: category ?? null,
      start,
      end,
    },
    {
      next: {
        revalidate: 300,
        tags: ["blogs", "blogCategories"],
      },
    },
  );
}

export async function getBlogsCount(category?: string) {
  return sanityClient.fetch<number>(
    blogsCountQuery,
    {
      category: category ?? null,
    },
    {
      next: {
        revalidate: 300,
        tags: ["blogs"],
      },
    },
  );
}

export async function getBlogBySlug(slug: string) {
  return sanityClient.fetch<BlogDetail | null>(
    blogBySlugQuery,
    { slug },
    {
      next: {
        revalidate: 300,
        tags: ["blogs", `blog:${slug}`],
      },
    },
  );
}

export async function getBlogSlugs() {
  return sanityClient.fetch<{ slug: string }[]>(
    blogSlugsQuery,
    {},
    {
      next: {
        revalidate: 300,
        tags: ["blogs"],
      },
    },
  );
}

export async function getFeaturedBlogs() {
  return sanityClient.fetch<Blog[]>(
    featuredBlogsQuery,
    {},
    {
      next: {
        revalidate: 300,
        tags: ["blogs", "blogCategories"],
      },
    },
  );
}

export async function getPaginatedTestimonials({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return sanityClient.fetch<Testimonial[]>(
    paginatedTestimonialsQuery,
    {
      start,
      end,
    },
    {
      next: {
        revalidate: 300,
        tags: ["testimonials"],
      },
    },
  );
}

export async function getTestimonialsCount() {
  return sanityClient.fetch<number>(
    testimonialsCountQuery,
    {},
    {
      next: {
        revalidate: 300,
        tags: ["testimonials"],
      },
    },
  );
}

export async function getFeaturedTestimonials() {
  return sanityClient.fetch<Testimonial[]>(
    featuredTestimonialsQuery,
    {},
    {
      next: {
        revalidate: 300,
        tags: ["testimonials"],
      },
    },
  );
}

export async function getProjectCategories() {
  return sanityClient.fetch<ProjectCategory[]>(
    projectCategoriesQuery,
    {},
    {
      next: {
        revalidate: 300,
        tags: ["projectCategories"],
      },
    },
  );
}

export async function getPaginatedProjects({
  category,
  page,
  pageSize,
}: {
  category?: string;
  page: number;
  pageSize: number;
}) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return sanityClient.fetch<Project[]>(
    paginatedProjectsQuery,
    {
      category: category ?? null,
      start,
      end,
    },
    {
      next: {
        revalidate: 300,
        tags: ["projects", "projectCategories"],
      },
    },
  );
}

export async function getProjectsCount(category?: string) {
  return sanityClient.fetch<number>(
    projectsCountQuery,
    {
      category: category ?? null,
    },
    {
      next: {
        revalidate: 300,
        tags: ["projects"],
      },
    },
  );
}

export async function getProjectBySlug(slug: string) {
  return sanityClient.fetch<ProjectDetail | null>(
    projectBySlugQuery,
    { slug },
    {
      next: {
        revalidate: 300,
        tags: ["projects", `project:${slug}`],
      },
    },
  );
}

export async function getProjectSlugs() {
  return sanityClient.fetch<{ slug: string }[]>(
    projectSlugsQuery,
    {},
    {
      next: {
        revalidate: 300,
        tags: ["projects"],
      },
    },
  );
}


export async function getFeaturedProjects() {
  return sanityClient.fetch<Project[]>(
    featuredProjectsQuery,
    {},
    {
      next: {
        revalidate: 300,
        tags: ["projects", "projectCategories"],
      },
    }
  );
}

// Legal Pages Functions
export async function getLegalPageBySlug(slug: string) {
  return sanityClient.fetch<LegalPageDetail | null>(
    legalPageBySlugQuery,
    { slug },
    {
      next: {
        revalidate: 300,
        tags: ["legalPages", `legalPage:${slug}`],
      },
    }
  );
}

export async function getLegalPageSlugs() {
  return sanityClient.fetch<{ slug: string }[]>(
    legalPageSlugsQuery,
    {},
    {
      next: {
        revalidate: 300,
        tags: ["legalPages"],
      },
    }
  );
}

export async function getFooterLegalPages() {
  return sanityClient.fetch<LegalPage[]>(
    footerLegalPagesQuery,
    {},
    {
      next: {
        revalidate: 300,
        tags: ["legalPages"],
      },
    }
  );
}

export async function getAllLegalPages() {
  return sanityClient.fetch<LegalPage[]>(
    allLegalPagesQuery,
    {},
    {
      next: {
        revalidate: 300,
        tags: ["legalPages"],
      },
    }
  );
}
