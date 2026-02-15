
-- Create function to notify admins when a course enrollment is created
CREATE OR REPLACE FUNCTION public.notify_admin_on_enrollment()
RETURNS TRIGGER AS $$
DECLARE
  admin_record RECORD;
  pub_title TEXT;
BEGIN
  SELECT title INTO pub_title FROM public.publications WHERE id = NEW.publication_id;
  
  FOR admin_record IN SELECT user_id FROM public.user_roles WHERE role = 'admin'
  LOOP
    INSERT INTO public.notifications (user_id, title, message, link)
    VALUES (
      admin_record.user_id,
      'Nova inscrição em curso',
      NEW.name || ' inscreveu-se no curso: ' || COALESCE(pub_title, 'Sem título'),
      '/admin'
    );
  END LOOP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create function to notify admins when a scholarship request is created
CREATE OR REPLACE FUNCTION public.notify_admin_on_scholarship_request()
RETURNS TRIGGER AS $$
DECLARE
  admin_record RECORD;
  pub_title TEXT;
BEGIN
  SELECT title INTO pub_title FROM public.publications WHERE id = NEW.publication_id;
  
  FOR admin_record IN SELECT user_id FROM public.user_roles WHERE role = 'admin'
  LOOP
    INSERT INTO public.notifications (user_id, title, message, link)
    VALUES (
      admin_record.user_id,
      'Nova candidatura a bolsa',
      NEW.name || ' candidatou-se à bolsa: ' || COALESCE(pub_title, 'Sem título'),
      '/admin'
    );
  END LOOP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create function to notify admin on new user signup
CREATE OR REPLACE FUNCTION public.notify_admin_on_new_user()
RETURNS TRIGGER AS $$
DECLARE
  admin_record RECORD;
BEGIN
  FOR admin_record IN SELECT user_id FROM public.user_roles WHERE role = 'admin'
  LOOP
    INSERT INTO public.notifications (user_id, title, message, link)
    VALUES (
      admin_record.user_id,
      'Novo usuário registrado',
      COALESCE(NEW.full_name, NEW.email, 'Utilizador') || ' criou uma conta.',
      '/admin'
    );
  END LOOP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create triggers
CREATE TRIGGER on_enrollment_notify_admin
  AFTER INSERT ON public.course_enrollments
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_admin_on_enrollment();

CREATE TRIGGER on_scholarship_request_notify_admin
  AFTER INSERT ON public.scholarship_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_admin_on_scholarship_request();

CREATE TRIGGER on_new_user_notify_admin
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_admin_on_new_user();
