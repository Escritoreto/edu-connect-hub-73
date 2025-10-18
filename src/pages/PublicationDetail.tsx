import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Calendar, Eye, ExternalLink, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

interface Publication {
  id: string;
  title: string;
  description: string;
  category: string;
  country: string | null;
  area: string | null;
  image_url: string | null;
  external_link: string | null;
  deadline: string | null;
  value: string | null;
  views_count: number;
  created_at: string;
}

const PublicationDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [publication, setPublication] = useState<Publication | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && user) {
      fetchPublication();
      trackView();
    }
  }, [id, user]);

  const fetchPublication = async () => {
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && data) {
      setPublication(data);
    }
    setLoading(false);
  };

  const trackView = async () => {
    if (!user || !id) return;

    // Check if user already viewed this publication
    const { data: existingView } = await supabase
      .from("publication_views")
      .select("id")
      .eq("publication_id", id)
      .eq("user_id", user.id)
      .maybeSingle();

    if (!existingView) {
      // Insert new view
      await supabase.from("publication_views").insert({
        publication_id: id,
        user_id: user.id,
      });

      // Update views count
      const { data: currentPub } = await supabase
        .from("publications")
        .select("views_count")
        .eq("id", id)
        .single();

      if (currentPub) {
        await supabase
          .from("publications")
          .update({ views_count: (currentPub.views_count || 0) + 1 })
          .eq("id", id);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container">
            <Skeleton className="h-8 w-32 mb-6" />
            <Skeleton className="h-96 w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!publication) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container text-center">
            <h1 className="text-3xl font-bold mb-4">Publicação não encontrada</h1>
            <Button asChild>
              <Link to="/">Voltar para Home</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>

          {publication.image_url && (
            <div className="rounded-xl overflow-hidden mb-8">
              <img
                src={publication.image_url}
                alt={publication.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-4">{publication.title}</h1>
              
              <div className="flex flex-wrap gap-4 text-muted-foreground mb-6">
                {publication.country && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {publication.country}
                  </div>
                )}
                {publication.area && (
                  <div className="flex items-center gap-2">
                    <span>Área: {publication.area}</span>
                  </div>
                )}
                {publication.deadline && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Prazo: {format(new Date(publication.deadline), "dd/MM/yyyy")}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  {publication.views_count} visualizações
                </div>
              </div>

              {publication.value && (
                <div className="inline-block px-6 py-3 bg-primary/10 text-primary rounded-lg font-semibold text-lg mb-6">
                  {publication.value}
                </div>
              )}
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed whitespace-pre-wrap">
                {publication.description}
              </p>
            </div>

            {publication.external_link && (
              <div className="flex gap-3 pt-6">
                <Button size="lg" asChild>
                  <a
                    href={publication.external_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Acessar Link Externo
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PublicationDetail;
