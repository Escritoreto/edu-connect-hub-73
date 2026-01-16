-- Tornar user_id nullable em scholarship_requests
ALTER TABLE public.scholarship_requests ALTER COLUMN user_id DROP NOT NULL;

-- Tornar user_id nullable em course_enrollments
ALTER TABLE public.course_enrollments ALTER COLUMN user_id DROP NOT NULL;

-- Atualizar política de INSERT para scholarship_requests (permitir anônimos)
DROP POLICY IF EXISTS "Users can insert their own scholarship requests" ON public.scholarship_requests;
CREATE POLICY "Anyone can insert scholarship requests" 
ON public.scholarship_requests 
FOR INSERT 
WITH CHECK (true);

-- Atualizar política de INSERT para course_enrollments (permitir anônimos)
DROP POLICY IF EXISTS "Users can insert their own enrollments" ON public.course_enrollments;
CREATE POLICY "Anyone can insert course enrollments" 
ON public.course_enrollments 
FOR INSERT 
WITH CHECK (true);