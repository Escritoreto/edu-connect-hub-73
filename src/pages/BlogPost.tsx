import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const articles = [
  {
    id: 1,
    title: "10 Dicas para Conseguir uma Bolsa de Estudos no Exterior",
    excerpt: "Descubra as estratégias essenciais para aumentar suas chances de ser aprovado em bolsas internacionais.",
    category: "Bolsas",
    date: "15 de Janeiro, 2025",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
    content: `
      <h2>Introdução</h2>
      <p>Conquistar uma bolsa de estudos no exterior é o sonho de muitos estudantes. Com planejamento adequado e estratégia, você pode aumentar significativamente suas chances de sucesso.</p>
      
      <h2>1. Comece a Pesquisar Cedo</h2>
      <p>A preparação para uma bolsa de estudos deve começar com pelo menos 12-18 meses de antecedência. Isso permite tempo suficiente para pesquisar oportunidades, preparar documentos e melhorar seu perfil acadêmico.</p>
      
      <h2>2. Mantenha um Excelente Histórico Acadêmico</h2>
      <p>As notas são cruciais. Universidades e organizações que oferecem bolsas buscam estudantes com desempenho acadêmico consistente e destacado.</p>
      
      <h2>3. Desenvolva Experiência Extracurricular</h2>
      <p>Participação em projetos voluntários, pesquisa acadêmica, liderança estudantil e outras atividades demonstram um perfil completo e comprometido.</p>
      
      <h2>4. Aprimore Seu Inglês</h2>
      <p>A proficiência em inglês é fundamental. Invista tempo em cursos preparatórios para TOEFL, IELTS ou outros exames de proficiência.</p>
      
      <h2>5. Prepare uma Carta de Motivação Impecável</h2>
      <p>Sua carta de motivação deve ser autêntica, bem estruturada e demonstrar claramente por que você merece a bolsa e como ela se alinha aos seus objetivos.</p>
      
      <h2>Conclusão</h2>
      <p>Com dedicação, planejamento e as estratégias certas, você pode conquistar a bolsa dos seus sonhos. Comece hoje mesmo!</p>
    `,
  },
  {
    id: 2,
    title: "Como Escrever uma Carta de Motivação Perfeita",
    excerpt: "Aprenda a estrutura e os elementos que fazem uma carta de motivação se destacar das demais.",
    category: "Carreira",
    date: "12 de Janeiro, 2025",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=800",
    content: `
      <h2>A Importância da Carta de Motivação</h2>
      <p>A carta de motivação é sua oportunidade de se apresentar de forma pessoal e mostrar o que vai além do seu histórico acadêmico.</p>
      
      <h2>Estrutura Básica</h2>
      <p>Uma boa carta deve ter: introdução envolvente, desenvolvimento com suas experiências e objetivos, e conclusão forte reforçando seu interesse.</p>
      
      <h2>Seja Autêntico</h2>
      <p>Evite clichês e frases genéricas. Compartilhe experiências reais que moldaram sua trajetória e objetivos.</p>
      
      <h2>Personalize Cada Carta</h2>
      <p>Nunca envie a mesma carta para diferentes instituições. Pesquise sobre cada programa e demonstre conhecimento específico.</p>
    `,
  },
  {
    id: 3,
    title: "Educação Financeira para Estudantes: Por Onde Começar",
    excerpt: "Guia completo sobre como gerenciar suas finanças durante os estudos.",
    category: "Finanças",
    date: "10 de Janeiro, 2025",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
    content: `
      <h2>Por Que Educação Financeira é Essencial</h2>
      <p>Gerenciar bem suas finanças durante os estudos pode fazer a diferença entre aproveitar a experiência ou passar por dificuldades.</p>
      
      <h2>Criando um Orçamento</h2>
      <p>Liste todas suas receitas e despesas. Categorize os gastos e identifique onde é possível economizar.</p>
      
      <h2>Economizando para o Exterior</h2>
      <p>Estudar no exterior requer planejamento financeiro antecipado. Estabeleça metas mensais de economia.</p>
      
      <h2>Investimentos para Estudantes</h2>
      <p>Mesmo com recursos limitados, é possível começar a investir. Conheça opções de baixo risco adequadas para seu perfil.</p>
    `,
  },
  {
    id: 4,
    title: "Preparação para IELTS e TOEFL: Guia Completo",
    excerpt: "Tudo o que você precisa saber para conquistar a pontuação necessária nos exames de proficiência.",
    category: "Idiomas",
    date: "8 de Janeiro, 2025",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
    content: `
      <h2>IELTS vs TOEFL: Qual Escolher?</h2>
      <p>Entenda as diferenças entre os dois exames mais populares de proficiência em inglês e qual se adequa melhor ao seu perfil.</p>
      
      <h2>Estrutura dos Exames</h2>
      <p>Ambos avaliam quatro habilidades: leitura, escrita, audição e conversação. Conheça o formato de cada seção.</p>
      
      <h2>Estratégias de Estudo</h2>
      <p>Desenvolva um plano de estudos de 3-6 meses, com prática diária e simulados regulares.</p>
      
      <h2>Recursos Recomendados</h2>
      <p>Conheça materiais oficiais, aplicativos e cursos que podem ajudar na sua preparação.</p>
    `,
  },
  {
    id: 5,
    title: "Os Melhores Destinos para Estudar no Exterior em 2025",
    excerpt: "Conheça os países mais procurados por estudantes internacionais e suas vantagens.",
    category: "Destinos",
    date: "5 de Janeiro, 2025",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
    content: `
      <h2>Canadá: Qualidade de Vida e Educação</h2>
      <p>O Canadá continua sendo um dos destinos favoritos, com universidades de excelência e programas generosos de bolsas.</p>
      
      <h2>Alemanha: Educação Gratuita</h2>
      <p>Muitas universidades alemãs não cobram mensalidades, tornando-se uma opção acessível para estudantes internacionais.</p>
      
      <h2>Portugal: Proximidade Cultural</h2>
      <p>Para brasileiros, Portugal oferece a vantagem do idioma e acordos educacionais facilitados.</p>
      
      <h2>Austrália: Inovação e Tecnologia</h2>
      <p>Excelente para quem busca programas em áreas de tecnologia e inovação.</p>
    `,
  },
  {
    id: 6,
    title: "Como Criar um CV que Impressiona Universidades",
    excerpt: "Dicas práticas para montar um currículo acadêmico de destaque.",
    category: "Carreira",
    date: "3 de Janeiro, 2025",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800",
    content: `
      <h2>Estrutura do CV Acadêmico</h2>
      <p>Um bom CV acadêmico deve destacar formação, experiência de pesquisa, publicações e atividades extracurriculares relevantes.</p>
      
      <h2>Destaque Suas Conquistas</h2>
      <p>Use números e resultados concretos para demonstrar o impacto das suas atividades e projetos.</p>
      
      <h2>Personalize para Cada Aplicação</h2>
      <p>Adapte seu CV para enfatizar as experiências mais relevantes para cada programa ou bolsa.</p>
      
      <h2>Formatação Profissional</h2>
      <p>Mantenha um design limpo, consistente e fácil de ler. Use nosso CV Builder para criar templates profissionais.</p>
    `,
  },
  {
    id: 7,
    title: "Vida de Estudante no Exterior: O Que Esperar",
    excerpt: "Experiências reais e conselhos de quem já está vivendo o sonho internacional.",
    category: "Experiências",
    date: "1 de Janeiro, 2025",
    readTime: "11 min",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
    content: `
      <h2>Adaptação Cultural</h2>
      <p>Os primeiros meses podem ser desafiadores. Prepare-se para o choque cultural e mantenha a mente aberta.</p>
      
      <h2>Fazendo Amizades</h2>
      <p>Participe de eventos estudantis, clubes e atividades para construir sua rede social no novo país.</p>
      
      <h2>Gerenciando o Orçamento</h2>
      <p>Aprenda a viver com o custo de vida local e encontre maneiras de economizar sem abrir mão da experiência.</p>
      
      <h2>Aproveitando Oportunidades</h2>
      <p>Explore estágios, trabalhos part-time e projetos de pesquisa disponíveis para estudantes internacionais.</p>
    `,
  },
  {
    id: 8,
    title: "Entrevista para Bolsas: Como se Preparar",
    excerpt: "Estratégias e respostas para as perguntas mais comuns em entrevistas de seleção.",
    category: "Bolsas",
    date: "28 de Dezembro, 2024",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
    content: `
      <h2>Preparação é Fundamental</h2>
      <p>Pesquise sobre a instituição, pratique respostas para perguntas comuns e prepare perguntas para fazer aos entrevistadores.</p>
      
      <h2>Perguntas Frequentes</h2>
      <p>"Por que você?", "Quais seus objetivos?", "Como você contribuirá?" - esteja pronto para essas questões.</p>
      
      <h2>Comunicação Efetiva</h2>
      <p>Seja claro, confiante e autêntico. Mostre entusiasmo genuíno pelo programa.</p>
      
      <h2>Linguagem Corporal</h2>
      <p>Mantenha contato visual, postura adequada e gestos naturais durante a entrevista.</p>
    `,
  },
  {
    id: 9,
    title: "Documentos Essenciais para Candidatura Internacional",
    excerpt: "Checklist completo de documentos necessários para se candidatar a programas no exterior.",
    category: "Orientação",
    date: "25 de Dezembro, 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
    content: `
      <h2>Documentos Acadêmicos</h2>
      <p>Histórico escolar, diplomas, certificados de conclusão - tudo devidamente traduzido e autenticado.</p>
      
      <h2>Comprovantes de Proficiência</h2>
      <p>Resultados oficiais de TOEFL, IELTS ou outros exames aceitos pela instituição.</p>
      
      <h2>Cartas de Recomendação</h2>
      <p>Geralmente 2-3 cartas de professores ou supervisores que possam atestar suas qualificações.</p>
      
      <h2>Documentos Pessoais</h2>
      <p>Passaporte válido, fotos, documentos de identificação e comprovantes financeiros quando necessário.</p>
    `,
  },
];

const BlogPost = () => {
  const { id } = useParams();
  const article = articles.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-12">
          <p className="text-center text-muted-foreground">Artigo não encontrado</p>
          <div className="text-center mt-4">
            <Link to="/blog">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Back Button */}
        <div className="container pt-8">
          <Link to="/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Blog
            </Button>
          </Link>
        </div>

        {/* Hero Image */}
        <div className="container py-8">
          <div className="relative overflow-hidden rounded-2xl h-[400px]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <Badge className="bg-primary text-primary-foreground mb-4">
                {article.category}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
                {article.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-white/90">
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
          </div>
        </div>

        {/* Content */}
        <article className="container pb-12">
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-lg dark:prose-invert prose-headings:text-foreground prose-p:text-foreground/80 prose-strong:text-foreground prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-muted/30 py-12">
            <div className="container">
              <h2 className="text-3xl font-bold mb-8">Artigos Relacionados</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    to={`/blog/${related.id}`}
                    className="block group"
                  >
                    <article className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-elegant transition-all h-full">
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={related.image}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      <div className="p-6 space-y-3">
                        <Badge className="bg-primary text-primary-foreground">
                          {related.category}
                        </Badge>
                        
                        <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                          {related.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {related.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {related.readTime}
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
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
