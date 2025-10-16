import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Maria Silva",
    role: "Estudante na Universidade de Cambridge",
    image: "https://i.pravatar.cc/150?img=1",
    quote: "O UpMentor mudou minha vida! Consegui minha bolsa para Cambridge e ainda aprendi inglês avançado aqui na plataforma.",
  },
  {
    name: "João Santos",
    role: "Bolsista na Universidade de Toronto",
    image: "https://i.pravatar.cc/150?img=3",
    quote: "Plataforma incrível! Encontrei várias bolsas e o suporte foi fundamental para minha aprovação no Canadá.",
  },
  {
    name: "Ana Costa",
    role: "Estudante de Mestrado na Alemanha",
    image: "https://i.pravatar.cc/150?img=5",
    quote: "O curso de educação financeira me ajudou muito a me preparar para viver no exterior. Recomendo demais!",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />
        <Features />

        {/* Featured Scholarships */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-2">
                  Bolsas em Destaque
                </h2>
                <p className="text-muted-foreground">
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

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Fulbright - EUA", country: "Estados Unidos", value: "Cobertura Total", deadline: "Out 2025" },
                { title: "Chevening - UK", country: "Reino Unido", value: "Cobertura Total", deadline: "Nov 2025" },
                { title: "DAAD - Alemanha", country: "Alemanha", value: "€850/mês", deadline: "Set 2025" },
              ].map((scholarship, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-card transition-all group animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4">
                    <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">
                      {scholarship.value}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {scholarship.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {scholarship.country}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Prazo: {scholarship.deadline}</span>
                    <Button variant="link" size="sm" asChild className="p-0">
                      <Link to="/scholarships">Ver mais →</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Histórias de Sucesso
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Milhares de estudantes já transformaram suas vidas com o UpMentor
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 space-y-4 hover:shadow-card transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Quote className="h-8 w-8 text-primary opacity-50" />
                  <p className="text-muted-foreground leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary text-primary-foreground">
          <div className="container text-center space-y-6">
            <h2 className="text-3xl lg:text-5xl font-bold">
              Pronto para Transformar Seu Futuro?
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Junte-se a milhares de estudantes que estão conquistando o mundo com o UpMentor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="secondary" asChild className="text-base">
                <Link to="/signup">
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="text-base bg-background/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-background/20"
              >
                <Link to="/scholarships">
                  Buscar Bolsas
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
