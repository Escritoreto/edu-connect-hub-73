
-- Projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  image_url TEXT,
  category TEXT NOT NULL DEFAULT 'geral',
  financial_goal NUMERIC(12,2) NOT NULL DEFAULT 0,
  current_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  support_type TEXT NOT NULL DEFAULT 'both' CHECK (support_type IN ('donation', 'partnership', 'both')),
  max_partnership_percent NUMERIC(5,2) DEFAULT 0,
  allocated_partnership_percent NUMERIC(5,2) DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed', 'cancelled')),
  last_update_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved projects" ON public.projects
  FOR SELECT USING (status = 'approved' OR creator_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Auth users can create projects" ON public.projects
  FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can update own projects" ON public.projects
  FOR UPDATE USING (auth.uid() = creator_id);

CREATE POLICY "Admins can manage all projects" ON public.projects
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Project updates table
CREATE TABLE public.project_updates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.project_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view updates of approved projects" ON public.project_updates
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND (status = 'approved' OR creator_id = auth.uid()))
    OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Creators can insert updates" ON public.project_updates
  FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Admins can manage updates" ON public.project_updates
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Project supports table
CREATE TABLE public.project_supports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  supporter_id UUID NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  support_type TEXT NOT NULL CHECK (support_type IN ('donation', 'partnership')),
  partnership_percent NUMERIC(5,2) DEFAULT 0,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'confirmed', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.project_supports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own supports" ON public.project_supports
  FOR SELECT USING (auth.uid() = supporter_id);

CREATE POLICY "Creators can view supports on their projects" ON public.project_supports
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND creator_id = auth.uid())
  );

CREATE POLICY "Auth users can create supports" ON public.project_supports
  FOR INSERT WITH CHECK (auth.uid() = supporter_id);

CREATE POLICY "Users can update own support payment" ON public.project_supports
  FOR UPDATE USING (auth.uid() = supporter_id);

CREATE POLICY "Admins can manage all supports" ON public.project_supports
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Project ratings table
CREATE TABLE public.project_ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (project_id, user_id)
);

ALTER TABLE public.project_ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view ratings" ON public.project_ratings
  FOR SELECT USING (true);

CREATE POLICY "Auth users can rate" ON public.project_ratings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own rating" ON public.project_ratings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage ratings" ON public.project_ratings
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Triggers for updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_project_supports_updated_at BEFORE UPDATE ON public.project_supports
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Notify admin on new project
CREATE OR REPLACE FUNCTION public.notify_admin_on_new_project()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE admin_record RECORD;
BEGIN
  FOR admin_record IN SELECT user_id FROM public.user_roles WHERE role = 'admin'
  LOOP
    INSERT INTO public.notifications (user_id, title, message, link)
    VALUES (admin_record.user_id, 'Novo projeto submetido', NEW.title || ' aguarda aprovação.', '/admin');
  END LOOP;
  RETURN NEW;
END;
$$;

CREATE TRIGGER notify_admin_new_project AFTER INSERT ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.notify_admin_on_new_project();
