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
            }).map((_, index) => <div key={index} className="bg-card border border-border rounded-xl p-6">
                    <Skeleton className="h-6 w-24 mb-3" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full" />
                  </div>) : featuredScholarships.length > 0 ? featuredScholarships.map((scholarship, index) => <div key={scholarship.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-card transition-all group animate-fade-in" style={{
              animationDelay: `${index * 100}ms`
            }}>
                    <div className="mb-4">
                      {scholarship.value && <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">
                          {scholarship.value}
                        </div>}
                      <h3 className="text-sm sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {scholarship.title}
                      </h3>
                      {scholarship.country && <p className="text-muted-foreground text-sm mb-4">
                          {scholarship.country}
                        </p>}
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      {scholarship.deadline && <span className="text-muted-foreground">
                          Prazo: {new Date(scholarship.deadline).toLocaleDateString('pt-BR', {
                    month: 'short',
                    year: 'numeric'
                  })}
                        </span>}
                      <Button variant="link" size="sm" asChild className="p-0">
                        <Link to={`/publication/${scholarship.id}`}>Ver mais →</Link>
                      </Button>
                    </div>
                  </div>) : <div className="col-span-3 text-center py-8 text-muted-foreground">
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
                <Link to="/auth" className="text-sm">Criar Conta

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