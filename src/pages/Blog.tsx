import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const articles = [
  {
    id: 10,
    title: "Novidade: Ideias de Inovação e Negócio na UpMentor",
    excerpt: "Agora podes submeter projetos inovadores e captar apoio financeiro através de doações ou parcerias na plataforma.",
    category: "Novidades",
    date: "3 de Março, 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
  },
  {
    id: 11,
    title: "Crie seu CV e Carta de Motivação com Conta Gratuita",
    excerpt: "Para garantir a segurança dos seus dados, a criação de CV e carta de motivação agora requer uma conta verificada.",
    category: "Novidades",
    date: "3 de Março, 2026",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800",
  },
  {
    id: 12,
    title: "Sistema de Notificações em Tempo Real",
    excerpt: "Receba alertas instantâneos sobre o estado das suas candidaturas, inscrições e mensagens do administrador.",
    category: "Novidades",
    date: "3 de Março, 2026",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800",
  },
  {
    id: 13,
    title: "Perfil Seguro: Proteção dos Seus Dados Pessoais",
    excerpt: "O nome e número de celular no perfil agora são protegidos. Alterações requerem autorização do administrador.",
    category: "Segurança",
    date: "3 de Março, 2026",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800",
  },
  {
    id: 14,
    title: "Avalie a UpMentor e Ajude-nos a Melhorar",
    excerpt: "Agora podes avaliar a plataforma diretamente no teu perfil. A tua opinião ajuda-nos a crescer!",
    category: "Novidades",
    date: "3 de Março, 2026",
    readTime: "2 min",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800",
  },
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
    image: "/assets/blog-financial-education.jpg",
  },
  {
    id: 4,
    title: "Preparação para IELTS e TOEFL: Guia Completo",
    excerpt: "Tudo o que você precisa saber para conquistar a pontuação necessária nos exames de proficiência.",
    category: "Idiomas",
    date: "8 de Janeiro, 2025",
    readTime: "12 min",
    image: "/assets/blog-english-flags.jpg",
  },
  {
    id: 5,
    title: "Os Melhores Destinos para Estudar no Exterior em 2025",
    excerpt: "Conheça os países mais procurados por estudantes internacionais e suas vantagens.",
    category: "Destinos",
    date: "5 de Janeiro, 2025",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
  },
  {
    id: 6,
    title: "Como Criar um CV que Impressiona Universidades",
    excerpt: "Dicas práticas para montar um currículo acadêmico de destaque.",
    category: "Carreira",
    date: "3 de Janeiro, 2025",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800",
  },
  {
    id: 7,
    title: "Vida de Estudante no Exterior: O Que Esperar",
    excerpt: "Experiências reais e conselhos de quem já está vivendo o sonho internacional.",
    category: "Experiências",
    date: "1 de Janeiro, 2025",
    readTime: "11 min",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
  },
  {
    id: 8,
    title: "Entrevista para Bolsas: Como se Preparar",
    excerpt: "Estratégias e respostas para as perguntas mais comuns em entrevistas de seleção.",
    category: "Bolsas",
    date: "28 de Dezembro, 2024",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
  },
  {
    id: 9,
    title: "Documentos Essenciais para Candidatura Internacional",
    excerpt: "Checklist completo de documentos necessários para se candidatar a programas no exterior.",
    category: "Orientação",
    date: "25 de Dezembro, 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
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
                <Link
                  key={article.id}
                  to={`/blog/${article.id}`}
                  className="block"
                >
                  <article
                    className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-elegant transition-all group animate-fade-in cursor-pointer h-full"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative overflow-hidden h-48 bg-muted">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
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

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {article.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {article.readTime}
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </article>
                </Link>
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
