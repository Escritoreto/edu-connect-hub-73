-- Drop and recreate RLS policy to ensure it works correctly
DROP POLICY IF EXISTS "Anyone can view publications" ON public.publications;

-- Create a new policy that explicitly allows all SELECT operations
CREATE POLICY "Enable read access for all users" 
ON public.publications 
FOR SELECT 
USING (true);

-- Verify RLS is enabled
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;