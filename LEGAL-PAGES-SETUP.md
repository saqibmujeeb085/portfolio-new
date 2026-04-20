# Dynamic Legal Pages Setup Guide 📄

## Overview

Dynamic legal pages system that pulls content from Sanity CMS. Perfect for Privacy Policy, Terms & Conditions, Payment Policy, and any other legal documents.

## Features

✅ **Fully Dynamic** - All content managed in Sanity CMS
✅ **SEO Optimized** - Meta descriptions and proper structure
✅ **Date Tracking** - Last updated and effective dates
✅ **Rich Text** - Full formatting with headings, lists, links
✅ **Footer Integration** - Automatic footer links
✅ **Responsive Design** - Beautiful on all devices
✅ **Static Generation** - Fast page loads with ISR

## What Was Created

### 1. Sanity Schema
**File**: `sanity/schemaTypes/legalPageType.ts`

**Fields**:
- Title (e.g., "Privacy Policy")
- Slug (URL-friendly, e.g., "privacy-policy")
- Meta Description (for SEO)
- Last Updated Date
- Effective Date
- Content (Rich text with formatting)
- Show in Footer (toggle)
- Order (for footer sorting)

### 2. TypeScript Types
**File**: `types/legal-page.ts`

Defines the structure for legal pages in TypeScript.

### 3. Sanity Queries
**File**: `lib/sanity/queries.ts` (appended)

Queries for fetching legal pages:
- By slug
- All slugs (for static generation)
- Footer pages only
- All pages

### 4. Fetch Functions
**File**: `lib/sanity/fetch.ts` (appended)

Functions to fetch legal pages with caching.

### 5. Dynamic Page
**File**: `app/(marketing)/legal/[slug]/page.tsx`

Dynamic route that renders any legal page.

## Setup Instructions

### Step 1: Deploy Sanity Schema (2 minutes)

1. **Start Sanity Studio**:
   ```bash
   cd studio
   npm run dev
   ```

2. **Open Studio**: http://localhost:3333

3. **Schema Auto-Loaded**: The new "Legal Pages" type is now available

### Step 2: Create Legal Pages in Sanity (5 minutes)

#### Create Privacy Policy

1. Click "Legal Pages" in Sanity Studio
2. Click "Create new Legal Page"
3. Fill in:
   - **Title**: Privacy Policy
   - **Slug**: Click "Generate" → `privacy-policy`
   - **Meta Description**: "Learn how we collect, use, and protect your personal information"
   - **Last Updated**: Today's date
   - **Effective Date**: Today's date or earlier
   - **Content**: Write your privacy policy (see template below)
   - **Show in Footer**: ✓ Checked
   - **Order**: 1

4. Click "Publish"

#### Create Terms & Conditions

1. Create new Legal Page
2. Fill in:
   - **Title**: Terms & Conditions
   - **Slug**: `terms-and-conditions`
   - **Meta Description**: "Read our terms of service and conditions of use"
   - **Last Updated**: Today's date
   - **Content**: Write your terms (see template below)
   - **Show in Footer**: ✓ Checked
   - **Order**: 2

3. Publish

#### Create Payment Policy

1. Create new Legal Page
2. Fill in:
   - **Title**: Payment Policy
   - **Slug**: `payment-policy`
   - **Meta Description**: "Understand our payment terms, refunds, and billing policies"
   - **Last Updated**: Today's date
   - **Content**: Write your payment policy (see template below)
   - **Show in Footer**: ✓ Checked
   - **Order**: 3

3. Publish

### Step 3: Access Pages (Immediate)

Pages are now live at:
- `/legal/privacy-policy`
- `/legal/terms-and-conditions`
- `/legal/payment-policy`

## Content Templates

### Privacy Policy Template

