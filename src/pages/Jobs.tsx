import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Clock, DollarSign, Search, Building2 } from "lucide-react";

const Jobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Desenvolvedor Frontend",
      company: "Tech Solutions",
      location: "São Paulo, Brasil",
      type: "Tempo Integral",
      salary: "R$ 5.000 - R$ 8.000",
      description: "Buscamos desenvolvedor React com experiência em TypeScript e Tailwind CSS.",
      tags: ["React", "TypeScript", "Tailwind"],
      posted: "Há 2 dias"
    },
    {
      id: 2,
      title: "Analista de Marketing Digital",
      company: "Marketing Pro",
      location: "Remoto",
      type: "Tempo Integral",
      salary: "R$ 4.000 - R$ 6.000",
      description: "Experiência em campanhas digitais, SEO e análise de métricas.",
      tags: ["SEO", "Google Ads", "Analytics"],
      posted: "Há 3 dias"
    },
    {
      id: 3,
      title: "Designer UI/UX",
      company: "Creative Studio",
      location: "Lisboa, Portugal",
      type: "Freelance",
      salary: "€2.500 - €4.000",
      description: "Designer criativo com portfólio em Figma e experiência em design systems.",
      tags: ["Figma", "UI/UX", "Design System"],
      posted: "Há 5 dias"
    },
    {
      id: 4,
      title: "Analista Financeiro Jr",
      company: "FinanceHub",
      location: "Rio de Janeiro, Brasil",
      type: "Estágio",
      salary: "R$ 1.500 - R$ 2.500",
      description: "Oportunidade para estudantes de economia, administração ou contabilidade.",
      tags: ["Excel", "Finanças", "Análise"],
      posted: "Há 1 semana"
    },
    {
      id: 5,
      title: "Engenheiro de Software",
      company: "Global Tech",
      location: "Nova York, EUA",
      type: "Tempo Integral",
      salary: "$80.000 - $120.000",
      description: "Desenvolvedor full-stack para projetos internacionais. Inglês fluente.",
      tags: ["Node.js", "React", "AWS"],
      posted: "Há 4 dias"
    },
    {
      id: 6,
      title: "Professor de Inglês Online",
      company: "EduOnline",
      location: "Remoto",
      type: "Part-time",
      salary: "R$ 30 - R$ 60/hora",
      description: "Ensine inglês para estudantes de todas as idades. Horários flexíveis.",
      tags: ["Ensino", "Inglês", "Online"],
      posted: "Há 6 dias"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-primary py-12 text-primary-foreground">
          <div className="container">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Oportunidades de Emprego
            </h1>
            <p className="text-lg opacity-90 max-w-2xl">
              Encontre vagas de emprego, estágios e oportunidades freelance em todo o mundo.
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 border-b border-border">
          <div className="container">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por cargo, empresa ou palavra-chave..." 
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Área" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Áreas</SelectItem>
                  <SelectItem value="technology">Tecnologia</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="finance">Finanças</SelectItem>
                  <SelectItem value="education">Educação</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="engineering">Engenharia</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Tipos</SelectItem>
                  <SelectItem value="full-time">Tempo Integral</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="internship">Estágio</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                  <SelectItem value="remote">Remoto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Jobs Listing */}
        <section className="py-12">
          <div className="container">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                Mostrando {jobs.length} oportunidades
              </p>
              <Select defaultValue="recent">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Mais Recentes</SelectItem>
                  <SelectItem value="salary-high">Maior Salário</SelectItem>
                  <SelectItem value="salary-low">Menor Salário</SelectItem>
                  <SelectItem value="company">Empresa A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-6">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-card-hover transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                        <CardDescription className="flex flex-wrap gap-4 text-base">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            {job.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.type}
                          </span>
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="ml-4">
                        {job.posted}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <DollarSign className="h-4 w-4" />
                      {job.salary}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-3">
                    <Button variant="default" className="flex-1">
                      <Briefcase className="mr-2 h-4 w-4" />
                      Candidatar-se
                    </Button>
                    <Button variant="outline">
                      Ver Detalhes
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">
                Carregar Mais Vagas
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Jobs;
