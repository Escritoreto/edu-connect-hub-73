import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, ArrowLeft, Target, Users, Calendar, Star, Heart, TrendingUp, Banknote, MessageSquare, Image, Copy, CheckCircle2, Clock, AlertCircle, Upload, FileImage } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const ProjectDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updates, setUpdates] = useState<any[]>([]);
  const [ratings, setRatings] = useState<any[]>([]);
  const [supports, setSupports] = useState<any[]>([]);
  const [mySupports, setMySupports] = useState<any[]>([]);
  const [paymentSettings, setPaymentSettings] = useState<any>(null);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  // Support form
  const [showSupportDialog, setShowSupportDialog] = useState(false);
  const [supportType, setSupportType] = useState("donation");
  const [amount, setAmount] = useState("");
  const [partnershipPercent, setPartnershipPercent] = useState("");
  const [submittingSupport, setSubmittingSupport] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [uploadingReceipt, setUploadingReceipt] = useState(false);

  // Rating form
  const [myRating, setMyRating] = useState(0);
  const [myComment, setMyComment] = useState("");
  const [submittingRating, setSubmittingRating] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProject();
      fetchUpdates();
      fetchRatings();
      fetchSupports();
      fetchPaymentSettings();
    }
  }, [id]);

  useEffect(() => {
    if (user && supports.length > 0) {
      setMySupports(supports.filter(s => s.supporter_id === user.id));
    }
  }, [user, supports]);

  const fetchPaymentSettings = async () => {
    const { data } = await supabase.from("payment_settings").select("setting_key, setting_value");
    if (data) {
      const s: any = {};
      data.forEach((row: any) => { s[row.setting_key] = row.setting_value; });
      setPaymentSettings(s);
    }
  };

  const fetchProject = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*, profiles:creator_id(full_name, avatar_url)")
      .eq("id", id!)
      .single();
    if (!error && data) setProject(data);
    setLoading(false);
  };

  const fetchUpdates = async () => {
    const { data } = await supabase
      .from("project_updates")
      .select("*, profiles:creator_id(full_name, avatar_url)")
      .eq("project_id", id!)
      .order("created_at", { ascending: false });
    if (data) setUpdates(data);
  };

  const fetchRatings = async () => {
    const { data } = await supabase
      .from("project_ratings")
      .select("*, profiles:user_id(full_name, avatar_url)")
      .eq("project_id", id!)
      .order("created_at", { ascending: false });
    if (data) setRatings(data);
  };

  const fetchSupports = async () => {
    const { data } = await supabase
      .from("project_supports")
      .select("*, profiles:supporter_id(full_name)")
      .eq("project_id", id!)
      .order("created_at", { ascending: false });
    if (data) setSupports(data);
  };

  const uploadReceipt = async (file: File): Promise<string | null> => {
    if (!user) return null;
    const ext = file.name.split('.').pop();
    const filePath = `${user.id}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("payment-receipts").upload(filePath, file);
    if (error) return null;
    const { data: urlData } = supabase.storage.from("payment-receipts").getPublicUrl(filePath);
    return urlData?.publicUrl || null;
  };

  const handleSupport = async () => {
    if (!user) { navigate("/auth"); return; }
    const minAmt = Number(project?.min_support_amount || 0);
    const maxAmt = Number(project?.max_support_amount || 0);
    const amtVal = Number(amount);
    if (!amount || amtVal <= 0) {
      toast({ title: "Valor inválido", variant: "destructive" });
      return;
    }
    if (minAmt > 0 && amtVal < minAmt) {
      toast({ title: "Valor abaixo do mínimo", description: `O mínimo é ${formatMoney(minAmt)}`, variant: "destructive" });
      return;
    }
    if (maxAmt > 0 && amtVal > maxAmt) {
      toast({ title: "Valor acima do máximo", description: `O máximo é ${formatMoney(maxAmt)}`, variant: "destructive" });
      return;
    }

    setSubmittingSupport(true);

    let receiptUrl: string | null = null;
    if (receiptFile) {
      setUploadingReceipt(true);
      receiptUrl = await uploadReceipt(receiptFile);
      setUploadingReceipt(false);
    }

    const { error } = await supabase.from("project_supports").insert({
      project_id: id!,
      supporter_id: user.id,
      amount: amtVal,
      support_type: supportType,
      partnership_percent: supportType === "partnership" ? Number(partnershipPercent) : 0,
      payment_status: "pending",
      receipt_url: receiptUrl,
    });

    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Apoio registado!", description: "Aguarde a confirmação do administrador." });
      setShowSupportDialog(false);
      setShowPaymentInfo(true);
      setAmount("");
      setPartnershipPercent("");
      setReceiptFile(null);
      fetchSupports();
      fetchProject();
    }
    setSubmittingSupport(false);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast({ title: "Copiado!", description: `${label} copiado para a área de transferência` });
    setTimeout(() => setCopied(null), 2000);
  };

  const handleRating = async () => {
    if (!user) { navigate("/auth"); return; }
    if (myRating === 0) {
      toast({ title: "Selecione uma avaliação", variant: "destructive" });
      return;
    }

    setSubmittingRating(true);
    const { error } = await supabase.from("project_ratings").insert({
      project_id: id!,
      user_id: user.id,
      rating: myRating,
      comment: myComment || null,
    });

    if (error) {
      if (error.message.includes("duplicate") || error.message.includes("unique")) {
        await supabase.from("project_ratings").update({ rating: myRating, comment: myComment || null })
          .eq("project_id", id!).eq("user_id", user.id);
        toast({ title: "Avaliação atualizada!" });
      } else {
        toast({ title: "Erro", description: error.message, variant: "destructive" });
      }
    } else {
      toast({ title: "Avaliação enviada!" });
    }
    fetchRatings();
    setSubmittingRating(false);
  };

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("pt-MZ", { style: "currency", currency: "MZN" }).format(val);

  const getProgress = (current: number, goal: number) => goal > 0 ? Math.min((current / goal) * 100, 100) : 0;

  const avgRating = ratings.length > 0 ? (ratings.reduce((a, r) => a + r.rating, 0) / ratings.length).toFixed(1) : "–";

  const availablePartnership = project
    ? Number(project.max_partnership_percent || 0) - Number(project.allocated_partnership_percent || 0)
    : 0;

  const coveragePercent = project && Number(project.financial_goal) > 0
    ? ((Number(project.current_amount) / Number(project.financial_goal)) * 100).toFixed(1)
    : "0";

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/30"><CheckCircle2 className="h-3 w-3 mr-1" />Confirmado</Badge>;
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30"><Clock className="h-3 w-3 mr-1" />Aguardando</Badge>;
      default:
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Rejeitado</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground">Projeto não encontrado</p>
          <Button onClick={() => navigate("/projects")}>Ver Projetos</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/projects")} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />Voltar
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {project.image_url && (
              <div className="aspect-video rounded-xl overflow-hidden">
                <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div>
              <div className="flex items-start gap-3 mb-3">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground flex-1">{project.title}</h1>
                <Badge variant="secondary" className="capitalize shrink-0">{project.category}</Badge>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={(project.profiles as any)?.avatar_url} />
                  <AvatarFallback>{(project.profiles as any)?.full_name?.charAt(0) || "?"}</AvatarFallback>
                </Avatar>
                <span>por {(project.profiles as any)?.full_name || "Anónimo"}</span>
                <span>•</span>
                <span>{format(new Date(project.created_at), "dd MMM yyyy", { locale: ptBR })}</span>
              </div>
            </div>

            <Separator />
            <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">{project.description}</div>

            {/* My Supports Status */}
            {user && mySupports.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Banknote className="h-5 w-5 text-primary" />Meus Apoios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mySupports.map((s) => {
                      const supportCoverage = Number(project.financial_goal) > 0
                        ? ((Number(s.amount) / Number(project.financial_goal)) * 100).toFixed(1)
                        : "0";
                      return (
                        <div key={s.id} className="p-3 border border-border rounded-lg space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-foreground">{formatMoney(Number(s.amount))}</span>
                            {getPaymentStatusBadge(s.payment_status)}
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{s.support_type === "donation" ? "Doação" : `Participação: ${s.partnership_percent}%`}</span>
                            <span>{format(new Date(s.created_at), "dd/MM/yyyy", { locale: ptBR })}</span>
                          </div>
                          {s.payment_status === "confirmed" && (
                            <div className="bg-green-500/10 border border-green-500/20 rounded-md p-2">
                              <p className="text-xs text-green-700 font-medium">
                                ✅ Pagamento confirmado — Cobriu {supportCoverage}% da meta do projeto
                              </p>
                            </div>
                          )}
                          {s.payment_status === "pending" && (
                            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-md p-2">
                              <p className="text-xs text-yellow-700">
                                ⏳ Aguardando confirmação do administrador
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Updates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />Atualizações do Projeto
                </CardTitle>
                <CardDescription>Acompanhe o progresso e os passos do projeto</CardDescription>
              </CardHeader>
              <CardContent>
                {updates.length === 0 ? (
                  <p className="text-muted-foreground text-center py-6">Nenhuma atualização ainda</p>
                ) : (
                  <div className="space-y-4">
                    {updates.map((update) => (
                      <div key={update.id} className="p-4 border border-border rounded-lg space-y-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(update.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                        </div>
                        <p className="text-sm text-foreground whitespace-pre-wrap">{update.content}</p>
                        {update.image_url && (
                          <img src={update.image_url} alt="Update" className="rounded-lg max-h-64 object-cover" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Ratings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />Avaliações ({ratings.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user && (
                  <div className="p-4 border border-border rounded-lg space-y-3">
                    <p className="text-sm font-medium">Deixe sua avaliação</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button key={s} onClick={() => setMyRating(s)}>
                          <Star className={`h-6 w-6 ${s <= myRating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`} />
                        </button>
                      ))}
                    </div>
                    <Textarea
                      placeholder="Comentário (opcional)"
                      value={myComment}
                      onChange={(e) => setMyComment(e.target.value)}
                      rows={2}
                    />
                    <Button size="sm" onClick={handleRating} disabled={submittingRating}>
                      {submittingRating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Enviar"}
                    </Button>
                  </div>
                )}
                {ratings.map((r) => (
                  <div key={r.id} className="flex gap-3 p-3 border border-border rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={(r.profiles as any)?.avatar_url} />
                      <AvatarFallback>{(r.profiles as any)?.full_name?.charAt(0) || "?"}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{(r.profiles as any)?.full_name || "Anónimo"}</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={`h-3 w-3 ${s <= r.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground/30"}`} />
                          ))}
                        </div>
                      </div>
                      {r.comment && <p className="text-sm text-muted-foreground mt-1">{r.comment}</p>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-5 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Arrecadado</span>
                    <span className="font-bold text-primary">{formatMoney(Number(project.current_amount))}</span>
                  </div>
                  <Progress value={getProgress(Number(project.current_amount), Number(project.financial_goal))} className="h-3" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{coveragePercent}% coberto</span>
                    <span>Meta: {formatMoney(Number(project.financial_goal))}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Apoiadores</span>
                  <span className="font-semibold">{supports.filter(s => s.payment_status === "confirmed").length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Avaliação Média</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />{avgRating}
                  </span>
                </div>

                {project.support_type !== "donation" && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Participação Disponível</span>
                    <span className="font-semibold">{availablePartnership}%</span>
                  </div>
                )}

                <Separator />

                <Dialog open={showSupportDialog} onOpenChange={setShowSupportDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full" size="lg" onClick={() => { if (!user) navigate("/auth"); }}>
                      <Heart className="h-4 w-4 mr-2" />Apoiar Este Projeto
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Apoiar Projeto</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      {(project.support_type === "both" || project.support_type === "donation") && (
                        <RadioGroup value={supportType} onValueChange={setSupportType}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="donation" id="donation" />
                            <Label htmlFor="donation">Doação (sem participação)</Label>
                          </div>
                          {(project.support_type === "both" || project.support_type === "partnership") && availablePartnership > 0 && (
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="partnership" id="partnership" />
                              <Label htmlFor="partnership">Participação no negócio</Label>
                            </div>
                          )}
                        </RadioGroup>
                      )}

                      <div className="space-y-2">
                        <Label>Montante (MZN)</Label>
                        <Input
                          type="number"
                          min={Number(project.min_support_amount || 1)}
                          max={project.max_support_amount ? Number(project.max_support_amount) : undefined}
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder={`Insira o montante`}
                        />
                        <p className="text-xs text-muted-foreground">
                          {project.min_support_amount && `Mín: ${formatMoney(Number(project.min_support_amount))}`}
                          {project.min_support_amount && project.max_support_amount && " • "}
                          {project.max_support_amount && `Máx: ${formatMoney(Number(project.max_support_amount))}`}
                        </p>
                      </div>

                      {supportType === "partnership" && (
                        <div className="space-y-2">
                          <Label>Percentagem de participação desejada</Label>
                          <Input
                            type="number"
                            min="1"
                            max={availablePartnership}
                            value={partnershipPercent}
                            onChange={(e) => setPartnershipPercent(e.target.value)}
                            placeholder={`Máx: ${availablePartnership}%`}
                          />
                          <p className="text-xs text-muted-foreground">Participação disponível: {availablePartnership}%</p>
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label>Comprovativo de Pagamento (opcional)</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                            className="text-sm"
                          />
                          {receiptFile && (
                            <Badge variant="secondary" className="text-xs shrink-0">
                              <FileImage className="h-3 w-3 mr-1" />{receiptFile.name.slice(0, 15)}...
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">Carregue o recibo de pagamento (imagem ou PDF)</p>
                      </div>

                      <Button onClick={handleSupport} disabled={submittingSupport || uploadingReceipt} className="w-full">
                        {submittingSupport ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                        Enviar Apoio
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        O pagamento será confirmado pelo administrador após verificação do comprovativo.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Payment Info Dialog */}
                <Dialog open={showPaymentInfo} onOpenChange={setShowPaymentInfo}>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Banknote className="h-5 w-5 text-primary" />
                        Dados de Pagamento
                      </DialogTitle>
                    </DialogHeader>
                    {paymentSettings && (
                      <div className="space-y-4">
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-md p-3">
                          <p className="text-sm text-yellow-700 font-medium flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Aguardando pagamento — Transfira o valor e aguarde a confirmação do admin
                          </p>
                        </div>

                        <div className="rounded-lg border border-border p-3 space-y-2">
                          <p className="text-sm font-semibold">Transferência Bancária (IBAN)</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">Nome: {paymentSettings.iban_name}</p>
                              <p className="text-sm font-mono">{paymentSettings.iban}</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => handleCopy(paymentSettings.iban || "", "IBAN")}>
                              {copied === "IBAN" ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>

                        <div className="rounded-lg border border-border p-3 space-y-2">
                          <p className="text-sm font-semibold">M-Pesa</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">Nome: {paymentSettings.mpesa_name}</p>
                              <p className="text-sm font-mono">{paymentSettings.mpesa_number}</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => handleCopy(paymentSettings.mpesa_number || "", "M-Pesa")}>
                              {copied === "M-Pesa" ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>

                        {paymentSettings.payment_note && (
                          <p className="text-xs text-muted-foreground italic">{paymentSettings.payment_note}</p>
                        )}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Supporters list */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />Apoiadores
                </CardTitle>
              </CardHeader>
              <CardContent>
                {supports.filter(s => s.payment_status === "confirmed").length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">Seja o primeiro a apoiar!</p>
                ) : (
                  <div className="space-y-3">
                    {supports.filter(s => s.payment_status === "confirmed").slice(0, 10).map((s) => {
                      const sCoverage = Number(project.financial_goal) > 0
                        ? ((Number(s.amount) / Number(project.financial_goal)) * 100).toFixed(1)
                        : "0";
                      return (
                        <div key={s.id} className="flex items-center justify-between text-sm">
                          <div>
                            <span className="text-foreground">{(s.profiles as any)?.full_name || "Anónimo"}</span>
                            <p className="text-xs text-muted-foreground">{sCoverage}% da meta</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-primary">{formatMoney(Number(s.amount))}</span>
                            <Badge variant="outline" className="text-xs">
                              {s.support_type === "donation" ? "Doação" : `${s.partnership_percent}%`}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
