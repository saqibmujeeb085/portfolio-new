# 🏗️ System Architecture

## 📐 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT SIDE                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────┐         ┌──────────────────┐             │
│  │  Contact Form    │         │   Dashboard      │             │
│  │  (Public)        │         │   (Protected)    │             │
│  └────────┬─────────┘         └────────┬─────────┘             │
│           │                             │                        │
│           │ POST /api/contact          │ GET /dashboard         │
│           │                             │                        │
└───────────┼─────────────────────────────┼────────────────────────┘
            │                             │
            │                             │
┌───────────┼─────────────────────────────┼────────────────────────┐
│           │         SERVER SIDE         │                        │
├───────────┼─────────────────────────────┼────────────────────────┤
│           ▼                             ▼                        │
│  ┌─────────────────┐         ┌──────────────────┐              │
│  │  API Routes     │         │  Middleware      │              │
│  │  - /api/contact │         │  - Auth Check    │              │
│  │  - /api/contacts│         │  - Route Guard   │              │
│  │  - /api/users   │         └──────────────────┘              │
│  └────────┬────────┘                                            │
│           │                                                      │
│           │                                                      │
│           ▼                                                      │
│  ┌─────────────────────────────────────────────┐               │
│  │         Business Logic Layer                 │               │
│  │  - Validation (Zod)                         │               │
│  │  - Authentication (Supabase Auth)           │               │
│  │  - Authorization (RLS)                      │               │
│  └────────┬────────────────────────────────────┘               │
│           │                                                      │
└───────────┼──────────────────────────────────────────────────────┘
            │
            │
┌───────────┼──────────────────────────────────────────────────────┐
│           │         EXTERNAL SERVICES                            │
├───────────┼──────────────────────────────────────────────────────┤
│           │                                                       │
│           ├──────────────┐                                       │
│           │              │                                       │
│           ▼              ▼                                       │
│  ┌─────────────┐  ┌─────────────┐                              │
│  │  Supabase   │  │   Resend    │                              │
│  │  - Database │  │   - Email   │                              │
│  │  - Auth     │  │   Service   │                              │
│  │  - Realtime │  │             │                              │
│  └─────────────┘  └─────────────┘                              │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow Diagrams

### Contact Form Submission Flow

```
┌──────────┐
│   User   │
└────┬─────┘
     │ 1. Fills form
     ▼
┌──────────────────┐
│  Contact Form    │
│  Component       │
└────┬─────────────┘
     │ 2. Client validation (Zod)
     ▼
┌──────────────────┐
│  POST            │
│  /api/contact    │
└────┬─────────────┘
     │ 3. Server validation
     ▼
┌──────────────────┐
│  Supabase        │
│  Insert Contact  │
└────┬─────────────┘
     │ 4. Save to DB
     ▼
┌──────────────────┐
│  Resend API      │
│  Send Emails     │
└────┬─────────────┘
     │ 5. Send confirmation & notification
     ▼
┌──────────────────┐
│  Return Success  │
└────┬─────────────┘
     │ 6. Show confirmation
     ▼
┌──────────────────┐
│  Real-time       │
│  Update          │
└──────────────────┘
     │ 7. Dashboard updates instantly
     ▼
┌──────────────────┐
│  Dashboard       │
│  Shows New       │
│  Contact         │
└──────────────────┘
```

### Authentication Flow

```
┌──────────┐
│   User   │
└────┬─────┘
     │ 1. Visits /dashboard
     ▼
┌──────────────────┐
│  Middleware      │
│  Check Auth      │
└────┬─────────────┘
     │ 2. No token?
     ▼
┌──────────────────┐
│  Redirect to     │
│  /login          │
└────┬─────────────┘
     │ 3. User enters credentials
     ▼
┌──────────────────┐
│  Supabase Auth   │
│  Verify          │
└────┬─────────────┘
     │ 4. Valid?
     ▼
┌──────────────────┐
│  Create Session  │
└────┬─────────────┘
     │ 5. Set cookie
     ▼
┌──────────────────┐
│  Redirect to     │
│  /dashboard      │
└────┬─────────────┘
     │ 6. Load dashboard
     ▼
┌──────────────────┐
│  Check Profile   │
│  Get Role        │
└────┬─────────────┘
     │ 7. Load with permissions
     ▼
┌──────────────────┐
│  Dashboard       │
│  Rendered        │
└──────────────────┘
```

### Real-Time Update Flow

```
┌──────────────────┐
│  Dashboard       │
│  Component       │
└────┬─────────────┘
     │ 1. Subscribe to changes
     ▼
┌──────────────────┐
│  Supabase        │
│  Realtime        │
└────┬─────────────┘
     │ 2. WebSocket connection
     │
     │ ┌──────────────────┐
     │ │  New Contact     │
     │ │  Submitted       │
     │ └────┬─────────────┘
     │      │ 3. Database change
     ▼      ▼
┌──────────────────┐
│  Broadcast       │
│  Change Event    │
└────┬─────────────┘
     │ 4. Send to all subscribers
     ▼
┌──────────────────┐
│  Dashboard       │
│  Receives Event  │
└────┬─────────────┘
     │ 5. Update state
     ▼
┌──────────────────┐
│  UI Updates      │
│  Instantly       │
└──────────────────┘
```

