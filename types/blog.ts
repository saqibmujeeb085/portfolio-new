import type { PortableTextBlock } from "@portabletext/types";

export type BlogCategory = {
  _id: string;
  title: string;
  slug: string;
  orderRank?: number | null;
};

export type Blog = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: unknown | null;
  publishedAt?: string | null;
  author?: string | null;
  featured?: boolean | null;
  orderRank?: number | null;
  category: BlogCategory | null;
};

export type BlogDetail = Blog & {
  content?: Array<PortableTextBlock | Record<string, unknown>>;
};
