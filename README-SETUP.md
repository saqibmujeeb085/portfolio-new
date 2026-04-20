# Contact Management System - Setup Guide

This guide will help you set up the complete contact management system with database, authentication, email automation, and dashboard.

## 🎯 Features Implemented

✅ **Contact Form Integration**
- Real API integration (no fake data)
- Supabase database storage
- Form validation with Zod
- Error handling

✅ **Email Automation**
- User confirmation emails
- Admin notification emails
- Professional HTML templates
- Powered by Resend

✅ **Dashboard System**
- Contact management interface
- Real-time updates via Supabase subscriptions
- Search and filter functionality
- Status management (New, Seen, Contacted, Closed)
- Internal notes system

✅ **Role-Based Access Control**
- Admin: Full access + user management
- Partner: View, add notes, mark as seen (no delete)
- Supabase RLS policies

✅ **Export Functionality**
- Export contacts to CSV
- Includes all fields and notes

✅ **Authentication**
- Supabase Auth integration
- Protected dashboard routes
- Login-only access (no public signup)

## 📋 Prerequisites

1. **Supabase Account** - [Sign up here](https://supabase.com)
2. **Resend Account** - [Sign up here](https://resend.com)
3. **Node.js** - Version 18 or higher

## 🚀 Setup Instructions

### Step 1: Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Required variables:
```env
# Supabase (get from Supabase Dashboard > Settings > API)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Resend (get from Resend Dashboard > API Keys)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
```

### Step 2: Database Setup

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open the file `supabase-migration.sql`
4. Copy the entire content
5. Paste it into the SQL Editor
6. Click **Run** to execute

This will create:
- `contacts` table
- `profiles` table
- RLS policies
- Indexes
- Triggers
- Realtime subscriptions

### Step 3: Create First Admin User

1. In Supabase Dashboard, go to **Authentication > Users**
2. Click **Add User** and create your admin account
3. Copy the user's email
4. Go back to **SQL Editor** and run:

```sql
INSERT INTO public.profiles (id, email, role)
SELECT id, email, 'admin'
FROM auth.users
WHERE email = 'your-admin-email@example.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

Replace `your-admin-email@example.com` with your actual email.

### Step 4: Configure Resend Email

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Add and verify your domain
3. Create an API key
4. Add the API key to `.env.local`
5. Update `EMAIL_FROM` with your verified domain email

### Step 5: Install Dependencies

```bash
npm install
```

### Step 6: Run Development Server

```bash
npm run dev
```

Visit:
- Contact Form: `http://localhost:3000/contact`
- Login: `http://localhost:3000/login`
- Dashboard: `http://localhost:3000/dashboard`

## 🔐 User Management

### Creating Additional Users (Admin Only)

1. Log in as admin
2. Go to Supabase Dashboard > Authentication > Users
3. Click **Add User**
4. The user will be automatically added to `profiles` with `partner` role
5. To make them admin, run:

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'user@example.com';
```

### User Roles

**Admin:**
- View all contacts
- Update contact status
- Add/edit notes
- Delete contacts
- Manage users
- Export data

**Partner:**
- View all contacts
- Update contact status
- Add/edit notes
- Export data
- ❌ Cannot delete contacts
- ❌ Cannot manage users

## 📊 Dashboard Features

### Contact Management
- View all submissions in a table
- Real-time updates (new contacts appear instantly)
- Click "View" to see full details

### Filters & Search
- Search by name, email, or service
- Filter by status (New, Seen, Contacted, Closed)

### Contact Details Modal
- View full contact information
- Update status
- Add internal notes
- Save changes

### Export
- Click "Export Contacts" button
- Downloads CSV with all filtered contacts
- Includes all fields and notes

## 🔄 Real-Time Updates

The dashboard uses Supabase Realtime subscriptions:
- New contacts appear instantly
- Status updates sync across all users
- No page refresh needed

## 📧 Email Templates

### User Confirmation Email
- Sent immediately after form submission
- Personalized with first name
- Professional design
- Sets expectations for response time

### Admin Notification Email
- Sent to `ADMIN_EMAIL`
- Contains all form details
- Formatted for easy reading
- Call-to-action to review in dashboard

## 🛡️ Security Features

1. **Row Level Security (RLS)**
   - All database access is controlled by policies
   - Users can only access what they're authorized for

2. **Server-Side Operations**
   - Contact creation uses service role key
   - No sensitive operations on client

3. **Authentication Required**
   - Dashboard is protected
   - Redirects to login if not authenticated

4. **Role-Based Permissions**
   - Partners cannot delete contacts
   - Only admins can manage users

## 🐛 Troubleshooting

### Emails Not Sending
- Verify Resend API key is correct
- Check domain is verified in Resend
- Look at server logs for error messages

### Dashboard Not Loading
- Verify user exists in `profiles` table
- Check Supabase credentials in `.env.local`
- Ensure RLS policies are created

### Real-Time Not Working
- Verify realtime is enabled for `contacts` table
- Check browser console for connection errors
- Ensure Supabase URL is correct

### Contact Form Submission Fails
- Check `SUPABASE_SERVICE_ROLE_KEY` is set
- Verify `contacts` table exists
- Look at API route logs in terminal

## 📝 Database Schema

### Contacts Table
```sql
- id (uuid, primary key)
- first_name (text)
- last_name (text)
- email (text)
- phone (text)
- service (text)
- message (text)
- status (enum: new, seen, contacted, closed)
- notes (text, nullable)
- created_at (timestamp)
- updated_at (timestamp)
```

### Profiles Table
```sql
- id (uuid, foreign key to auth.users)
- email (text)
- role (enum: admin, partner)
- created_at (timestamp)
- updated_at (timestamp)
```

## 🎨 Customization

### Email Templates
Edit `lib/email/resend.ts` to customize:
- Email subject lines
- HTML templates
- Branding and colors

### Dashboard Styling
All components use Tailwind CSS:
- `components/dashboard/` - Dashboard components
- Matches your existing design system

### Status Options
To add more status options:
1. Update database enum in migration
2. Update TypeScript types in `types/database.ts`
3. Update status select in `components/dashboard/contact-modal.tsx`

## 🚢 Deployment

### Environment Variables
Ensure all environment variables are set in your hosting platform:
- Vercel: Project Settings > Environment Variables
- Netlify: Site Settings > Environment Variables

### Supabase Production
- Use production Supabase project
- Update RLS policies if needed
- Enable realtime for production

### Email Domain
- Verify production domain in Resend
- Update `EMAIL_FROM` to production domain

## 📚 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Email:** Resend
- **Validation:** Zod
- **Forms:** React Hook Form
- **Styling:** Tailwind CSS
- **Real-time:** Supabase Realtime
- **Date Formatting:** date-fns

## 🎉 You're All Set!

Your contact management system is now fully functional. Test it by:

1. Submitting a contact form
2. Checking your email for confirmation
3. Logging into the dashboard
4. Viewing and managing the contact

For questions or issues, check the troubleshooting section above.