## 🗄️ Database Schema

```
┌─────────────────────────────────────────────────────────────┐
│                      CONTACTS TABLE                          │
├─────────────────────────────────────────────────────────────┤
│  id              UUID (PK)                                   │
│  first_name      TEXT                                        │
│  last_name       TEXT                                        │
│  email           TEXT                                        │
│  phone           TEXT                                        │
│  service         TEXT                                        │
│  message         TEXT                                        │
│  status          TEXT (new|seen|contacted|closed)           │
│  notes           TEXT (nullable)                            │
│  created_at      TIMESTAMPTZ                                │
│  updated_at      TIMESTAMPTZ                                │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Indexes:
                              │ - idx_contacts_status
                              │ - idx_contacts_created_at
                              │ - idx_contacts_email
                              │
                              │ RLS Policies:
                              │ - Authenticated users can view
                              │ - Authenticated users can update
                              │ - Only admins can delete
                              │
                              │ Realtime: Enabled

┌─────────────────────────────────────────────────────────────┐
│                      PROFILES TABLE                          │
├─────────────────────────────────────────────────────────────┤
│  id              UUID (PK, FK → auth.users)                 │
│  email           TEXT                                        │
│  role            TEXT (admin|partner)                       │
│  created_at      TIMESTAMPTZ                                │
│  updated_at      TIMESTAMPTZ                                │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Indexes:
                              │ - idx_profiles_role
                              │
                              │ RLS Policies:
                              │ - Users can view own profile
                              │ - Admins can view all profiles
                              │ - Only admins can create/update/delete
```

## 🔐 Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      SECURITY LAYERS                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Layer 1: Client-Side Validation                            │
│  ┌────────────────────────────────────────────────┐        │
│  │  - Zod schema validation                        │        │
│  │  - Form field validation                        │        │
│  │  - Type checking (TypeScript)                   │        │
│  └────────────────────────────────────────────────┘        │
│                         ▼                                    │
│  Layer 2: API Route Protection                              │
│  ┌────────────────────────────────────────────────┐        │
│  │  - Authentication check                         │        │
│  │  - Server-side validation                       │        │
│  │  - Role verification                            │        │
│  └────────────────────────────────────────────────┘        │
│                         ▼                                    │
│  Layer 3: Database Security (RLS)                           │
│  ┌────────────────────────────────────────────────┐        │
│  │  - Row Level Security policies                  │        │
│  │  - Role-based access control                    │        │
│  │  - Automatic enforcement                        │        │
│  └────────────────────────────────────────────────┘        │
│                         ▼                                    │
│  Layer 4: Environment Security                              │
│  ┌────────────────────────────────────────────────┐        │
│  │  - Secrets in environment variables             │        │
│  │  - Service role key server-side only           │        │
│  │  - HTTPS only in production                     │        │
│  └────────────────────────────────────────────────┘        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    COMPONENT HIERARCHY                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  App Layout                                                  │
│  └── Page Routes                                            │
│      ├── / (Home)                                           │
│      ├── /contact                                           │
│      │   └── ContactForm (Client Component)                │
│      │       ├── ServiceSelect                             │
│      │       └── Form Fields                               │
│      ├── /login (Client Component)                         │
│      │   └── Login Form                                    │
│      └── /dashboard (Server Component)                     │
│          └── DashboardClient (Client Component)            │
│              ├── DashboardHeader                           │
│              ├── DashboardFilters                          │
│              ├── ExportButton                              │
│              └── ContactsTable                             │
│                  └── ContactModal                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🔌 API Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      API ENDPOINTS                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Public Endpoints                                            │
│  ┌────────────────────────────────────────────────┐        │
│  │  POST /api/contact                              │        │
│  │  - Submit contact form                          │        │
│  │  - No authentication required                   │        │
│  └────────────────────────────────────────────────┘        │
│                                                              │
│  Protected Endpoints (Authenticated)                         │
│  ┌────────────────────────────────────────────────┐        │
│  │  PATCH /api/contacts/[id]                       │        │
│  │  - Update contact status/notes                  │        │
│  │                                                  │        │
│  │  POST /api/contacts/export                      │        │
│  │  - Export contacts to CSV                       │        │
│  └────────────────────────────────────────────────┘        │
│                                                              │
│  Admin-Only Endpoints                                        │
│  ┌────────────────────────────────────────────────┐        │
│  │  DELETE /api/contacts/[id]                      │        │
│  │  - Delete contact                               │        │
│  │                                                  │        │
│  │  GET /api/users                                 │        │
│  │  - List all users                               │        │
│  │                                                  │        │
│  │  POST /api/users                                │        │
│  │  - Create new user                              │        │
│  │                                                  │        │
│  │  PATCH /api/users/[id]                          │        │
│  │  - Update user role                             │        │
│  │                                                  │        │
│  │  DELETE /api/users/[id]                         │        │
│  │  - Delete user                                  │        │
│  └────────────────────────────────────────────────┘        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🌐 Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PRODUCTION SETUP                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────┐        │
│  │              Vercel / Netlify                   │        │
│  │  ┌──────────────────────────────────────────┐  │        │
│  │  │  Next.js Application                     │  │        │
│  │  │  - Server Components                     │  │        │
│  │  │  - API Routes                            │  │        │
│  │  │  - Client Components                     │  │        │
│  │  └──────────────────────────────────────────┘  │        │
│  └────────────────────────────────────────────────┘        │
│                         │                                    │
│                         │                                    │
│         ┌───────────────┼───────────────┐                   │
│         │               │               │                   │
│         ▼               ▼               ▼                   │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐               │
│  │ Supabase │   │  Resend  │   │   CDN    │               │
│  │          │   │          │   │          │               │
│  │ Database │   │  Email   │   │  Static  │               │
│  │   Auth   │   │ Service  │   │  Assets  │               │
│  │ Realtime │   │          │   │          │               │
│  └──────────┘   └──────────┘   └──────────┘               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Module Dependencies

