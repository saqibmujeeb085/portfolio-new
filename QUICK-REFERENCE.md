# 🚀 Quick Reference Guide

## 📋 Table of Contents
- [Setup Commands](#setup-commands)
- [Common SQL Queries](#common-sql-queries)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

## Setup Commands

### Initial Setup
```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your credentials
# Then run the app
npm run dev
```

### Database Setup
1. Go to Supabase SQL Editor
2. Copy content from `supabase-migration.sql`
3. Paste and run

## Common SQL Queries

### Create First Admin User
```sql
-- After creating user in Supabase Auth, run:
INSERT INTO public.profiles (id, email, role)
SELECT id, email, 'admin'
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

### Make Existing User Admin
```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'user@example.com';
```

### View All Contacts
```sql
SELECT * FROM public.contacts
ORDER BY created_at DESC;
```

### View All Users
```sql
SELECT p.*, u.email as auth_email
FROM public.profiles p
JOIN auth.users u ON p.id = u.id
ORDER BY p.created_at DESC;
```

### Delete All Test Contacts
```sql
DELETE FROM public.contacts
WHERE email LIKE '%test%';
```

### Count Contacts by Status
```sql
SELECT status, COUNT(*) as count
FROM public.contacts
GROUP BY status
ORDER BY count DESC;
```

### Find Contacts by Service
```sql
SELECT * FROM public.contacts
WHERE service = 'Web Development'
ORDER BY created_at DESC;
```

### Get Recent Contacts (Last 7 Days)
```sql
SELECT * FROM public.contacts
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

## API Endpoints

### Contact Form Submission
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "service": "Web Development",
    "message": "I need a website"
  }'
```

### Update Contact Status (Authenticated)
```bash
curl -X PATCH http://localhost:3000/api/contacts/[contact-id] \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "status": "contacted",
    "notes": "Called and discussed requirements"
  }'
```

### Create New User (Admin Only)
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "email": "newuser@example.com",
    "password": "SecurePassword123!",
    "role": "partner"
  }'
```

## Environment Variables

### Required Variables
```env
# Supabase (from Supabase Dashboard > Settings > API)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Resend (from Resend Dashboard > API Keys)
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
```

### Where to Find Them

**Supabase:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to Settings > API
4. Copy URL and keys

**Resend:**
1. Go to [Resend Dashboard](https://resend.com/api-keys)
2. Create new API key
3. Copy the key

## Troubleshooting

### Problem: "Missing Supabase environment variables"
**Solution:**
```bash
# Check .env.local exists
ls -la .env.local

# Verify variables are set
cat .env.local | grep SUPABASE
```

### Problem: "Failed to send email"
**Solution:**
1. Check Resend API key is correct
2. Verify domain is verified in Resend
3. Check EMAIL_FROM uses verified domain

### Problem: "Unauthorized" when accessing dashboard
**Solution:**
```sql
-- Check if user exists in profiles table
SELECT * FROM public.profiles WHERE email = 'your-email@example.com';

-- If not, create profile
INSERT INTO public.profiles (id, email, role)
SELECT id, email, 'admin'
FROM auth.users
WHERE email = 'your-email@example.com';
```

### Problem: Real-time updates not working
**Solution:**
```sql
-- Enable realtime for contacts table
ALTER PUBLICATION supabase_realtime ADD TABLE public.contacts;

-- Verify it's enabled
SELECT * FROM pg_publication_tables WHERE pubname = 'supabase_realtime';
```

### Problem: "Row Level Security policy violation"
**Solution:**
```sql
-- Check RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables 
WHERE schemaname = 'public' AND tablename IN ('contacts', 'profiles');

-- Re-run the RLS policies from supabase-migration.sql
```

### Problem: Contact form submission fails
**Solution:**
1. Check browser console for errors
2. Check server logs in terminal
3. Verify SUPABASE_SERVICE_ROLE_KEY is set
4. Test database connection:
```sql
SELECT 1; -- Should return 1
```

### Problem: Can't log in
**Solution:**
1. Verify user exists in Supabase Auth
2. Check password is correct
3. Verify user has profile:
```sql
SELECT * FROM public.profiles WHERE email = 'your-email@example.com';
```

## Quick Commands

### View Server Logs
```bash
# Terminal where you ran npm run dev
# Look for API route logs and errors
```

### Clear Browser Cache
```bash
# Chrome/Edge
Ctrl+Shift+Delete (Windows)
Cmd+Shift+Delete (Mac)

# Or use Incognito/Private mode
```

### Restart Development Server
```bash
# Stop server
Ctrl+C

# Start again
npm run dev
```

### Check Database Connection
```sql
-- Run in Supabase SQL Editor
SELECT NOW(); -- Should return current timestamp
```

### Test Email Sending
```bash
# Use Resend's test endpoint
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer YOUR_RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "onboarding@resend.dev",
    "to": "your-email@example.com",
    "subject": "Test Email",
    "html": "<p>This is a test</p>"
  }'
```

## Useful Links

- **Supabase Dashboard**: https://app.supabase.com
- **Resend Dashboard**: https://resend.com/emails
- **Local App**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard
- **Login**: http://localhost:3000/login

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (not logged in) |
| 403 | Forbidden (insufficient permissions) |
| 500 | Server Error |

## Contact Status Values

| Status | Description |
|--------|-------------|
| `new` | Just submitted |
| `seen` | Reviewed by team |
| `contacted` | Team reached out |
| `closed` | Resolved/completed |

## User Roles

| Role | Permissions |
|------|-------------|
| `admin` | Full access |
| `partner` | View, update, export (no delete) |

---

**Need more help?** Check `README-SETUP.md` or `CONTACT-SYSTEM-DOCS.md`
