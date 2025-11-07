-- Create storage buckets for country flags and university logos
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('country-flags', 'country-flags', true),
  ('university-logos', 'university-logos', true);

-- RLS policies for country-flags bucket
CREATE POLICY "Anyone can view country flags"
ON storage.objects FOR SELECT
USING (bucket_id = 'country-flags');

CREATE POLICY "Admins can upload country flags"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'country-flags' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update country flags"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'country-flags' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete country flags"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'country-flags' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- RLS policies for university-logos bucket
CREATE POLICY "Anyone can view university logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'university-logos');

CREATE POLICY "Admins can upload university logos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'university-logos' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update university logos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'university-logos' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete university logos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'university-logos' 
  AND has_role(auth.uid(), 'admin'::app_role)
);