-- Add new columns to publications table for enhanced scholarship information
ALTER TABLE public.publications
ADD COLUMN IF NOT EXISTS scholarship_type TEXT CHECK (scholarship_type IN ('Completa', 'Parcial')),
ADD COLUMN IF NOT EXISTS study_level TEXT CHECK (study_level IN ('Licenciatura', 'Mestrado', 'Doutoramento')),
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS status TEXT CHECK (status IN ('Aberta', 'Fechada')) DEFAULT 'Aberta',
ADD COLUMN IF NOT EXISTS requirements TEXT,
ADD COLUMN IF NOT EXISTS benefits JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS important_dates JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS vacancies_by_country JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS country_info JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS short_description TEXT,
ADD COLUMN IF NOT EXISTS university_logo TEXT;

-- Add comment to explain country_info structure
COMMENT ON COLUMN public.publications.country_info IS 'JSON structure: {advantages: string, gastronomy: string, culture: string, tourism: string, education: string}';

-- Add comment to explain benefits structure
COMMENT ON COLUMN public.publications.benefits IS 'JSON array of benefits: [{type: string, description: string}]';

-- Add comment to explain important_dates structure
COMMENT ON COLUMN public.publications.important_dates IS 'JSON structure: {application_start: date, application_end: date, result_date: date}';

-- Create index for faster filtering
CREATE INDEX IF NOT EXISTS idx_publications_featured ON public.publications(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_publications_status ON public.publications(status);
CREATE INDEX IF NOT EXISTS idx_publications_scholarship_type ON public.publications(scholarship_type);
CREATE INDEX IF NOT EXISTS idx_publications_study_level ON public.publications(study_level);