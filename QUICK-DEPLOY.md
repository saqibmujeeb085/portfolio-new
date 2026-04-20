# Quick Deploy Guide 🚀

## 3-Step Deployment

### Step 1: Deploy Sanity Studio (5 minutes)

```bash
cd studio
npx sanity login
npx sanity deploy
```

Choose hostname (e.g., `my-portfolio-studio`)
Studio live at: `https://my-portfolio-studio.sanity.studio`

### Step 2: Configure CORS (2 minutes)

1. Go to: https://www.sanity.io/manage/personal/project/7xtcf5xm
2. Click "API" → "CORS Origins"
3. Add: `https://my-portfolio-studio.sanity.studio`
4. Check "Allow credentials"
5. Save

### Step 3: Deploy Next.js App (5 minutes)

**Option A: Vercel**
```bash
npm install -g vercel
vercel
```

**Option B: Netlify**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

**Done!** ✅

---

## Environment Variables to Set

In your deployment platform (Vercel/Netlify):

```env
NEXT_PUBLIC_SUPABASE_URL=https://ldtduwfewzbkzzzmtczy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
NEXT_PUBLIC_SANITY_PROJECT_ID=7xtcf5xm
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-04-16
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

---

## Post-Deployment (10 minutes)

### 1. Create Legal Pages in Sanity

Visit your studio → Legal Pages → Create:
- Privacy Policy
- Terms & Conditions  
- Payment Policy

### 2. Test Everything

- [ ] Login at `/login`
- [ ] Contact form at `/contact`
- [ ] Legal pages at `/legal/privacy-policy`
- [ ] Dashboard at `/dashboard`

### 3. Change Admin Password

1. Login with `admin@portfolio.com` / `Admin@123456`
2. Go to Supabase dashboard
3. Change password

---

## That's It!

**Total Time**: ~20 minutes
**Your site is live!** 🎉

For detailed guides, see:
- `SANITY-DEPLOYMENT-GUIDE.md`
- `DEPLOYMENT-READY-SUMMARY.md`
