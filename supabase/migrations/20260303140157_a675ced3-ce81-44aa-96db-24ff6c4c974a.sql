
-- Update enrollment notification trigger to include tab param
CREATE OR REPLACE FUNCTION public.notify_admin_on_enrollment()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
      '/admin?tab=enrollments'
    );
  END LOOP;
  RETURN NEW;
END;
$function$;

-- Update scholarship request notification trigger to include tab param
CREATE OR REPLACE FUNCTION public.notify_admin_on_scholarship_request()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
      '/admin?tab=scholarships'
    );
  END LOOP;
  RETURN NEW;
END;
$function$;

-- Update new user notification trigger to include tab param
CREATE OR REPLACE FUNCTION public.notify_admin_on_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
      '/admin?tab=users'
    );
  END LOOP;
  RETURN NEW;
END;
$function$;

-- Update project notification trigger to include tab param
CREATE OR REPLACE FUNCTION public.notify_admin_on_new_project()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE admin_record RECORD;
BEGIN
  FOR admin_record IN SELECT user_id FROM public.user_roles WHERE role = 'admin'
  LOOP
    INSERT INTO public.notifications (user_id, title, message, link)
    VALUES (admin_record.user_id, 'Novo projeto submetido', NEW.title || ' aguarda aprovação.', '/admin?tab=projects');
  END LOOP;
  RETURN NEW;
END;
$function$;

-- Create notification trigger for new reviews
CREATE OR REPLACE FUNCTION public.notify_admin_on_new_review()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  admin_record RECORD;
  reviewer_name TEXT;
BEGIN
  SELECT full_name INTO reviewer_name FROM public.profiles WHERE id = NEW.user_id;
  
  FOR admin_record IN SELECT user_id FROM public.user_roles WHERE role = 'admin'
  LOOP
    INSERT INTO public.notifications (user_id, title, message, link)
    VALUES (
      admin_record.user_id,
      'Nova avaliação recebida',
      COALESCE(reviewer_name, 'Utilizador') || ' enviou uma avaliação de ' || NEW.rating || ' estrelas.',
      '/admin?tab=reviews'
    );
  END LOOP;
  RETURN NEW;
END;
$function$;

CREATE TRIGGER on_new_review
  AFTER INSERT ON public.site_reviews
  FOR EACH ROW EXECUTE FUNCTION public.notify_admin_on_new_review();
