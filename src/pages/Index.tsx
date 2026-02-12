import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
const Index = () => {
  const [featuredScholarships, setFeaturedScholarships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFeaturedScholarships = async () => {
      const {
        data,
        error
      } = await supabase.from("publications").select("*").eq("category", "scholarship").eq("is_featured", true).order("created_at", {
        ascending: false
      }).limit(3);
      if (!error && data) {
        setFeaturedScholarships(data);
      }
      setLoading(false);
    };
    fetchFeaturedScholarships();
  }, []);
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />
        <Features />

        {/* Featured Scholarships */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="flex justify-between items-center mb-12">
              <div>
              <h2 className="sm:text-3xl lg:text-4xl font-bold mb-2 text-lg">
                  Bolsas em Destaque
                </h2>
                <p className="text-muted-foreground text-base">
                  As oportunidades mais procuradas pelos estudantes
                </p>
              </div>
              <Button variant="outline" asChild className="hidden sm:flex">
                <Link to="/scholarships">
                  Ver Todas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
              {loading ? Array.from({
              length: 3
            }).map((_, index) => <div key={index} className="bg-card border border-border rounded-xl overflow-hidden">
                    <Skeleton className="h-40 w-full" />
                    <div className="p-4">
                      <Skeleton className="h-6 w-24 mb-3" />
                      <Skeleton className="h-6 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>) : featuredScholarships.length > 0 ? featuredScholarships.map((scholarship, index) => <Link to={`/publication/${scholarship.id}`} key={scholarship.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-card transition-all group animate-fade-in block" style={{
              animationDelay: `${index * 100}ms`
            }}>
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <img
                        src={scholarship.image_url || "/placeholder.svg"}
                        alt={scholarship.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {scholarship.value && <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                          {scholarship.value}
                        </div>}
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm sm:text-lg font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2">
                        {scholarship.title}
                      </h3>
                      {scholarship.country && <p className="text-muted-foreground text-xs sm:text-sm mb-2">
                          {scholarship.country}
                        </p>}
                      {scholarship.deadline && <span className="text-muted-foreground text-xs">
                          Abertura estimada: {new Date(scholarship.deadline).toLocaleDateString('pt-BR', {
                    month: 'long',
                    year: 'numeric'
                  })}
                        </span>}
                    </div>
                  </Link>) : <div className="col-span-3 text-center py-8 text-muted-foreground">
                  Nenhuma bolsa em destaque no momento
                </div>}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary text-primary-foreground">
          <div className="container text-center space-y-6">
            <h2 className="lg:text-5xl font-bold text-2xl">
              Pronto para Transformar Seu Futuro?
            </h2>
            <p className="opacity-90 max-w-2xl mx-auto text-base">
              Junte-se a milhares de estudantes que estão conquistando o mundo com o UpMentor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="secondary" asChild className="text-base">
                <Link to="/auth?tab=signup" className="text-sm">Registrar-se
                <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base bg-background/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-background/20">
                <Link to="/scholarships" className="text-sm">
                  Buscar Bolsas
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default Index;