
-- Drop the overly permissive policies
DROP POLICY "Anyone can update own scholarship requests by id" ON public.scholarship_requests;
DROP POLICY "Anyone can update own course enrollments by id" ON public.course_enrollments;

-- Create secure policies: only allow linking user_id when it's currently null and setting to own uid
CREATE POLICY "Users can link their own scholarship requests"
ON public.scholarship_requests
FOR UPDATE
USING (user_id IS NULL)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can link their own course enrollments"
ON public.course_enrollments
FOR UPDATE
USING (user_id IS NULL)
WITH CHECK (auth.uid() = user_id);
