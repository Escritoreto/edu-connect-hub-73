
-- Add is_promotion field to publications
ALTER TABLE public.publications ADD COLUMN IF NOT EXISTS is_promotion boolean DEFAULT false;

-- Fix: Allow users to update payment_status on their own course enrollments
CREATE POLICY "Users can update payment status on own enrollments"
ON public.course_enrollments
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Fix: Allow users to update payment_status on their own scholarship requests
CREATE POLICY "Users can update payment status on own scholarship requests"
ON public.scholarship_requests
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create publication-images bucket for admin image uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('publication-images', 'publication-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read on publication-images
CREATE POLICY "Public read publication images"
ON storage.objects FOR SELECT
USING (bucket_id = 'publication-images');

-- Allow admins to upload publication images
CREATE POLICY "Admins can upload publication images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'publication-images' AND EXISTS (
  SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'
));

-- Allow admins to update publication images
CREATE POLICY "Admins can update publication images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'publication-images' AND EXISTS (
  SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'
));

-- Allow admins to delete publication images
CREATE POLICY "Admins can delete publication images"
ON storage.objects FOR DELETE
USING (bucket_id = 'publication-images' AND EXISTS (
  SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'
));
