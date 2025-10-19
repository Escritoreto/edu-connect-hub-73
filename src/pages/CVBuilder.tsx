import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Eye, Upload, X, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CVData, CVTemplate } from "@/types/cv";
import { TemplateGallery } from "@/components/cv/TemplateGallery";
import { CVPreview } from "@/components/cv/CVPreview";
import { ProgressSteps } from "@/components/cv/ProgressSteps";
import { motion, AnimatePresence } from "framer-motion";
import html2pdf from "html2pdf.js";
import { toast } from "sonner";

const CVBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [cvData, setCVData] = useState<CVData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+55",
    location: "",
    photoPreview: null,
    summary: "",
    degree: "",
    institution: "",
    startDate: "",
    endDate: "",
    jobTitle: "",
    company: "",
    expStartDate: "",
    expEndDate: "",
    responsibilities: "",
    skills: "",
    selectedTemplate: "",
    selectedPurpose: ""
  });
  
  const steps = [
    { number: 1, title: "Dados Pessoais", description: "Informações básicas" },
    { number: 2, title: "Escolher Modelo", description: "Selecione o design" },
    { number: 3, title: "Visualizar e Baixar", description: "Finalize seu CV" }
  ];

  const availableTemplates: CVTemplate[] = [
    {
      id: "modern",
      name: "Moderno",
      description: "Design contemporâneo com barra lateral colorida",
      preview: "/placeholder.svg"
    },
    {
      id: "classic",
      name: "Clássico",
      description: "Layout tradicional e profissional",
      preview: "/placeholder.svg"
    },
    {
      id: "minimalist",
      name: "Minimalista",
      description: "Design limpo e elegante",
      preview: "/placeholder.svg"
    }
  ];

  const countryCodes = [
    { code: "+93", country: "Afeganistão", flag: "🇦🇫" },
    { code: "+355", country: "Albânia", flag: "🇦🇱" },
    { code: "+49", country: "Alemanha", flag: "🇩🇪" },
    { code: "+55", country: "Brasil", flag: "🇧🇷" },
    { code: "+1", country: "Canadá", flag: "🇨🇦" },
    { code: "+86", country: "China", flag: "🇨🇳" },
    { code: "+34", country: "Espanha", flag: "🇪🇸" },
    { code: "+1", country: "Estados Unidos", flag: "🇺🇸" },
    { code: "+33", country: "França", flag: "🇫🇷" },
    { code: "+39", country: "Itália", flag: "🇮🇹" },
    { code: "+81", country: "Japão", flag: "🇯🇵" },
    { code: "+52", country: "México", flag: "🇲🇽" },
    { code: "+351", country: "Portugal", flag: "🇵🇹" },
    { code: "+44", country: "Reino Unido", flag: "🇬🇧" },
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCVData({ ...cvData, photoPreview: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setCVData({ ...cvData, photoPreview: null });
  };
  
  const updateField = (field: keyof CVData, value: string) => {
    setCVData({ ...cvData, [field]: value });
  };
  
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!cvData.firstName || !cvData.lastName) {
        toast.error("Por favor, preencha pelo menos seu nome completo");
        return;
      }
    }
    if (currentStep === 2 && !cvData.selectedTemplate) {
      toast.error("Por favor, selecione um modelo");
      return;
    }
    setCurrentStep(Math.min(3, currentStep + 1));
  };
  
  const handlePreviousStep = () => {
    setCurrentStep(Math.max(1, currentStep - 1));
  };
  
  const handleDownloadPDF = () => {
    const element = document.getElementById('cv-preview');
    if (!element) {
      toast.error("Erro ao gerar PDF");
      return;
    }
    
    const opt = {
      margin: 0,
      filename: `CV_${cvData.firstName}_${cvData.lastName}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
    };
    
    toast.promise(
      html2pdf().set(opt).from(element).save(),
      {
        loading: 'Gerando PDF...',
        success: 'PDF baixado com sucesso!',
        error: 'Erro ao gerar PDF'
      }
    );
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

        {/* Progress Steps */}
        <section className="py-8 bg-muted/30">
          <div className="container">
            <ProgressSteps currentStep={currentStep} steps={steps} />
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container max-w-6xl">
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Data */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="max-w-4xl mx-auto"
                >
                  <Card className="p-8 shadow-lg">
                    <div className="flex items-center gap-3 mb-8">
                      <FileText className="h-8 w-8 text-primary" />
                      <h2 className="text-3xl font-bold">Dados Pessoais</h2>
                    </div>

                    <div className="space-y-8">
                      {/* Photo Upload */}
                      <div className="flex justify-center">
                        {cvData.photoPreview ? (
                          <div className="relative">
                            <Avatar className="h-32 w-32">
                              <AvatarImage src={cvData.photoPreview} alt="Preview" />
                              <AvatarFallback>Foto</AvatarFallback>
                            </Avatar>
                            <button
                              type="button"
                              onClick={removePhoto}
                              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-2 hover:bg-destructive/90"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-border rounded-full cursor-pointer hover:border-primary transition-colors">
                            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                            <span className="text-xs text-muted-foreground">Adicionar Foto</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePhotoUpload}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>

                      {/* Basic Info */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Nome *</Label>
                          <Input 
                            id="firstName" 
                            placeholder="Seu nome" 
                            value={cvData.firstName}
                            onChange={(e) => updateField('firstName', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Sobrenome *</Label>
                          <Input 
                            id="lastName" 
                            placeholder="Seu sobrenome" 
                            value={cvData.lastName}
                            onChange={(e) => updateField('lastName', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">E-mail</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="seu@email.com" 
                            value={cvData.email}
                            onChange={(e) => updateField('email', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefone</Label>
                          <div className="flex gap-2">
                            <Select value={cvData.countryCode} onValueChange={(val) => updateField('countryCode', val)}>
                              <SelectTrigger className="w-[140px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="max-h-[300px]">
                                {countryCodes.map((item) => (
                                  <SelectItem key={item.code + item.country} value={item.code}>
                                    {item.flag} {item.code}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Input 
                              id="phone" 
                              placeholder="(11) 99999-9999" 
                              className="flex-1" 
                              value={cvData.phone}
                              onChange={(e) => updateField('phone', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="location">Localização</Label>
                          <Input 
                            id="location" 
                            placeholder="Cidade, Estado, País" 
                            value={cvData.location}
                            onChange={(e) => updateField('location', e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Professional Summary */}
                      <div className="space-y-2">
                        <Label htmlFor="summary">Resumo Profissional</Label>
                        <Textarea 
                          id="summary" 
                          placeholder="Descreva sua experiência, objetivos e principais qualificações..."
                          rows={4}
                          value={cvData.summary}
                          onChange={(e) => updateField('summary', e.target.value)}
                        />
                      </div>

                      {/* Education */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Formação Acadêmica</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="degree">Grau</Label>
                            <Input 
                              id="degree" 
                              placeholder="Ex: Bacharelado em..." 
                              value={cvData.degree}
                              onChange={(e) => updateField('degree', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="institution">Instituição</Label>
                            <Input 
                              id="institution" 
                              placeholder="Nome da universidade" 
                              value={cvData.institution}
                              onChange={(e) => updateField('institution', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="startDate">Data de Início</Label>
                            <Input 
                              id="startDate" 
                              type="month" 
                              value={cvData.startDate}
                              onChange={(e) => updateField('startDate', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="endDate">Data de Conclusão</Label>
                            <Input 
                              id="endDate" 
                              type="month" 
                              value={cvData.endDate}
                              onChange={(e) => updateField('endDate', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Experience */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Experiência Profissional</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="jobTitle">Cargo</Label>
                            <Input 
                              id="jobTitle" 
                              placeholder="Ex: Analista de Marketing" 
                              value={cvData.jobTitle}
                              onChange={(e) => updateField('jobTitle', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company">Empresa</Label>
                            <Input 
                              id="company" 
                              placeholder="Nome da empresa" 
                              value={cvData.company}
                              onChange={(e) => updateField('company', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="expStartDate">Data de Início</Label>
                            <Input 
                              id="expStartDate" 
                              type="month" 
                              value={cvData.expStartDate}
                              onChange={(e) => updateField('expStartDate', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="expEndDate">Data de Término</Label>
                            <Input 
                              id="expEndDate" 
                              type="month" 
                              value={cvData.expEndDate}
                              onChange={(e) => updateField('expEndDate', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="responsibilities">Responsabilidades</Label>
                            <Textarea 
                              id="responsibilities" 
                              placeholder="Descreva suas principais responsabilidades e conquistas..."
                              rows={3}
                              value={cvData.responsibilities}
                              onChange={(e) => updateField('responsibilities', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="space-y-2">
                        <Label htmlFor="skills">Habilidades</Label>
                        <Input 
                          id="skills" 
                          placeholder="Ex: Excel, Python, Marketing Digital (separe por vírgula)"
                          value={cvData.skills}
                          onChange={(e) => updateField('skills', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end mt-8">
                      <Button onClick={handleNextStep} size="lg">
                        Próximo: Escolher Modelo
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Step 2: Template Selection */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold mb-3">Escolha o Modelo do seu CV</h2>
                    <p className="text-muted-foreground">Selecione o design que melhor representa você</p>
                  </div>

                  <TemplateGallery 
                    templates={availableTemplates}
                    selectedTemplate={cvData.selectedTemplate}
                    onSelect={(id) => updateField('selectedTemplate', id)}
                  />

                  <div className="flex justify-between mt-12">
                    <Button onClick={handlePreviousStep} variant="outline" size="lg">
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Voltar
                    </Button>
                    <Button onClick={handleNextStep} size="lg" disabled={!cvData.selectedTemplate}>
                      Visualizar CV
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Preview and Download */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold mb-3">Seu Currículo está Pronto!</h2>
                    <p className="text-muted-foreground">Revise e baixe em PDF</p>
                  </div>

                  <div className="bg-muted/30 p-8 rounded-xl mb-8">
                    <CVPreview data={cvData} />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <Button onClick={handlePreviousStep} variant="outline" size="lg">
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Voltar
                    </Button>
                    <div className="flex gap-4">
                      <Button onClick={() => setCurrentStep(1)} variant="outline" size="lg">
                        <Eye className="mr-2 h-5 w-5" />
                        Editar Dados
                      </Button>
                      <Button onClick={handleDownloadPDF} size="lg" className="bg-primary">
                        <Download className="mr-2 h-5 w-5" />
                        Baixar PDF
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CVBuilder;
