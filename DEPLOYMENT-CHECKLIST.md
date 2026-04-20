# 🚀 Deployment Checklist

Use this checklist to ensure your contact management system is properly deployed to production.

## Pre-Deployment

### ✅ Environment Setup
- [ ] Create production Supabase project
- [ ] Create Resend account and verify domain
- [ ] Choose hosting platform (Vercel, Netlify, etc.)

### ✅ Database Setup
- [ ] Run `supabase-migration.sql` in production Supabase
- [ ] Verify all tables created successfully
- [ ] Verify RLS policies are active
- [ ] Enable realtime for `contacts` table
- [ ] Create first admin user

### ✅ Environment Variables
- [ ] Set `NEXT_PUBLIC_SUPABASE_URL` (production)
- [ ] Set `NEXT_PUBLIC_SUPABASE_ANON_KEY` (production)
- [ ] Set `SUPABASE_SERVICE_ROLE_KEY` (production)
- [ ] Set `RESEND_API_KEY` (production)
- [ ] Set `EMAIL_FROM` (verified domain)
- [ ] Set `ADMIN_EMAIL` (your admin email)
- [ ] Set `NEXT_PUBLIC_SITE_URL` (production URL)

### ✅ Email Configuration
- [ ] Verify domain in Resend
- [ ] Add DNS records (SPF, DKIM, DMARC)
- [ ] Test email sending
- [ ] Verify emails not going to spam

### ✅ Security Review
- [ ] All API routes check authentication
- [ ] RLS policies are enabled
- [ ] Service role key is not exposed to client
- [ ] CORS is properly configured
- [ ] Rate limiting considered

## Deployment Steps

### 1. Build & Test Locally
```bash
# Build production version
npm run build

# Test production build
npm run start

# Verify everything works
```

### 2. Deploy to Hosting Platform

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Settings > Environment Variables
```

#### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Add environment variables in Netlify dashboard
# Site settings > Environment variables
```

### 3. Post-Deployment Verification

#### ✅ Contact Form
- [ ] Visit contact page
- [ ] Submit test form
- [ ] Verify form submits successfully
- [ ] Check database for new contact
- [ ] Verify user confirmation email received
- [ ] Verify admin notification email received

#### ✅ Authentication
- [ ] Visit `/login`
- [ ] Log in with admin credentials
- [ ] Verify redirect to dashboard
- [ ] Log out
- [ ] Verify redirect to login

#### ✅ Dashboard
- [ ] View contacts list
- [ ] Search for contact
- [ ] Filter by status
- [ ] Open contact modal
- [ ] Update status
- [ ] Add notes
- [ ] Save changes
- [ ] Verify real-time updates work

#### ✅ Export
- [ ] Click "Export Contacts"
- [ ] Verify CSV downloads
- [ ] Open CSV and verify data

#### ✅ Permissions
- [ ] Test partner role restrictions
- [ ] Test admin full access
- [ ] Verify partners can't delete
- [ ] Verify admins can delete

## Production Configuration

### Supabase Production Settings

1. **Database**
   - [ ] Enable connection pooling
   - [ ] Set up database backups
   - [ ] Configure auto-scaling (if needed)

2. **Authentication**
   - [ ] Configure email templates
   - [ ] Set up password requirements
   - [ ] Enable MFA (optional)

3. **Realtime**
   - [ ] Verify realtime is enabled
   - [ ] Check connection limits

4. **API**
   - [ ] Review rate limits
   - [ ] Enable API analytics

### Resend Production Settings

1. **Domain**
   - [ ] Verify domain ownership
   - [ ] Add all DNS records
   - [ ] Wait for verification (can take 24-48 hours)

2. **Email Templates**
   - [ ] Test emails from production domain
   - [ ] Verify deliverability
   - [ ] Check spam scores

3. **Monitoring**
   - [ ] Set up email delivery monitoring
   - [ ] Configure bounce handling
   - [ ] Set up complaint handling

## Monitoring & Maintenance

### ✅ Set Up Monitoring
- [ ] Enable Supabase monitoring
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure uptime monitoring
- [ ] Set up log aggregation

### ✅ Performance
- [ ] Test page load times
- [ ] Verify API response times
- [ ] Check database query performance
- [ ] Optimize if needed

### ✅ Backups
- [ ] Verify Supabase automatic backups
- [ ] Set up additional backup strategy
- [ ] Test restore process

### ✅ Documentation
- [ ] Update README with production URLs
- [ ] Document any custom configurations
- [ ] Share credentials securely with team

## Security Hardening

### ✅ Supabase
- [ ] Review RLS policies
- [ ] Audit user permissions
- [ ] Enable audit logging
- [ ] Set up IP restrictions (if needed)

### ✅ Application
- [ ] Enable HTTPS only
- [ ] Set security headers
- [ ] Configure CSP (Content Security Policy)
- [ ] Enable CORS properly

### ✅ Secrets Management
- [ ] Rotate API keys regularly
- [ ] Use environment variables (never commit secrets)
- [ ] Limit access to production credentials
- [ ] Set up secret rotation schedule

## Post-Launch

### ✅ Week 1
- [ ] Monitor error rates
- [ ] Check email deliverability
- [ ] Review user feedback
- [ ] Fix any critical issues

### ✅ Month 1
- [ ] Review analytics
- [ ] Optimize performance
- [ ] Update documentation
- [ ] Plan improvements

### ✅ Ongoing
- [ ] Regular security audits
- [ ] Database maintenance
- [ ] Update dependencies
- [ ] Monitor costs

## Rollback Plan

If something goes wrong:

1. **Immediate Actions**
   - [ ] Revert to previous deployment
   - [ ] Check error logs
   - [ ] Notify team

2. **Investigation**
   - [ ] Identify root cause
   - [ ] Document the issue
   - [ ] Create fix plan

3. **Resolution**
   - [ ] Fix the issue
   - [ ] Test thoroughly
   - [ ] Redeploy

## Support Contacts

| Service | Contact |
|---------|---------|
| Supabase | support@supabase.com |
| Resend | support@resend.com |
| Hosting | (your hosting provider) |

## Emergency Procedures

### Database Issues
1. Check Supabase status page
2. Review database logs
3. Contact Supabase support if needed

### Email Issues
1. Check Resend dashboard
2. Verify domain DNS records
3. Review email logs
4. Contact Resend support if needed

### Application Down
1. Check hosting platform status
2. Review deployment logs
3. Verify environment variables
4. Rollback if necessary

## Success Criteria

Your deployment is successful when:

- ✅ Contact form submissions work
- ✅ Emails are delivered reliably
- ✅ Dashboard loads and functions properly
- ✅ Real-time updates work
- ✅ Authentication is secure
- ✅ Role-based permissions work
- ✅ Export functionality works
- ✅ No critical errors in logs
- ✅ Performance is acceptable
- ✅ All team members can access

## Final Notes

- Keep this checklist for future deployments
- Update it based on your experience
- Share with your team
- Document any custom steps

---

**🎉 Ready to deploy? Go through each item carefully!**

**Need help?** Check:
- `README-SETUP.md` - Setup instructions
- `CONTACT-SYSTEM-DOCS.md` - Complete documentation
- `QUICK-REFERENCE.md` - Common tasks and troubleshooting
