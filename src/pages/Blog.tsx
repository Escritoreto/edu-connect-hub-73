import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "10 Dicas para Conseguir uma Bolsa de Estudos no Exterior",
    excerpt: "Descubra as estratégias essenciais para aumentar suas chances de ser aprovado em bolsas internacionais.",
    category: "Bolsas",
    date: "15 de Janeiro, 2025",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
  },
  {
    id: 2,
    title: "Como Escrever uma Carta de Motivação Perfeita",
    excerpt: "Aprenda a estrutura e os elementos que fazem uma carta de motivação se destacar das demais.",
    category: "Carreira",
    date: "12 de Janeiro, 2025",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=800",
  },
  {
    id: 3,
    title: "Educação Financeira para Estudantes: Por Onde Começar",
    excerpt: "Guia completo sobre como gerenciar suas finanças durante os estudos.",
    category: "Finanças",
    date: "10 de Janeiro, 2025",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-primary py-16 text-primary-foreground">
          <div className="container">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Blog & Recursos
            </h1>
            <p className="text-lg opacity-90 max-w-2xl">
              Artigos, dicas e guias para acelerar sua jornada acadêmica e profissional.
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <article
                  key={article.id}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-elegant transition-all group animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">
                        {article.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h2 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {article.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.readTime}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
