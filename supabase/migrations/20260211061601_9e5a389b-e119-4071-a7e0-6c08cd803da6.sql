
-- Create cv_downloads table to track CV downloads
CREATE TABLE public.cv_downloads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  template_name TEXT NOT NULL,
  cv_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cv_downloads ENABLE ROW LEVEL SECURITY;

-- Users can view their own downloads
CREATE POLICY "Users can view their own cv downloads"
ON public.cv_downloads FOR SELECT
USING (auth.uid() = user_id);

-- Anyone can insert (logged in or not, user_id can be null)
CREATE POLICY "Anyone can insert cv downloads"
ON public.cv_downloads FOR INSERT
WITH CHECK (true);

-- Admins can view all downloads
CREATE POLICY "Admins can view all cv downloads"
ON public.cv_downloads FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.cv_downloads;
