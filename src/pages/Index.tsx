import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, Star, Quote, School } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

const Index = () => {
  const [featuredScholarships, setFeaturedScholarships] = useState<any[]>([]);
  const [featuredUniversities, setFeaturedUniversities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedScholarships = async () => {
      const { data, error } = await supabase
        .from("publications")
        .select("*")
        .eq("category", "scholarship")
        .eq("is_featured", true)
        .order("created_at", { ascending: false })
        .limit(6);
      if (!error && data) setFeaturedScholarships(data);
      setLoading(false);
    };

    const fetchFeaturedUniversities = async () => {
      const { data, error } = await supabase
        .from("publications")
        .select("*")
        .eq("category", "university")
        .order("created_at", { ascending: false })
        .limit(6);
      if (!error && data) setFeaturedUniversities(data);
    };

    fetchFeaturedScholarships();
    fetchFeaturedUniversities();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />

        {/* Featured Scholarships */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <motion.div
              className="flex justify-between items-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-lg sm:text-3xl lg:text-4xl font-bold mb-2">Bolsas em Destaque</h2>
                <p className="text-muted-foreground text-sm sm:text-base">As oportunidades mais procuradas pelos estudantes</p>
              </div>
              <Button variant="outline" asChild className="hidden sm:flex">
                <Link to="/scholarships">
                  Ver Todas <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="bg-card border border-border rounded-xl overflow-hidden">
                    <Skeleton className="h-40 w-full" />
                    <div className="p-4">
                      <Skeleton className="h-6 w-24 mb-3" />
                      <Skeleton className="h-6 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : featuredScholarships.length > 0 ? (
              <FeaturedCarousel scholarships={featuredScholarships} />
            ) : (
              <div className="text-center py-8 text-muted-foreground">Nenhuma bolsa em destaque no momento</div>
            )}

            <div className="flex justify-center mt-6 sm:hidden">
              <Button variant="outline" asChild>
                <Link to="/scholarships">Ver Todas as Bolsas <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Universities */}
        {featuredUniversities.length > 0 && (
          <section className="py-20 bg-background">
            <div className="container">
              <motion.div
                className="flex justify-between items-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div>
                  <h2 className="text-lg sm:text-3xl lg:text-4xl font-bold mb-2">Universidades Privadas</h2>
                  <p className="text-muted-foreground text-sm sm:text-base">Explore as melhores universidades sem necessidade de bolsa</p>
                </div>
                <Button variant="outline" asChild className="hidden sm:flex">
                  <Link to="/universities">
                    Ver Todas <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                {featuredUniversities.map((uni, i) => (
                  <motion.div
                    key={uni.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={`/publication/${uni.id}`}
                      className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-elegant transition-all duration-300 group block h-full"
                    >
                      <div className="relative h-36 sm:h-48 overflow-hidden">
                        <img
                          src={uni.image_url || "/placeholder.svg"}
                          alt={uni.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-2 left-2 px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium shadow-sm flex items-center gap-1">
                          <School className="h-3 w-3" /> Universidade
                        </div>
                      </div>
                      <div className="p-3 sm:p-4">
                        <h3 className="text-xs sm:text-base font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2">
                          {uni.title}
                        </h3>
                        {uni.country && (
                          <p className="text-muted-foreground text-xs">{uni.country}</p>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center mt-6 sm:hidden">
                <Button variant="outline" asChild>
                  <Link to="/universities">Ver Todas as Universidades <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        <section className="py-20 bg-background">
          <div className="container">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-3">O que dizem nossos estudantes</h2>
              <p className="text-muted-foreground text-sm sm:text-base">Histórias reais de quem transformou seu futuro</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  className="bg-card border border-border rounded-2xl p-6 relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Quote className="h-8 w-8 text-primary/20 absolute top-4 right-4" />
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed italic">"{t.text}"</p>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(221_80%_68%/0.3),transparent_70%)]" />
          <div className="container text-center space-y-6 relative">
            <motion.h2
              className="text-2xl lg:text-5xl font-bold"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              Pronto para Transformar Seu Futuro?
            </motion.h2>
            <p className="opacity-90 max-w-2xl mx-auto text-sm sm:text-base">
              Junte-se a milhares de estudantes que estão conquistando o mundo com o UpMentor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="outline" asChild className="text-sm sm:text-base bg-background/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-background/20 font-semibold shadow-lg">
                <Link to="/auth?tab=signup">
                  Registrar-se <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-sm sm:text-base bg-background/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-background/20">
                <Link to="/scholarships">Buscar Bolsas</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const testimonials = [
  {
    name: "Ana Muthemba",
    role: "Bolsista na Turquia",
    text: "Graças ao UpMentor, consegui encontrar a bolsa perfeita para estudar engenharia na Turquia. O processo foi simples e rápido!",
  },
  {
    name: "Carlos Machel",
    role: "Estudante de Mestrado",
    text: "O gerador de CV me ajudou a criar um currículo profissional que impressionou os recrutadores. Recomendo a todos!",
  },
  {
    name: "Fátima Joaquim",
    role: "Bolsista na China",
    text: "Encontrei minha bolsa de estudo na China através do UpMentor. A plataforma tem todas as informações que eu precisava.",
  },
];

const FeaturedCarousel = ({ scholarships }: { scholarships: any[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {scholarships.map((scholarship) => (
            <div key={scholarship.id} className="flex-[0_0_50%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-1.5 sm:px-2">
              <Link
                to={`/publication/${scholarship.id}`}
                className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-elegant transition-all duration-300 group block h-full"
              >
                <div className="relative h-36 sm:h-48 overflow-hidden">
                  <img
                    src={scholarship.image_url || "/placeholder.svg"}
                    alt={scholarship.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {scholarship.value && (
                    <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium shadow-sm">
                      {scholarship.value}
                    </div>
                  )}
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-xs sm:text-base font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {scholarship.title}
                  </h3>
                  {scholarship.country && (
                    <p className="text-muted-foreground text-xs mb-1">{scholarship.country}</p>
                  )}
                  {scholarship.deadline && (
                    <span className="text-muted-foreground text-xs">
                      Abertura estimada: {new Date(scholarship.deadline).toLocaleDateString("pt-BR", { day: "numeric", month: "long" })}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-background border border-border rounded-full p-2 shadow-md hover:bg-muted transition-colors hidden sm:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 bg-background border border-border rounded-full p-2 shadow-md hover:bg-muted transition-colors hidden sm:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="flex justify-center gap-2 mt-4">
        {scholarships.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 rounded-full transition-all ${
              index === selectedIndex ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
