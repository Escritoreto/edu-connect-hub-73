import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Eye, Upload, X, ArrowLeft, ArrowRight, Plus, Trash2, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CVData, CVTemplate, Education, Experience, Language, Certification, Project } from "@/types/cv";
import { languageOptions } from "@/lib/cvTranslations";
import { cvFormTranslations } from "@/lib/cvFormTranslations";
import { TemplateGallery } from "@/components/cv/TemplateGallery";
import { CVPreview } from "@/components/cv/CVPreview";
import { PDFPreview } from "@/components/cv/PDFPreview";
import { ProgressSteps } from "@/components/cv/ProgressSteps";
import { motion, AnimatePresence } from "framer-motion";
import { pdf } from "@react-pdf/renderer";
import { PDFModernTemplate } from "@/components/cv/PDFModernTemplate";
import { PDFModernTemplate2 } from "@/components/cv/PDFModernTemplate2";
import { PDFModernTemplate3 } from "@/components/cv/PDFModernTemplate3";
import { PDFModernTemplate4 } from "@/components/cv/PDFModernTemplate4";
import { PDFClassicTemplate } from "@/components/cv/PDFClassicTemplate";
import { PDFClassicTemplate2 } from "@/components/cv/PDFClassicTemplate2";
import { PDFClassicTemplate3 } from "@/components/cv/PDFClassicTemplate3";
import { PDFClassicTemplate4 } from "@/components/cv/PDFClassicTemplate4";
import { PDFMinimalistTemplate } from "@/components/cv/PDFMinimalistTemplate";
import { PDFMinimalistTemplate2 } from "@/components/cv/PDFMinimalistTemplate2";
import { PDFMinimalistTemplate3 } from "@/components/cv/PDFMinimalistTemplate3";
import { PDFMinimalistTemplate4 } from "@/components/cv/PDFMinimalistTemplate4";
import { toast } from "sonner";

