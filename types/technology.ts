import type { PortableTextBlock } from "@portabletext/types";

export type TechnologyCategory = {
  _id: string;
  title: string;
  slug: string;
  orderRank?: number | null;
};

export type Technology = {
  _id: string;
  title: string;
  slug: string;
  category: TechnologyCategory | null;
  shortDescription: string;
  icon?: {
    asset?: {
      url?: string;
    };
  } | null;
  featured?: boolean | null;
  orderRank?: number | null;
};

export type TechnologyDetail = {
  _id: string;
  title: string;
  slug: string;
  category: TechnologyCategory | null;
  shortDescription: string;
  icon?: {
    asset?: {
      url?: string;
    };
  } | null;
  featured?: boolean | null;
  orderRank?: number | null;
  overview?: PortableTextBlock[];
  benefits?: string[];
  projectScoping?: string[];
};
