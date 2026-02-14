
-- Allow admins to delete course enrollments
CREATE POLICY "Admins can delete course enrollments"
ON public.course_enrollments
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to delete scholarship requests
CREATE POLICY "Admins can delete scholarship requests"
ON public.scholarship_requests
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create function to auto-delete old records (60 days)
CREATE OR REPLACE FUNCTION public.cleanup_old_requests()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.course_enrollments
  WHERE created_at < NOW() - INTERVAL '60 days';
  
  DELETE FROM public.scholarship_requests
  WHERE created_at < NOW() - INTERVAL '60 days';
END;
$$;