```
┌─────────────────────────────────────────────────────────────┐
│                    DEPENDENCY GRAPH                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Core Dependencies                                           │
│  ├── next (16.2.4)                                          │
│  ├── react (19.2.4)                                         │
│  └── typescript (5.x)                                       │
│                                                              │
│  Database & Auth                                             │
│  └── @supabase/supabase-js (2.103.3)                       │
│                                                              │
│  Forms & Validation                                          │
│  ├── react-hook-form (7.72.1)                              │
│  ├── @hookform/resolvers (5.2.2)                           │
│  └── zod (4.3.6)                                            │
│                                                              │
│  Styling                                                     │
│  ├── tailwindcss (4.x)                                      │
│  ├── tailwind-merge (3.5.0)                                │
│  └── class-variance-authority (0.7.1)                      │
│                                                              │
│  Utilities                                                   │
│  ├── date-fns (latest)                                      │
│  ├── lucide-react (1.8.0)                                  │
│  └── clsx (2.1.1)                                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 State Management

```
┌─────────────────────────────────────────────────────────────┐
│                    STATE ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Server State (Supabase)                                     │
│  ┌────────────────────────────────────────────────┐        │
│  │  - Contacts data                                │        │
│  │  - User profiles                                │        │
│  │  - Authentication state                         │        │
│  └────────────────────────────────────────────────┘        │
│                         │                                    │
│                         │ Real-time sync                     │
│                         ▼                                    │
│  Client State (React)                                        │
│  ┌────────────────────────────────────────────────┐        │
│  │  - Local contacts array                         │        │
│  │  - Search query                                 │        │
│  │  - Filter state                                 │        │
│  │  - Modal state                                  │        │
│  │  - Form state (React Hook Form)                │        │
│  └────────────────────────────────────────────────┘        │
│                                                              │
│  No global state management needed!                          │
│  - Server state managed by Supabase                          │
│  - UI state managed by React hooks                           │
│  - Form state managed by React Hook Form                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Request/Response Flow

```
┌─────────────────────────────────────────────────────────────┐
│              TYPICAL REQUEST/RESPONSE CYCLE                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Client Request                                           │
│     ┌────────────────────────────────────────────┐         │
│     │  fetch('/api/contact', {                    │         │
│     │    method: 'POST',                          │         │
│     │    body: JSON.stringify(formData)           │         │
│     │  })                                         │         │
│     └────────────────────────────────────────────┘         │
│                         │                                    │
│                         ▼                                    │
│  2. Server Processing                                        │
│     ┌────────────────────────────────────────────┐         │
│     │  - Proxy checks authentication              │         │
│     │  - Parse request body                       │         │
│     │  - Validate with Zod                        │         │
│     │  - Insert to database                       │         │
│     │  - Send emails                              │         │
│     │  - Return response                          │         │
│     └────────────────────────────────────────────┘         │
│                         │                                    │
│                         ▼                                    │
│  3. Client Response                                          │
│     ┌────────────────────────────────────────────┐         │
│     │  {                                          │         │
│     │    success: true,                           │         │
│     │    message: "Contact submitted",            │         │
│     │    contactId: "uuid"                        │         │
│     │  }                                          │         │
│     └────────────────────────────────────────────┘         │
│                         │                                    │
│                         ▼                                    │
│  4. UI Update                                                │
│     ┌────────────────────────────────────────────┐         │
│     │  - Show success message                     │         │
│     │  - Reset form                               │         │
│     │  - Real-time update in dashboard            │         │
│     └────────────────────────────────────────────┘         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

**This architecture is designed for:**
- ✅ Scalability
- ✅ Security
- ✅ Maintainability
- ✅ Performance
- ✅ Real-time capabilities
- ✅ Type safety
- ✅ Developer experience
