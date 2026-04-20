import type { PortableTextBlock } from "@portabletext/types";

export type ProjectCategory = {
  _id: string;
  title: string;
  slug: string;
  orderRank?: number | null;
};

export type Project = {
  _id: string;
  title: string;
  slug: string;
  category: ProjectCategory | null;
  client?: string | null;
  year?: string | null;
  excerpt?: string | null;
  coverImage?: unknown | null;
  services?: string[] | null;
  featured?: boolean | null;
  orderRank?: number | null;
};

export type ProjectDetail = Project & {
  gallery?: unknown[] | null;
  challenge?: PortableTextBlock[];
  solution?: PortableTextBlock[];
  result?: PortableTextBlock[];
  projectUrl?: string | null;
};
