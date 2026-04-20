export type Testimonial = {
  _id: string;
  name: string;
  designation?: string | null;
  company?: string | null;
  quote: string;
  image?: unknown | null;
  rating?: number | null;
  featured?: boolean | null;
  orderRank?: number | null;
};
