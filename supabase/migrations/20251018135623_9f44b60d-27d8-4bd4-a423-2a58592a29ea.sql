-- Fix search_path for get_registered_users_count function
CREATE OR REPLACE FUNCTION public.get_registered_users_count()
RETURNS INTEGER
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = auth
AS $$
  SELECT COUNT(*)::INTEGER FROM auth.users;
$$;