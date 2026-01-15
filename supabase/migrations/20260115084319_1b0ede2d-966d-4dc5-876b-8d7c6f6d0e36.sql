-- Create table for scholarship orientation requests
CREATE TABLE public.scholarship_requests (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    publication_id UUID NOT NULL REFERENCES public.publications(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT NOT NULL,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.scholarship_requests ENABLE ROW LEVEL SECURITY;

-- Users can insert their own requests
CREATE POLICY "Users can insert their own scholarship requests"
ON public.scholarship_requests
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can view their own requests
CREATE POLICY "Users can view their own scholarship requests"
ON public.scholarship_requests
FOR SELECT
USING (auth.uid() = user_id);

-- Admins can view all requests
CREATE POLICY "Admins can view all scholarship requests"
ON public.scholarship_requests
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update requests
CREATE POLICY "Admins can update scholarship requests"
ON public.scholarship_requests
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_scholarship_requests_updated_at
BEFORE UPDATE ON public.scholarship_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();