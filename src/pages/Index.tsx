import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, Star, Quote, School, BookOpen, Briefcase, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState, useCallback, ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ctaBgImg from "@/assets/header-cta.jpg";

const Index = () => {
  const [featuredScholarships, setFeaturedScholarships] = useState<any[]>([]);
  const [featuredUniversities, setFeaturedUniversities] = useState<any[]>([]);
  const [featuredCourses, setFeaturedCourses] = useState<any[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const [approvedReviews, setApprovedReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [scholarships, universities, courses, projects, reviews] = await Promise.all([
        supabase.from("publications").select("*").eq("category", "scholarship").eq("is_featured", true).order("created_at", { ascending: false }).limit(6),
        supabase.from("publications").select("*").eq("category", "university").order("created_at", { ascending: false }).limit(6),
        supabase.from("publications").select("*").eq("category", "course").order("created_at", { ascending: false }).limit(6),
        supabase.from("projects").select("*").eq("status", "approved").order("created_at", { ascending: false }).limit(6),
        supabase.from("site_reviews").select("*, profiles:user_id (full_name)").eq("status", "approved").order("created_at", { ascending: false }).limit(6),
      ]);
      if (scholarships.data) setFeaturedScholarships(scholarships.data);
      if (universities.data) setFeaturedUniversities(universities.data);
      if (courses.data) setFeaturedCourses(courses.data);
      if (projects.data) setFeaturedProjects(projects.data);
      if (reviews.data) setApprovedReviews(reviews.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />

        {/* Featured Scholarships */}
        <FeaturedSection
          title="Bolsas em Destaque"
          subtitle="As oportunidades mais procuradas pelos estudantes"
          linkTo="/scholarships"
          linkLabel="Ver Todas as Bolsas"
          loading={loading}
          items={featuredScholarships}
          emptyMessage="Nenhuma bolsa em destaque no momento"
          bg="bg-section-alt"
          renderItem={(s) => (
            <Link to={`/publication/${s.id}`} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-elegant transition-all duration-300 group block h-full">
              <div className="relative h-36 sm:h-48 overflow-hidden">
                <img src={s.image_url || "/placeholder.svg"} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {s.value && <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium shadow-sm">{s.value}</div>}
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="text-xs sm:text-base font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2">{s.title}</h3>
                {s.country && <p className="text-muted-foreground text-xs mb-1">{s.country}</p>}
                {s.deadline && <span className="text-muted-foreground text-xs">Abertura estimada: {new Date(s.deadline).toLocaleDateString("pt-BR", { day: "numeric", month: "long" })}</span>}
              </div>
            </Link>
          )}
        />

        {/* Featured Universities */}
        <FeaturedSection
          title="Universidades Privadas"
          subtitle="Explore as melhores universidades sem necessidade de bolsa"
          linkTo="/universities"
          linkLabel="Ver Todas as Universidades"
          items={featuredUniversities}
          bg="bg-background"
          renderItem={(uni) => (
            <Link to={`/publication/${uni.id}`} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-elegant transition-all duration-300 group block h-full">
              <div className="relative h-36 sm:h-48 overflow-hidden">
                <img src={uni.image_url || "/placeholder.svg"} alt={uni.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-2 left-2 px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium shadow-sm flex items-center gap-1"><School className="h-3 w-3" /> Universidade</div>
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="text-xs sm:text-base font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2">{uni.title}</h3>
                {uni.country && <p className="text-muted-foreground text-xs">{uni.country}</p>}
              </div>
            </Link>
          )}
        />

        {/* Featured Courses */}
        <FeaturedSection
          title="Cursos em Destaque"
          subtitle="Capacite-se com os melhores cursos disponíveis"
          linkTo="/courses"
          linkLabel="Ver Todos os Cursos"
          items={featuredCourses}
          bg="bg-section-alt"
          renderItem={(course) => (
            <Link to={`/publication/${course.id}`} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-elegant transition-all duration-300 group block h-full">
              <div className="relative h-36 sm:h-48 overflow-hidden">
                <img src={course.image_url || "/placeholder.svg"} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium shadow-sm flex items-center gap-1"><BookOpen className="h-3 w-3" /> Curso</div>
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="text-xs sm:text-base font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2">{course.title}</h3>
                {course.value && <p className="text-muted-foreground text-xs">{course.value}</p>}
              </div>
            </Link>
          )}
        />

        {/* Featured Projects */}
        <FeaturedSection
          title="Projetos em Destaque"
          subtitle="Apoie e invista em projetos inovadores"
          linkTo="/projects"
          linkLabel="Ver Todos os Projetos"
          items={featuredProjects}
          bg="bg-background"
          renderItem={(project) => (
            <Link to={`/projects/${project.id}`} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-elegant transition-all duration-300 group block h-full">
              <div className="relative h-36 sm:h-48 overflow-hidden">
                <img src={project.image_url || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium shadow-sm flex items-center gap-1"><Briefcase className="h-3 w-3" /> Projeto</div>
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="text-xs sm:text-base font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2">{project.title}</h3>
                {project.short_description && <p className="text-muted-foreground text-xs line-clamp-2">{project.short_description}</p>}
              </div>
            </Link>
          )}
        />

        {/* Testimonials / Reviews */}
        {(approvedReviews.length > 0 || testimonials.length > 0) && (
          <section className="py-20 bg-section-alt">
            <div className="container">
              <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-3">O que dizem nossos estudantes</h2>
                <p className="text-muted-foreground text-sm sm:text-base">Histórias reais de quem transformou seu futuro</p>
              </motion.div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(approvedReviews.length > 0 ? approvedReviews : testimonials).map((t: any, i: number) => (
                  <motion.div key={t.id || i} className="bg-card border border-border rounded-2xl p-6 relative" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <Quote className="h-8 w-8 text-primary/20 absolute top-4 right-4" />
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className={`h-4 w-4 ${j < (t.rating || 5) ? "fill-secondary text-secondary" : "text-muted-foreground/30"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed italic">"{t.text}"</p>
                    <div>
                      <p className="font-semibold text-sm">{t.profiles?.full_name || t.name || "Estudante"}</p>
                      {t.role && <p className="text-xs text-muted-foreground">{t.role}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container max-w-3xl">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center justify-center gap-2 mb-3">
                <HelpCircle className="h-6 w-6 text-primary" />
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold">Perguntas Frequentes</h2>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base">Tudo o que precisa saber sobre a UpMentor</p>
            </motion.div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <AccordionItem value={`faq-${i}`} className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow">
                    <AccordionTrigger className="text-sm sm:text-base font-medium hover:no-underline">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${ctaBgImg})` }}
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="container text-center space-y-6 relative z-10">
            <motion.h2 className="text-2xl lg:text-5xl font-bold text-white" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              Pronto para Transformar Seu Futuro?
            </motion.h2>
            <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base">Junte-se a milhares de estudantes que estão conquistando o mundo com o UpMentor.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild className="text-sm sm:text-base font-semibold bg-primary text-primary-foreground shadow-elegant">
                <Link to="/auth?tab=signup">Registrar-se <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="ghost" asChild className="text-sm sm:text-base border border-white/50 text-white bg-transparent hover:bg-white/10">
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
  { name: "Ana Muthemba", role: "Bolsista na Turquia", text: "Graças ao UpMentor, consegui encontrar a bolsa perfeita para estudar engenharia na Turquia. O processo foi simples e rápido!" },
  { name: "Carlos Machel", role: "Estudante de Mestrado", text: "O gerador de CV me ajudou a criar um currículo profissional que impressionou os recrutadores. Recomendo a todos!" },
  { name: "Fátima Joaquim", role: "Bolsista na China", text: "Encontrei minha bolsa de estudo na China através do UpMentor. A plataforma tem todas as informações que eu precisava." },
];

const faqItems = [
  { question: "A UpMentor é gratuita?", answer: "Sim! O registo é totalmente gratuito. Tens acesso a bolsas de estudo, criador de CV, carta de motivação e muito mais sem qualquer custo. Alguns cursos podem ter custos associados." },
  { question: "Como me candidato a uma bolsa de estudo?", answer: "Navegue até a secção de Bolsas, encontre a oportunidade desejada e clique em 'Candidatar-se'. Preencha o formulário com os seus dados e aguarde a confirmação por email ou notificação." },
  { question: "Preciso de conta para usar o Criador de CV?", answer: "Sim. Para garantir a segurança dos seus dados pessoais, o Criador de CV e a Carta de Motivação requerem uma conta verificada. O registo é rápido e gratuito." },
  { question: "Como funciona a secção de Projetos/Inovação?", answer: "Podes submeter ideias de negócio ou inovação para captar apoio financeiro. Os apoiadores podem contribuir via doação ou parceria (equity). Todos os projetos passam por aprovação antes de serem publicados." },
  { question: "Posso alterar os meus dados de perfil?", answer: "O email e foto podem ser alterados a qualquer momento. O nome e número de celular são campos protegidos — envie uma mensagem ao administrador para solicitar a liberação da edição." },
  { question: "Como recebo notificações?", answer: "Após criar a conta, receberá notificações automáticas sobre candidaturas, inscrições e mensagens. As notificações são exibidas no sino do menu e removidas automaticamente após 7 dias." },
  { question: "Que métodos de pagamento são aceites?", answer: "Para cursos e serviços pagos, aceitamos transferência bancária (IBAN) e M-Pesa. Os dados de pagamento são exibidos após a inscrição." },
  { question: "Como contacto o suporte?", answer: "Use o assistente virtual (botão de chat) disponível em todas as páginas, ou envie uma mensagem diretamente ao administrador através da secção Mensagens no seu perfil." },
];

/* ── Generic Featured Section ── */
interface FeaturedSectionProps {
  title: string;
  subtitle: string;
  linkTo: string;
  linkLabel: string;
  items: any[];
  bg: string;
  renderItem: (item: any) => ReactNode;
  loading?: boolean;
  emptyMessage?: string;
}

const FeaturedSection = ({ title, subtitle, linkTo, linkLabel, items, bg, renderItem, loading, emptyMessage }: FeaturedSectionProps) => {
  if (!loading && items.length === 0 && !emptyMessage) return null;

  return (
    <section className={`py-20 ${bg}`}>
      <div className="container">
        <motion.div className="flex justify-between items-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div>
            <h2 className="text-lg sm:text-3xl lg:text-4xl font-bold mb-2">{title}</h2>
            <p className="text-muted-foreground text-sm sm:text-base">{subtitle}</p>
          </div>
          <Button variant="outline" asChild className="hidden sm:flex">
            <Link to={linkTo}>Ver Todas <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
                <Skeleton className="h-40 w-full" />
                <div className="p-4"><Skeleton className="h-6 w-24 mb-3" /><Skeleton className="h-6 w-full mb-2" /><Skeleton className="h-4 w-3/4" /></div>
              </div>
            ))}
          </div>
        ) : items.length > 0 ? (
          <GenericCarousel items={items} renderItem={renderItem} />
        ) : emptyMessage ? (
          <div className="text-center py-8 text-muted-foreground">{emptyMessage}</div>
        ) : null}

        <div className="flex justify-center mt-6 sm:hidden">
          <Button variant="outline" asChild>
            <Link to={linkTo}>{linkLabel} <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

/* ── Generic Carousel with 5s autoplay ── */
const GenericCarousel = ({ items, renderItem }: { items: any[]; renderItem: (item: any) => ReactNode }) => {
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
          {items.map((item, i) => (
            <div key={item.id || i} className="flex-[0_0_50%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-1.5 sm:px-2">
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => emblaApi?.scrollPrev()} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-background border border-border rounded-full p-2 shadow-md hover:bg-muted transition-colors hidden sm:flex">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={() => emblaApi?.scrollNext()} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 bg-background border border-border rounded-full p-2 shadow-md hover:bg-muted transition-colors hidden sm:flex">
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, index) => (
          <button key={index} onClick={() => emblaApi?.scrollTo(index)} className={`h-2 rounded-full transition-all ${index === selectedIndex ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"}`} />
        ))}
      </div>
    </div>
  );
};

export default Index;
