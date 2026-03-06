import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/PageHeader";
import headerCV from "@/assets/header-cv.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { FileText, Download, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { MotivationLetterData, MotivationLetterTemplate } from "@/types/motivationLetter";
import { languageOptions } from "@/lib/cvTranslations";
import { getLetterSuggestions } from "@/lib/motivationLetterSuggestions";
import { ProgressSteps } from "@/components/cv/ProgressSteps";
import { motion, AnimatePresence } from "framer-motion";
import { pdf } from "@react-pdf/renderer";
import { PDFLetterTemplate } from "@/components/motivation/PDFLetterTemplate";
import { toast } from "sonner";

const templates: MotivationLetterTemplate[] = [
  { id: "formal-blue", name: "Formal Azul", description: "Estilo profissional com detalhes em azul", color: "#2563eb" },
  { id: "elegant-green", name: "Elegante Verde", description: "Design elegante com detalhes em verde", color: "#16a34a" },
  { id: "classic-black", name: "Clássico Preto", description: "Estilo clássico e sóbrio", color: "#1a1a1a" },
  { id: "modern-purple", name: "Moderno Roxo", description: "Design moderno com detalhes em roxo", color: "#7c3aed" },
];

const MotivationLetter = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [letterData, setLetterData] = useState<MotivationLetterData>({
    fullName: "",
    email: "",
    phone: "",
    countryCode: "+258",
    address: "",
    city: "",
    date: new Date().toLocaleDateString("pt-BR"),
    recipientName: "",
    recipientTitle: "",
    companyName: "",
    companyAddress: "",
    subject: "",
    greeting: "",
    introduction: "",
    body: "",
    conclusion: "",
    closing: "",
    selectedTemplate: "",
    letterLanguage: "pt",
    letterPurpose: "job",
  });

  const suggestions = getLetterSuggestions(letterData.letterLanguage);
  const labels = suggestions.formLabels;

  const steps = [
    { number: 1, title: labels.personalInfo, description: labels.recipientInfo },
    { number: 2, title: labels.letterContent, description: labels.selectSuggestion },
    { number: 3, title: labels.chooseTemplate, description: labels.preview },
  ];

  const updateField = (field: keyof MotivationLetterData, value: string) => {
    setLetterData({ ...letterData, [field]: value });
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !letterData.fullName) {
      toast.error("Por favor, preencha o seu nome completo");
      return;
    }
    setCurrentStep(Math.min(3, currentStep + 1));
  };

  const handlePreviousStep = () => {
    setCurrentStep(Math.max(1, currentStep - 1));
  };

  const handleDownloadPDF = async () => {
    toast.loading("Gerando PDF...", { id: "pdf-loading" });
    try {
      const template = templates.find(t => t.id === letterData.selectedTemplate);
      const color = template?.color || "#2563eb";
      const blob = await pdf(<PDFLetterTemplate data={letterData} color={color} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Carta_Motivacao_${letterData.fullName.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      // Track download in cv_downloads table
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        await supabase.from("cv_downloads").insert({
          user_id: session.user.id,
          template_name: template?.name || "Carta de Motivação",
          cv_name: `Carta_Motivacao_${letterData.fullName.replace(/\s+/g, "_")}`,
        });
      }
      toast.success("PDF baixado com sucesso!", { id: "pdf-loading" });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Erro ao gerar PDF", { id: "pdf-loading" });
    }
  };

  const purposeOptions = [
    { value: "job", label: labels.purposeJob },
    { value: "scholarship", label: labels.purposeScholarship },
    { value: "university", label: labels.purposeUniversity },
    { value: "internship", label: labels.purposeInternship },
    { value: "general", label: labels.purposeGeneral },
  ];

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
            <p className="text-muted-foreground text-sm">Para criar sua carta de motivação, é necessário ter uma conta. Faça login ou crie uma conta gratuita.</p>
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
        <PageHeader
          title="Gerador de Carta de Motivação"
          description="Crie uma carta de motivação profissional em minutos. Modelos elegantes e download gratuito em PDF."
          backgroundImage={headerCV}
        />

        <section className="py-8 bg-muted/30">
          <div className="container">
            <ProgressSteps currentStep={currentStep} steps={steps} />
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-4xl">
            <AnimatePresence mode="wait">
              {/* Step 1: Personal & Recipient Info */}
              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <Card className="p-8 shadow-lg">
                    <div className="flex items-center gap-3 mb-8">
                      <FileText className="h-8 w-8 text-primary" />
                      <h2 className="text-3xl font-bold">{labels.personalInfo}</h2>
                    </div>

                    {/* Language & Purpose at top */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-2">
                        <Label>{labels.language}</Label>
                        <Select value={letterData.letterLanguage} onValueChange={(val: any) => updateField("letterLanguage", val)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {languageOptions.map((lang) => (
                              <SelectItem key={lang.value} value={lang.value}>{lang.flag} {lang.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>{labels.purpose}</Label>
                        <Select value={letterData.letterPurpose} onValueChange={(val: any) => updateField("letterPurpose", val)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {purposeOptions.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-2">
                        <Label>{labels.fullName} *</Label>
                        <Input value={letterData.fullName} onChange={(e) => updateField("fullName", e.target.value)} placeholder={labels.fullName} />
                      </div>
                      <div className="space-y-2">
                        <Label>{labels.email}</Label>
                        <Input type="email" value={letterData.email} onChange={(e) => updateField("email", e.target.value)} placeholder={labels.email} />
                      </div>
                      <div className="space-y-2">
                        <Label>{labels.phone}</Label>
                        <Input value={letterData.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder={labels.phone} />
                      </div>
                      <div className="space-y-2">
                        <Label>{labels.city}</Label>
                        <Input value={letterData.city} onChange={(e) => updateField("city", e.target.value)} placeholder={labels.city} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>{labels.address}</Label>
                        <Input value={letterData.address} onChange={(e) => updateField("address", e.target.value)} placeholder={labels.address} />
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-4 mt-6">{labels.recipientInfo}</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>{labels.recipientName}</Label>
                        <Input value={letterData.recipientName} onChange={(e) => updateField("recipientName", e.target.value)} placeholder={labels.recipientName} />
                      </div>
                      <div className="space-y-2">
                        <Label>{labels.recipientTitle}</Label>
                        <Input value={letterData.recipientTitle} onChange={(e) => updateField("recipientTitle", e.target.value)} placeholder={labels.recipientTitle} />
                      </div>
                      <div className="space-y-2">
                        <Label>{labels.companyName}</Label>
                        <Input value={letterData.companyName} onChange={(e) => updateField("companyName", e.target.value)} placeholder={labels.companyName} />
                      </div>
                      <div className="space-y-2">
                        <Label>{labels.companyAddress}</Label>
                        <Input value={letterData.companyAddress} onChange={(e) => updateField("companyAddress", e.target.value)} placeholder={labels.companyAddress} />
                      </div>
                    </div>

                    <div className="flex justify-end mt-8">
                      <Button onClick={handleNextStep} className="gap-2">
                        {labels.next} <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Step 2: Letter Content */}
              {currentStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <Card className="p-8 shadow-lg">
                    <div className="flex items-center gap-3 mb-8">
                      <FileText className="h-8 w-8 text-primary" />
                      <h2 className="text-3xl font-bold">{labels.letterContent}</h2>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label>{labels.subject}</Label>
                        <Input value={letterData.subject} onChange={(e) => updateField("subject", e.target.value)} placeholder={labels.subject} />
                        {suggestions.subjects[letterData.letterPurpose]?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {suggestions.subjects[letterData.letterPurpose].map((s, i) => (
                              <button key={i} type="button" onClick={() => updateField("subject", s)} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                {s}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>{labels.greeting}</Label>
                        <Input value={letterData.greeting} onChange={(e) => updateField("greeting", e.target.value)} placeholder={labels.greeting} />
                        <div className="flex flex-wrap gap-2 mt-2">
                          {suggestions.greetings.map((g, i) => (
                            <button key={i} type="button" onClick={() => updateField("greeting", g)} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                              {g}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>{labels.introduction}</Label>
                        <Textarea rows={4} value={letterData.introduction} onChange={(e) => updateField("introduction", e.target.value)} placeholder={labels.selectSuggestion} />
                        {suggestions.introductions[letterData.letterPurpose]?.length > 0 && (
                          <div className="space-y-2 mt-2">
                            {suggestions.introductions[letterData.letterPurpose].map((s, i) => (
                              <button key={i} type="button" onClick={() => updateField("introduction", s)} className="w-full text-left text-xs p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-muted-foreground">
                                {s.substring(0, 120)}...
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>{labels.body}</Label>
                        <Textarea rows={6} value={letterData.body} onChange={(e) => updateField("body", e.target.value)} placeholder={labels.selectSuggestion} />
                        {suggestions.bodies[letterData.letterPurpose]?.length > 0 && (
                          <div className="space-y-2 mt-2">
                            {suggestions.bodies[letterData.letterPurpose].map((s, i) => (
                              <button key={i} type="button" onClick={() => updateField("body", s)} className="w-full text-left text-xs p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-muted-foreground">
                                {s.substring(0, 120)}...
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>{labels.conclusion}</Label>
                        <Textarea rows={3} value={letterData.conclusion} onChange={(e) => updateField("conclusion", e.target.value)} placeholder={labels.selectSuggestion} />
                        {suggestions.conclusions[letterData.letterPurpose]?.length > 0 && (
                          <div className="space-y-2 mt-2">
                            {suggestions.conclusions[letterData.letterPurpose].map((s, i) => (
                              <button key={i} type="button" onClick={() => updateField("conclusion", s)} className="w-full text-left text-xs p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-muted-foreground">
                                {s.substring(0, 120)}...
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>{labels.closing}</Label>
                        <Input value={letterData.closing} onChange={(e) => updateField("closing", e.target.value)} placeholder={labels.closing} />
                        <div className="flex flex-wrap gap-2 mt-2">
                          {suggestions.closings.map((c, i) => (
                            <button key={i} type="button" onClick={() => updateField("closing", c)} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button variant="outline" onClick={handlePreviousStep} className="gap-2">
                        <ArrowLeft className="h-4 w-4" /> {labels.back}
                      </Button>
                      <Button onClick={handleNextStep} className="gap-2">
                        {labels.next} <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Step 3: Choose Template & Download */}
              {currentStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <Card className="p-8 shadow-lg">
                    <div className="flex items-center gap-3 mb-8">
                      <FileText className="h-8 w-8 text-primary" />
                      <h2 className="text-3xl font-bold">{labels.chooseTemplate}</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      {templates.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => updateField("selectedTemplate", t.id)}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            letterData.selectedTemplate === t.id
                              ? "border-primary bg-primary/5 shadow-lg"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="w-full h-4 rounded-full mb-3" style={{ backgroundColor: t.color }} />
                          <p className="font-semibold text-sm">{t.name}</p>
                          <p className="text-xs text-muted-foreground">{t.description}</p>
                        </button>
                      ))}
                    </div>

                    {/* Letter Preview */}
                    <div className="bg-white border rounded-xl p-8 mb-8 shadow-inner max-w-2xl mx-auto" style={{ minHeight: 400 }}>
                      <div className="space-y-4 text-sm text-gray-800">
                        <div>
                          <p className="font-bold text-lg" style={{ color: templates.find(t => t.id === letterData.selectedTemplate)?.color || "#2563eb" }}>
                            {letterData.fullName || "Seu Nome"}
                          </p>
                          {letterData.email && <p className="text-gray-500 text-xs">{letterData.email}</p>}
                          {letterData.phone && <p className="text-gray-500 text-xs">{letterData.countryCode} {letterData.phone}</p>}
                          {letterData.city && <p className="text-gray-500 text-xs">{letterData.city}</p>}
                        </div>
                        <hr style={{ borderColor: templates.find(t => t.id === letterData.selectedTemplate)?.color || "#2563eb" }} />
                        {letterData.date && <p className="text-right text-xs text-gray-500">{letterData.date}</p>}
                        {letterData.recipientName && <p className="text-xs">{letterData.recipientName}</p>}
                        {letterData.companyName && <p className="text-xs">{letterData.companyName}</p>}
                        {letterData.subject && (
                          <p className="font-semibold mt-4" style={{ color: templates.find(t => t.id === letterData.selectedTemplate)?.color || "#2563eb" }}>
                            {letterData.subject}
                          </p>
                        )}
                        {letterData.greeting && <p className="mt-4">{letterData.greeting}</p>}
                        {letterData.introduction && <p className="mt-2 text-justify">{letterData.introduction}</p>}
                        {letterData.body && <p className="text-justify">{letterData.body}</p>}
                        {letterData.conclusion && <p className="text-justify">{letterData.conclusion}</p>}
                        {letterData.closing && <p className="mt-6">{letterData.closing}</p>}
                        <p className="font-bold" style={{ color: templates.find(t => t.id === letterData.selectedTemplate)?.color || "#2563eb" }}>
                          {letterData.fullName}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={handlePreviousStep} className="gap-2">
                        <ArrowLeft className="h-4 w-4" /> {labels.back}
                      </Button>
                      <Button
                        onClick={handleDownloadPDF}
                        disabled={!letterData.selectedTemplate}
                        className="gap-2"
                      >
                        <Download className="h-4 w-4" /> {labels.download}
                      </Button>
                    </div>
                  </Card>
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

export default MotivationLetter;
