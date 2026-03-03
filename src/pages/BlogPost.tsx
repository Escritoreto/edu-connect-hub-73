import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const articles = [
  {
    id: 10,
    title: "Novidade: Ideias de Inovação e Negócio na UpMentor",
    excerpt: "Agora podes submeter projetos inovadores e captar apoio financeiro através de doações ou parcerias na plataforma.",
    category: "Novidades",
    date: "3 de Março, 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
    content: `
      <h2>Uma Nova Forma de Financiar as Tuas Ideias</h2>
      <p>A UpMentor lançou a funcionalidade <strong>Ideias de Inovação ou Negócio</strong>, permitindo que qualquer utilizador registado submeta projetos para captação de recursos financeiros.</p>
      
      <h2>Como Funciona?</h2>
      <p>Após criar sua conta, acesse a seção "Projetos" e submeta sua ideia. Os apoiadores podem contribuir de duas formas:</p>
      <ul>
        <li><strong>Doação:</strong> Contribuição sem retorno financeiro, ideal para projetos sociais.</li>
        <li><strong>Parceria:</strong> Participação percentual no negócio, com equity definido pelo criador.</li>
      </ul>
      
      <h2>Acompanhamento em Tempo Real</h2>
      <p>Criadores devem partilhar atualizações regulares sobre o progresso do projeto. Apoiadores recebem notificações automáticas sobre cada novidade.</p>
      
      <h2>Moderação e Segurança</h2>
      <p>Todos os projetos passam por aprovação administrativa antes de serem publicados, garantindo qualidade e confiança na plataforma.</p>
    `,
  },
  {
    id: 11,
    title: "Crie seu CV e Carta de Motivação com Conta Gratuita",
    excerpt: "Para garantir a segurança dos seus dados, a criação de CV e carta de motivação agora requer uma conta verificada.",
    category: "Novidades",
    date: "3 de Março, 2026",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800",
    content: `
      <h2>Segurança em Primeiro Lugar</h2>
      <p>Para proteger os seus dados pessoais e garantir uma experiência segura, a criação de CVs e Cartas de Motivação agora requer uma conta na UpMentor.</p>
      
      <h2>O Que Mudou?</h2>
      <p>Ao aceder ao Criador de CV ou à Carta de Motivação sem estar logado, verá um aviso para criar conta ou fazer login. O processo é rápido e gratuito!</p>
      
      <h2>Benefícios de Ter Conta</h2>
      <ul>
        <li>Histórico dos CVs descarregados no seu perfil</li>
        <li>Dados pré-preenchidos em formulários</li>
        <li>Acesso a todas as funcionalidades da plataforma</li>
        <li>Notificações sobre bolsas e prazos</li>
      </ul>
    `,
  },
  {
    id: 12,
    title: "Sistema de Notificações em Tempo Real",
    excerpt: "Receba alertas instantâneos sobre o estado das suas candidaturas, inscrições e mensagens do administrador.",
    category: "Novidades",
    date: "3 de Março, 2026",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800",
    content: `
      <h2>Nunca Perca uma Atualização</h2>
      <p>O novo sistema de notificações da UpMentor garante que estejas sempre informado sobre tudo o que acontece na tua conta.</p>
      
      <h2>O Que Recebes Notificações?</h2>
      <ul>
        <li>Aprovação ou atualização de candidaturas a bolsas</li>
        <li>Estado das inscrições em cursos</li>
        <li>Mensagens do administrador</li>
        <li>Prazos de candidatura próximos</li>
        <li>Avaliações e projetos</li>
      </ul>
      
      <h2>Limpeza Automática</h2>
      <p>Para manter tudo organizado, as notificações são automaticamente removidas após 7 dias. Clique no sino para ver e gerir as suas notificações.</p>
      
      <h2>Navegação Direta</h2>
      <p>Ao clicar numa notificação, serás levado diretamente para a secção relevante — seja no painel de administração ou no teu perfil.</p>
    `,
  },
  {
    id: 13,
    title: "Perfil Seguro: Proteção dos Seus Dados Pessoais",
    excerpt: "O nome e número de celular no perfil agora são protegidos. Alterações requerem autorização do administrador.",
    category: "Segurança",
    date: "3 de Março, 2026",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800",
    content: `
      <h2>Proteção Reforçada</h2>
      <p>Para prevenir alterações não autorizadas, o nome completo e o número de celular no perfil são agora campos protegidos.</p>
      
      <h2>Como Alterar?</h2>
      <p>Se precisar atualizar o seu nome ou número de celular:</p>
      <ol>
        <li>Envie uma mensagem ao administrador através da secção "Mensagens" no seu perfil</li>
        <li>O administrador irá avaliar e liberar a edição</li>
        <li>Receberá uma notificação quando a edição for liberada</li>
        <li>Aceda ao perfil e faça as alterações necessárias</li>
      </ol>
      
      <h2>Por Que Esta Mudança?</h2>
      <p>Esta medida garante que os dados utilizados em candidaturas e inscrições sejam consistentes e confiáveis.</p>
    `,
  },
  {
    id: 14,
    title: "Avalie a UpMentor e Ajude-nos a Melhorar",
    excerpt: "Agora podes avaliar a plataforma diretamente no teu perfil. A tua opinião ajuda-nos a crescer!",
    category: "Novidades",
    date: "3 de Março, 2026",
    readTime: "2 min",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800",
    content: `
      <h2>A Tua Voz Importa</h2>
      <p>Adicionámos uma secção de avaliações no perfil de cada utilizador. Podes dar a tua nota de 1 a 5 estrelas e deixar um comentário.</p>
      
      <h2>Como Avaliar?</h2>
      <ol>
        <li>Aceda ao seu perfil</li>
        <li>Clique na aba "Avaliação"</li>
        <li>Selecione o número de estrelas</li>
        <li>Escreva o seu comentário</li>
        <li>Clique em "Enviar"</li>
      </ol>
      
      <h2>Moderação</h2>
      <p>Todas as avaliações passam por aprovação do administrador antes de serem publicadas na página inicial, garantindo conteúdo construtivo e respeitoso.</p>
    `,
  },
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
      <p>A preparação para uma bolsa de estudos deve começar com pelo menos 12-18 meses de antecedência.</p>
      
      <h2>2. Mantenha um Excelente Histórico Acadêmico</h2>
      <p>As notas são cruciais. Universidades e organizações que oferecem bolsas buscam estudantes com desempenho acadêmico consistente.</p>
      
      <h2>3. Prepare uma Carta de Motivação Impecável</h2>
      <p>Sua carta de motivação deve ser autêntica, bem estruturada e demonstrar claramente por que você merece a bolsa.</p>
      
      <h2>Conclusão</h2>
      <p>Com dedicação, planejamento e as estratégias certas, você pode conquistar a bolsa dos seus sonhos.</p>
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
      <p>A carta de motivação é sua oportunidade de se apresentar de forma pessoal.</p>
      <h2>Seja Autêntico</h2>
      <p>Evite clichês. Compartilhe experiências reais que moldaram sua trajetória.</p>
      <h2>Personalize Cada Carta</h2>
      <p>Nunca envie a mesma carta para diferentes instituições.</p>
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
      <p>Gerenciar bem suas finanças durante os estudos pode fazer a diferença.</p>
      <h2>Criando um Orçamento</h2>
      <p>Liste todas suas receitas e despesas. Categorize os gastos e identifique onde economizar.</p>
    `,
  },
  {
    id: 4,
    title: "Preparação para IELTS e TOEFL: Guia Completo",
    excerpt: "Tudo o que você precisa saber para conquistar a pontuação necessária.",
    category: "Idiomas",
    date: "8 de Janeiro, 2025",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
    content: `
      <h2>IELTS vs TOEFL: Qual Escolher?</h2>
      <p>Entenda as diferenças entre os dois exames mais populares de proficiência em inglês.</p>
      <h2>Estratégias de Estudo</h2>
      <p>Desenvolva um plano de estudos de 3-6 meses, com prática diária e simulados regulares.</p>
    `,
  },
  {
    id: 5,
    title: "Os Melhores Destinos para Estudar no Exterior em 2025",
    excerpt: "Conheça os países mais procurados por estudantes internacionais.",
    category: "Destinos",
    date: "5 de Janeiro, 2025",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
    content: `
      <h2>Canadá: Qualidade de Vida e Educação</h2>
      <p>O Canadá continua sendo um dos destinos favoritos.</p>
      <h2>Portugal: Proximidade Cultural</h2>
      <p>Para lusófonos, Portugal oferece a vantagem do idioma.</p>
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
      <p>Um bom CV acadêmico deve destacar formação, experiência de pesquisa e atividades extracurriculares.</p>
      <h2>Formatação Profissional</h2>
      <p>Mantenha um design limpo e use nosso CV Builder para criar templates profissionais.</p>
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
      <p>Os primeiros meses podem ser desafiadores. Prepare-se para o choque cultural.</p>
      <h2>Aproveitando Oportunidades</h2>
      <p>Explore estágios, trabalhos part-time e projetos de pesquisa.</p>
    `,
  },
  {
    id: 8,
    title: "Entrevista para Bolsas: Como se Preparar",
    excerpt: "Estratégias e respostas para as perguntas mais comuns em entrevistas.",
    category: "Bolsas",
    date: "28 de Dezembro, 2024",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
    content: `
      <h2>Preparação é Fundamental</h2>
      <p>Pesquise sobre a instituição e pratique respostas para perguntas comuns.</p>
      <h2>Comunicação Efetiva</h2>
      <p>Seja claro, confiante e autêntico. Mostre entusiasmo genuíno.</p>
    `,
  },
  {
    id: 9,
    title: "Documentos Essenciais para Candidatura Internacional",
    excerpt: "Checklist completo de documentos necessários para candidaturas.",
    category: "Orientação",
    date: "25 de Dezembro, 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
    content: `
      <h2>Documentos Acadêmicos</h2>
      <p>Histórico escolar, diplomas, certificados — tudo traduzido e autenticado.</p>
      <h2>Cartas de Recomendação</h2>
      <p>Geralmente 2-3 cartas de professores ou supervisores.</p>
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
