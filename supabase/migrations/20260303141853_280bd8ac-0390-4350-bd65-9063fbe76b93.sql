
-- Allow users to delete their own notifications (for 7-day cleanup)
CREATE POLICY "Users can delete their own notifications"
ON public.notifications
FOR DELETE
USING (auth.uid() = user_id);
