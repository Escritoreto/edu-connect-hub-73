import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, Database } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12 max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">Política de Privacidade</h1>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <p className="text-sm text-muted-foreground">Última atualização: Março de 2026</p>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">1. Introdução</h2>
            <p>A UpMentor compromete-se a proteger a privacidade dos seus utilizadores. Esta política descreve como recolhemos, utilizamos e protegemos as suas informações pessoais.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">2. Dados que Recolhemos</h2>
            <p>Podemos recolher os seguintes tipos de informação:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Dados de registo:</strong> Nome completo, endereço de e-mail, número de telefone e cidade</li>
              <li><strong>Dados de perfil:</strong> Foto de perfil e informações adicionais que o utilizador opte por fornecer</li>
              <li><strong>Dados de utilização:</strong> Páginas visitadas, funcionalidades utilizadas e interações com a plataforma</li>
              <li><strong>Dados de inscrição:</strong> Informações fornecidas ao inscrever-se em cursos ou solicitar bolsas</li>
              <li><strong>Dados de CV:</strong> Informações profissionais e académicas inseridas na ferramenta de criação de currículos</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">3. Como Utilizamos os Dados</h2>
            <p>As informações recolhidas são utilizadas para:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Fornecer e melhorar os nossos serviços</li>
              <li>Processar inscrições em cursos e pedidos de bolsas</li>
              <li>Enviar notificações relevantes sobre oportunidades</li>
              <li>Personalizar a experiência do utilizador</li>
              <li>Garantir a segurança da plataforma</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">4. Partilha de Dados</h2>
            <p>Não vendemos nem partilhamos os seus dados pessoais com terceiros para fins comerciais. Os dados podem ser partilhados apenas:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Com o seu consentimento explícito</li>
              <li>Para cumprir requisitos legais</li>
              <li>Com prestadores de serviços essenciais ao funcionamento da plataforma (ex: processamento de pagamentos)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">5. Armazenamento e Segurança</h2>
            <p>Os seus dados são armazenados em servidores seguros com encriptação. Implementamos medidas técnicas e organizacionais para proteger as informações contra acesso não autorizado, alteração ou destruição.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">6. Retenção de Dados</h2>
            <p>Mantemos os seus dados pessoais enquanto a sua conta estiver activa ou conforme necessário para fornecer os serviços. Solicitações de bolsas e inscrições com mais de 60 dias são automaticamente removidas do sistema.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">7. Os Seus Direitos</h2>
            <p>Você tem o direito de:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Aceder aos seus dados pessoais</li>
              <li>Corrigir dados incorrectos ou desactualizados</li>
              <li>Solicitar a eliminação dos seus dados e conta</li>
              <li>Retirar o consentimento para o processamento de dados</li>
              <li>Descarregar os seus dados em formato portável</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">8. Cookies</h2>
            <p>A plataforma utiliza cookies essenciais para o funcionamento do serviço, como manutenção de sessão e preferências. Não utilizamos cookies de rastreamento para publicidade.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">9. Menores de Idade</h2>
            <p>A plataforma é destinada a utilizadores com idade igual ou superior a 16 anos. Não recolhemos intencionalmente dados de menores sem o consentimento dos pais ou responsáveis legais.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">10. Alterações à Política</h2>
            <p>Esta política pode ser actualizada periodicamente. As alterações serão publicadas nesta página com a data de actualização revista.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">11. Contacto</h2>
            <p>Para exercer os seus direitos ou esclarecer dúvidas sobre privacidade, entre em contacto através da plataforma ou das nossas redes sociais.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
