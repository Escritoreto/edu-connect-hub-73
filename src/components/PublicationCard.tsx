import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Eye, GraduationCap, Briefcase, BookOpen, Star } from "lucide-react";
import { format } from "date-fns";
import FavoriteButton from "@/components/FavoriteButton";
interface Publication {
  id: string;
  title: string;
  description: string;
  short_description?: string | null;
  category: string;
  country: string | null;
  area: string | null;
  image_url: string | null;
  university_logo?: string | null;
  deadline: string | null;
  value: string | null;
  views_count: number;
  created_at: string;
  is_featured?: boolean;
  scholarship_type?: string | null;
  study_level?: string | null;
  status?: string | null;
  country_info?: {
    flag_url?: string;
    advantages?: string;
    education?: string;
    culture?: string;
    gastronomy?: string;
    tourism?: string;
  } | null;
}
interface PublicationCardProps {
  publication: Publication;
}
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "scholarship":
      return <GraduationCap className="h-4 w-4" />;
    case "job":
      return <Briefcase className="h-4 w-4" />;
    case "course":
      return <BookOpen className="h-4 w-4" />;
    default:
      return null;
  }
};
const getCategoryLabel = (category: string) => {
  switch (category) {
    case "scholarship":
      return "Bolsa de Estudo";
    case "job":
      return "Emprego";
    case "course":
      return "Curso";
    default:
      return category;
  }
};
const PublicationCard = ({
  publication
}: PublicationCardProps) => {
  const displayDescription = publication.short_description || publication.description;
  return <Card className="hover:shadow-card transition-all overflow-hidden relative">
      {publication.is_featured && <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
            <Star className="h-3 w-3 fill-current" />
            Em Destaque
          </Badge>
        </div>}
      
      <div className="flex flex-col lg:flex-row">
        {publication.image_url && <div className="lg:w-48 h-48 lg:h-auto overflow-hidden relative group cursor-pointer">
            <img src={publication.image_url} alt={publication.title} className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {publication.university_logo && <div className="absolute bottom-2 right-2 bg-background/90 p-1 rounded transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
                <img src={publication.university_logo} alt="Logo universidade" className="h-8 w-8 object-contain" />
              </div>}
          </div>}
        
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {getCategoryIcon(publication.category)}
                  {getCategoryLabel(publication.category)}
                </span>
                {publication.value && <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-semibold">
                    {publication.value}
                  </span>}
              </div>
              <h3 className="text-xl font-semibold mb-2">{publication.title}</h3>
              <p className="text-muted-foreground line-clamp-3 mb-3">
                {displayDescription}
              </p>
              
              {/* New badges */}
              <div className="flex gap-2 flex-wrap mb-3">
                {publication.scholarship_type && <Badge variant="outline" className="text-xs">
                    {publication.scholarship_type}
                  </Badge>}
                {publication.study_level && <Badge variant="outline" className="text-xs">
                    {publication.study_level}
                  </Badge>}
                {publication.status}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            {publication.country && <div className="flex items-center gap-2">
                {publication.country_info?.flag_url ? <img src={publication.country_info.flag_url} alt={`Bandeira ${publication.country}`} className="h-4 w-6 object-cover rounded" /> : <MapPin className="h-4 w-4" />}
                {publication.country}
              </div>}
            {publication.deadline && <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Prazo: {format(new Date(publication.deadline), "dd/MM/yyyy")}
              </div>}
            
          </div>

          <div className="flex gap-2">
            <FavoriteButton publicationId={publication.id} />
            <Button variant="hero" size="sm" asChild>
              <Link to={`/publication/${publication.id}`}>
                Ver Detalhes
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>;
};
export default PublicationCard;