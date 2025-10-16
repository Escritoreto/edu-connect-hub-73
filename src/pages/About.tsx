import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Target, Users, Award, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-primary py-16 text-primary-foreground">
          <div className="container">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Sobre o UpMentor
            </h1>
            <p className="text-lg opacity-90 max-w-2xl">
              Conectando estudantes a oportunidades globais desde 2020.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <div className="space-y-12">
              <div className="text-center space-y-4 animate-fade-in">
                <h2 className="text-3xl font-bold">Nossa Missão</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Democratizar o acesso à educação global, oferecendo as ferramentas e recursos necessários para que estudantes de todo o mundo possam alcançar seus sonhos acadêmicos e profissionais.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Target, title: "Foco no Aluno", description: "Cada recurso é pensado para facilitar sua jornada" },
                  { icon: Users, title: "Comunidade Global", description: "Mais de 100 mil estudantes em 150 países" },
                  { icon: Award, title: "Qualidade Garantida", description: "Conteúdos verificados e certificados" },
                  { icon: Heart, title: "Paixão por Educar", description: "Comprometidos com seu sucesso" },
                ].map((value, index) => (
                  <div 
                    key={index} 
                    className="bg-card border border-border rounded-xl p-6 text-center space-y-3 hover:shadow-card transition-all animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mx-auto">
                      <value.icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-semibold">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-muted/30">
          <div className="container text-center space-y-6">
            <h2 className="text-3xl font-bold">Quer Saber Mais?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Entre em contato conosco. Estamos aqui para ajudar você a conquistar seus objetivos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:contato@upmentor.com" className="text-primary hover:underline font-medium">
                contato@upmentor.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
