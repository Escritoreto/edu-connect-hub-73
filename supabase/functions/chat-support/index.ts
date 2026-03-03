import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_CONTEXT = `
Você é o assistente virtual da UpMentor, uma plataforma educacional moçambicana que ajuda estudantes a encontrar bolsas de estudo internacionais, cursos, universidades e oportunidades de carreira.

SOBRE O SITE:
- Bolsas de Estudo: Informações sobre bolsas em diversos países como Canadá, Turquia, China, Índia, Arábia Saudita e mais. Inclui bolsas do Banco Islâmico de Desenvolvimento (IsDB).
- Cursos: Cursos de Língua Inglesa (5.480 MT, parcelável em 6 meses), Educação Financeira (gratuito) e Língua Turca (preços variam por instituição).
- Universidades: Informações sobre universidades parceiras em diversos países.
- Criador de CV: Ferramenta para criar currículos profissionais com 12 modelos diferentes. Requer conta gratuita.
- Carta de Motivação: Ferramenta para criar cartas de motivação profissionais com vários templates. Requer conta gratuita.
- Blog: Artigos sobre estudos internacionais, carreiras, novidades da plataforma e desenvolvimento pessoal.
- Ideias de Inovação/Negócio: Os utilizadores podem submeter projetos para captação de recursos financeiros via doação ou parceria (equity). Os projetos passam por aprovação administrativa.

FUNCIONALIDADES PRINCIPAIS:
- Os usuários podem navegar por bolsas, cursos e universidades sem conta
- Para se inscrever em cursos, candidatar-se a bolsas ou criar CVs/Cartas é necessário ter conta
- Usuários logados podem salvar publicações como favoritos
- Sistema de notificações em tempo real (alertas sobre candidaturas, inscrições, mensagens)
- Notificações são automaticamente removidas após 7 dias
- O perfil exibe nome e número de celular, mas estes campos são protegidos — alterações requerem autorização do administrador
- Os utilizadores podem avaliar a plataforma (1-5 estrelas) na aba "Avaliação" do perfil
- Sistema de mensagens para comunicação com o administrador
- Pagamentos: após aprovação de uma inscrição, o utilizador vê os dados bancários (IBAN/M-Pesa), marca como pago e aguarda confirmação do admin

COMO AJUDAR:
1. Responda perguntas sobre bolsas, cursos, universidades, projetos e uso do site
2. Se não souber a resposta ou o usuário quiser falar com uma pessoa, peça o WhatsApp ou email para contato
3. Seja sempre educado, prestativo e conciso
4. Responda em português

Se o usuário quiser contato humano ou mentoria, diga: "Para falar com nossa equipe ou solicitar mentoria, por favor deixe seu WhatsApp ou email que entraremos em contato em breve." O email de contato interno é upmentorone@gmail.com mas NÃO mostre esse email para o usuário.
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SITE_CONTEXT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Muitas solicitações. Tente novamente em alguns segundos." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Serviço temporariamente indisponível." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(JSON.stringify({ error: "Erro ao processar solicitação" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat support error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
