import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, Upload } from "lucide-react";

const ProjectNew = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("geral");
  const [financialGoal, setFinancialGoal] = useState("");
  const [supportType, setSupportType] = useState("both");
  const [maxPartnership, setMaxPartnership] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // New fields
  const [targetAudience, setTargetAudience] = useState("");
  const [problemSolved, setProblemSolved] = useState("");
  const [timeline, setTimeline] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "Arquivo muito grande", description: "Máximo 5MB", variant: "destructive" });
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!title.trim() || !description.trim() || !financialGoal) {
      toast({ title: "Preencha todos os campos obrigatórios", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      let imageUrl = null;
      if (imageFile) {
        const ext = imageFile.name.split(".").pop();
        const path = `projects/${user.id}/${Date.now()}.${ext}`;
        const { error: uploadErr } = await supabase.storage.from("publication-images").upload(path, imageFile);
        if (uploadErr) throw uploadErr;
        const { data: { publicUrl } } = supabase.storage.from("publication-images").getPublicUrl(path);
        imageUrl = publicUrl;
      }

      // Build full description with extra fields
      let fullDescription = description.trim();
      if (problemSolved.trim()) fullDescription += `\n\n**Problema que resolve:** ${problemSolved.trim()}`;
      if (targetAudience.trim()) fullDescription += `\n\n**Público-alvo:** ${targetAudience.trim()}`;
      if (timeline.trim()) fullDescription += `\n\n**Prazo de execução:** ${timeline.trim()}`;
      if (location.trim()) fullDescription += `\n\n**Localização:** ${location.trim()}`;

      const { error } = await supabase.from("projects").insert({
        creator_id: user.id,
        title: title.trim(),
        short_description: shortDesc.trim() || null,
        description: fullDescription,
        category,
        financial_goal: Number(financialGoal),
        support_type: supportType,
        max_partnership_percent: supportType !== "donation" ? Number(maxPartnership) || 0 : 0,
        min_support_amount: minAmount ? Number(minAmount) : 100,
        max_support_amount: maxAmount ? Number(maxAmount) : 1000000,
        image_url: imageUrl,
        status: "pending",
      });

      if (error) throw error;
      toast({ title: "Projeto submetido!", description: "Aguarde a aprovação do administrador." });
      navigate("/profile?tab=projects");
    } catch (err: any) {
      toast({ title: "Erro", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/projects")} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />Voltar
        </Button>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Submeter Ideia de Negócio/Inovação</CardTitle>
            <CardDescription>Descreva sua ideia para receber apoio financeiro da comunidade</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título do Projeto *</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nome do seu projeto" maxLength={200} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDesc">Descrição Curta</Label>
                <Input id="shortDesc" value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} placeholder="Resumo em uma frase" maxLength={300} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição Completa *</Label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Explique sua ideia em detalhe..." rows={6} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="problemSolved">Que problema resolve? *</Label>
                <Textarea id="problemSolved" value={problemSolved} onChange={(e) => setProblemSolved(e.target.value)} placeholder="Descreva o problema que seu projeto resolve..." rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience">Público-alvo</Label>
                <Input id="targetAudience" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} placeholder="Ex: Jovens universitários, pequenos empresários..." />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="location">Localização do Projeto</Label>
                  <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Ex: Maputo, Moçambique" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline">Prazo de Execução</Label>
                  <Input id="timeline" value={timeline} onChange={(e) => setTimeline(e.target.value)} placeholder="Ex: 6 meses, 1 ano" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="saude">Saúde</SelectItem>
                      <SelectItem value="educacao">Educação</SelectItem>
                      <SelectItem value="agricultura">Agricultura</SelectItem>
                      <SelectItem value="comercio">Comércio</SelectItem>
                      <SelectItem value="geral">Geral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal">Meta Financeira (MZN) *</Label>
                  <Input id="goal" type="number" min="1" value={financialGoal} onChange={(e) => setFinancialGoal(e.target.value)} placeholder="Ex: 50000" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="minAmount">Apoio Mínimo (MZN)</Label>
                  <Input id="minAmount" type="number" min="1" value={minAmount} onChange={(e) => setMinAmount(e.target.value)} placeholder="Ex: 500" />
                  <p className="text-xs text-muted-foreground">Valor mínimo por apoiador</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxAmount">Apoio Máximo (MZN)</Label>
                  <Input id="maxAmount" type="number" min="1" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} placeholder="Ex: 100000" />
                  <p className="text-xs text-muted-foreground">Valor máximo por apoiador</p>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Tipo de Apoio Aceite</Label>
                <RadioGroup value={supportType} onValueChange={setSupportType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="donation" id="st-donation" />
                    <Label htmlFor="st-donation">Apenas Doação</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partnership" id="st-partnership" />
                    <Label htmlFor="st-partnership">Apenas Participação (Sócio)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="st-both" />
                    <Label htmlFor="st-both">Ambos (Doação e Participação)</Label>
                  </div>
                </RadioGroup>
              </div>

              {supportType !== "donation" && (
                <div className="space-y-2">
                  <Label htmlFor="maxPartnership">Percentagem Máxima de Participação (%)</Label>
                  <Input id="maxPartnership" type="number" min="1" max="100" value={maxPartnership} onChange={(e) => setMaxPartnership(e.target.value)} placeholder="Ex: 49" />
                </div>
              )}

              <div className="space-y-2">
                <Label>Imagem do Projeto</Label>
                {imagePreview && <img src={imagePreview} alt="Preview" className="rounded-lg max-h-48 object-cover" />}
                <div className="flex items-center gap-2">
                  <Label htmlFor="image" className="cursor-pointer">
                    <div className="flex items-center gap-2 text-sm text-primary hover:underline">
                      <Upload className="h-4 w-4" />{imageFile ? "Alterar" : "Adicionar imagem"}
                    </div>
                  </Label>
                  <Input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </div>
              </div>

              <Button type="submit" disabled={submitting} className="w-full" size="lg">
                {submitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Submetendo...</> : "Submeter Projeto"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">O projeto será analisado antes de ser publicado</p>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectNew;
