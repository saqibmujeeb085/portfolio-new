-- ============================================================
-- FULL SETUP — Run this entire file in Supabase SQL Editor
-- https://supabase.com/dashboard/project/ldtduwfewzbkzzzmtczy/sql/new
-- ============================================================


-- ============================================================
-- 1. TABLES
-- ============================================================

CREATE TABLE IF NOT EXISTS public.contacts (
    id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name  TEXT        NOT NULL,
    last_name   TEXT        NOT NULL,
    email       TEXT        NOT NULL,
    phone       TEXT        NOT NULL,
    service     TEXT        NOT NULL,
    message     TEXT        NOT NULL,
    status      TEXT        DEFAULT 'new'
                            CHECK (status IN ('new','seen','contacted','closed')),
    notes       TEXT,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.profiles (
    id          UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email       TEXT        NOT NULL,
    role        TEXT        DEFAULT 'partner'
                            CHECK (role IN ('admin','partner')),
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 2. INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_contacts_status     ON public.contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_email      ON public.contacts(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role       ON public.profiles(role);


-- ============================================================
-- 3. AUTO-UPDATE updated_at TRIGGER
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_contacts_updated_at ON public.contacts;
CREATE TRIGGER trg_contacts_updated_at
    BEFORE UPDATE ON public.contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
CREATE TRIGGER trg_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ============================================================
-- 4. ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "contacts_select" ON public.contacts;
DROP POLICY IF EXISTS "contacts_insert" ON public.contacts;
DROP POLICY IF EXISTS "contacts_update" ON public.contacts;
DROP POLICY IF EXISTS "contacts_delete" ON public.contacts;
DROP POLICY IF EXISTS "profiles_select" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update" ON public.profiles;
DROP POLICY IF EXISTS "profiles_delete" ON public.profiles;

CREATE POLICY "contacts_select" ON public.contacts
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "contacts_insert" ON public.contacts
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "contacts_update" ON public.contacts
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "contacts_delete" ON public.contacts
    FOR DELETE TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

CREATE POLICY "profiles_select" ON public.profiles
    FOR SELECT TO authenticated
    USING (
        auth.uid() = id
        OR EXISTS (
            SELECT 1 FROM public.profiles p
            WHERE p.id = auth.uid() AND p.role = 'admin'
        )
    );

CREATE POLICY "profiles_insert" ON public.profiles
    FOR INSERT TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles p
            WHERE p.id = auth.uid() AND p.role = 'admin'
        )
    );

CREATE POLICY "profiles_update" ON public.profiles
    FOR UPDATE TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles p
            WHERE p.id = auth.uid() AND p.role = 'admin'
        )
    );

CREATE POLICY "profiles_delete" ON public.profiles
    FOR DELETE TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles p
            WHERE p.id = auth.uid() AND p.role = 'admin'
        )
    );


-- ============================================================
-- 5. REALTIME
-- ============================================================

ALTER PUBLICATION supabase_realtime ADD TABLE public.contacts;


-- ============================================================
-- 6. DUMMY CONTACTS (10 records)
-- ============================================================

INSERT INTO public.contacts (first_name, last_name, email, phone, service, message, status, notes, created_at)
VALUES
('James',    'Anderson', 'james.anderson@example.com',     '+1 (555) 201-4321', 'Web Development',
 'Hi, I need a full-stack web application for my e-commerce startup. Looking for a modern stack with Next.js and a headless CMS. Budget is flexible for the right team.',
 'new', NULL, NOW() - INTERVAL '1 day'),

('Sophia',   'Martinez', 'sophia.martinez@techcorp.io',    '+1 (555) 302-8765', 'UI/UX Design',
 'We are redesigning our SaaS dashboard and need a senior UI/UX designer. The project involves user research, wireframing, and high-fidelity prototypes in Figma.',
 'seen', 'Scheduled a discovery call for next Tuesday at 3pm.', NOW() - INTERVAL '2 days'),

('Liam',     'Thompson', 'liam.t@brandstudio.co',          '+44 7700 900123',   'Brand Identity',
 'We are launching a new fintech product and need a complete brand identity — logo, color palette, typography, and brand guidelines. Timeline is 6 weeks.',
 'contacted', 'Sent proposal on April 15. Waiting for client approval. Follow up if no response by April 22.', NOW() - INTERVAL '4 days'),

