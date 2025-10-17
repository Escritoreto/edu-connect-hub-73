import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Eye, Briefcase, Target, Layout } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";

const CVBuilder = () => {
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const templates = {
    "first-job": [
      { id: "simple", name: "Simples e Direto", description: "Foco em educação e habilidades" },
      { id: "modern", name: "Moderno", description: "Visual jovem e dinâmico" }
    ],
    "internship": [
      { id: "academic", name: "Acadêmico", description: "Destaca formação e projetos" },
      { id: "simple", name: "Simples", description: "Limpo e profissional" }
    ],
    "job-change": [
      { id: "professional", name: "Profissional", description: "Destaca experiência" },
      { id: "executive", name: "Executivo", description: "Elegante e sofisticado" }
    ],
    "career-change": [
      { id: "skills-focused", name: "Foco em Habilidades", description: "Destaca competências transferíveis" },
      { id: "modern", name: "Moderno", description: "Visual inovador" }
    ],
    "promotion": [
      { id: "professional", name: "Profissional", description: "Corporativo e formal" },
      { id: "achievement", name: "Conquistas", description: "Destaca resultados" }
    ],
    "freelance": [
      { id: "creative", name: "Criativo", description: "Design diferenciado" },
      { id: "portfolio", name: "Portfólio", description: "Destaca projetos" }
    ],
    "scholarship": [
      { id: "academic", name: "Acadêmico", description: "Formato universitário" },
      { id: "research", name: "Pesquisa", description: "Destaca publicações" }
    ],
    "academic": [
      { id: "academic", name: "Acadêmico Completo", description: "CV Lattes style" },
      { id: "research", name: "Pesquisador", description: "Foco em publicações" }
    ]
  };

  const getAvailableTemplates = () => {
    return templates[selectedPurpose as keyof typeof templates] || [];
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-primary py-12 text-primary-foreground">
          <div className="container">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Gerador de Currículo Profissional
            </h1>
            <p className="text-lg opacity-90 max-w-2xl">
              Crie um currículo impressionante em minutos. Modelos profissionais e download gratuito em PDF.
            </p>
          </div>
        </section>

        {/* CV Builder Form */}
        <section className="py-12">
          <div className="container max-w-4xl">
            <div className="bg-card border border-border rounded-xl p-8 shadow-card">
              <div className="flex items-center gap-3 mb-8">
                <FileText className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-bold">Informações do Currículo</h2>
              </div>

              <form className="space-y-8">
                {/* Purpose and Job Type */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Finalidade do Currículo
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                      <Label htmlFor="purpose">Para que você precisa deste currículo?</Label>
                      <Select onValueChange={setSelectedPurpose}>
                        <SelectTrigger id="purpose">
                          <SelectValue placeholder="Selecione a finalidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="first-job">Primeiro Emprego</SelectItem>
                          <SelectItem value="internship">Estágio</SelectItem>
                          <SelectItem value="job-change">Mudança de Emprego</SelectItem>
                          <SelectItem value="career-change">Mudança de Carreira</SelectItem>
                          <SelectItem value="promotion">Promoção Interna</SelectItem>
                          <SelectItem value="freelance">Trabalho Freelance</SelectItem>
                          <SelectItem value="scholarship">Candidatura a Bolsa</SelectItem>
                          <SelectItem value="academic">Programa Acadêmico</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobType">Área/Tipo de Emprego</Label>
                      <Select>
                        <SelectTrigger id="jobType">
                          <SelectValue placeholder="Selecione a área" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Tecnologia e TI</SelectItem>
                          <SelectItem value="marketing">Marketing e Publicidade</SelectItem>
                          <SelectItem value="finance">Finanças e Contabilidade</SelectItem>
                          <SelectItem value="education">Educação e Ensino</SelectItem>
                          <SelectItem value="health">Saúde e Medicina</SelectItem>
                          <SelectItem value="engineering">Engenharia</SelectItem>
                          <SelectItem value="sales">Vendas e Comércio</SelectItem>
                          <SelectItem value="hr">Recursos Humanos</SelectItem>
                          <SelectItem value="design">Design e Criação</SelectItem>
                          <SelectItem value="law">Direito e Advocacia</SelectItem>
                          <SelectItem value="admin">Administração</SelectItem>
                          <SelectItem value="hospitality">Hotelaria e Turismo</SelectItem>
                          <SelectItem value="construction">Construção Civil</SelectItem>
                          <SelectItem value="other">Outra Área</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Template Selection */}
                {selectedPurpose && getAvailableTemplates().length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <Layout className="h-5 w-5 text-primary" />
                      Escolha a Estrutura do Currículo
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {getAvailableTemplates().map((template) => (
                        <Card
                          key={template.id}
                          className={`p-4 cursor-pointer transition-all hover:shadow-elegant border-2 ${
                            selectedTemplate === template.id
                              ? "border-primary bg-primary/5"
                              : "border-border"
                          }`}
                          onClick={() => setSelectedTemplate(template.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 mt-1 flex-shrink-0 ${
                              selectedTemplate === template.id
                                ? "border-primary bg-primary"
                                : "border-muted-foreground"
                            }`}>
                              {selectedTemplate === template.id && (
                                <div className="w-full h-full rounded-full bg-background scale-50" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground mb-1">
                                {template.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {template.description}
                              </p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Dados Pessoais</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nome</Label>
                      <Input id="firstName" placeholder="Seu nome" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Sobrenome</Label>
                      <Input id="lastName" placeholder="Seu sobrenome" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" placeholder="+55 (11) 99999-9999" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="location">Localização</Label>
                      <Input id="location" placeholder="Cidade, Estado, País" />
                    </div>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Resumo Profissional</h3>
                  <div className="space-y-2">
                    <Label htmlFor="summary">Sobre Você</Label>
                    <Textarea 
                      id="summary" 
                      placeholder="Descreva sua experiência, objetivos e principais qualificações..."
                      rows={4}
                    />
                  </div>
                </div>

                {/* Education */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Formação Acadêmica</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="degree">Grau</Label>
                      <Input id="degree" placeholder="Ex: Bacharelado em..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="institution">Instituição</Label>
                      <Input id="institution" placeholder="Nome da universidade" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Data de Início</Label>
                      <Input id="startDate" type="month" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">Data de Conclusão</Label>
                      <Input id="endDate" type="month" />
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Experiência Profissional</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Cargo</Label>
                      <Input id="jobTitle" placeholder="Ex: Analista de Marketing" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Empresa</Label>
                      <Input id="company" placeholder="Nome da empresa" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expStartDate">Data de Início</Label>
                      <Input id="expStartDate" type="month" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expEndDate">Data de Término</Label>
                      <Input id="expEndDate" type="month" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="responsibilities">Responsabilidades</Label>
                      <Textarea 
                        id="responsibilities" 
                        placeholder="Descreva suas principais responsabilidades e conquistas..."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Habilidades</h3>
                  <div className="space-y-2">
                    <Label htmlFor="skills">Suas Habilidades</Label>
                    <Input 
                      id="skills" 
                      placeholder="Ex: Excel, Python, Marketing Digital (separe por vírgula)"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button variant="outline" type="button" className="flex-1">
                    <Eye className="mr-2 h-4 w-4" />
                    Visualizar Prévia
                  </Button>
                  <Button variant="hero" type="submit" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Baixar PDF
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CVBuilder;
