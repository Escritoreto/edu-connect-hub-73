import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Eye, Briefcase, Target, Layout, Upload, X } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const CVBuilder = () => {
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState("+55");

  const countryCodes = [
    { code: "+93", country: "Afeganistão", flag: "🇦🇫" },
    { code: "+355", country: "Albânia", flag: "🇦🇱" },
    { code: "+49", country: "Alemanha", flag: "🇩🇪" },
    { code: "+376", country: "Andorra", flag: "🇦🇩" },
    { code: "+244", country: "Angola", flag: "🇦🇴" },
    { code: "+54", country: "Argentina", flag: "🇦🇷" },
    { code: "+374", country: "Armênia", flag: "🇦🇲" },
    { code: "+61", country: "Austrália", flag: "🇦🇺" },
    { code: "+43", country: "Áustria", flag: "🇦🇹" },
    { code: "+994", country: "Azerbaijão", flag: "🇦🇿" },
    { code: "+973", country: "Bahrein", flag: "🇧🇭" },
    { code: "+880", country: "Bangladesh", flag: "🇧🇩" },
    { code: "+32", country: "Bélgica", flag: "🇧🇪" },
    { code: "+501", country: "Belize", flag: "🇧🇿" },
    { code: "+375", country: "Bielorrússia", flag: "🇧🇾" },
    { code: "+591", country: "Bolívia", flag: "🇧🇴" },
    { code: "+387", country: "Bósnia", flag: "🇧🇦" },
    { code: "+267", country: "Botswana", flag: "🇧🇼" },
    { code: "+55", country: "Brasil", flag: "🇧🇷" },
    { code: "+359", country: "Bulgária", flag: "🇧🇬" },
    { code: "+226", country: "Burkina Faso", flag: "🇧🇫" },
    { code: "+257", country: "Burundi", flag: "🇧🇮" },
    { code: "+238", country: "Cabo Verde", flag: "🇨🇻" },
    { code: "+855", country: "Camboja", flag: "🇰🇭" },
    { code: "+237", country: "Camarões", flag: "🇨🇲" },
    { code: "+1", country: "Canadá", flag: "🇨🇦" },
    { code: "+235", country: "Chade", flag: "🇹🇩" },
    { code: "+56", country: "Chile", flag: "🇨🇱" },
    { code: "+86", country: "China", flag: "🇨🇳" },
    { code: "+357", country: "Chipre", flag: "🇨🇾" },
    { code: "+57", country: "Colômbia", flag: "🇨🇴" },
    { code: "+269", country: "Comores", flag: "🇰🇲" },
    { code: "+242", country: "Congo", flag: "🇨🇬" },
    { code: "+850", country: "Coreia do Norte", flag: "🇰🇵" },
    { code: "+82", country: "Coreia do Sul", flag: "🇰🇷" },
    { code: "+225", country: "Costa do Marfim", flag: "🇨🇮" },
    { code: "+506", country: "Costa Rica", flag: "🇨🇷" },
    { code: "+385", country: "Croácia", flag: "🇭🇷" },
    { code: "+53", country: "Cuba", flag: "🇨🇺" },
    { code: "+45", country: "Dinamarca", flag: "🇩🇰" },
    { code: "+253", country: "Djibuti", flag: "🇩🇯" },
    { code: "+20", country: "Egito", flag: "🇪🇬" },
    { code: "+503", country: "El Salvador", flag: "🇸🇻" },
    { code: "+971", country: "Emirados Árabes", flag: "🇦🇪" },
    { code: "+593", country: "Equador", flag: "🇪🇨" },
    { code: "+291", country: "Eritreia", flag: "🇪🇷" },
    { code: "+421", country: "Eslováquia", flag: "🇸🇰" },
    { code: "+386", country: "Eslovênia", flag: "🇸🇮" },
    { code: "+34", country: "Espanha", flag: "🇪🇸" },
    { code: "+1", country: "Estados Unidos", flag: "🇺🇸" },
    { code: "+372", country: "Estônia", flag: "🇪🇪" },
    { code: "+251", country: "Etiópia", flag: "🇪🇹" },
    { code: "+63", country: "Filipinas", flag: "🇵🇭" },
    { code: "+358", country: "Finlândia", flag: "🇫🇮" },
    { code: "+33", country: "França", flag: "🇫🇷" },
    { code: "+241", country: "Gabão", flag: "🇬🇦" },
    { code: "+220", country: "Gâmbia", flag: "🇬🇲" },
    { code: "+233", country: "Gana", flag: "🇬🇭" },
    { code: "+995", country: "Geórgia", flag: "🇬🇪" },
    { code: "+350", country: "Gibraltar", flag: "🇬🇮" },
    { code: "+30", country: "Grécia", flag: "🇬🇷" },
    { code: "+502", country: "Guatemala", flag: "🇬🇹" },
    { code: "+592", country: "Guiana", flag: "🇬🇾" },
    { code: "+224", country: "Guiné", flag: "🇬🇳" },
    { code: "+245", country: "Guiné-Bissau", flag: "🇬🇼" },
    { code: "+240", country: "Guiné Equatorial", flag: "🇬🇶" },
    { code: "+509", country: "Haiti", flag: "🇭🇹" },
    { code: "+504", country: "Honduras", flag: "🇭🇳" },
    { code: "+852", country: "Hong Kong", flag: "🇭🇰" },
    { code: "+36", country: "Hungria", flag: "🇭🇺" },
    { code: "+967", country: "Iêmen", flag: "🇾🇪" },
    { code: "+91", country: "Índia", flag: "🇮🇳" },
    { code: "+62", country: "Indonésia", flag: "🇮🇩" },
    { code: "+98", country: "Irã", flag: "🇮🇷" },
    { code: "+964", country: "Iraque", flag: "🇮🇶" },
    { code: "+353", country: "Irlanda", flag: "🇮🇪" },
    { code: "+354", country: "Islândia", flag: "🇮🇸" },
    { code: "+972", country: "Israel", flag: "🇮🇱" },
    { code: "+39", country: "Itália", flag: "🇮🇹" },
    { code: "+81", country: "Japão", flag: "🇯🇵" },
    { code: "+962", country: "Jordânia", flag: "🇯🇴" },
    { code: "+254", country: "Quênia", flag: "🇰🇪" },
    { code: "+965", country: "Kuwait", flag: "🇰🇼" },
    { code: "+856", country: "Laos", flag: "🇱🇦" },
    { code: "+371", country: "Letônia", flag: "🇱🇻" },
    { code: "+961", country: "Líbano", flag: "🇱🇧" },
    { code: "+231", country: "Libéria", flag: "🇱🇷" },
    { code: "+218", country: "Líbia", flag: "🇱🇾" },
    { code: "+370", country: "Lituânia", flag: "🇱🇹" },
    { code: "+352", country: "Luxemburgo", flag: "🇱🇺" },
    { code: "+389", country: "Macedônia", flag: "🇲🇰" },
    { code: "+261", country: "Madagascar", flag: "🇲🇬" },
    { code: "+60", country: "Malásia", flag: "🇲🇾" },
    { code: "+265", country: "Malawi", flag: "🇲🇼" },
    { code: "+960", country: "Maldivas", flag: "🇲🇻" },
    { code: "+223", country: "Mali", flag: "🇲🇱" },
    { code: "+356", country: "Malta", flag: "🇲🇹" },
    { code: "+212", country: "Marrocos", flag: "🇲🇦" },
    { code: "+230", country: "Maurício", flag: "🇲🇺" },
    { code: "+222", country: "Mauritânia", flag: "🇲🇷" },
    { code: "+52", country: "México", flag: "🇲🇽" },
    { code: "+95", country: "Mianmar", flag: "🇲🇲" },
    { code: "+258", country: "Moçambique", flag: "🇲🇿" },
    { code: "+373", country: "Moldávia", flag: "🇲🇩" },
    { code: "+377", country: "Mônaco", flag: "🇲🇨" },
    { code: "+976", country: "Mongólia", flag: "🇲🇳" },
    { code: "+382", country: "Montenegro", flag: "🇲🇪" },
    { code: "+264", country: "Namíbia", flag: "🇳🇦" },
    { code: "+977", country: "Nepal", flag: "🇳🇵" },
    { code: "+505", country: "Nicarágua", flag: "🇳🇮" },
    { code: "+227", country: "Níger", flag: "🇳🇪" },
    { code: "+234", country: "Nigéria", flag: "🇳🇬" },
    { code: "+47", country: "Noruega", flag: "🇳🇴" },
    { code: "+64", country: "Nova Zelândia", flag: "🇳🇿" },
    { code: "+968", country: "Omã", flag: "🇴🇲" },
    { code: "+31", country: "Países Baixos", flag: "🇳🇱" },
    { code: "+92", country: "Paquistão", flag: "🇵🇰" },
    { code: "+507", country: "Panamá", flag: "🇵🇦" },
    { code: "+675", country: "Papua Nova Guiné", flag: "🇵🇬" },
    { code: "+595", country: "Paraguai", flag: "🇵🇾" },
    { code: "+51", country: "Peru", flag: "🇵🇪" },
    { code: "+48", country: "Polônia", flag: "🇵🇱" },
    { code: "+351", country: "Portugal", flag: "🇵🇹" },
    { code: "+974", country: "Catar", flag: "🇶🇦" },
    { code: "+44", country: "Reino Unido", flag: "🇬🇧" },
    { code: "+236", country: "República Centro-Africana", flag: "🇨🇫" },
    { code: "+420", country: "República Tcheca", flag: "🇨🇿" },
    { code: "+243", country: "Rep. Dem. do Congo", flag: "🇨🇩" },
    { code: "+40", country: "Romênia", flag: "🇷🇴" },
    { code: "+250", country: "Ruanda", flag: "🇷🇼" },
    { code: "+7", country: "Rússia", flag: "🇷🇺" },
    { code: "+685", country: "Samoa", flag: "🇼🇸" },
    { code: "+378", country: "San Marino", flag: "🇸🇲" },
    { code: "+239", country: "São Tomé e Príncipe", flag: "🇸🇹" },
    { code: "+221", country: "Senegal", flag: "🇸🇳" },
    { code: "+381", country: "Sérvia", flag: "🇷🇸" },
    { code: "+248", country: "Seychelles", flag: "🇸🇨" },
    { code: "+232", country: "Serra Leoa", flag: "🇸🇱" },
    { code: "+65", country: "Singapura", flag: "🇸🇬" },
    { code: "+963", country: "Síria", flag: "🇸🇾" },
    { code: "+252", country: "Somália", flag: "🇸🇴" },
    { code: "+94", country: "Sri Lanka", flag: "🇱🇰" },
    { code: "+268", country: "Suazilândia", flag: "🇸🇿" },
    { code: "+249", country: "Sudão", flag: "🇸🇩" },
    { code: "+211", country: "Sudão do Sul", flag: "🇸🇸" },
    { code: "+46", country: "Suécia", flag: "🇸🇪" },
    { code: "+41", country: "Suíça", flag: "🇨🇭" },
    { code: "+597", country: "Suriname", flag: "🇸🇷" },
    { code: "+66", country: "Tailândia", flag: "🇹🇭" },
    { code: "+886", country: "Taiwan", flag: "🇹🇼" },
    { code: "+255", country: "Tanzânia", flag: "🇹🇿" },
    { code: "+670", country: "Timor-Leste", flag: "🇹🇱" },
    { code: "+228", country: "Togo", flag: "🇹🇬" },
    { code: "+676", country: "Tonga", flag: "🇹🇴" },
    { code: "+216", country: "Tunísia", flag: "🇹🇳" },
    { code: "+90", country: "Turquia", flag: "🇹🇷" },
    { code: "+380", country: "Ucrânia", flag: "🇺🇦" },
    { code: "+256", country: "Uganda", flag: "🇺🇬" },
    { code: "+598", country: "Uruguai", flag: "🇺🇾" },
    { code: "+998", country: "Uzbequistão", flag: "🇺🇿" },
    { code: "+678", country: "Vanuatu", flag: "🇻🇺" },
    { code: "+58", country: "Venezuela", flag: "🇻🇪" },
    { code: "+84", country: "Vietnã", flag: "🇻🇳" },
    { code: "+260", country: "Zâmbia", flag: "🇿🇲" },
    { code: "+263", country: "Zimbábue", flag: "🇿🇼" },
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
  };

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
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Dados Pessoais</h3>
                    
                    {/* Photo Upload - Top Right */}
                    <div className="flex flex-col items-end gap-2">
                      <Label className="text-sm">Foto (Opcional)</Label>
                      {photoPreview ? (
                        <div className="relative">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src={photoPreview} alt="Preview" />
                            <AvatarFallback>Foto</AvatarFallback>
                          </Avatar>
                          <button
                            type="button"
                            onClick={removePhoto}
                            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                          <Upload className="h-6 w-6 text-muted-foreground mb-1" />
                          <span className="text-xs text-muted-foreground">Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

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
                      <div className="flex gap-2">
                        <Select value={countryCode} onValueChange={setCountryCode}>
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px]">
                            {countryCodes.map((item) => (
                              <SelectItem key={item.code} value={item.code}>
                                {item.flag} {item.code}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input id="phone" placeholder="(11) 99999-9999" className="flex-1" />
                      </div>
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