('Aisha',    'Patel',    'aisha.patel@growthco.com',       '+1 (555) 487-6543', 'SEO Optimization',
 'Our organic traffic has dropped 40% after a Google core update. We need a full SEO audit and a recovery strategy. We have a blog with 500+ articles.',
 'new', NULL, NOW() - INTERVAL '5 hours'),

('Noah',     'Williams', 'noah.williams@digitalagency.net','+1 (555) 563-2198', 'Performance Marketing',
 'Looking for a performance marketing partner to manage our Google Ads and Meta campaigns. Monthly ad spend is around $15,000. We need better ROAS.',
 'closed', 'Project completed. 3.2x ROAS achieved. Good candidate for retainer.', NOW() - INTERVAL '10 days'),

('Emma',     'Johnson',  'emma.j@startuplab.io',           '+1 (555) 634-9012', 'Web Design',
 'I need a landing page designed and built for my SaaS product launch. It should be conversion-optimized with animations and a clean modern aesthetic.',
 'seen', 'Reviewed portfolio. Good fit. Need to send pricing.', NOW() - INTERVAL '3 days'),

('Oliver',   'Brown',    'oliver.brown@enterprise.com',    '+1 (555) 712-3456', 'Custom Software Development',
 'We need a custom CRM system built for our sales team of 50 people. It should integrate with Salesforce and our internal ERP. This is a large project.',
 'contacted', 'Had initial call. $80k budget. Preparing detailed technical proposal.', NOW() - INTERVAL '6 days'),

('Isabella', 'Garcia',   'isabella.garcia@mediahouse.tv',  '+34 612 345 678',   'Web Development',
 'We need a video streaming platform for internal corporate training. Must support SSO, analytics, and multi-language subtitles.',
 'new', NULL, NOW() - INTERVAL '2 hours'),

('Ethan',    'Davis',    'ethan.davis@retailbrand.com',    '+1 (555) 891-2345', 'Performance Marketing',
 'Our Black Friday campaign is coming up in 6 months. Last year we spent $50k and got mediocre results. Need a better strategy.',
 'new', NULL, NOW() - INTERVAL '1 hour'),

('Mia',      'Wilson',   'mia.wilson@healthtech.co',       '+1 (555) 923-6789', 'UI/UX Design',
 'We are building a patient portal for a healthcare provider. Needs to be HIPAA-compliant, accessible (WCAG 2.1 AA), and work well for elderly users.',
 'seen', 'Interesting project. Need to check HIPAA compliance experience.', NOW() - INTERVAL '8 hours')

ON CONFLICT DO NOTHING;


-- ============================================================
-- 7. ADMIN USER
-- ============================================================
-- Login: admin@portfolio.com / Admin@123456

DO $$
DECLARE
    v_user_id UUID;
BEGIN
    SELECT id INTO v_user_id FROM auth.users WHERE email = 'admin@portfolio.com';

    IF v_user_id IS NULL THEN
        INSERT INTO auth.users (
            id, instance_id, email, encrypted_password,
            email_confirmed_at, created_at, updated_at,
            raw_app_meta_data, raw_user_meta_data,
            is_super_admin, role, aud
        ) VALUES (
            gen_random_uuid(),
            '00000000-0000-0000-0000-000000000000',
            'admin@portfolio.com',
            crypt('Admin@123456', gen_salt('bf')),
            NOW(), NOW(), NOW(),
            '{"provider":"email","providers":["email"]}',
            '{}',
            false, 'authenticated', 'authenticated'
        ) RETURNING id INTO v_user_id;

        RAISE NOTICE 'Created auth user: %', v_user_id;
    ELSE
        RAISE NOTICE 'Auth user already exists: %', v_user_id;
    END IF;

    INSERT INTO public.profiles (id, email, role)
    VALUES (v_user_id, 'admin@portfolio.com', 'admin')
    ON CONFLICT (id) DO UPDATE SET role = 'admin';

    RAISE NOTICE 'Admin profile ready.';
END $$;


-- ============================================================
-- VERIFY
-- ============================================================

SELECT 'contacts'      AS "table", COUNT(*)::text AS "count" FROM public.contacts
UNION ALL
SELECT 'profiles',                  COUNT(*)::text            FROM public.profiles
UNION ALL
SELECT 'admin users',               COUNT(*)::text            FROM public.profiles WHERE role = 'admin';
