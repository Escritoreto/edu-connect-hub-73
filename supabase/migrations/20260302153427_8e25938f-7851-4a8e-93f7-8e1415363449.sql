
-- Add 'university' to publication_category enum
ALTER TYPE public.publication_category ADD VALUE IF NOT EXISTS 'university';

-- Create site_settings table for admin branding + content management
CREATE TABLE IF NOT EXISTS public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text NOT NULL UNIQUE,
  setting_value text NOT NULL DEFAULT '',
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read site settings
CREATE POLICY "Anyone can read site settings"
ON public.site_settings FOR SELECT
USING (true);

-- Only admins can manage site settings
CREATE POLICY "Admins can manage site settings"
ON public.site_settings FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Insert default settings
INSERT INTO public.site_settings (setting_key, setting_value) VALUES
  ('site_name', 'UpMentor'),
  ('site_description', 'Plataforma de bolsas de estudo, cursos e oportunidades para estudantes'),
  ('hero_title', 'Pronto para Transformar Seu Futuro?'),
  ('hero_subtitle', 'Junte-se a milhares de estudantes que estão conquistando o mundo com o UpMentor.'),
  ('contact_email', ''),
  ('contact_phone', ''),
  ('whatsapp', ''),
  ('facebook', ''),
  ('instagram', ''),
  ('twitter', ''),
  ('about_text', '')
ON CONFLICT (setting_key) DO NOTHING;
