import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Calendar, Eye, ExternalLink, ArrowLeft, FileText, Gift, Clock, Users, Globe, Utensils, Landmark, Camera, GraduationCap, Star, CheckCircle2, BookOpen } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import CourseRegistrationForm from "@/components/CourseRegistrationForm";
import ScholarshipRequestForm from "@/components/ScholarshipRequestForm";
import candidatarBg from "@/assets/header-candidatar.jpg";

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
  external_link: string | null;
  deadline: string | null;
  value: string | null;
  views_count: number;
  created_at: string;
  is_featured?: boolean;
  scholarship_type?: string | null;
  study_level?: string | null;
  status?: string | null;
  requirements?: string | null;
  benefits?: any;
  important_dates?: any;
  vacancies_by_country?: any;
  country_info?: any;
}

const PublicationDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [publication, setPublication] = useState<Publication | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPublication();
      trackView();
    }
  }, [id]);

  const fetchPublication = async () => {
    const { data, error } = await supabase.from("publications").select("*").eq("id", id).single();
    if (!error && data) setPublication(data);
    setLoading(false);
  };

  const trackView = async () => {
    if (!id) return;
    const { data: currentPub } = await supabase.from("publications").select("views_count").eq("id", id).single();
    if (currentPub) {
      await supabase.from("publications").update({ views_count: (currentPub.views_count || 0) + 1 }).eq("id", id);
    }
    if (user) {
      const { data: existingView } = await supabase.from("publication_views").select("id").eq("publication_id", id).eq("user_id", user.id).maybeSingle();
      if (!existingView) {
        await supabase.from("publication_views").insert({ publication_id: id, user_id: user.id });
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
      </div>);

  }

  if (!publication) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container text-center">
            <h1 className="text-3xl font-bold mb-4">Publicação não encontrada</h1>
            <Button asChild><Link to="/">Voltar para Home</Link></Button>
          </div>
        </main>
        <Footer />
      </div>);

  }

  const benefits = publication.benefits || [];
  const importantDates = publication.important_dates || {};
  const vacanciesByCountry = publication.vacancies_by_country || {};
  const countryInfo = publication.country_info || {};

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-6xl">
          <Button variant="ghost" asChild className="mb-6">
            <Link to={publication.category === 'course' ? '/courses' : publication.category === 'university' ? '/universities' : '/scholarships'}>
              <ArrowLeft className="h-4 w-4 mr-2" />Voltar
            </Link>
          </Button>

          {/* Hero Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              {publication.image_url &&
              <div className="rounded-xl overflow-hidden mb-6">
                  <img src={publication.image_url} alt={publication.title} className="w-full h-96 object-cover" />
                </div>
              }
              <div className="space-y-4">
                {publication.is_featured &&
                <Badge className="bg-primary flex items-center gap-1 w-fit">
                    <Star className="h-3 w-3 fill-current" />
                    {publication.category === 'course' ? 'Curso em Destaque' : 'Bolsa em Destaque'}
                  </Badge>
                }
                {publication.category === 'course' &&
                <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                    <BookOpen className="h-3 w-3" />Curso
                  </Badge>
                }
                <h1 className="text-4xl font-bold">{publication.title}</h1>
                {publication.short_description && <p className="text-xl text-muted-foreground">{publication.short_description}</p>}
                <div className="flex flex-wrap gap-2">
                  {publication.scholarship_type && <Badge variant="secondary">{publication.scholarship_type}</Badge>}
                  {publication.study_level && <Badge variant="secondary">{publication.study_level}</Badge>}
                  {publication.status}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {publication.external_link &&
              <Button size="lg" className="w-full" asChild>
                  <a href={publication.external_link} target="_blank" rel="noopener noreferrer">
                    Site Oficial <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              }
              {publication.university_logo &&
              <div className="bg-muted rounded-lg p-4">
                  <img src={publication.university_logo} alt="Logo da Universidade" className="w-full h-auto" />
                </div>
              }
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />Descrição Detalhada</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed whitespace-pre-wrap">{publication.description}</p>
              </CardContent>
            </Card>

            {publication.requirements &&
            <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5" />Requisitos e Documentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap leading-relaxed">{publication.requirements}</p>
                </CardContent>
              </Card>
            }

            {benefits.length > 0 &&
            <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Gift className="h-5 w-5" />Benefícios Incluídos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {benefits.map((benefit: any, index: number) => {
                    const isStringBenefit = typeof benefit === 'string';
                    const benefitTitle = isStringBenefit ? benefit : benefit.type;
                    const benefitDescription = isStringBenefit ? null : benefit.description;
                    return (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold">{benefitTitle}</p>
                            {benefitDescription && <p className="text-sm text-muted-foreground">{benefitDescription}</p>}
                          </div>
                        </div>);

                  })}
                  </div>
                </CardContent>
              </Card>
            }

            {Object.keys(importantDates).length > 0 &&
            <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" />Datas Importantes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {Object.entries(importantDates).map(([key, value]) =>
                  <div key={key} className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground capitalize">{key.replace(/_/g, ' ')}</p>
                        <p className="font-semibold">{value as string}</p>
                      </div>
                  )}
                  </div>
                </CardContent>
              </Card>
            }

            {Object.keys(vacanciesByCountry).length > 0 &&
            <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />Vagas por País</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.entries(vacanciesByCountry).map(([country, vacancies]) =>
                  <div key={country} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="font-semibold">{country}</span>
                        <Badge variant="secondary">{vacancies as string} vagas</Badge>
                      </div>
                  )}
                  </div>
                </CardContent>
              </Card>
            }

            {publication.country && Object.keys(countryInfo).length > 0 &&
            <>
                <Separator className="my-8" />
                <div>
                  <h2 className="text-3xl font-bold mb-6">Sobre Estudar em {publication.country}</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {countryInfo.advantages &&
                  <Card>
                        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Globe className="h-5 w-5 text-primary" />Vantagens de Estudar</CardTitle></CardHeader>
                        <CardContent><p className="leading-relaxed">{countryInfo.advantages}</p></CardContent>
                      </Card>
                  }
                    {countryInfo.education &&
                  <Card>
                        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><GraduationCap className="h-5 w-5 text-primary" />Qualidade da Educação</CardTitle></CardHeader>
                        <CardContent><p className="leading-relaxed">{countryInfo.education}</p></CardContent>
                      </Card>
                  }
                    {countryInfo.culture &&
                  <Card>
                        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Landmark className="h-5 w-5 text-primary" />Cultura e Religião</CardTitle></CardHeader>
                        <CardContent><p className="leading-relaxed">{countryInfo.culture}</p></CardContent>
                      </Card>
                  }
                    {countryInfo.gastronomy &&
                  <Card>
                        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Utensils className="h-5 w-5 text-primary" />Gastronomia Típica</CardTitle></CardHeader>
                        <CardContent><p className="leading-relaxed">{countryInfo.gastronomy}</p></CardContent>
                      </Card>
                  }
                    {countryInfo.tourism &&
                  <Card className="md:col-span-2">
                        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Camera className="h-5 w-5 text-primary" />Turismo e Beleza</CardTitle></CardHeader>
                        <CardContent><p className="leading-relaxed">{countryInfo.tourism}</p></CardContent>
                      </Card>
                  }
                  </div>
                </div>
              </>
            }

            {/* Course Registration Form */}
            {publication.category === 'course' &&
            <div className="mt-8">
                <Separator className="my-8" />
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                  <BookOpen className="h-7 w-7 text-primary" />Inscreva-se Agora
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <Card className="bg-muted/50">
                      <CardHeader><CardTitle className="text-lg">Informações do Curso</CardTitle></CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-border">
                          <span className="text-muted-foreground">Preço</span>
                          <span className="font-bold text-primary text-lg">{publication.value || 'Consultar'}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-muted-foreground">Modalidade</span>
                          <span className="font-semibold">Online ou Presencial</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <CourseRegistrationForm courseTitle={publication.title} courseId={publication.id} />
                </div>
              </div>
            }

            {/* Scholarship/University Orientation Request Form */}
            {(publication.category === 'scholarship' || publication.category === 'university') &&
            <div className="mt-8">
                <Separator className="my-8" />
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                  <GraduationCap className="h-7 w-7 text-primary" />Solicitar Orientação
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <Card className="bg-muted/50">
                      <CardHeader><CardTitle className="text-lg">Por que solicitar orientação?</CardTitle></CardHeader>
                      <CardContent className="space-y-4">
                        {[
                      { title: "Análise do seu perfil", desc: "Avaliamos suas qualificações e chances" },
                      { title: "Orientação personalizada", desc: "Receba dicas específicas para sua candidatura" },
                      { title: "Suporte na documentação", desc: "Ajudamos com os documentos necessários" },
                      { title: "Acompanhamento contínuo", desc: "Suporte até a aprovação final" }].
                      map((item, i) =>
                      <div key={i} className="flex items-start gap-3 py-2">
                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-semibold">{item.title}</p>
                              <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                          </div>
                      )}
                      </CardContent>
                    </Card>
                  </div>
                  <ScholarshipRequestForm scholarshipTitle={publication.title} scholarshipId={publication.id} />
                </div>
              </div>
            }

            {/* CTA Footer with background image */}
            {(publication.category === 'scholarship' || publication.category === 'university') && publication.external_link &&
            <div className="relative rounded-2xl overflow-hidden mt-8">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${candidatarBg})` }} />
                <div className="absolute inset-0 bg-foreground/60" />
                












              
              </div>
            }
          </div>
        </div>
      </main>
      <Footer />
    </div>);

};

export default PublicationDetail;