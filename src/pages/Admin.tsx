import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
import { Loader2, Users, Eye } from "lucide-react";

const Admin = () => {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stats, setStats] = useState({ users: 0, totalViews: 0 });

  // Basic Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [category, setCategory] = useState<string>("");
  const [country, setCountry] = useState("");
  const [area, setArea] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [universityLogo, setUniversityLogo] = useState("");
  const [externalLink, setExternalLink] = useState("");
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
      navigate("/auth");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin]);

  const fetchStats = async () => {
    const { data: usersCount } = await supabase.rpc("get_registered_users_count");
    
    const { data: publications } = await supabase
      .from("publications")
      .select("views_count");
    
    const totalViews = publications?.reduce((acc, pub) => acc + (pub.views_count || 0), 0) || 0;

    setStats({
      users: usersCount || 0,
      totalViews,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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
      category: category as "scholarship" | "job" | "course",
      country: country || null,
      area: area || null,
      image_url: imageUrl || null,
      university_logo: universityLogo || null,
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
      setExternalLink("");
      setDeadline("");
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
            <p className="text-muted-foreground">Gerencie as publicações do site com informações detalhadas</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Usuários Registrados</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.users}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Visualizações</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalViews}</div>
              </CardContent>
            </Card>
          </div>

          {/* Publication Form */}
          <Card>
            <CardHeader>
              <CardTitle>Nova Publicação</CardTitle>
              <CardDescription>
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

                    <div className="grid md:grid-cols-3 gap-4">
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

                      <div className="space-y-2">
                        <Label htmlFor="universityLogo">Logo da Universidade</Label>
                        <Input
                          id="universityLogo"
                          type="url"
                          placeholder="https://..."
                          value={universityLogo}
                          onChange={(e) => setUniversityLogo(e.target.value)}
                        />
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;