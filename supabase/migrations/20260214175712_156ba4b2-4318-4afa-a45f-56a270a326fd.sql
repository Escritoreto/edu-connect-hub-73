
-- Create payment_settings table for admin-editable payment information
CREATE TABLE public.payment_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key text NOT NULL UNIQUE,
  setting_value text NOT NULL,
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payment_settings ENABLE ROW LEVEL SECURITY;

-- Everyone can read payment settings
CREATE POLICY "Anyone can read payment settings"
ON public.payment_settings
FOR SELECT
USING (true);

-- Only admins can manage payment settings
CREATE POLICY "Admins can manage payment settings"
ON public.payment_settings
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert default payment settings
INSERT INTO public.payment_settings (setting_key, setting_value) VALUES
  ('iban', 'MZ59000303020000032258139'),
  ('iban_name', 'Samuel Ernesto'),
  ('mpesa_number', '8463543115'),
  ('mpesa_name', 'Samuel Ernesto'),
  ('scholarship_price', '2599'),
  ('currency', 'MT'),
  ('payment_note', 'A conta que envia o pagamento deve ser a mesma da pessoa que deseja se inscrever para evitar atrasos. Assim que recebermos o seu pagamento entraremos em contacto.');
