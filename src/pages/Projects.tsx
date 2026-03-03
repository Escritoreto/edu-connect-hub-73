import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Search, Plus, Rocket, Heart, Users, TrendingUp, Lightbulb, Star } from "lucide-react";

const Projects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false });
    setProjects(data || []);
    setLoading(false);
  };

  const filtered = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.short_description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getProgressPercent = (current: number, goal: number) => 
    goal > 0 ? Math.min((current / goal) * 100, 100) : 0;

  const getSupportLabel = (type: string) => {
    if (type === "donation") return "Doação";
    if (type === "partnership") return "Parceria";
    return "Doação & Parceria";
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(45_100%_65%/0.15),transparent_60%)]" />
        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur mb-6">
            <Rocket className="h-4 w-4 text-secondary" />
            <span className="text-sm text-white font-medium">Empreendedorismo Jovem</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Apoie Ideias que <span className="text-secondary">Transformam</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Descubra projetos inovadores de jovens empreendedores. Apoie como doador ou torne-se parceiro.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {user ? (
              <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold">
                <Link to="/projects/new"><Plus className="h-5 w-5 mr-2" />Publicar Meu Projeto</Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold">
                <Link to="/auth?tab=signup">Criar Conta para Começar</Link>
              </Button>
            )}
            <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              <a href="#education">
                <Lightbulb className="h-5 w-5 mr-2" />Aprender Sobre Investimento
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Pesquisar projetos..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="tecnologia">Tecnologia</SelectItem>
              <SelectItem value="educacao">Educação</SelectItem>
              <SelectItem value="saude">Saúde</SelectItem>
              <SelectItem value="agricultura">Agricultura</SelectItem>
              <SelectItem value="arte">Arte & Cultura</SelectItem>
              <SelectItem value="geral">Geral</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Rocket className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nenhum projeto encontrado</h3>
            <p className="text-muted-foreground">Seja o primeiro a publicar um projeto!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(project => {
              const progress = getProgressPercent(Number(project.current_amount), Number(project.financial_goal));
              return (
                <Link to={`/projects/${project.id}`} key={project.id}>
                  <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full border-border/50 hover:border-primary/30">
                    {project.image_url ? (
                      <div className="h-48 overflow-hidden">
                        <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <Rocket className="h-16 w-16 text-primary/30" />
                      </div>
                    )}
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" className="text-xs">{project.category}</Badge>
                        <Badge variant="outline" className="text-xs">{getSupportLabel(project.support_type)}</Badge>
                      </div>
                      <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{project.short_description || project.description}</p>
                      
                      <div className="space-y-2 pt-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Arrecadado</span>
                          <span className="font-semibold">{Number(project.current_amount).toLocaleString("pt-MZ")} / {Number(project.financial_goal).toLocaleString("pt-MZ")} MT</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <div className="text-xs text-right text-primary font-medium">{progress.toFixed(0)}%</div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <Lightbulb className="h-10 w-10 mx-auto text-secondary mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Educação Financeira</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Entenda os conceitos antes de apoiar um projeto</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center border-primary/20 hover:border-primary/50 transition-colors">
              <Heart className="h-10 w-10 mx-auto text-pink-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">O que é Doação?</h3>
              <p className="text-sm text-muted-foreground">
                Uma contribuição voluntária para ajudar um projeto. Você apoia sem esperar retorno financeiro. É um ato de generosidade e apoio ao empreendedorismo jovem.
              </p>
            </Card>
            <Card className="p-6 text-center border-secondary/20 hover:border-secondary/50 transition-colors">
              <TrendingUp className="h-10 w-10 mx-auto text-green-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">O que é Parceria?</h3>
              <p className="text-sm text-muted-foreground">
                Ao apoiar como parceiro, você adquire uma pequena participação simbólica no projeto. Se o projeto gerar lucros, poderá receber uma parte proporcional ao seu investimento.
              </p>
            </Card>
            <Card className="p-6 text-center border-destructive/20 hover:border-destructive/50 transition-colors">
              <Star className="h-10 w-10 mx-auto text-amber-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">Quais são os riscos?</h3>
              <p className="text-sm text-muted-foreground">
                Todo investimento envolve riscos. Projetos podem não atingir metas ou gerar lucros. Invista apenas o que pode perder. Diversifique seus apoios para reduzir riscos.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
