import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PublicationCard from "@/components/PublicationCard";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bell, Heart } from "lucide-react";
import { differenceInDays, isPast } from "date-fns";

const Favorites = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { favorites, loading: favLoading } = useFavorites();
  const [publications, setPublications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState<any[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!favLoading && favorites.length > 0) {
      fetchFavoritePublications();
    } else {
      setLoading(false);
    }
  }, [favorites, favLoading]);

  const fetchFavoritePublications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .in("id", favorites)
      .order("deadline", { ascending: true });

    if (!error && data) {
      setPublications(data);
      
      // Check for upcoming deadlines (within 30 days)
      const upcoming = data.filter((pub) => {
        if (!pub.deadline) return false;
        const daysUntil = differenceInDays(new Date(pub.deadline), new Date());
        return daysUntil > 0 && daysUntil <= 30;
      });
      setUpcomingDeadlines(upcoming);
    }
    setLoading(false);
  };

  if (authLoading || favLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-primary py-16 text-primary-foreground">
          <div className="container">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-10 w-10" />
              <h1 className="text-4xl lg:text-5xl font-bold">Meus Favoritos</h1>
            </div>
            <p className="text-lg opacity-90 max-w-2xl">
              Acompanhe suas bolsas e cursos salvos em um só lugar
            </p>
          </div>
        </section>

        {/* Upcoming Deadlines Alert */}
        {upcomingDeadlines.length > 0 && (
          <section className="py-6 bg-muted/30">
            <div className="container">
              <Alert className="border-primary/50 bg-primary/5">
                <Bell className="h-4 w-4 text-primary" />
                <AlertTitle>Prazos Próximos</AlertTitle>
                <AlertDescription>
                  {upcomingDeadlines.length === 1 ? (
                    <>
                      <strong>{upcomingDeadlines[0].title}</strong> tem prazo em{" "}
                      {differenceInDays(new Date(upcomingDeadlines[0].deadline), new Date())} dias!
                    </>
                  ) : (
                    <>
                      Você tem <strong>{upcomingDeadlines.length} bolsas</strong> com prazos nos próximos 30 dias.
                    </>
                  )}
                </AlertDescription>
              </Alert>
            </div>
          </section>
        )}

        {/* Favorites List */}
        <section className="py-12">
          <div className="container">
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-48 w-full" />
                ))}
              </div>
            ) : publications.length > 0 ? (
              <div className="grid gap-6">
                {publications.map((publication) => (
                  <PublicationCard key={publication.id} publication={publication} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Nenhum favorito ainda</h2>
                <p className="text-muted-foreground text-lg mb-6">
                  Comece a salvar bolsas e cursos que te interessam!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;
