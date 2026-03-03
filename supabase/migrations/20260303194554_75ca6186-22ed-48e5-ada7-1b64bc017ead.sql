
ALTER TABLE public.projects
ADD COLUMN min_support_amount numeric DEFAULT 100,
ADD COLUMN max_support_amount numeric DEFAULT 1000000;
