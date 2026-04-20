import { groq } from "next-sanity";

export const technologyCategoriesQuery = groq`
  *[_type == "technologyCategory"] | order(orderRank asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    orderRank
  }
`;

export const featuredTechnologiesQuery = groq`
  *[_type == "technology" && featured == true] | order(orderRank asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    featured,
    orderRank,
    icon,
    category->{
      _id,
      title,
      "slug": slug.current,
      orderRank
    }
  }
`;

export const paginatedTechnologiesQuery = groq`
  *[
    _type == "technology" &&
    (
      $category == null ||
      category->slug.current == $category
    )
  ] | order(orderRank asc, title asc) [$start...$end] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    featured,
    orderRank,
    icon,
    category->{
      _id,
      title,
      "slug": slug.current,
      orderRank
    }
  }
`;

export const technologiesCountQuery = groq`
  count(
    *[
      _type == "technology" &&
      (
        $category == null ||
        category->slug.current == $category
      )
    ]
  )
`;

export const technologySlugsQuery = groq`
  *[_type == "technology" && defined(slug.current)][]{
    "slug": slug.current
  }
`;

export const technologyBySlugQuery = groq`
  *[_type == "technology" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    featured,
    orderRank,
    icon,
    category->{
      _id,
      title,
      "slug": slug.current,
      orderRank
    },
    overview,
    benefits,
    projectScoping
  }
`;

export const blogCategoriesQuery = groq`
  *[_type == "blogCategory"] | order(orderRank asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    orderRank
  }
`;

export const paginatedBlogsQuery = groq`
  *[
    _type == "blog" &&
    (
      $category == null ||
      category->slug.current == $category
    )
  ] | order(publishedAt desc, orderRank asc, title asc) [$start...$end] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    publishedAt,
    author,
    featured,
    orderRank,
    category->{
      _id,
      title,
      "slug": slug.current,
      orderRank
    }
  }
`;

export const blogsCountQuery = groq`
  count(
    *[
      _type == "blog" &&
      (
        $category == null ||
        category->slug.current == $category
      )
    ]
  )
`;

export const blogSlugsQuery = groq`
  *[_type == "blog" && defined(slug.current)][]{
    "slug": slug.current
  }
`;

export const blogBySlugQuery = groq`
  *[_type == "blog" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    publishedAt,
    author,
    featured,
    orderRank,
    category->{
      _id,
      title,
      "slug": slug.current,
      orderRank
    },
    content
  }
`;

export const featuredBlogsQuery = groq`
  *[_type == "blog"] | order(featured desc, publishedAt desc, orderRank asc, title asc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    publishedAt,
    author,
    featured,
    orderRank,
    category->{
      _id,
      title,
      "slug": slug.current,
      orderRank
    }
  }
`;

export const paginatedTestimonialsQuery = groq`
  *[_type == "testimonial"] | order(featured desc, orderRank asc, name asc) [$start...$end] {
    _id,
    name,
    designation,
    company,
    quote,
    image,
    rating,
    featured,
    orderRank
  }
`;

export const testimonialsCountQuery = groq`
  count(*[_type == "testimonial"])
`;

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial"] | order(featured desc, orderRank asc, name asc) [0...8] {
    _id,
    name,
    designation,
    company,
    quote,
    image,
    rating,
    featured,
    orderRank
  }
`;

export const projectCategoriesQuery = groq`
  *[_type == "projectCategory"] | order(orderRank asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    orderRank
  }
`;

export const paginatedProjectsQuery = groq`
  *[
    _type == "project" &&
    (
      $category == null ||
      category->slug.current == $category
    )
  ] | order(featured desc, orderRank asc, title asc) [$start...$end] {
    _id,
    title,
    "slug": slug.current,
    client,
    year,
    excerpt,
    coverImage,
    services,
    featured,
    orderRank,
    category->{
      _id,
      title,
      "slug": slug.current,
      orderRank
    }
  }
`;

export const projectsCountQuery = groq`
  count(
    *[
      _type == "project" &&
      (
        $category == null ||
        category->slug.current == $category
      )
    ]
  )
`;

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][]{
    "slug": slug.current
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    client,
    year,
    excerpt,
    coverImage,
    gallery,
    services,
    featured,
    orderRank,
    projectUrl,
    category->{
      _id,
      title,
      "slug": slug.current,
      orderRank
    },
    challenge,
    solution,
    result
  }
`;


// Add this query to fetch featured projects
export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(orderRank asc, title asc) [0...4] {
    _id,
    title,
    "slug": slug.current,
    client,
    year,
    excerpt,
    coverImage,
    services,
    featured,
    orderRank,
    category->{
      _id,
      title,
      "slug": slug.current,
      orderRank
    }
  }
`;

// Legal Pages Queries
export const legalPageBySlugQuery = groq`
  *[_type == "legalPage" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    lastUpdated,
    effectiveDate,
    content,
    showInFooter,
    order
  }
`;

export const legalPageSlugsQuery = groq`
  *[_type == "legalPage"] {
    "slug": slug.current
  }
`;

export const footerLegalPagesQuery = groq`
  *[_type == "legalPage" && showInFooter == true] | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    order
  }
`;

export const allLegalPagesQuery = groq`
  *[_type == "legalPage"] | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    lastUpdated,
    showInFooter,
    order
  }
`;


// Site Settings Query
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    title,
    description,
    copyrightText,
    ctaButtonText,
    ctaButtonLink,
    navigationLinks[] | order(order asc) {
      label,
      href,
      order
    },
    showLegalInFooter
  }
`;
