import { defineField, defineType } from "sanity";
import { Settings } from "lucide-react";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: Settings,
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Main site title (e.g., Aura Tech Solutions)",
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      rows: 3,
      description: "Brief description shown in footer",
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      description: "Copyright text (without year, it's added automatically)",
      initialValue: "Aura Tech Solutions. All rights reserved.",
    }),
    defineField({
      name: "ctaButtonText",
      title: "CTA Button Text",
      type: "string",
      description: "Call-to-action button text in header",
      initialValue: "Start Your Project",
    }),
    defineField({
      name: "ctaButtonLink",
      title: "CTA Button Link",
      type: "string",
      description: "Link for CTA button",
      initialValue: "/contact",
    }),
    defineField({
      name: "navigationLinks",
      title: "Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "href",
              title: "Link",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "order",
              title: "Order",
              type: "number",
              description: "Display order (lower numbers first)",
            },
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        },
      ],
      description: "Main navigation links",
    }),
    defineField({
      name: "showLegalInFooter",
      title: "Show Legal Links in Footer",
      type: "boolean",
      initialValue: true,
      description: "Display legal pages in footer legal section",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title}) {
      return {
        title: title || "Site Settings",
        subtitle: "Configure site-wide settings",
      };
    },
  },
});
