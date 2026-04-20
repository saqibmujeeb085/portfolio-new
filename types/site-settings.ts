export interface NavigationLink {
  label: string;
  href: string;
  order?: number;
}

export interface SiteSettings {
  _id: string;
  title: string;
  description?: string;
  copyrightText: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  navigationLinks?: NavigationLink[];
  showLegalInFooter: boolean;
}
