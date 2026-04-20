# 📬 Contact Management System

> **A production-ready, full-stack contact management system (Mini CRM) built on Next.js, Supabase, and Resend.**

Transform your contact form into a complete lead management solution with database storage, email automation, real-time dashboard, and role-based access control.

## 🎯 What Is This?

This is a **complete backend and dashboard system** that integrates with your existing contact form. It provides:

- ✅ **Database Storage** - All submissions saved to Supabase PostgreSQL
- ✅ **Email Automation** - Instant confirmation and notification emails
- ✅ **Real-Time Dashboard** - Manage contacts with live updates
- ✅ **Role-Based Access** - Admin and Partner roles with different permissions
- ✅ **Export Functionality** - Download contacts as CSV
- ✅ **Search & Filter** - Find contacts quickly
- ✅ **Status Tracking** - Track progress from New → Closed

**Important**: Your existing contact form UI remains unchanged. Only the backend functionality is added.

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 18+ installed
- Supabase account ([sign up free](https://supabase.com))
- Resend account ([sign up free](https://resend.com))

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Resend
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
```

### 4. Set Up Database

1. Go to your Supabase project
2. Open SQL Editor
3. Copy content from `supabase-migration.sql`
4. Paste and run

### 5. Create First Admin User

1. In Supabase Dashboard, go to Authentication > Users
2. Click "Add User" and create your account
3. In SQL Editor, run:

```sql
INSERT INTO public.profiles (id, email, role)
SELECT id, email, 'admin'
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

### 6. Run the App

```bash
npm run dev
```

Visit:
- Contact Form: `http://localhost:3000/contact`
- Login: `http://localhost:3000/login`
- Dashboard: `http://localhost:3000/dashboard`

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **[README-SETUP.md](README-SETUP.md)** | Complete setup instructions |
| **[CONTACT-SYSTEM-DOCS.md](CONTACT-SYSTEM-DOCS.md)** | Full system documentation |
| **[QUICK-REFERENCE.md](QUICK-REFERENCE.md)** | Common tasks & troubleshooting |
| **[DEPLOYMENT-CHECKLIST.md](DEPLOYMENT-CHECKLIST.md)** | Production deployment guide |
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | System architecture diagrams |
| **[IMPLEMENTATION-SUMMARY.md](IMPLEMENTATION-SUMMARY.md)** | What was built |

## ✨ Features

### Contact Form Integration
- Real API integration (no fake data)
- Saves to Supabase database
- Sends confirmation email to user
- Sends notification email to admin
- Proper error handling

### Dashboard
- View all contact submissions
- Real-time updates (no refresh needed)
- Search by name, email, or service
- Filter by status (New, Seen, Contacted, Closed)
- Update contact status
- Add internal notes
- Export to CSV

### Authentication & Security
- Supabase Auth integration
- Protected dashboard routes
- Row Level Security (RLS)
- Role-based permissions
- Server-side operations only

### User Roles

**Admin:**
- Full access to all features
- Can create/delete users
- Can delete contacts
- Can manage all settings

**Partner:**
- View all contacts
- Update status and add notes
- Export data
- Cannot delete contacts or manage users

## 🎨 Screenshots

### Contact Form
Your existing form design is preserved. Only the backend functionality is added.

### Dashboard
Modern, clean interface for managing contacts with real-time updates.

### Contact Details
View full contact information, update status, and add internal notes.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Email**: Resend
- **Validation**: Zod
- **Forms**: React Hook Form
- **Styling**: Tailwind CSS
- **Real-time**: Supabase Realtime
- **Icons**: Lucide React

## 📊 System Architecture

```
User Submits Form
       ↓
Client Validation
       ↓
POST /api/contact
       ↓
Save to Database
       ↓
Send Emails
       ↓
Real-Time Update in Dashboard
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed diagrams.

## 🔐 Security

- **Row Level Security (RLS)**: Database-level access control
- **Authentication Required**: All dashboard routes protected
- **Role-Based Permissions**: Admin vs Partner access
- **Server-Side Operations**: Sensitive operations on backend only
- **Environment Variables**: Secrets never exposed to client

## 📧 Email System

### User Confirmation Email
- Sent immediately after form submission
- Personalized with first name
- Professional HTML design
- Sets response expectations

### Admin Notification Email
- Sent to admin email address
- Contains all submission details
- Professional HTML design
- Call-to-action to review

## 🔄 Real-Time Updates

The dashboard uses Supabase Realtime subscriptions:
- New contacts appear instantly
- Status updates sync across all users
- No page refresh needed

## 📤 Export Functionality

- Click "Export Contacts" button
- Downloads CSV file
- Includes all fields and notes
- Works with filtered results

## 🚀 Deployment

See [DEPLOYMENT-CHECKLIST.md](DEPLOYMENT-CHECKLIST.md) for complete deployment guide.

Quick steps:
1. Build production version: `npm run build`
2. Deploy to Vercel/Netlify
3. Add environment variables
4. Verify domain in Resend
5. Test the system

## 🐛 Troubleshooting

### Emails Not Sending
- Verify Resend API key
- Check domain is verified
- Look at server logs

### Dashboard Not Loading
- Check user exists in profiles table
- Verify Supabase credentials
- Ensure RLS policies are created

### Real-Time Not Working
- Enable realtime for contacts table
- Check browser console
- Verify Supabase URL

See [QUICK-REFERENCE.md](QUICK-REFERENCE.md) for more troubleshooting.

## 📝 Common Tasks

### Create New User (Admin)
1. Go to Supabase Dashboard > Authentication > Users
2. Click "Add User"
3. User will be automatically added with "partner" role

### Make User Admin
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

See [QUICK-REFERENCE.md](QUICK-REFERENCE.md) for more SQL queries.

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Resend Documentation](https://resend.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)

## 📈 What's Next?

Potential enhancements:
- Custom email templates UI
- Advanced analytics dashboard
- Automated follow-up reminders
- CRM system integration
- Mobile app
- Webhook notifications
- Custom fields
- Tags and categories

## 🆘 Support

For issues or questions:
1. Check [QUICK-REFERENCE.md](QUICK-REFERENCE.md) troubleshooting
2. Review [README-SETUP.md](README-SETUP.md) setup steps
3. Check Supabase logs
4. Check server logs in terminal

## 📄 License

This project is part of your Next.js application.

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org)
- [Supabase](https://supabase.com)
- [Resend](https://resend.com)
- [Tailwind CSS](https://tailwindcss.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)

---

**🎉 Ready to get started?**

1. Follow the [Quick Start](#-quick-start) above
2. Read [README-SETUP.md](README-SETUP.md) for detailed instructions
3. Check [CONTACT-SYSTEM-DOCS.md](CONTACT-SYSTEM-DOCS.md) for complete documentation

**Questions?** Check the documentation files or review the code comments.

**Built with ❤️ for efficient lead management**
