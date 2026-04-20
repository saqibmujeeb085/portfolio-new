import type { PortableTextBlock } from "@portabletext/types";

export interface LegalPage {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  lastUpdated: string;
  showInFooter: boolean;
  order: number;
}

export interface LegalPageDetail extends LegalPage {
  effectiveDate?: string;
  content: PortableTextBlock[];
}
