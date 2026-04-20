# Sanity Studio Deployment Guide 🚀

## Overview

This guide will help you deploy your Sanity Studio online so you can manage content from anywhere.

## Prerequisites

✅ Sanity account (free at https://www.sanity.io)
✅ Project ID: `7xtcf5xm` (already configured)
✅ Dataset: `production` (already configured)

## Deployment Options

### Option 1: Deploy to Sanity's Free Hosting (Recommended)

Sanity provides free hosting for your studio at `your-project.sanity.studio`

#### Steps:

1. **Navigate to Studio Directory**
   ```bash
   cd studio
   ```

2. **Install Dependencies** (if not already done)
   ```bash
   npm install
   ```

3. **Login to Sanity**
   ```bash
   npx sanity login
   ```
   - Opens browser for authentication
   - Login with your Sanity account
   - Confirm in terminal

4. **Deploy Studio**
   ```bash
   npx sanity deploy
   ```
   - Choose a hostname (e.g., `my-portfolio-studio`)
   - Studio will be available at: `https://my-portfolio-studio.sanity.studio`

5. **Done!** 🎉
   Your studio is now live and accessible from anywhere.

---

### Option 2: Deploy to Vercel

Deploy the studio as part of your main site or separately.

#### Steps:

1. **Create Vercel Project**
   - Go to https://vercel.com
   - Import your repository
   - Select the `studio` directory as root

2. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Add Environment Variables** (if needed)
   - Usually not required as config is in `sanity.config.ts`

4. **Deploy**
   - Click "Deploy"
   - Studio will be available at your Vercel URL

---

### Option 3: Deploy to Netlify

Similar to Vercel, deploy to Netlify.

#### Steps:

1. **Create Netlify Site**
   - Go to https://netlify.com
   - Import repository
   - Set base directory to `studio`

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Deploy**
   - Click "Deploy site"
   - Studio available at Netlify URL

---

## Post-Deployment Setup

### 1. Configure CORS Origins

After deploying, add your studio URL to allowed origins:

1. Go to https://www.sanity.io/manage
2. Select your project (`7xtcf5xm`)
3. Go to "API" → "CORS Origins"
4. Click "Add CORS origin"
5. Add your studio URL:
   - `https://your-studio.sanity.studio` (if using Sanity hosting)
   - `https://your-studio.vercel.app` (if using Vercel)
   - `http://localhost:3333` (for local development)
6. Allow credentials: ✓ Checked
7. Save

### 2. Invite Team Members (Optional)

1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to "Members"
4. Click "Invite members"
5. Enter email addresses
6. Assign roles (Admin, Editor, Viewer)
7. Send invitations

### 3. Configure Authentication

Your studio is already configured with authentication. Users must:
1. Have a Sanity account
2. Be invited to your project
3. Login through the studio

---

## Managing Content

### Access Your Studio

**Local Development**:
```bash
cd studio
npm run dev
```
Open: http://localhost:3333

**Production**:
Visit your deployed URL (e.g., `https://your-studio.sanity.studio`)

### Create Legal Pages

1. **Login to Studio**
2. **Click "Legal Pages"** in sidebar
3. **Create New Page**:
   - Click "+ Create" button
   - Fill in all fields
   - Write content using rich text editor
   - Click "Publish"

### Example: Privacy Policy

**Title**: Privacy Policy
**Slug**: Click "Generate" → `privacy-policy`
**Meta Description**: "Learn how we collect, use, and protect your personal information"
**Last Updated**: Today's date
**Effective Date**: Today's date
**Content**: Write your privacy policy
**Show in Footer**: ✓ Checked
**Order**: 1

**Publish** → Page available at `/legal/privacy-policy`

---

## Troubleshooting

### "Authentication failed"

**Solution**:
```bash
npx sanity login
```
Re-authenticate and try again.

### "Project not found"

**Solution**:
Check `studio/sanity.config.ts` has correct:
- `projectId: '7xtcf5xm'`
- `dataset: 'production'`

### "CORS error in browser"

**Solution**:
1. Go to Sanity manage console
2. Add your studio URL to CORS origins
3. Enable credentials
4. Save and refresh studio

### "Deploy command not found"

**Solution**:
```bash
cd studio
npm install -g @sanity/cli
npx sanity deploy
```

### "Build fails"

**Solution**:
```bash
cd studio
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Studio Features

### Content Types Available

1. **Technologies** - Tech stack items
2. **Technology Categories** - Tech groupings
3. **Blogs** - Blog posts
4. **Blog Categories** - Blog groupings
5. **Projects** - Portfolio projects
6. **Project Categories** - Project groupings
7. **Testimonials** - Client testimonials
8. **Legal Pages** - Privacy, Terms, etc. ✨ NEW

### Rich Text Editor

The legal pages content editor supports:
- **Headings**: H2, H3, H4
- **Text Formatting**: Bold, Italic, Code
- **Lists**: Bullet and Numbered
- **Links**: Internal and external
- **Quotes**: Blockquotes

### Preview

Each content type has a preview showing:
- Title
- Last updated date
- Status (Published/Draft)

---

## Security Best Practices

### 1. Limit Access

Only invite team members who need access:
- **Admin**: Full control
- **Editor**: Can edit content
- **Viewer**: Read-only access

### 2. Use Strong Passwords

Ensure all team members use strong passwords for Sanity accounts.

### 3. Enable 2FA

Enable two-factor authentication on Sanity accounts:
1. Go to Sanity account settings
2. Enable 2FA
3. Use authenticator app

### 4. Regular Backups

Sanity automatically backs up your data, but you can also:
```bash
npx sanity dataset export production backup.tar.gz
```

### 5. Monitor Activity

Check the activity log in Sanity manage console:
- Who made changes
- When changes were made
- What was changed

---

## Updating Studio

### Update Sanity Packages

```bash
cd studio
npm update @sanity/cli
npm update sanity
npm install
```

### Add New Schema Types

1. Create new type file in `studio/schemaTypes/`
2. Import in `studio/schemaTypes/index.ts`
3. Add to `schemaTypes` array
4. Redeploy studio

### Modify Existing Types

1. Edit type file in `studio/schemaTypes/`
2. Save changes
3. Redeploy studio
4. Changes appear immediately

---

## Cost

### Sanity Pricing

**Free Tier** (Perfect for most portfolios):
- 3 users
- 10,000 documents
- 5GB assets
- 100,000 API requests/month
- Free studio hosting

**Growth Tier** ($99/month):
- Unlimited users
- Unlimited documents
- 50GB assets
- 500,000 API requests/month

**Enterprise**: Custom pricing

### Hosting Costs

- **Sanity Hosting**: FREE
- **Vercel**: FREE (Hobby plan)
- **Netlify**: FREE (Starter plan)

---

## Quick Commands Reference

```bash
# Navigate to studio
cd studio

# Install dependencies
npm install

# Run locally
npm run dev

# Login to Sanity
npx sanity login

# Deploy to Sanity hosting
npx sanity deploy

# Build for production
npm run build

# Export data
npx sanity dataset export production backup.tar.gz

# Import data
npx sanity dataset import backup.tar.gz production

# Check Sanity CLI version
npx sanity --version

# Update Sanity CLI
npm install -g @sanity/cli@latest
```

---

## Support Resources

### Official Documentation
- [Sanity Docs](https://www.sanity.io/docs)
- [Deployment Guide](https://www.sanity.io/docs/deployment)
- [Studio Configuration](https://www.sanity.io/docs/configuration)

### Community
- [Sanity Slack](https://slack.sanity.io)
- [GitHub Discussions](https://github.com/sanity-io/sanity/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/sanity)

### Your Project
- Project ID: `7xtcf5xm`
- Dataset: `production`
- Manage: https://www.sanity.io/manage/personal/project/7xtcf5xm

---

## Next Steps

1. ✅ Deploy studio using Option 1 (Sanity hosting)
2. ✅ Configure CORS origins
3. ✅ Create legal pages (Privacy, Terms, Payment)
4. ✅ Invite team members (if needed)
5. ✅ Test content creation
6. ✅ Verify pages appear on site

---

**Ready to Deploy!** 🚀

Run these commands to get started:

```bash
cd studio
npx sanity login
npx sanity deploy
```

Your studio will be live in minutes!
