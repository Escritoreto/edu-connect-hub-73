import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Heart, TrendingUp, Rocket, Calendar, Target, Users, Star, ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [updates, setUpdates] = useState<any[]>([]);
  const [ratings, setRatings] = useState<any[]>([]);
  const [supports, setSupports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creatorProfile, setCreatorProfile] = useState<any>(null);

  // Support form
  const [showSupportForm, setShowSupportForm] = useState(false);
  const [supportType, setSupportType] = useState<string>("donation");
  const [supportAmount, setSupportAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Rating
  const [userRating, setUserRating] = useState(0);
  const [ratingComment, setRatingComment] = useState("");

  // Payment info
  const [paymentSettings, setPaymentSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    if (id) fetchAll();
  }, [id]);

  const fetchAll = async () => {
    const [projectRes, updatesRes, ratingsRes, paymentRes] = await Promise.all([
      supabase.from("projects").select("*").eq("id", id!).single(),
      supabase.from("project_updates").select("*").eq("project_id", id!).order("created_at", { ascending: false }),
      supabase.from("project_ratings").select("*").eq("project_id", id!),
      supabase.from("payment_settings").select("*"),
    ]);

    if (projectRes.data) {
      setProject(projectRes.data);
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", projectRes.data.creator_id).single();
      setCreatorProfile(profile);

      if (user) {
        const { data: mySupports } = await supabase.from("project_supports").select("*").eq("project_id", id!).eq("supporter_id", user.id);
        setSupports(mySupports || []);
      }
    }
    setUpdates(updatesRes.data || []);
    setRatings(ratingsRes.data || []);

    const settings: Record<string, string> = {};
    paymentRes.data?.forEach((s: any) => { settings[s.setting_key] = s.setting_value; });
    setPaymentSettings(settings);
    setLoading(false);
  };

  const handleSupport = async () => {
    if (!user) { navigate("/auth"); return; }
    if (!supportAmount || Number(supportAmount) <= 0) {
      toast({ title: "Valor inválido", variant: "destructive" }); return;
    }

    setSubmitting(true);
    let partnershipPercent = 0;
    if (supportType === "partnership" && project) {
      const remainingPercent = Number(project.max_partnership_percent) - Number(project.allocated_partnership_percent);
      const goalAmount = Number(project.financial_goal);
      if (goalAmount > 0 && remainingPercent > 0) {
        partnershipPercent = Math.min((Number(supportAmount) / goalAmount) * Number(project.max_partnership_percent), remainingPercent);
      }
    }

    const { error } = await supabase.from("project_supports").insert({
      project_id: id!,
      supporter_id: user.id,
      amount: Number(supportAmount),
      support_type: supportType,
      partnership_percent: partnershipPercent,
    });

    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Apoio registado!", description: "Efetue o pagamento e aguarde confirmação." });
      setShowSupportForm(false);
      setSupportAmount("");
      fetchAll();
    }
    setSubmitting(false);
  };

  const handleRate = async () => {
    if (!user) { navigate("/auth"); return; }
    if (userRating === 0) return;

    const { error } = await supabase.from("project_ratings").upsert({
      project_id: id!,
      user_id: user.id,
      rating: userRating,
      comment: ratingComment || null,
    }, { onConflict: "project_id,user_id" });

    if (!error) {
      toast({ title: "Avaliação registada!" });
      fetchAll();
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
    </div>
  );

  if (!project) return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 flex items-center justify-center flex-col gap-4">
        <p className="text-lg text-muted-foreground">Projeto não encontrado</p>
        <Button asChild><Link to="/projects">Voltar</Link></Button>
      </div>
    </div>
  );

  const progress = project.financial_goal > 0 ? Math.min((Number(project.current_amount) / Number(project.financial_goal)) * 100, 100) : 0;
  const avgRating = ratings.length > 0 ? (ratings.reduce((a, r) => a + r.rating, 0) / ratings.length) : 0;
  const remainingPartnership = Number(project.max_partnership_percent) - Number(project.allocated_partnership_percent);
  const canDonate = project.support_type === "donation" || project.support_type === "both";
  const canPartner = (project.support_type === "partnership" || project.support_type === "both") && remainingPartnership > 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-8">
        <div className="container max-w-5xl">
          <Button variant="ghost" className="mb-4" onClick={() => navigate("/projects")}>
            <ArrowLeft className="h-4 w-4 mr-2" />Voltar
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {project.image_url ? (
                <div className="rounded-xl overflow-hidden h-64 md:h-80">
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="rounded-xl h-64 md:h-80 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <Rocket className="h-24 w-24 text-primary/20" />
                </div>
              )}

              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="secondary">{project.category}</Badge>
                <Badge variant="outline">
                  {project.support_type === "donation" ? "Doação" : project.support_type === "partnership" ? "Parceria" : "Doação & Parceria"}
                </Badge>
                {avgRating > 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{avgRating.toFixed(1)}</span>
                    <span className="text-muted-foreground">({ratings.length})</span>
                  </div>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-extrabold">{project.title}</h1>

              {creatorProfile && (
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Criado por <strong className="text-foreground">{creatorProfile.full_name || creatorProfile.email}</strong></span>
                  <span>•</span>
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(project.created_at).toLocaleDateString("pt-MZ")}</span>
                </div>
              )}

              <Tabs defaultValue="about" className="mt-6">
                <TabsList>
                  <TabsTrigger value="about">Sobre</TabsTrigger>
                  <TabsTrigger value="updates">Atualizações ({updates.length})</TabsTrigger>
                  <TabsTrigger value="ratings">Avaliações ({ratings.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="mt-4 prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-foreground/90 leading-relaxed">{project.description}</div>
                  
                  {project.support_type !== "donation" && Number(project.max_partnership_percent) > 0 && (
                    <Card className="mt-6 border-secondary/30 bg-secondary/5">
                      <CardContent className="p-5">
                        <h3 className="font-bold flex items-center gap-2 mb-2">
                          <TrendingUp className="h-5 w-5 text-green-500" />Sobre a Parceria
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          O criador disponibiliza até <strong>{project.max_partnership_percent}%</strong> do projeto para parceiros. 
                          Ao apoiar como parceiro, você recebe uma participação proporcional ao valor investido.
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">Disponível:</span>
                          <Badge variant="outline">{remainingPartnership.toFixed(1)}%</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="updates" className="mt-4 space-y-4">
                  {updates.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Ainda sem atualizações.</p>
                  ) : updates.map(u => (
                    <Card key={u.id}>
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground mb-2">{new Date(u.created_at).toLocaleDateString("pt-MZ")}</p>
                        <p className="text-sm whitespace-pre-wrap">{u.content}</p>
                        {u.image_url && <img src={u.image_url} alt="" className="mt-3 rounded-lg max-h-64 object-cover" />}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="ratings" className="mt-4 space-y-4">
                  {user && user.id !== project.creator_id && (
                    <Card className="border-primary/20">
                      <CardContent className="p-4 space-y-3">
                        <h4 className="font-semibold text-sm">Avalie este projeto</h4>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map(n => (
                            <button key={n} onClick={() => setUserRating(n)}>
                              <Star className={`h-6 w-6 transition-colors ${n <= userRating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />
                            </button>
                          ))}
                        </div>
                        <Textarea placeholder="Comentário (opcional)" value={ratingComment} onChange={e => setRatingComment(e.target.value)} className="h-20" />
                        <Button size="sm" onClick={handleRate} disabled={userRating === 0}>Avaliar</Button>
                      </CardContent>
                    </Card>
                  )}
                  {ratings.map(r => (
                    <Card key={r.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-1 mb-1">
                          {[1, 2, 3, 4, 5].map(n => (
                            <Star key={n} className={`h-4 w-4 ${n <= r.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/20"}`} />
                          ))}
                        </div>
                        {r.comment && <p className="text-sm text-muted-foreground mt-1">{r.comment}</p>}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-primary/20">
                <CardContent className="p-5 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Arrecadado</span>
                      <span className="font-bold text-primary">{Number(project.current_amount).toLocaleString("pt-MZ")} MT</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{progress.toFixed(0)}% da meta</span>
                      <span>Meta: {Number(project.financial_goal).toLocaleString("pt-MZ")} MT</span>
                    </div>
                  </div>

                  {!showSupportForm ? (
                    <Button className="w-full font-bold" size="lg" onClick={() => {
                      if (!user) { navigate("/auth"); return; }
                      if (user.id === project.creator_id) { toast({ title: "Não pode apoiar o próprio projeto" }); return; }
                      setShowSupportForm(true);
                    }}>
                      <Heart className="h-5 w-5 mr-2" />Apoiar Este Projeto
                    </Button>
                  ) : (
                    <div className="space-y-4 border-t pt-4">
                      <h4 className="font-bold text-sm">Escolha o tipo de apoio</h4>
                      <RadioGroup value={supportType} onValueChange={setSupportType}>
                        {canDonate && (
                          <div className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/30 transition-colors">
                            <RadioGroupItem value="donation" id="donation" className="mt-1" />
                            <Label htmlFor="donation" className="cursor-pointer flex-1">
                              <div className="flex items-center gap-2 font-semibold">
                                <Heart className="h-4 w-4 text-pink-500" />Doação
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">Contribuição sem participação. Você apoia sem esperar retorno financeiro.</p>
                            </Label>
                          </div>
                        )}
                        {canPartner && (
                          <div className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-secondary/30 transition-colors">
                            <RadioGroupItem value="partnership" id="partnership" className="mt-1" />
                            <Label htmlFor="partnership" className="cursor-pointer flex-1">
                              <div className="flex items-center gap-2 font-semibold">
                                <TrendingUp className="h-4 w-4 text-green-500" />Parceria
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Receba uma participação proporcional. Disponível: {remainingPartnership.toFixed(1)}%
                              </p>
                            </Label>
                          </div>
                        )}
                      </RadioGroup>

                      <div className="space-y-2">
                        <Label>Valor (MT)</Label>
                        <Input type="number" min="1" placeholder="Ex: 500" value={supportAmount} onChange={e => setSupportAmount(e.target.value)} />
                      </div>

                      {supportType === "partnership" && supportAmount && Number(supportAmount) > 0 && (
                        <div className="text-xs bg-secondary/10 p-3 rounded-lg">
                          <p className="font-medium text-secondary-foreground">Participação estimada:</p>
                          <p className="text-lg font-bold text-primary">
                            {Math.min((Number(supportAmount) / Number(project.financial_goal)) * Number(project.max_partnership_percent), remainingPartnership).toFixed(2)}%
                          </p>
                        </div>
                      )}

                      <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
                        <span>Todo apoio envolve riscos. Invista apenas o que pode perder. A plataforma não garante retornos.</span>
                      </div>

                      <Button className="w-full" onClick={handleSupport} disabled={submitting}>
                        {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle className="h-4 w-4 mr-2" />}
                        Confirmar Apoio
                      </Button>
                      <Button variant="ghost" className="w-full" onClick={() => setShowSupportForm(false)}>Cancelar</Button>
                    </div>
                  )}

                  {/* Payment info after support */}
                  {supports.filter(s => s.payment_status === "pending").length > 0 && (
                    <Card className="border-amber-500/30 bg-amber-50/50 dark:bg-amber-900/10">
                      <CardContent className="p-4 space-y-2">
                        <h4 className="font-bold text-sm flex items-center gap-2">
                          <Target className="h-4 w-4 text-amber-500" />Dados para Pagamento
                        </h4>
                        <div className="text-xs space-y-1 text-muted-foreground">
                          {paymentSettings.bank_name && <p><strong>Banco:</strong> {paymentSettings.bank_name}</p>}
                          {paymentSettings.account_number && <p><strong>Conta:</strong> {paymentSettings.account_number}</p>}
                          {paymentSettings.account_holder && <p><strong>Titular:</strong> {paymentSettings.account_holder}</p>}
                          {paymentSettings.mpesa_number && <p><strong>M-Pesa:</strong> {paymentSettings.mpesa_number}</p>}
                          {paymentSettings.nib && <p><strong>NIB:</strong> {paymentSettings.nib}</p>}
                        </div>
                        <p className="text-xs text-amber-600 font-medium">Após pagar, o admin confirmará o pagamento.</p>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>

              {/* My supports */}
              {supports.length > 0 && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Meus Apoios</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {supports.map(s => (
                      <div key={s.id} className="flex justify-between items-center text-sm border-b last:border-0 pb-2">
                        <div>
                          <Badge variant={s.support_type === "donation" ? "secondary" : "default"} className="text-xs">
                            {s.support_type === "donation" ? "Doação" : "Parceria"}
                          </Badge>
                          {s.support_type === "partnership" && <span className="text-xs text-muted-foreground ml-2">{Number(s.partnership_percent).toFixed(2)}%</span>}
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{Number(s.amount).toLocaleString("pt-MZ")} MT</p>
                          <Badge variant={s.payment_status === "confirmed" ? "default" : "outline"} className="text-xs">
                            {s.payment_status === "pending" ? "Pendente" : s.payment_status === "paid" ? "Pago" : s.payment_status === "confirmed" ? "Confirmado" : "Rejeitado"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
