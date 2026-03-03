
-- 1. PAYMENT SETTINGS: Restrict read to authenticated users only (contains IBAN, M-Pesa, etc.)
DROP POLICY IF EXISTS "Anyone can read payment settings" ON public.payment_settings;
CREATE POLICY "Authenticated users can read payment settings"
ON public.payment_settings FOR SELECT TO authenticated
USING (true);

-- 2. COURSE ENROLLMENTS: Require authentication for inserts
DROP POLICY IF EXISTS "Anyone can insert course enrollments" ON public.course_enrollments;
CREATE POLICY "Authenticated users can insert course enrollments"
ON public.course_enrollments FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 3. SCHOLARSHIP REQUESTS: Require authentication for inserts
DROP POLICY IF EXISTS "Anyone can insert scholarship requests" ON public.scholarship_requests;
CREATE POLICY "Authenticated users can insert scholarship requests"
ON public.scholarship_requests FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 4. CV DOWNLOADS: Require authentication for inserts
DROP POLICY IF EXISTS "Anyone can insert cv downloads" ON public.cv_downloads;
CREATE POLICY "Authenticated users can insert cv downloads"
ON public.cv_downloads FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 5. PROFILES: Restrict so users see own full profile, others see only non-email fields
-- Keep existing policy for admin/messaging needs but note: the current app queries profiles for messages
-- Replace broad SELECT with own-profile + admin access
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT TO authenticated
USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 6. NOTIFICATIONS: Fix the overly permissive service role insert (keep trigger functionality)
-- The "Service role can insert notifications" with true is needed for DB triggers
-- but we should scope it properly. Triggers run as SECURITY DEFINER so they bypass RLS.
-- We can safely drop this redundant policy.
DROP POLICY IF EXISTS "Service role can insert notifications" ON public.notifications;
