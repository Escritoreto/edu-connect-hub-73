
-- Create site_reviews table for user testimonials/reviews
CREATE TABLE public.site_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can view approved reviews (for homepage)
CREATE POLICY "Anyone can view approved reviews"
ON public.site_reviews FOR SELECT
USING (status = 'approved' OR auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Authenticated users can create their own review
CREATE POLICY "Users can create their own review"
ON public.site_reviews FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own pending review
CREATE POLICY "Users can update own pending review"
ON public.site_reviews FOR UPDATE
USING (auth.uid() = user_id AND status = 'pending');

-- Admins can manage all reviews
CREATE POLICY "Admins can manage all reviews"
ON public.site_reviews FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Users can delete their own review
CREATE POLICY "Users can delete own review"
ON public.site_reviews FOR DELETE
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_site_reviews_updated_at
BEFORE UPDATE ON public.site_reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
