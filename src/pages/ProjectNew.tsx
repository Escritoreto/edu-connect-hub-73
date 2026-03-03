import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Rocket, AlertTriangle } from "lucide-react";

const ProjectNew = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [category, setCategory] = useState("geral");
  const [imageUrl, setImageUrl] = useState("");
  const [financialGoal, setFinancialGoal] = useState("");
  const [supportType, setSupportType] = useState("both");
  const [maxPartnershipPercent, setMaxPartnershipPercent] = useState("20");

  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
  );

  if (!user) { navigate("/auth"); return null; }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !financialGoal) {
      toast({ title: "Preencha todos os campos obrigatórios", variant: "destructive" }); return;
    }
    setSubmitting(true);

    const { error } = await supabase.from("projects").insert({
      creator_id: user.id,
      title,
      description,
      short_description: shortDescription || null,
      category,
      image_url: imageUrl || null,
      financial_goal: Number(financialGoal),
      support_type: supportType,
      max_partnership_percent: supportType === "donation" ? 0 : Number(maxPartnershipPercent),
    });

    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Projeto submetido!", description: "Aguarde a aprovação do administrador." });
      navigate("/projects");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-8">
        <div className="container max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-6 w-6 text-primary" />Publicar Novo Projeto
              </CardTitle>
              <CardDescription>Descreva sua ideia e defina como deseja receber apoio</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label>Título do Projeto *</Label>
                  <Input placeholder="Ex: App de Delivery Sustentável" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label>Descrição Curta</Label>
                  <Input placeholder="Uma frase sobre o projeto" value={shortDescription} onChange={e => setShortDescription(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>Descrição Completa *</Label>
                  <Textarea placeholder="Explique o projeto em detalhes: problema, solução, plano..." value={description} onChange={e => setDescription(e.target.value)} className="min-h-[150px]" required />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Categoria</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tecnologia">Tecnologia</SelectItem>
                        <SelectItem value="educacao">Educação</SelectItem>
                        <SelectItem value="saude">Saúde</SelectItem>
                        <SelectItem value="agricultura">Agricultura</SelectItem>
                        <SelectItem value="arte">Arte & Cultura</SelectItem>
                        <SelectItem value="geral">Geral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Meta Financeira (MT) *</Label>
                    <Input type="number" min="100" placeholder="Ex: 50000" value={financialGoal} onChange={e => setFinancialGoal(e.target.value)} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>URL da Imagem (opcional)</Label>
                  <Input placeholder="https://..." value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold">Tipo de Apoio Aceite</Label>
                  <RadioGroup value={supportType} onValueChange={setSupportType} className="space-y-3">
                    <div className="flex items-start gap-3 p-4 rounded-lg border hover:border-primary/30 transition-colors">
                      <RadioGroupItem value="donation" id="st-donation" className="mt-1" />
                      <Label htmlFor="st-donation" className="cursor-pointer flex-1">
                        <span className="font-semibold">Apenas Doação</span>
                        <p className="text-xs text-muted-foreground mt-1">As pessoas contribuem sem participação nos lucros</p>
                      </Label>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg border hover:border-primary/30 transition-colors">
                      <RadioGroupItem value="partnership" id="st-partnership" className="mt-1" />
                      <Label htmlFor="st-partnership" className="cursor-pointer flex-1">
                        <span className="font-semibold">Apenas Parceria</span>
                        <p className="text-xs text-muted-foreground mt-1">Apoiadores recebem participação proporcional</p>
                      </Label>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg border hover:border-primary/30 transition-colors">
                      <RadioGroupItem value="both" id="st-both" className="mt-1" />
                      <Label htmlFor="st-both" className="cursor-pointer flex-1">
                        <span className="font-semibold">Ambos (Doação & Parceria)</span>
                        <p className="text-xs text-muted-foreground mt-1">Apoiadores escolhem entre doar ou participar</p>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {supportType !== "donation" && (
                  <div className="space-y-2 p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                    <Label>Percentual máximo disponível para parceiros (%)</Label>
                    <Input type="number" min="1" max="49" value={maxPartnershipPercent} onChange={e => setMaxPartnershipPercent(e.target.value)} />
                    <p className="text-xs text-muted-foreground">Defina quanto do projeto está disponível para parceiros (máx. 49%)</p>
                  </div>
                )}

                <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 p-4 rounded-lg">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
                  <span>O seu projeto será revisto pelo administrador antes de ser publicado. Certifique-se de fornecer informações claras e honestas.</span>
                </div>

                <Button type="submit" className="w-full font-bold" size="lg" disabled={submitting}>
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Rocket className="h-5 w-5 mr-2" />}
                  Submeter Projeto para Aprovação
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

export default ProjectNew;
