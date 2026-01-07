import { Globe, BookOpen, FileText, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const features = [{
  icon: Globe,
  title: "Bolsas de Estudo Globais",
  description: "Acesse milhares de oportunidades de bolsas em universidades de todo o mundo. Filtros avançados por país, área e nível.",
  link: "/scholarships",
  color: "text-blue-500"
}, {
  icon: BookOpen,
  title: "Cursos Online Certificados",
  description: "Aprenda Inglês, Educação Financeira e muito mais. Cursos gratuitos e pagos com certificado digital.",
  link: "/courses",
  color: "text-purple-500"
}, {
  icon: FileText,
  title: "Gerador de Currículo",
  description: "Crie currículos profissionais em minutos. Modelos modernos e download em PDF para impressionar recrutadores.",
  link: "/cv-builder",
  color: "text-green-500"
}, {
  icon: TrendingUp,
  title: "Desenvolvimento de Carreira",
  description: "Artigos, dicas e orientação especializada para impulsionar seus estudos e crescimento profissional.",
  link: "/blog",
  color: "text-orange-500"
}];
const Features = () => {
  return <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12 space-y-4 animate-fade-in">
          <h2 className="lg:text-5xl font-bold text-foreground text-2xl">
            Tudo que você precisa em um só lugar
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            ​Desenvolva suas competências profissionais,  gere CV em poucos cliques e encontre bolsas de estudo em único lugar                                            
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => <div key={index} className="group relative bg-gradient-card rounded-2xl p-6 border border-border shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{
          animationDelay: `${index * 100}ms`
        }}>
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4 group-hover:scale-110 transition-transform ${feature.color}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              
              <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {feature.description}
              </p>
              
              <Button variant="link" asChild className="p-0 h-auto font-semibold">
                <Link to={feature.link}>
                  Explorar →
                </Link>
              </Button>
            </div>)}
        </div>
      </div>
    </section>;
};
export default Features;