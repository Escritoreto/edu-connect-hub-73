
-- Allow trigger functions (SECURITY DEFINER) to insert notifications
-- The triggers run as the function owner, not as the user, so we need a policy for service role inserts
CREATE POLICY "Service role can insert notifications"
ON public.notifications
FOR INSERT
WITH CHECK (true);