const CVBuilder = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const templateGalleryRef = useRef<HTMLDivElement>(null);
  const previewButtonRef = useRef<HTMLDivElement>(null);
  const [cvData, setCVData] = useState<CVData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+258",
    location: "",
    photoPreview: null,
    summary: "",
    education: [],
    experience: [],
    skills: [],
    languages: [],
    certifications: [],
    projects: [],
    selectedTemplate: "",
    selectedPurpose: "",
    cvLanguage: "pt",
    fontSize: "medium"
  });
  
  const t = cvFormTranslations[cvData.cvLanguage];

  const steps = [
    { number: 1, title: t.personalData, description: t.basicInfo },
    { number: 2, title: t.chooseTemplate, description: t.selectDesign },
    { number: 3, title: t.previewDownload, description: t.reviewAndDownload }
  ];

  const availableTemplates: CVTemplate[] = [
    {
      id: "modern",
      name: "Moderno Azul",
      description: "Design contemporâneo com barra lateral azul",
      preview: new URL('@/assets/cv-preview-modern.jpg', import.meta.url).href
    },
    {
      id: "modern2",
      name: "Moderno Roxo",
      description: "Design contemporâneo com barra lateral roxa",
      preview: new URL('@/assets/cv-preview-modern2.jpg', import.meta.url).href
    },
    {
      id: "modern3",
      name: "Moderno Verde",
      description: "Design contemporâneo com barra lateral verde",
      preview: new URL('@/assets/cv-preview-modern3.jpg', import.meta.url).href
    },
    {
      id: "modern4",
      name: "Moderno Laranja",
      description: "Design contemporâneo com barra lateral laranja",
      preview: new URL('@/assets/cv-preview-modern4.jpg', import.meta.url).href
    },
    {
      id: "classic",
      name: "Clássico Preto",
      description: "Layout tradicional e profissional",
      preview: new URL('@/assets/cv-preview-classic.jpg', import.meta.url).href
    },
    {
      id: "classic2",
      name: "Clássico Azul",
      description: "Layout tradicional com borda azul",
      preview: new URL('@/assets/cv-preview-classic2.jpg', import.meta.url).href
    },
    {
      id: "classic3",
      name: "Clássico Verde",
      description: "Layout tradicional com borda verde",
      preview: new URL('@/assets/cv-preview-classic3.jpg', import.meta.url).href
    },
    {
      id: "classic4",
      name: "Clássico Roxo",
      description: "Layout tradicional com borda roxa",
      preview: new URL('@/assets/cv-preview-classic4.jpg', import.meta.url).href
    },
    {
      id: "minimalist",
      name: "Minimalista Cinza",
      description: "Design limpo e elegante",
      preview: new URL('@/assets/cv-preview-minimalist.jpg', import.meta.url).href
    },
    {
      id: "minimalist2",
      name: "Minimalista Azul",
      description: "Design limpo com detalhes azuis",
      preview: new URL('@/assets/cv-preview-minimalist2.jpg', import.meta.url).href
    },
    {
      id: "minimalist3",
      name: "Minimalista Verde",
      description: "Design limpo com detalhes verdes",
      preview: new URL('@/assets/cv-preview-minimalist3.jpg', import.meta.url).href
    },
    {
      id: "minimalist4",
      name: "Minimalista Roxo",
      description: "Design limpo com detalhes roxos",
      preview: new URL('@/assets/cv-preview-minimalist4.jpg', import.meta.url).href
    }
  ];

  const countryCodes = [
    { code: "+27", country: "África do Sul", flag: "🇿🇦" },
    { code: "+93", country: "Afeganistão", flag: "🇦🇫" },
    { code: "+355", country: "Albânia", flag: "🇦🇱" },
    { code: "+49", country: "Alemanha", flag: "🇩🇪" },
    { code: "+244", country: "Angola", flag: "🇦🇴" },
    { code: "+966", country: "Arábia Saudita", flag: "🇸🇦" },
    { code: "+54", country: "Argentina", flag: "🇦🇷" },
    { code: "+61", country: "Austrália", flag: "🇦🇺" },
    { code: "+43", country: "Áustria", flag: "🇦🇹" },
    { code: "+32", country: "Bélgica", flag: "🇧🇪" },
    { code: "+55", country: "Brasil", flag: "🇧🇷" },
    { code: "+1", country: "Canadá", flag: "🇨🇦" },
    { code: "+56", country: "Chile", flag: "🇨🇱" },
    { code: "+86", country: "China", flag: "🇨🇳" },
    { code: "+57", country: "Colômbia", flag: "🇨🇴" },
    { code: "+82", country: "Coreia do Sul", flag: "🇰🇷" },
    { code: "+506", country: "Costa Rica", flag: "🇨🇷" },
    { code: "+45", country: "Dinamarca", flag: "🇩🇰" },
    { code: "+20", country: "Egito", flag: "🇪🇬" },
    { code: "+971", country: "Emirados Árabes", flag: "🇦🇪" },
    { code: "+34", country: "Espanha", flag: "🇪🇸" },
    { code: "+1", country: "Estados Unidos", flag: "🇺🇸" },
    { code: "+372", country: "Estônia", flag: "🇪🇪" },
    { code: "+63", country: "Filipinas", flag: "🇵🇭" },
    { code: "+358", country: "Finlândia", flag: "🇫🇮" },
    { code: "+33", country: "França", flag: "🇫🇷" },
    { code: "+30", country: "Grécia", flag: "🇬🇷" },
    { code: "+31", country: "Holanda", flag: "🇳🇱" },
    { code: "+852", country: "Hong Kong", flag: "🇭🇰" },
    { code: "+36", country: "Hungria", flag: "🇭🇺" },
    { code: "+91", country: "Índia", flag: "🇮🇳" },
    { code: "+62", country: "Indonésia", flag: "🇮🇩" },
    { code: "+353", country: "Irlanda", flag: "🇮🇪" },
    { code: "+972", country: "Israel", flag: "🇮🇱" },
    { code: "+39", country: "Itália", flag: "🇮🇹" },
    { code: "+81", country: "Japão", flag: "🇯🇵" },
    { code: "+371", country: "Letônia", flag: "🇱🇻" },
    { code: "+370", country: "Lituânia", flag: "🇱🇹" },
    { code: "+352", country: "Luxemburgo", flag: "🇱🇺" },
    { code: "+60", country: "Malásia", flag: "🇲🇾" },
    { code: "+212", country: "Marrocos", flag: "🇲🇦" },
    { code: "+52", country: "México", flag: "🇲🇽" },
    { code: "+258", country: "Moçambique", flag: "🇲🇿" },
    { code: "+234", country: "Nigéria", flag: "🇳🇬" },
    { code: "+47", country: "Noruega", flag: "🇳🇴" },
    { code: "+64", country: "Nova Zelândia", flag: "🇳🇿" },
    { code: "+92", country: "Paquistão", flag: "🇵🇰" },
    { code: "+51", country: "Peru", flag: "🇵🇪" },
    { code: "+48", country: "Polônia", flag: "🇵🇱" },
    { code: "+351", country: "Portugal", flag: "🇵🇹" },
    { code: "+254", country: "Quênia", flag: "🇰🇪" },
    { code: "+44", country: "Reino Unido", flag: "🇬🇧" },
    { code: "+420", country: "República Tcheca", flag: "🇨🇿" },
    { code: "+40", country: "Romênia", flag: "🇷🇴" },
    { code: "+7", country: "Rússia", flag: "🇷🇺" },
    { code: "+65", country: "Singapura", flag: "🇸🇬" },
    { code: "+46", country: "Suécia", flag: "🇸🇪" },
    { code: "+41", country: "Suíça", flag: "🇨🇭" },
    { code: "+66", country: "Tailândia", flag: "🇹🇭" },
    { code: "+886", country: "Taiwan", flag: "🇹🇼" },
    { code: "+90", country: "Turquia", flag: "🇹🇷" },
    { code: "+380", country: "Ucrânia", flag: "🇺🇦" },
    { code: "+598", country: "Uruguai", flag: "🇺🇾" },
    { code: "+84", country: "Vietnã", flag: "🇻🇳" },
  ];

  const professionalSummaries = t.professionalSummaries;
  const academicDegrees = t.academicDegrees;
  const jobTitles = t.jobTitles;
  const responsibilities = t.responsibilities;
  const skillsSuggestions = t.skillSuggestions;

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
  
  const updateField = (field: keyof CVData, value: any) => {
    setCVData({ ...cvData, [field]: value });
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      startDate: "",
      endDate: ""
    };
    setCVData({ ...cvData, education: [...cvData.education, newEducation] });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setCVData({
      ...cvData,
      education: cvData.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const removeEducation = (id: string) => {
    setCVData({
      ...cvData,
      education: cvData.education.filter(edu => edu.id !== id)
    });
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      responsibilities: ""
    };
    setCVData({ ...cvData, experience: [...cvData.experience, newExperience] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setCVData({
      ...cvData,
      experience: cvData.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const removeExperience = (id: string) => {
    setCVData({
      ...cvData,
      experience: cvData.experience.filter(exp => exp.id !== id)
    });
  };

  const addSkill = (skill: string) => {
    if (skill && !cvData.skills.includes(skill)) {
      setCVData({ ...cvData, skills: [...cvData.skills, skill] });
    }
  };

  const removeSkill = (index: number) => {
    setCVData({
      ...cvData,
      skills: cvData.skills.filter((_, i) => i !== index)
    });
  };

  // Language management
  const addLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      name: "",
      level: ""
    };
    setCVData({ ...cvData, languages: [...cvData.languages, newLanguage] });
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    setCVData({
      ...cvData,
      languages: cvData.languages.map(lang =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    });
  };

  const removeLanguage = (id: string) => {
    setCVData({
      ...cvData,
      languages: cvData.languages.filter(lang => lang.id !== id)
    });
  };

  // Certification management
  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: "",
      institution: "",
      date: ""
    };
    setCVData({ ...cvData, certifications: [...cvData.certifications, newCertification] });
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    setCVData({
      ...cvData,
      certifications: cvData.certifications.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    });
  };

  const removeCertification = (id: string) => {
    setCVData({
      ...cvData,
      certifications: cvData.certifications.filter(cert => cert.id !== id)
    });
  };

  // Project management
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      link: ""
    };
    setCVData({ ...cvData, projects: [...cvData.projects, newProject] });
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setCVData({
      ...cvData,
      projects: cvData.projects.map(proj =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    });
  };

  const removeProject = (id: string) => {
    setCVData({
      ...cvData,
      projects: cvData.projects.filter(proj => proj.id !== id)
    });
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
    const goingToStep2 = currentStep === 3;
    setCurrentStep(Math.max(1, currentStep - 1));
    if (goingToStep2) {
      setTimeout(() => {
        templateGalleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleTemplateSelect = (id: string) => {
    updateField('selectedTemplate', id);
    setTimeout(() => {
      previewButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };
  
  const handleDownloadPDF = async () => {
    toast.loading("Gerando PDF...", { id: "pdf-loading" });
    
    try {
      const templateId = cvData.selectedTemplate;
      let pdfComponent;
      
      // Modern templates
      if (templateId === "modern") {
        pdfComponent = <PDFModernTemplate data={cvData} templateId={templateId} />;
      } else if (templateId === "modern2") {
        pdfComponent = <PDFModernTemplate2 data={cvData} />;
      } else if (templateId === "modern3") {
        pdfComponent = <PDFModernTemplate3 data={cvData} />;
      } else if (templateId === "modern4") {
        pdfComponent = <PDFModernTemplate4 data={cvData} />;
      }
      // Classic templates
      else if (templateId === "classic") {
        pdfComponent = <PDFClassicTemplate data={cvData} templateId={templateId} />;
      } else if (templateId === "classic2") {
        pdfComponent = <PDFClassicTemplate2 data={cvData} />;
      } else if (templateId === "classic3") {
        pdfComponent = <PDFClassicTemplate3 data={cvData} />;
      } else if (templateId === "classic4") {
        pdfComponent = <PDFClassicTemplate4 data={cvData} />;
      }
      // Minimalist templates
      else if (templateId === "minimalist") {
        pdfComponent = <PDFMinimalistTemplate data={cvData} templateId={templateId} />;
      } else if (templateId === "minimalist2") {
        pdfComponent = <PDFMinimalistTemplate2 data={cvData} />;
      } else if (templateId === "minimalist3") {
        pdfComponent = <PDFMinimalistTemplate3 data={cvData} />;
      } else if (templateId === "minimalist4") {
        pdfComponent = <PDFMinimalistTemplate4 data={cvData} />;
      } else {
        pdfComponent = <PDFModernTemplate data={cvData} templateId={templateId} />;
      }
      
      const blob = await pdf(pdfComponent).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `CV_${cvData.firstName}_${cvData.lastName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success("PDF baixado com sucesso!", { id: "pdf-loading" });
      
      // Track the download
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        const templateInfo = availableTemplates.find(t => t.id === templateId);
        await supabase.from("cv_downloads").insert({
          user_id: session.user.id,
          template_name: templateInfo?.name || templateId,
          cv_name: `CV_${cvData.firstName}_${cvData.lastName}`,
        } as any);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      const message = error instanceof Error ? error.message : String(error);
      toast.error(`Erro ao gerar PDF: ${message}`, { id: "pdf-loading" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <Card className="max-w-md w-full p-8 text-center space-y-4">
            <FileText className="h-12 w-12 mx-auto text-primary" />
            <h2 className="text-xl font-bold text-foreground">Crie sua conta para continuar</h2>
            <p className="text-muted-foreground text-sm">Para criar seu CV, é necessário ter uma conta. Faça login ou crie uma conta gratuita.</p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => navigate("/auth")}>Criar Conta / Login</Button>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

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
                      <h2 className="text-3xl font-bold">{t.personalData}</h2>
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
                            <span className="text-xs text-muted-foreground">{t.addPhoto}</span>
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
                          <Label htmlFor="firstName">{t.firstName} *</Label>
                          <Input 
                            id="firstName" 
                            placeholder={t.firstNamePlaceholder}
                            value={cvData.firstName}
                            onChange={(e) => updateField('firstName', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">{t.lastName} *</Label>
                          <Input 
                            id="lastName" 
                            placeholder={t.lastNamePlaceholder}
                            value={cvData.lastName}
                            onChange={(e) => updateField('lastName', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{t.emailLabel}</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder={t.emailPlaceholder}
                            value={cvData.email}
                            onChange={(e) => updateField('email', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">{t.phoneLabel}</Label>
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
                            <Input id="phone" placeholder={t.phonePlaceholder} className="flex-1" value={cvData.phone} onChange={(e) => updateField('phone', e.target.value)} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">{t.locationLabel}</Label>
                          <Input 
                            id="location" 
                            placeholder={t.locationPlaceholder}
                            value={cvData.location}
                            onChange={(e) => updateField('location', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvLanguage">{t.cvLanguageLabel}</Label>
                          <Select value={cvData.cvLanguage} onValueChange={(val: "pt" | "en" | "fr" | "zh") => updateField('cvLanguage', val)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {languageOptions.map((lang) => (
                                <SelectItem key={lang.value} value={lang.value}>
                                  {lang.flag} {lang.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="fontSize">{t.fontSizeLabel}</Label>
                          <Select value={cvData.fontSize} onValueChange={(val: "small" | "medium" | "large") => updateField('fontSize', val)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="small">{t.fontSmall}</SelectItem>
                              <SelectItem value="medium">{t.fontMedium}</SelectItem>
                              <SelectItem value="large">{t.fontLarge}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Professional Summary */}
                      <div className="space-y-2">
                        <Label htmlFor="summary">{t.professionalSummary}</Label>
                        <Select onValueChange={(val) => updateField('summary', val)}>
                          <SelectTrigger>
                            <SelectValue placeholder={t.selectSuggestionOrWrite} />
                          </SelectTrigger>
                          <SelectContent>
                            {professionalSummaries.map((summary, idx) => (
                              <SelectItem key={idx} value={summary}>
                                {summary.substring(0, 50)}...
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Textarea 
                          id="summary" 
                          placeholder={t.writeOwnSummary}
                          rows={4}
                          value={cvData.summary}
                          onChange={(e) => updateField('summary', e.target.value)}
                        />
                      </div>

                      {/* Education */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">{t.academicEducation}</h3>
                          <Button type="button" onClick={addEducation} size="sm" variant="outline">
                            <Plus className="h-4 w-4 mr-2" />
                            {t.add}
                          </Button>
                        </div>
                        
                        {cvData.education.map((edu, index) => (
                          <Card key={edu.id} className="p-4 border-2">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-sm">{t.formation} {index + 1}</h4>
                              {cvData.education.length > 1 && (
                                <Button 
                                  type="button" 
                                  onClick={() => removeEducation(edu.id)} 
                                  size="sm" 
                                  variant="ghost"
                                  className="text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>{t.degree}</Label>
                                <Select onValueChange={(val) => updateEducation(edu.id, 'degree', val)}>
                                  <SelectTrigger>
                                    <SelectValue placeholder={t.selectDegree} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {academicDegrees.map((degree, idx) => (
                                      <SelectItem key={idx} value={degree}>
                                        {degree}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Input 
                                  placeholder={t.typeDegree} 
                                  value={edu.degree}
                                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>{t.institution}</Label>
                                <Input 
                                  placeholder={t.universityName} 
                                  value={edu.institution}
                                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Data de Início</Label>
                                <Input 
                                  type="month" 
                                  value={edu.startDate}
                                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>{t.endDate}</Label>
                                <Input 
                                  type="month" 
                                  value={edu.endDate}
                                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                                />
                              </div>
                            </div>
                          </Card>
                        ))}
                        
                        {cvData.education.length === 0 && (
                          <div className="text-center py-8 text-muted-foreground">
                            <p>{t.noEducation}</p>
                          </div>
                        )}
                      </div>

                      {/* Experience */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">{t.professionalExperience}</h3>
                          <Button type="button" onClick={addExperience} size="sm" variant="outline">
                            <Plus className="h-4 w-4 mr-2" />
                            {t.add}
                          </Button>
                        </div>
                        
                        {cvData.experience.map((exp, index) => (
                          <Card key={exp.id} className="p-4 border-2">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-sm">Experiência {index + 1}</h4>
                              {cvData.experience.length > 1 && (
                                <Button 
                                  type="button" 
                                  onClick={() => removeExperience(exp.id)} 
                                  size="sm" 
                                  variant="ghost"
                                  className="text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Cargo</Label>
                                <Select onValueChange={(val) => updateExperience(exp.id, 'jobTitle', val)}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione um cargo" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {jobTitles.map((title, idx) => (
                                      <SelectItem key={idx} value={title}>
                                        {title}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Input 
                                  placeholder="Ou digite o cargo" 
                                  value={exp.jobTitle}
                                  onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Empresa</Label>
                                <Input 
                                  placeholder="Nome da empresa" 
                                  value={exp.company}
                                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>{t.startDate}</Label>
                                <Input 
                                  type="month" 
                                  value={exp.startDate}
                                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>{t.endDate}</Label>
                                <Input 
                                  type="month" 
                                  value={exp.endDate}
                                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2 md:col-span-2">
                                <Label>{t.responsibilitiesLabel}</Label>
                                <Select onValueChange={(val) => updateExperience(exp.id, 'responsibilities', val)}>
                                  <SelectTrigger>
                                    <SelectValue placeholder={t.selectSuggestion} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {responsibilities.map((resp, idx) => (
                                      <SelectItem key={idx} value={resp}>
                                        {resp}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Textarea 
                                  placeholder={t.writeResponsibilities}
                                  rows={3}
                                  value={exp.responsibilities}
                                  onChange={(e) => updateExperience(exp.id, 'responsibilities', e.target.value)}
                                />
                              </div>
                            </div>
                          </Card>
                        ))}
                        
                        {cvData.experience.length === 0 && (
                          <div className="text-center py-8 text-muted-foreground">
                            <p>{t.noExperience}</p>
                          </div>
                        )}
                      </div>

                      {/* Skills */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">Habilidades</h3>
                          <Select onValueChange={addSkill}>
                            <SelectTrigger className="w-[200px]">
                              <SelectValue placeholder="Adicionar habilidade" />
                            </SelectTrigger>
                            <SelectContent>
                              {skillsSuggestions.map((skill, idx) => (
                                <SelectItem key={idx} value={skill}>
                                  {skill}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {cvData.skills.map((skill, index) => (
                            <div 
                              key={index}
                              className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full"
                            >
                              <span className="text-sm">{skill}</span>
                              <button
                                type="button"
                                onClick={() => removeSkill(index)}
                                className="hover:bg-primary/20 rounded-full p-0.5"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                        
                        {cvData.skills.length === 0 && (
                          <div className="text-center py-6 text-muted-foreground text-sm">
                            <p>Nenhuma habilidade adicionada. Selecione da lista acima.</p>
                          </div>
                        )}
                      </div>

                      {/* Languages */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">Idiomas (opcional)</h3>
                          <Button type="button" onClick={addLanguage} size="sm" variant="outline">
                            <Plus className="h-4 w-4 mr-2" />
                            Adicionar
                          </Button>
                        </div>
                        
                        {cvData.languages.map((lang, index) => (
                          <Card key={lang.id} className="p-4 border-2">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-sm">Idioma {index + 1}</h4>
                              <Button 
                                type="button" 
                                onClick={() => removeLanguage(lang.id)} 
                                size="sm" 
                                variant="ghost"
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Idioma</Label>
                                <Input 
                                  placeholder="Ex: Inglês" 
                                  value={lang.name}
                                  onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Nível</Label>
                                <Select 
                                  value={lang.level} 
                                  onValueChange={(val) => updateLanguage(lang.id, 'level', val)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione o nível" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Básico">Básico</SelectItem>
                                    <SelectItem value="Intermediário">Intermediário</SelectItem>
                                    <SelectItem value="Avançado">Avançado</SelectItem>
                                    <SelectItem value="Fluente">Fluente</SelectItem>
                                    <SelectItem value="Nativo">Nativo</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </Card>
                        ))}
                        
                        {cvData.languages.length === 0 && (
                          <div className="text-center py-6 text-muted-foreground text-sm">
                            <p>Nenhum idioma adicionado.</p>
                          </div>
                        )}
                      </div>

                      {/* Certifications */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">Certificações (opcional)</h3>
                          <Button type="button" onClick={addCertification} size="sm" variant="outline">
                            <Plus className="h-4 w-4 mr-2" />
                            Adicionar
                          </Button>
                        </div>
                        
                        {cvData.certifications.map((cert, index) => (
                          <Card key={cert.id} className="p-4 border-2">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-sm">Certificação {index + 1}</h4>
                              <Button 
                                type="button" 
                                onClick={() => removeCertification(cert.id)} 
                                size="sm" 
                                variant="ghost"
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Nome da Certificação</Label>
                                <Input 
                                  placeholder="Ex: AWS Solutions Architect" 
                                  value={cert.name}
                                  onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Instituição</Label>
                                <Input 
                                  placeholder="Ex: Amazon Web Services" 
                                  value={cert.institution}
                                  onChange={(e) => updateCertification(cert.id, 'institution', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Data de Conclusão</Label>
                                <Input 
                                  type="month" 
                                  value={cert.date}
                                  onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                                />
                              </div>
                            </div>
                          </Card>
                        ))}
                        
                        {cvData.certifications.length === 0 && (
                          <div className="text-center py-6 text-muted-foreground text-sm">
                            <p>Nenhuma certificação adicionada.</p>
                          </div>
                        )}
                      </div>

                      {/* Projects */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">{t.projectsTitle} ({t.optional})</h3>
                          <Button type="button" onClick={addProject} size="sm" variant="outline">
                            <Plus className="h-4 w-4 mr-2" />
                            {t.add}
                          </Button>
                        </div>
                        
                        {cvData.projects.map((proj, index) => (
                          <Card key={proj.id} className="p-4 border-2">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-sm">{t.project} {index + 1}</h4>
                              <Button type="button" onClick={() => removeProject(proj.id)} size="sm" variant="ghost" className="text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>{t.projectName}</Label>
                                <Input placeholder={t.projectNameExample} value={proj.name} onChange={(e) => updateProject(proj.id, 'name', e.target.value)} />
                              </div>
                              <div className="space-y-2">
                                <Label>{t.projectLink} ({t.optional})</Label>
                                <Input placeholder={t.projectLinkExample} value={proj.link || ''} onChange={(e) => updateProject(proj.id, 'link', e.target.value)} />
                              </div>
                              <div className="space-y-2 md:col-span-2">
                                <Label>{t.projectDescription}</Label>
                                <Textarea placeholder={t.projectDescExample} rows={2} value={proj.description} onChange={(e) => updateProject(proj.id, 'description', e.target.value)} />
                              </div>
                            </div>
                          </Card>
                        ))}
                        
                        {cvData.projects.length === 0 && (
                          <div className="text-center py-6 text-muted-foreground text-sm">
                            <p>{t.noProjects}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end mt-8">
                      <Button onClick={handleNextStep} size="lg">
                        {t.nextChooseTemplate}
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
                  <div className="mb-8 text-center" ref={templateGalleryRef}>
                    <h2 className="text-3xl font-bold mb-3">{t.chooseTemplateTitle}</h2>
                    <p className="text-muted-foreground">{t.selectDesign}</p>
                  </div>

                  <TemplateGallery 
                    templates={availableTemplates}
                    selectedTemplate={cvData.selectedTemplate}
                    onSelect={handleTemplateSelect}
                  />

                  <div className="flex justify-between mt-12" ref={previewButtonRef}>
                    <Button onClick={handlePreviousStep} variant="outline" size="lg">
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      {t.back}
                    </Button>
                    <Button onClick={handleNextStep} size="lg" disabled={!cvData.selectedTemplate}>
                      {t.previewCV}
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
                    <h2 className="text-3xl font-bold mb-3">{t.cvReady}</h2>
                    <p className="text-muted-foreground">{t.reviewAndDownload}</p>
                  </div>

                  <div className="mb-8">
                    <PDFPreview data={cvData} />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <Button onClick={handlePreviousStep} variant="outline" size="lg">
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      {t.back}
                    </Button>
                    <div className="flex gap-4">
                      <Button onClick={() => setCurrentStep(1)} variant="outline" size="lg">
                        <Eye className="mr-2 h-5 w-5" />
                        {t.editData}
                      </Button>
                      <Button onClick={handleDownloadPDF} size="lg" className="bg-primary">
                        <Download className="mr-2 h-5 w-5" />
                        {t.downloadPDF}
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
