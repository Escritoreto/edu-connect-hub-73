import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, Server, UserCheck, KeyRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const securityFeatures = [
  {
    icon: Lock,
    title: "Encriptação de Dados",
    description: "Todos os dados são transmitidos através de conexões seguras (HTTPS/TLS) e armazenados com encriptação avançada."
  },
  {
    icon: UserCheck,
    title: "Autenticação Segura",
    description: "Verificação de e-mail obrigatória, suporte a Google OAuth e proteção contra acessos não autorizados."
  },
  {
    icon: Shield,
    title: "Controlo de Acesso",
    description: "Políticas de segurança ao nível da base de dados garantem que cada utilizador acede apenas aos seus próprios dados."
  },
  {
    icon: Server,
    title: "Infraestrutura Segura",
    description: "Servidores alojados em centros de dados certificados com monitorização contínua e backups regulares."
  },
  {
    icon: Eye,
    title: "Privacidade por Design",
    description: "Recolhemos apenas os dados estritamente necessários e nunca vendemos informações a terceiros."
  },
  {
    icon: KeyRound,
    title: "Gestão de Sessões",
    description: "Sessões seguras com expiração automática e possibilidade de encerramento remoto."
  }
];

const Security = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
          <div className="container max-w-4xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Segurança na UpMentor</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A proteção dos seus dados é a nossa prioridade. Implementamos múltiplas camadas de segurança para garantir que as suas informações estão sempre protegidas.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container py-16 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="border-border/50 hover:shadow-md transition-shadow">
                <CardContent className="pt-6 space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Practices */}
        <section className="bg-muted/30 py-16">
          <div className="container max-w-4xl space-y-8">
            <h2 className="text-2xl font-bold text-foreground text-center">As Nossas Práticas de Segurança</h2>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Proteção de Palavras-passe</h3>
                <p className="text-muted-foreground">As palavras-passe são processadas com algoritmos de hash seguros e nunca são armazenadas em texto simples. Nem mesmo a nossa equipa consegue aceder às suas credenciais.</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Limpeza Automática de Dados</h3>
                <p className="text-muted-foreground">Solicitações e mensagens antigas são automaticamente removidas após um período definido, reduzindo a exposição de dados pessoais armazenados na plataforma.</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Monitorização Contínua</h3>
                <p className="text-muted-foreground">Os nossos sistemas são monitorizados 24/7 para detectar e responder rapidamente a qualquer actividade suspeita ou tentativa de acesso não autorizado.</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Actualizações Regulares</h3>
                <p className="text-muted-foreground">Mantemos todos os componentes da plataforma actualizados com os últimos patches de segurança para prevenir vulnerabilidades conhecidas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Report */}
        <section className="container py-16 max-w-4xl text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Reportar uma Vulnerabilidade</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Se descobrir uma vulnerabilidade de segurança, pedimos que nos informe de forma responsável através das nossas redes sociais ou e-mail de contacto. Valorizamos e agradecemos a contribuição da comunidade para manter a plataforma segura.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Security;