```
## Information We Collect

We collect information you provide directly to us, including:

- Name and contact information
- Email address
- Phone number
- Service preferences
- Any other information you choose to provide

## How We Use Your Information

We use the information we collect to:

- Provide and improve our services
- Respond to your inquiries
- Send you updates and marketing communications
- Comply with legal obligations

## Information Sharing

We do not sell your personal information. We may share your information with:

- Service providers who assist in our operations
- Legal authorities when required by law
- Business partners with your consent

## Data Security

We implement appropriate security measures to protect your information from unauthorized access, alteration, or destruction.

## Your Rights

You have the right to:

- Access your personal information
- Request corrections to your data
- Request deletion of your data
- Opt-out of marketing communications

## Contact Us

If you have questions about this Privacy Policy, please contact us through our contact page.
```

### Terms & Conditions Template

```
## Acceptance of Terms

By accessing and using this website, you accept and agree to be bound by these Terms and Conditions.

## Use of Service

You agree to use our services only for lawful purposes and in accordance with these Terms.

### Prohibited Activities

You may not:

- Use the service for any illegal purpose
- Attempt to gain unauthorized access
- Interfere with the proper functioning of the service
- Transmit malicious code or viruses

## Intellectual Property

All content on this website is owned by us or our licensors and is protected by copyright and other intellectual property laws.

## Limitation of Liability

We shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.

## Changes to Terms

We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.

## Governing Law

These terms shall be governed by and construed in accordance with applicable laws.

## Contact Information

For questions about these Terms, please contact us through our contact page.
```

### Payment Policy Template

```
## Payment Methods

We accept the following payment methods:

- Credit cards (Visa, Mastercard, American Express)
- Debit cards
- Bank transfers
- PayPal
- Other digital payment methods

## Pricing

All prices are listed in [Currency] and are subject to change without notice.

## Payment Terms

- Payment is due upon receipt of invoice
- Late payments may incur additional fees
- We reserve the right to suspend services for non-payment

## Refund Policy

### Eligibility

Refunds may be requested within [X] days of purchase if:

- Services were not delivered as described
- Technical issues prevented service delivery
- You are not satisfied with the service (conditions apply)

### Process

To request a refund:

1. Contact us through our contact page
2. Provide your order number and reason
3. Allow [X] business days for processing

### Non-Refundable Items

The following are non-refundable:

- Custom development work already completed
- Third-party services or licenses
- Consultation fees

## Billing Disputes

If you believe there is an error in your billing, please contact us within [X] days of the charge.

## Currency and Taxes

- All prices are in [Currency]
- Applicable taxes will be added at checkout
- International customers may be subject to additional fees

## Contact Us

For payment-related questions, please contact us through our contact page.
```

## Content Formatting Guide

### Available Formatting

In Sanity's rich text editor, you can use:

**Headings**:
- H2 for main sections
- H3 for subsections
- H4 for minor points

**Text Formatting**:
- **Bold** for emphasis
- *Italic* for subtle emphasis
- `Code` for technical terms

**Lists**:
- Bullet lists for items
- Numbered lists for steps

**Links**:
- Add links to external resources
- Link to other pages on your site

**Quotes**:
- Use blockquotes for important statements

### Best Practices

1. **Use Clear Headings**: Break content into logical sections
2. **Short Paragraphs**: Keep paragraphs concise and readable
3. **Bullet Points**: Use lists for easy scanning
4. **Plain Language**: Avoid overly complex legal jargon
5. **Update Dates**: Always update "Last Updated" when making changes

## Updating Content

### To Update a Legal Page

1. Open Sanity Studio
2. Go to "Legal Pages"
3. Click on the page you want to edit
4. Make your changes
5. Update the "Last Updated" date
6. Click "Publish"
7. Changes appear within 5 minutes (revalidation time)

## Footer Integration

### Automatic Footer Links

Legal pages with "Show in Footer" enabled will automatically appear in your footer.

**Order**: Pages are sorted by the "Order" field (lower numbers first).

### To Add to Footer

If you want to manually add legal page links to your footer:

