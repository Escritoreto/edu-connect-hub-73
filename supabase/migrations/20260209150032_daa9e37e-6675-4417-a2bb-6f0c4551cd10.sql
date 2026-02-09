
-- Allow anyone to update their own scholarship_requests (to link user_id after account creation)
CREATE POLICY "Anyone can update own scholarship requests by id"
ON public.scholarship_requests
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Allow anyone to update own course_enrollments (to link user_id after account creation)  
CREATE POLICY "Anyone can update own course enrollments by id"
ON public.course_enrollments
FOR UPDATE
USING (true)
WITH CHECK (true);
