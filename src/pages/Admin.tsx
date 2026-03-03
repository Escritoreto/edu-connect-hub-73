import { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Users, Eye, BookOpen, FileText, Shield, LogOut, Home, GraduationCap, MessageSquare, Download, Banknote, Settings, Lightbulb, Star } from "lucide-react";
import EnrollmentsManager from "@/components/admin/EnrollmentsManager";
import PublicationsManager from "@/components/admin/PublicationsManager";
import ScholarshipRequestsManager from "@/components/admin/ScholarshipRequestsManager";
import { UsersManager } from "@/components/admin/UsersManager";
import { MessagesPanel } from "@/components/MessagesPanel";
import { NotificationBell } from "@/components/NotificationBell";
import PaymentSettingsManager from "@/components/admin/PaymentSettingsManager";
import SiteSettingsManager from "@/components/admin/SiteSettingsManager";
import { ProjectsManager } from "@/components/admin/ProjectsManager";
import ReviewsManager from "@/components/admin/ReviewsManager";

const Admin = () => {
  const { user, loading: authLoading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stats, setStats] = useState({ users: 0, totalViews: 0, cvDownloads: 0 });
  const [tabBadges, setTabBadges] = useState<Record<string, number>>({});

  // Basic Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [category, setCategory] = useState<string>("");
  const [country, setCountry] = useState("");
  const [area, setArea] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [universityLogo, setUniversityLogo] = useState("");
  const [countryFlag, setCountryFlag] = useState("");
  const [externalLink, setExternalLink] = useState("");
  
  // File states for uploads
  const [countryFlagFile, setCountryFlagFile] = useState<File | null>(null);
  const [universityLogoFile, setUniversityLogoFile] = useState<File | null>(null);
  const [deadline, setDeadline] = useState("");
  const [value, setValue] = useState("");
  
  // Scholarship specific fields
  const [scholarshipType, setScholarshipType] = useState("");
  const [studyLevel, setStudyLevel] = useState("");
  const [status, setStatus] = useState("Aberta");
  const [isFeatured, setIsFeatured] = useState(false);
  const [requirements, setRequirements] = useState("");
  
  // JSON fields (as text, will be parsed)
  const [benefits, setBenefits] = useState("");
  const [importantDates, setImportantDates] = useState("");
  const [vacanciesByCountry, setVacanciesByCountry] = useState("");
  
  // Country info fields
  const [countryAdvantages, setCountryAdvantages] = useState("");
  const [countryGastronomy, setCountryGastronomy] = useState("");
  const [countryCulture, setCountryCulture] = useState("");
  const [countryTourism, setCountryTourism] = useState("");
  const [countryEducation, setCountryEducation] = useState("");

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin-login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchStats();
      fetchTabBadges();
    }
  }, [isAdmin]);

  const fetchTabBadges = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("notifications")
      .select("title, link")
      .eq("user_id", user.id)
      .eq("is_read", false)
      .like("link", "/admin%");
    if (data) {
      const counts: Record<string, number> = {};
      data.forEach((n) => {
        if (n.title.includes("inscrição em curso")) counts.enrollments = (counts.enrollments || 0) + 1;
        else if (n.title.includes("candidatura a bolsa")) counts.scholarships = (counts.scholarships || 0) + 1;
        else if (n.title.includes("usuário registrado")) counts.users = (counts.users || 0) + 1;
        else if (n.title.includes("mensagem")) counts.messages = (counts.messages || 0) + 1;
        else if (n.title.includes("avaliação")) counts.reviews = (counts.reviews || 0) + 1;
        else if (n.title.includes("projeto")) counts.projects = (counts.projects || 0) + 1;
      });
      setTabBadges(counts);
    }
  };

  const fetchStats = async () => {
    const { data: usersCount } = await supabase.rpc("get_registered_users_count");
    
    const { data: publications } = await supabase
      .from("publications")
      .select("views_count");
    
    const totalViews = publications?.reduce((acc, pub) => acc + (pub.views_count || 0), 0) || 0;

    const { count: cvCount } = await supabase
      .from("cv_downloads")
      .select("*", { count: "exact", head: true });

    setStats({
      users: usersCount || 0,
      totalViews,
      cvDownloads: cvCount || 0,
    });
  };

  const parseJSONField = (field: string) => {
    if (!field.trim()) return null;
    try {
      return JSON.parse(field);
    } catch {
      toast({
        title: "Erro de formato JSON",
        description: "Verifique o formato dos campos JSON",
        variant: "destructive",
      });
      return null;
    }
  };

  const uploadImage = async (file: File, bucket: string, folder: string): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Math.random()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (uploadError) {
      toast({
        title: "Erro no upload",
        description: uploadError.message,
        variant: "destructive",
      });
      return null;
    }

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Upload images if files are selected
    let countryFlagUrl = countryFlag;
    let universityLogoUrl = universityLogo;

    if (countryFlagFile) {
      const uploadedUrl = await uploadImage(countryFlagFile, 'country-flags', 'flags');
      if (uploadedUrl) countryFlagUrl = uploadedUrl;
      else {
        setIsSubmitting(false);
        return;
      }
    }

    if (universityLogoFile) {
      const uploadedUrl = await uploadImage(universityLogoFile, 'university-logos', 'logos');
      if (uploadedUrl) universityLogoUrl = uploadedUrl;
      else {
        setIsSubmitting(false);
        return;
      }
    }

    // Build country_info object
    const countryInfo = (countryAdvantages || countryGastronomy || countryCulture || countryTourism || countryEducation) 
      ? {
          advantages: countryAdvantages || undefined,
          gastronomy: countryGastronomy || undefined,
          culture: countryCulture || undefined,
          tourism: countryTourism || undefined,
          education: countryEducation || undefined,
        }
      : null;

    const publicationData: any = {
      title,
      description,
      short_description: shortDescription || null,
      category: category as "scholarship" | "job" | "course" | "university",
      country: country || null,
      area: area || null,
      image_url: imageUrl || null,
      university_logo: universityLogoUrl || null,
      external_link: externalLink || null,
      deadline: deadline || null,
      value: value || null,
      scholarship_type: scholarshipType || null,
      study_level: studyLevel || null,
      status: status || "Aberta",
      is_featured: isFeatured,
      requirements: requirements || null,
      created_by: user?.id || null,
    };

    // Parse and add JSON fields
    if (benefits) {
      const parsedBenefits = parseJSONField(benefits);
      if (parsedBenefits === null && benefits.trim()) {
        setIsSubmitting(false);
        return;
      }
      publicationData.benefits = parsedBenefits;
    }

    if (importantDates) {
      const parsedDates = parseJSONField(importantDates);
      if (parsedDates === null && importantDates.trim()) {
        setIsSubmitting(false);
        return;
      }
      publicationData.important_dates = parsedDates;
    }

    if (vacanciesByCountry) {
      const parsedVacancies = parseJSONField(vacanciesByCountry);
      if (parsedVacancies === null && vacanciesByCountry.trim()) {
        setIsSubmitting(false);
        return;
      }
      publicationData.vacancies_by_country = parsedVacancies;
    }

    if (countryInfo) {
      publicationData.country_info = countryInfo;
    }

    // Add country flag URL if available
    if (countryFlagUrl) {
      publicationData.country_info = {
        ...publicationData.country_info,
        flag_url: countryFlagUrl
      };
    }

    const { error } = await supabase.from("publications").insert(publicationData);

    if (error) {
      toast({
        title: "Erro ao publicar",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Publicação criada!",
        description: "A publicação foi adicionada com sucesso.",
      });
      
      // Reset all form fields
      setTitle("");
      setDescription("");
      setShortDescription("");
      setCategory("");
      setCountry("");
      setArea("");
      setImageUrl("");
      setUniversityLogo("");
      setCountryFlag("");
      setExternalLink("");
      setDeadline("");
      setCountryFlagFile(null);
      setUniversityLogoFile(null);
      setValue("");
      setScholarshipType("");
      setStudyLevel("");
      setStatus("Aberta");
      setIsFeatured(false);
      setRequirements("");
      setBenefits("");
      setImportantDates("");
      setVacanciesByCountry("");
      setCountryAdvantages("");
      setCountryGastronomy("");
      setCountryCulture("");
      setCountryTourism("");
      setCountryEducation("");
      
      fetchStats();
    }

    setIsSubmitting(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur border-b border-slate-700">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-amber-400" />
            <span className="text-lg font-bold text-white">Painel Admin</span>
          </div>
          <div className="flex items-center gap-3">
            {user && <NotificationBell userId={user.id} className="text-slate-200 hover:text-white hover:bg-slate-700" />}
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-700">
                <Home className="h-4 w-4 mr-2" />
                Ver Site
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={signOut}
              className="text-slate-300 hover:text-white hover:bg-slate-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 py-8">
        <div className="container max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-white">Painel Administrativo</h1>
            <p className="text-slate-400">Gerencie todas as publicações, inscrições e conteúdos do site</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Usuários Registrados</CardTitle>
                <Users className="h-4 w-4 text-amber-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.users}</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Total de Visualizações</CardTitle>
                <Eye className="h-4 w-4 text-amber-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.totalViews}</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">CVs Baixados</CardTitle>
                <Download className="h-4 w-4 text-amber-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.cvDownloads}</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue={searchParams.get("tab") || "manage"} className="space-y-6">
            <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
              <TabsList className="inline-flex w-auto min-w-full md:grid md:w-full md:grid-cols-10 bg-slate-800/50">
                <TabsTrigger value="manage" className="flex items-center gap-1.5 text-xs md:text-sm whitespace-nowrap data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">
                  <FileText className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Gerenciar</span>
                </TabsTrigger>
                <TabsTrigger value="new" className="text-xs md:text-sm whitespace-nowrap data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">
                  <span className="hidden sm:inline">Nova Publicação</span>
                  <span className="sm:hidden">Novo</span>
                </TabsTrigger>
                <TabsTrigger value="enrollments" className="relative flex items-center gap-1.5 text-xs md:text-sm whitespace-nowrap data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">
                  <BookOpen className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Cursos</span>
                  {tabBadges.enrollments > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">{tabBadges.enrollments > 9 ? "9+" : tabBadges.enrollments}</span>}
                </TabsTrigger>
                <TabsTrigger value="scholarships" className="relative flex items-center gap-1.5 text-xs md:text-sm whitespace-nowrap data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">
                  <GraduationCap className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Bolsas</span>
                  {tabBadges.scholarships > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">{tabBadges.scholarships > 9 ? "9+" : tabBadges.scholarships}</span>}
                </TabsTrigger>
                <TabsTrigger value="users" className="relative flex items-center gap-1.5 text-xs md:text-sm whitespace-nowrap data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">
                  <Users className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Usuários</span>
                  {tabBadges.users > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">{tabBadges.users > 9 ? "9+" : tabBadges.users}</span>}
                </TabsTrigger>
                <TabsTrigger value="messages" className="relative flex items-center gap-1.5 text-xs md:text-sm whitespace-nowrap data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">
                  <MessageSquare className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Mensagens</span>
                  {tabBadges.messages > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">{tabBadges.messages > 9 ? "9+" : tabBadges.messages}</span>}
                </TabsTrigger>
                <TabsTrigger value="payment" className="flex items-center gap-1.5 text-xs md:text-sm whitespace-nowrap data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">
                  <Banknote className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Pagamento</span>
                </TabsTrigger>
                <TabsTrigger value="projects" className="relative flex items-center gap-1.5 text-xs md:text-sm whitespace-nowrap data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">
                  <Lightbulb className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Projetos</span>
                  {tabBadges.projects > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">{tabBadges.projects > 9 ? "9+" : tabBadges.projects}</span>}
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-1.5 text-xs md:text-sm whitespace-nowrap data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">
                  <Settings className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Definições</span>
                </TabsTrigger>
                <TabsTrigger value="reviews" className="relative flex items-center gap-1.5 text-xs md:text-sm whitespace-nowrap data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">
                  <Star className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Avaliações</span>
                  {tabBadges.reviews > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">{tabBadges.reviews > 9 ? "9+" : tabBadges.reviews}</span>}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="manage">
              <PublicationsManager />
            </TabsContent>

            <TabsContent value="new">
              {/* Publication Form */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Nova Publicação</CardTitle>
                  <CardDescription className="text-slate-400">
                    Adicione uma nova bolsa, emprego ou curso com informações completas
                  </CardDescription>
                </CardHeader>
                <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="basic">Básico</TabsTrigger>
                    <TabsTrigger value="scholarship">Bolsa</TabsTrigger>
                    <TabsTrigger value="details">Detalhes</TabsTrigger>
                    <TabsTrigger value="country">País</TabsTrigger>
                  </TabsList>

                  {/* Basic Info Tab */}
                  <TabsContent value="basic" className="space-y-4 mt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Categoria *</Label>
                        <Select value={category} onValueChange={setCategory} required>
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Selecione a categoria" />
                          </SelectTrigger>
                          <SelectContent className="bg-background z-50">
                            <SelectItem value="scholarship">Bolsa de Estudo</SelectItem>
                            <SelectItem value="job">Emprego</SelectItem>
                            <SelectItem value="course">Curso</SelectItem>
                            <SelectItem value="university">Universidade Privada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="value">Valor</Label>
                        <Input
                          id="value"
                          placeholder="Ex: Cobertura Total, R$ 5.000"
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title">Título *</Label>
                      <Input
                        id="title"
                        placeholder="Nome da bolsa, emprego ou curso"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shortDescription">Descrição Curta (1-3 linhas)</Label>
                      <Textarea
                        id="shortDescription"
                        placeholder="Breve resumo da oportunidade..."
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição Completa *</Label>
                      <Textarea
                        id="description"
                        placeholder="Descreva todos os detalhes da oportunidade..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={6}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country">País</Label>
                        <Input
                          id="country"
                          placeholder="Ex: Brasil, Canadá"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="area">Área</Label>
                        <Input
                          id="area"
                          placeholder="Ex: Tecnologia, Saúde"
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="deadline">Prazo Final</Label>
                        <Input
                          id="deadline"
                          type="date"
                          value={deadline}
                          onChange={(e) => setDeadline(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="imageUrl">URL da Imagem</Label>
                        <Input
                          id="imageUrl"
                          type="url"
                          placeholder="https://..."
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="countryFlag">Bandeira do País</Label>
                        <Input
                          id="countryFlag"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setCountryFlagFile(e.target.files?.[0] || null)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Upload da bandeira do país (PNG, JPG)
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="universityLogoFile">Logo da Universidade</Label>
                        <Input
                          id="universityLogoFile"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setUniversityLogoFile(e.target.files?.[0] || null)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Upload do logo da universidade (PNG, JPG)
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="externalLink">Link Oficial para Candidatura</Label>
                      <Input
                        id="externalLink"
                        type="url"
                        placeholder="https://..."
                        value={externalLink}
                        onChange={(e) => setExternalLink(e.target.value)}
                      />
                    </div>
                  </TabsContent>

                  {/* Scholarship Specific Tab */}
                  <TabsContent value="scholarship" className="space-y-4 mt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="scholarshipType">Tipo de Bolsa</Label>
                        <Select value={scholarshipType} onValueChange={setScholarshipType}>
                          <SelectTrigger id="scholarshipType">
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent className="bg-background z-50">
                            <SelectItem value="Completa">Bolsa Completa</SelectItem>
                            <SelectItem value="Parcial">Bolsa Parcial</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="studyLevel">Nível de Estudo</Label>
                        <Select value={studyLevel} onValueChange={setStudyLevel}>
                          <SelectTrigger id="studyLevel">
                            <SelectValue placeholder="Selecione o nível" />
                          </SelectTrigger>
                          <SelectContent className="bg-background z-50">
                            <SelectItem value="Licenciatura">Licenciatura</SelectItem>
                            <SelectItem value="Mestrado">Mestrado</SelectItem>
                            <SelectItem value="Doutoramento">Doutoramento</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select value={status} onValueChange={setStatus}>
                          <SelectTrigger id="status">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-background z-50">
                            <SelectItem value="Aberta">Aberta</SelectItem>
                            <SelectItem value="Fechada">Fechada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2 pt-8">
                        <Checkbox
                          id="isFeatured"
                          checked={isFeatured}
                          onCheckedChange={(checked) => setIsFeatured(checked as boolean)}
                        />
                        <Label htmlFor="isFeatured" className="cursor-pointer">
                          Bolsa em Destaque
                        </Label>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Details Tab */}
                  <TabsContent value="details" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="requirements">Requisitos e Documentos</Label>
                      <Textarea
                        id="requirements"
                        placeholder="Liste todos os requisitos e documentos necessários..."
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        rows={5}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="benefits">Benefícios (JSON)</Label>
                      <Textarea
                        id="benefits"
                        placeholder='[{"type": "Propinas", "description": "100% cobertas"}, {"type": "Alojamento", "description": "Incluído"}]'
                        value={benefits}
                        onChange={(e) => setBenefits(e.target.value)}
                        rows={4}
                        className="font-mono text-sm"
                      />
                      <p className="text-xs text-muted-foreground">
                        Formato: Array de objetos com "type" e "description"
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="importantDates">Datas Importantes (JSON)</Label>
                      <Textarea
                        id="importantDates"
                        placeholder='{"application_start": "2025-01-01", "application_end": "2025-03-31", "result_date": "2025-05-15"}'
                        value={importantDates}
                        onChange={(e) => setImportantDates(e.target.value)}
                        rows={3}
                        className="font-mono text-sm"
                      />
                      <p className="text-xs text-muted-foreground">
                        Formato: Objeto com application_start, application_end, result_date (datas em formato YYYY-MM-DD)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vacanciesByCountry">Vagas por País (JSON)</Label>
                      <Textarea
                        id="vacanciesByCountry"
                        placeholder='{"Brasil": "10", "Portugal": "5", "Angola": "3"}'
                        value={vacanciesByCountry}
                        onChange={(e) => setVacanciesByCountry(e.target.value)}
                        rows={3}
                        className="font-mono text-sm"
                      />
                      <p className="text-xs text-muted-foreground">
                        Formato: Objeto com país: "número de vagas"
                      </p>
                    </div>
                  </TabsContent>

                  {/* Country Info Tab */}
                  <TabsContent value="country" className="space-y-4 mt-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Informações sobre estudar no país (todas opcionais)
                    </p>

                    <div className="space-y-2">
                      <Label htmlFor="countryAdvantages">Vantagens de Estudar</Label>
                      <Textarea
                        id="countryAdvantages"
                        placeholder="Descreva as vantagens de estudar neste país..."
                        value={countryAdvantages}
                        onChange={(e) => setCountryAdvantages(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="countryEducation">Qualidade da Educação</Label>
                      <Textarea
                        id="countryEducation"
                        placeholder="Informações sobre o sistema educacional..."
                        value={countryEducation}
                        onChange={(e) => setCountryEducation(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="countryCulture">Cultura e Religião</Label>
                      <Textarea
                        id="countryCulture"
                        placeholder="Aspectos culturais e religiosos..."
                        value={countryCulture}
                        onChange={(e) => setCountryCulture(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="countryGastronomy">Gastronomia Típica</Label>
                      <Textarea
                        id="countryGastronomy"
                        placeholder="Pratos típicos e cultura gastronômica..."
                        value={countryGastronomy}
                        onChange={(e) => setCountryGastronomy(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="countryTourism">Turismo e Beleza</Label>
                      <Textarea
                        id="countryTourism"
                        placeholder="Pontos turísticos e belezas naturais..."
                        value={countryTourism}
                        onChange={(e) => setCountryTourism(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Publicando...
                    </>
                  ) : (
                    "Publicar Bolsa"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
            </TabsContent>

            <TabsContent value="enrollments">
              <EnrollmentsManager />
            </TabsContent>

            <TabsContent value="scholarships">
              <ScholarshipRequestsManager />
            </TabsContent>

            <TabsContent value="users">
              {user && <UsersManager adminId={user.id} />}
            </TabsContent>

            <TabsContent value="messages">
              {user && <MessagesPanel currentUserId={user.id} isAdmin={true} />}
            </TabsContent>

            <TabsContent value="payment">
              <PaymentSettingsManager />
            </TabsContent>

            <TabsContent value="projects">
              <ProjectsManager />
            </TabsContent>

            <TabsContent value="settings">
              <SiteSettingsManager />
            </TabsContent>

            <TabsContent value="reviews">
              <ReviewsManager />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin;