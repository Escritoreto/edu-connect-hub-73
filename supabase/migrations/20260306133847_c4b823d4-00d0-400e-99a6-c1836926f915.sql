
-- Fix: Create missing triggers (use IF NOT EXISTS pattern with DROP)
DROP TRIGGER IF EXISTS on_new_enrollment ON public.course_enrollments;
CREATE TRIGGER on_new_enrollment
  AFTER INSERT ON public.course_enrollments
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_admin_on_enrollment();

DROP TRIGGER IF EXISTS on_new_scholarship_request ON public.scholarship_requests;
CREATE TRIGGER on_new_scholarship_request
  AFTER INSERT ON public.scholarship_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_admin_on_scholarship_request();

DROP TRIGGER IF EXISTS on_new_user_profile ON public.profiles;
CREATE TRIGGER on_new_user_profile
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_admin_on_new_user();

DROP TRIGGER IF EXISTS on_new_project ON public.projects;
CREATE TRIGGER on_new_project
  AFTER INSERT ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_admin_on_new_project();

-- Fix projects: ensure max_support_amount default is reasonable
ALTER TABLE public.projects ALTER COLUMN max_support_amount SET DEFAULT 1000000;