1. Open `components/layout/footer.tsx`
2. Use the `getFooterLegalPages()` function
3. Map over the results to create links

Example:
```tsx
import { getFooterLegalPages } from "@/lib/sanity/fetch";

const legalPages = await getFooterLegalPages();

{legalPages.map((page) => (
  <Link key={page._id} href={`/legal/${page.slug}`}>
    {page.title}
  </Link>
))}
```

## URL Structure

All legal pages follow this pattern:
```
/legal/[slug]
```

Examples:
- `/legal/privacy-policy`
- `/legal/terms-and-conditions`
- `/legal/payment-policy`
- `/legal/cookie-policy`
- `/legal/refund-policy`

## SEO Features

✅ **Dynamic Meta Tags**: Title and description from Sanity
✅ **Proper Headings**: H1 for title, H2-H4 for content
✅ **Semantic HTML**: Proper article structure
✅ **Mobile Friendly**: Responsive design
✅ **Fast Loading**: Static generation with ISR

## Styling

The legal pages use:
- **Prose Classes**: Tailwind Typography for beautiful text
- **Consistent Design**: Matches your site's design system
- **Readable Width**: Max 4xl container for optimal reading
- **Proper Spacing**: Comfortable line height and margins

## Advanced Features

### Add More Legal Pages

Simply create a new Legal Page in Sanity with any title and slug. It will automatically:
- Generate a new route
- Be available at `/legal/[your-slug]`
- Optionally appear in footer

### Custom Styling

To customize the appearance, edit:
```
app/(marketing)/legal/[slug]/page.tsx
```

Modify the prose classes or add custom styles.

### Add Custom Components

You can extend the PortableText renderer to add custom components:

```tsx
const components = {
  types: {
    // Custom block types
  },
  marks: {
    // Custom marks
  },
};

<PortableText value={page.content} components={components} />
```

## Testing

### Test Legal Pages

1. Visit each page:
   - http://localhost:3000/legal/privacy-policy
   - http://localhost:3000/legal/terms-and-conditions
   - http://localhost:3000/legal/payment-policy

2. Check:
   - Content displays correctly
   - Dates show properly
   - Links work
   - Responsive on mobile
   - Footer links (if added)

### Test in Sanity

1. Edit a page in Sanity
2. Change some content
3. Publish
4. Wait 5 minutes (revalidation)
5. Refresh the page
6. Changes should appear

## Troubleshooting

### "Page Not Found"

**Cause**: Page not published in Sanity or slug mismatch

**Solution**:
1. Check page is published in Sanity
2. Verify slug matches URL
3. Rebuild: `npm run build`

### "Content Not Updating"

**Cause**: Revalidation cache

**Solution**:
1. Wait 5 minutes for cache to expire
2. Or force rebuild: `npm run build`
3. Or clear `.next` cache

### "Dates Not Showing"

**Cause**: Date fields empty in Sanity

**Solution**:
1. Edit page in Sanity
2. Add dates to "Last Updated" and "Effective Date"
3. Publish

## Production Checklist

Before going live:

- [ ] Create all required legal pages in Sanity
- [ ] Review content for accuracy
- [ ] Set proper dates
- [ ] Test all pages work
- [ ] Add footer links (if desired)
- [ ] Check mobile responsiveness
- [ ] Verify SEO meta tags
- [ ] Test links in content
- [ ] Spell check all content
- [ ] Get legal review (recommended)

## Files Created/Modified

**Created**:
- `sanity/schemaTypes/legalPageType.ts`
- `types/legal-page.ts`
- `app/(marketing)/legal/[slug]/page.tsx`
- `LEGAL-PAGES-SETUP.md`

**Modified**:
- `sanity/schemaTypes/index.ts`
- `lib/sanity/queries.ts`
- `lib/sanity/fetch.ts`

---

**Status**: ✅ Complete and Ready

Your dynamic legal pages system is ready to use! Just add content in Sanity and pages will automatically generate.
