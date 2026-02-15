
-- Add payment_status to course_enrollments
ALTER TABLE public.course_enrollments 
ADD COLUMN payment_status text DEFAULT NULL;

-- Add payment_status to scholarship_requests
ALTER TABLE public.scholarship_requests 
ADD COLUMN payment_status text DEFAULT NULL;
