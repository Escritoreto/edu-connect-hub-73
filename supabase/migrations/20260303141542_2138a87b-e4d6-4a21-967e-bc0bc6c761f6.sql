
-- Add phone and profile_edit_allowed to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS profile_edit_allowed boolean NOT NULL DEFAULT false;

-- Create function to cleanup notifications older than 7 days
CREATE OR REPLACE FUNCTION public.cleanup_old_notifications()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  DELETE FROM public.notifications WHERE created_at < now() - interval '7 days';
$$;
