
-- Drop and recreate triggers to ensure they exist
DROP TRIGGER IF EXISTS on_new_enrollment ON public.course_enrollments;
DROP TRIGGER IF EXISTS on_new_scholarship_request ON public.scholarship_requests;
DROP TRIGGER IF EXISTS on_new_project ON public.projects;
DROP TRIGGER IF EXISTS on_new_review ON public.site_reviews;
DROP TRIGGER IF EXISTS on_new_profile ON public.profiles;

CREATE TRIGGER on_new_enrollment
  AFTER INSERT ON public.course_enrollments
  FOR EACH ROW EXECUTE FUNCTION public.notify_admin_on_enrollment();

CREATE TRIGGER on_new_scholarship_request
  AFTER INSERT ON public.scholarship_requests
  FOR EACH ROW EXECUTE FUNCTION public.notify_admin_on_scholarship_request();

CREATE TRIGGER on_new_project
  AFTER INSERT ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.notify_admin_on_new_project();

CREATE TRIGGER on_new_review
  AFTER INSERT ON public.site_reviews
  FOR EACH ROW EXECUTE FUNCTION public.notify_admin_on_new_review();

CREATE TRIGGER on_new_profile
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.notify_admin_on_new_user();

-- Allow authenticated users to insert notifications
DROP POLICY IF EXISTS "Authenticated users can insert notifications" ON public.notifications;
CREATE POLICY "Authenticated users can insert notifications"
  ON public.notifications FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow users to delete their own enrollments and scholarship requests
DROP POLICY IF EXISTS "Users can delete own enrollments" ON public.course_enrollments;
CREATE POLICY "Users can delete own enrollments"
  ON public.course_enrollments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own scholarship requests" ON public.scholarship_requests;
CREATE POLICY "Users can delete own scholarship requests"
  ON public.scholarship_requests FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
