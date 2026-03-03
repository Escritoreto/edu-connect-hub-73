import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Check, X, Eye, Banknote, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const ProjectsManager = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [supports, setSupports] = useState<any[]>([]);
  const [loadingSupports, setLoadingSupports] = useState(false);

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("projects")
      .select("*, profiles:creator_id(full_name, email)")
      .order("created_at", { ascending: false });
    if (data) setProjects(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("projects").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: `Projeto ${status === "approved" ? "aprovado" : "rejeitado"}!` });
      fetchProjects();
    }
  };

  const fetchSupports = async (projectId: string) => {
    setLoadingSupports(true);
    const { data } = await supabase
      .from("project_supports")
      .select("*, profiles:supporter_id(full_name, email)")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });
    if (data) setSupports(data);
    setLoadingSupports(false);
  };

  const confirmPayment = async (supportId: string, projectId: string, amount: number) => {
    // Confirm payment
    const { error } = await supabase.from("project_supports")
      .update({ payment_status: "confirmed" })
      .eq("id", supportId);

    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
      return;
    }

    // Update project current_amount
    const project = projects.find(p => p.id === projectId);
    if (project) {
      const newAmount = Number(project.current_amount) + amount;
      await supabase.from("projects")
        .update({ current_amount: newAmount })
        .eq("id", projectId);
    }

    // Notify supporter
    const support = supports.find(s => s.id === supportId);
    if (support) {
      const proj = projects.find(p => p.id === projectId);
      const coverage = proj && Number(proj.financial_goal) > 0
        ? ((amount / Number(proj.financial_goal)) * 100).toFixed(1)
        : "0";
      await supabase.from("notifications").insert({
        user_id: support.supporter_id,
        title: "Pagamento confirmado!",
        message: `Seu apoio de ${formatMoney(amount)} foi confirmado. Cobriu ${coverage}% da meta do projeto.`,
        link: `/projects/${projectId}`,
      });
    }

    toast({ title: "Pagamento confirmado!" });
    fetchSupports(projectId);
    fetchProjects();
  };

  const rejectPayment = async (supportId: string, projectId: string) => {
    const { error } = await supabase.from("project_supports")
      .update({ payment_status: "rejected" })
      .eq("id", supportId);

    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
      return;
    }

    const support = supports.find(s => s.id === supportId);
    if (support) {
      await supabase.from("notifications").insert({
        user_id: support.supporter_id,
        title: "Pagamento não confirmado",
        message: `Seu pagamento de ${formatMoney(Number(support.amount))} não foi confirmado. Entre em contacto com o suporte.`,
        link: `/projects/${projectId}`,
      });
    }

    toast({ title: "Pagamento rejeitado" });
    fetchSupports(projectId);
  };

  const handleViewSupports = (project: any) => {
    setSelectedProject(project);
    fetchSupports(project.id);
  };

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("pt-MZ", { style: "currency", currency: "MZN" }).format(val);

  if (loading) return <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-4">
      {projects.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">Nenhum projeto submetido</p>
      ) : (
        projects.map((p) => {
          const coverage = Number(p.financial_goal) > 0
            ? ((Number(p.current_amount) / Number(p.financial_goal)) * 100).toFixed(1)
            : "0";
          return (
            <Card key={p.id}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">{p.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{p.short_description || p.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2 text-xs text-muted-foreground">
                      <span>Por: {(p.profiles as any)?.full_name || (p.profiles as any)?.email}</span>
                      <span>•</span>
                      <span>Meta: {formatMoney(Number(p.financial_goal))}</span>
                      <span>•</span>
                      <span>Arrecadado: {formatMoney(Number(p.current_amount))} ({coverage}%)</span>
                      <span>•</span>
                      <span>{format(new Date(p.created_at), "dd/MM/yyyy", { locale: ptBR })}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={p.status === "approved" ? "default" : p.status === "pending" ? "secondary" : "destructive"}>
                      {p.status === "pending" ? "Pendente" : p.status === "approved" ? "Aprovado" : "Rejeitado"}
                    </Badge>
                    <Button size="sm" variant="outline" onClick={() => handleViewSupports(p)}>
                      <Banknote className="h-3 w-3 mr-1" />Pagamentos
                    </Button>
                    {p.status === "pending" && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => updateStatus(p.id, "approved")}>
                          <Check className="h-3 w-3 mr-1" />Aprovar
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => updateStatus(p.id, "rejected")}>
                          <X className="h-3 w-3 mr-1" />Rejeitar
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })
      )}

      {/* Supports/Payments Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => { if (!open) setSelectedProject(null); }}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Banknote className="h-5 w-5 text-primary" />
              Pagamentos — {selectedProject?.title}
            </DialogTitle>
          </DialogHeader>
          {loadingSupports ? (
            <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : supports.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Nenhum apoio registado</p>
          ) : (
            <div className="space-y-3">
              {supports.map((s) => {
                const sCoverage = selectedProject && Number(selectedProject.financial_goal) > 0
                  ? ((Number(s.amount) / Number(selectedProject.financial_goal)) * 100).toFixed(1)
                  : "0";
                return (
                  <div key={s.id} className="p-4 border border-border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{(s.profiles as any)?.full_name || "Anónimo"}</p>
                        <p className="text-xs text-muted-foreground">{(s.profiles as any)?.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{formatMoney(Number(s.amount))}</p>
                        <p className="text-xs text-muted-foreground">{sCoverage}% da meta</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {s.support_type === "donation" ? "Doação" : `Participação: ${s.partnership_percent}%`}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(s.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                        </span>
                      </div>
                      {s.payment_status === "pending" ? (
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30">
                            <Clock className="h-3 w-3 mr-1" />Pendente
                          </Badge>
                          <Button size="sm" variant="outline" className="text-green-600 border-green-500/30 hover:bg-green-500/10"
                            onClick={() => confirmPayment(s.id, selectedProject.id, Number(s.amount))}>
                            <CheckCircle2 className="h-3 w-3 mr-1" />Confirmar
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => rejectPayment(s.id, selectedProject.id)}>
                            <X className="h-3 w-3 mr-1" />Rejeitar
                          </Button>
                        </div>
                      ) : s.payment_status === "confirmed" ? (
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/30">
                          <CheckCircle2 className="h-3 w-3 mr-1" />Confirmado
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          <AlertCircle className="h-3 w-3 mr-1" />Rejeitado
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
