import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_CONTEXT = `
Você é o assistente virtual do EduAssist, uma plataforma educacional moçambicana que ajuda estudantes a encontrar bolsas de estudo internacionais e cursos.

SOBRE O SITE:
- Bolsas de Estudo: Oferecemos informações sobre bolsas em diversos países como Canadá, Turquia, China, Índia, Arábia Saudita e mais. Incluímos bolsas do Banco Islâmico de Desenvolvimento (IsDB).
- Cursos: Oferecemos cursos de Língua Inglesa (5.480 MT, parcelável em 6 meses), Educação Financeira (gratuito) e Língua Turca (preços variam por instituição).
- Criador de CV: Ferramenta gratuita para criar currículos profissionais com 12 modelos diferentes.
- Blog: Artigos sobre estudos internacionais, carreiras e desenvolvimento pessoal.

FUNCIONALIDADES:
- Os usuários podem navegar por bolsas sem precisar de conta
- Usuários logados podem salvar bolsas como favoritos
- O criador de CV permite exportar em PDF
- Não oferecemos vagas de emprego no momento

COMO AJUDAR:
1. Responda perguntas sobre bolsas, cursos e uso do site
2. Se não souber a resposta ou o usuário quiser falar com uma pessoa, peça o WhatsApp ou email para contato
3. Seja sempre educado, prestativo e conciso
4. Responda em português

Se o usuário quiser contato humano, diga: "Para falar com nossa equipe, por favor deixe seu WhatsApp ou email que entraremos em contato em breve."
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
