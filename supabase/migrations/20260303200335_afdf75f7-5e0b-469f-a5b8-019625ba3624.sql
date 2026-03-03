
-- Create storage bucket for payment receipts
INSERT INTO storage.buckets (id, name, public) VALUES ('payment-receipts', 'payment-receipts', false);

-- Storage policies for payment-receipts bucket
CREATE POLICY "Users can upload their own receipts"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'payment-receipts' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own receipts"
ON storage.objects FOR SELECT
USING (bucket_id = 'payment-receipts' AND (auth.uid()::text = (storage.foldername(name))[1] OR public.has_role(auth.uid(), 'admin')));

CREATE POLICY "Admins can view all receipts"
ON storage.objects FOR SELECT
USING (bucket_id = 'payment-receipts' AND public.has_role(auth.uid(), 'admin'));

-- Add receipt_url columns
ALTER TABLE public.project_supports ADD COLUMN receipt_url text;
ALTER TABLE public.scholarship_requests ADD COLUMN receipt_url text;
ALTER TABLE public.course_enrollments ADD COLUMN receipt_url text;
