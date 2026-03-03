import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12 max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">Termos de Uso</h1>
        
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <p className="text-sm text-muted-foreground">Última atualização: Março de 2026</p>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">1. Aceitação dos Termos</h2>
            <p>Ao aceder e utilizar a plataforma UpMentor, você concorda com estes Termos de Uso. Se não concordar com algum dos termos aqui apresentados, por favor não utilize os nossos serviços.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">2. Descrição dos Serviços</h2>
            <p>A UpMentor é uma plataforma educacional que oferece:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Informações sobre bolsas de estudo internacionais</li>
              <li>Listagem de universidades parceiras</li>
              <li>Cursos online de idiomas e finanças</li>
              <li>Ferramenta gratuita de criação de currículos (CV)</li>
              <li>Ferramenta de criação de cartas de motivação</li>
              <li>Plataforma de projetos comunitários</li>
              <li>Conteúdo educacional através do blog</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">3. Registo e Conta</h2>
            <p>Para aceder a determinadas funcionalidades, é necessário criar uma conta. Você é responsável por:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Fornecer informações verdadeiras e actualizadas</li>
              <li>Manter a confidencialidade da sua senha</li>
              <li>Todas as actividades realizadas na sua conta</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">4. Uso Aceitável</h2>
            <p>Ao utilizar a plataforma, você concorda em não:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Usar os serviços para fins ilegais ou não autorizados</li>
              <li>Partilhar conteúdo ofensivo, difamatório ou que viole direitos de terceiros</li>
              <li>Tentar aceder a áreas restritas da plataforma sem autorização</li>
              <li>Reproduzir ou distribuir conteúdo da plataforma sem permissão</li>
              <li>Criar contas falsas ou utilizar identidades fictícias</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">5. Pagamentos e Inscrições</h2>
            <p>Alguns serviços da plataforma podem requerer pagamento. Ao realizar uma inscrição paga:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Os preços são apresentados em Meticais (MZN) ou na moeda indicada</li>
              <li>O pagamento deve ser confirmado para activar o serviço</li>
              <li>Reembolsos são analisados caso a caso, conforme a política vigente</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">6. Propriedade Intelectual</h2>
            <p>Todo o conteúdo da plataforma, incluindo textos, imagens, logótipos e design, é propriedade da UpMentor ou dos seus respectivos autores e está protegido por direitos de autor.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">7. Limitação de Responsabilidade</h2>
            <p>A UpMentor não garante a exactidão ou actualidade de todas as informações sobre bolsas e universidades, uma vez que estas podem ser alteradas pelas instituições a qualquer momento. A plataforma não se responsabiliza por decisões tomadas com base nas informações fornecidas.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">8. Encerramento de Conta</h2>
            <p>A UpMentor reserva-se o direito de suspender ou encerrar contas que violem estes termos, sem aviso prévio. O utilizador também pode solicitar o encerramento da sua conta a qualquer momento.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">9. Alterações aos Termos</h2>
            <p>Estes termos podem ser actualizados periodicamente. As alterações entram em vigor após publicação na plataforma. O uso continuado dos serviços constitui aceitação dos termos revistos.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">10. Contacto</h2>
            <p>Para questões relacionadas com estes termos, entre em contacto através da plataforma ou das nossas redes sociais.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfUse;
