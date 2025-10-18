import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
const Hero = () => {
  return <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMS4xLS45LTItMi0ycy0yIC45LTIgMiAuOSAyIDIgMiAyLS45IDItMnptMCAxMGMwLTEuMS0uOS0yLTItMnMtMiAuOS0yIDIgLjkgMiAyIDIgMi0uOSAyLTJ6bTAgMTBjMC0xLjEtLjktMi0yLTJzLTIgLjktMiAyIC45IDIgMiAyIDItLjkgMi0yem0wIDEwYzAtMS4xLS45LTItMi0ycy0yIC45LTIgMiAuOSAyIDIgMiAyLS45IDItMnpNMTYgMTZjMC0xLjEtLjktMi0yLTJzLTIgLjktMiAyIC45IDIgMiAyIDItLjkgMi0yem0wIDEwYzAtMS4xLS45LTItMi0ycy0yIC45LTIgMiAuOSAyIDIgMiAyLS45IDItMnptMCAxMGMwLTEuMS0uOS0yLTItMnMtMiAuOS0yIDIgLjkgMiAyIDIgMi0uOSAyLTJ6bTAgMTBjMC0xLjEtLjktMi0yLTJzLTIgLjktMiAyIC45IDIgMiAyIDItLjkgMi0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 backdrop-blur-sm border border-primary-foreground/20">
              <Sparkles className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-primary-foreground">Junte-se a nós e acesse as maiores oportunidades nacionais e internacionais </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground leading-tight">Transforme Seu Futuro com UpMentor</h1>
            
            <p className="text-lg text-primary-foreground/90 leading-relaxed">Encontre bolsas, empregos e cursos de inglês e mais em um só lugar. Prepare-se para estudar ou trabalhar no país e no exterior — e crie seu currículo gratuito em segundos.
Tudo isso com apenas alguns cliques!</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" asChild className="text-base group">
                <Link to="/scholarships">
                  Buscar Bolsas
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base bg-background/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-background/20">
                <Link to="/courses">
                  Ver Cursos Gratuitos
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-primary-foreground">10k+</div>
                <div className="text-sm text-primary-foreground/80">Bolsas Disponíveis</div>
              </div>
              <div className="h-12 w-px bg-primary-foreground/20"></div>
              <div>
                <div className="text-3xl font-bold text-primary-foreground">50+</div>
                <div className="text-sm text-primary-foreground/80">Cursos Online</div>
              </div>
              <div className="h-12 w-px bg-primary-foreground/20"></div>
              <div>
                <div className="text-3xl font-bold text-primary-foreground">100k+</div>
                <div className="text-sm text-primary-foreground/80">Estudantes Ativos</div>
              </div>
            </div>
          </div>

          <div className="relative lg:block hidden animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-glow">
              <img src={heroImage} alt="Students celebrating success" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-4 -right-4 bg-background rounded-xl p-4 shadow-card animate-bounce-subtle">
              <div className="text-2xl font-bold text-primary">98%</div>
              <div className="text-xs text-muted-foreground">Taxa de Sucesso</div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-background rounded-xl p-4 shadow-card animate-bounce-subtle" style={{
            animationDelay: "1s"
          }}>
              <div className="text-2xl font-bold text-secondary">4.9★</div>
              <div className="text-xs text-muted-foreground">Avaliação Média</div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;