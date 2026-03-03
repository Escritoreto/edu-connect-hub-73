import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, XCircle, Eye, Rocket, Users, TrendingUp } from "lucide-react";

const ProjectsManager = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<any[]>([]);
  const [supports, setSupports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("pending");

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const [projectsRes, supportsRes] = await Promise.all([
      supabase.from("projects").select("*").order("created_at", { ascending: false }),
      supabase.from("project_supports").select("*, projects(title)").order("created_at", { ascending: false }),
    ]);
    setProjects(projectsRes.data || []);
    setSupports(supportsRes.data || []);
    setLoading(false);
  };

  const updateProjectStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("projects").update({ status }).eq("id", id);
    if (error) toast({ title: "Erro", description: error.message, variant: "destructive" });
    else {
      toast({ title: `Projeto ${status === "approved" ? "aprovado" : "rejeitado"}!` });
      fetchData();
    }
  };

  const updatePaymentStatus = async (supportId: string, paymentStatus: string, projectId: string, amount: number) => {
    const { error } = await supabase.from("project_supports").update({ payment_status: paymentStatus }).eq("id", supportId);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" }); return;
    }
    // If confirmed, update project current_amount
    if (paymentStatus === "confirmed") {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        await supabase.from("projects").update({
          current_amount: Number(project.current_amount) + amount
        }).eq("id", projectId);
      }
    }
    toast({ title: "Status atualizado!" });
    fetchData();
  };

  const filtered = projects.filter(p => {
    if (tab === "pending") return p.status === "pending";
    if (tab === "approved") return p.status === "approved";
    return true;
  });

  if (loading) return <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-amber-400" /></div>;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-white">{projects.length}</p>
            <p className="text-xs text-slate-400">Total</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-400">{projects.filter(p => p.status === "pending").length}</p>
            <p className="text-xs text-slate-400">Pendentes</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-400">{projects.filter(p => p.status === "approved").length}</p>
            <p className="text-xs text-slate-400">Aprovados</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">{supports.length}</p>
            <p className="text-xs text-slate-400">Apoios</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-slate-800/50">
          <TabsTrigger value="pending" className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">Pendentes</TabsTrigger>
          <TabsTrigger value="approved" className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">Aprovados</TabsTrigger>
          <TabsTrigger value="all" className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">Todos</TabsTrigger>
          <TabsTrigger value="supports" className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">Apoios</TabsTrigger>
        </TabsList>

        <TabsContent value="supports" className="mt-4 space-y-3">
          {supports.length === 0 ? (
            <p className="text-center text-slate-400 py-8">Nenhum apoio registado</p>
          ) : supports.map(s => (
            <Card key={s.id} className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <p className="text-white font-medium text-sm">{(s as any).projects?.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={s.support_type === "donation" ? "secondary" : "default"} className="text-xs">
                      {s.support_type === "donation" ? "Doação" : "Parceria"}
                    </Badge>
                    <span className="text-sm text-white font-bold">{Number(s.amount).toLocaleString("pt-MZ")} MT</span>
                    {s.support_type === "partnership" && <span className="text-xs text-slate-400">({Number(s.partnership_percent).toFixed(2)}%)</span>}
                  </div>
                </div>
                <Select
                  value={s.payment_status}
                  onValueChange={val => updatePaymentStatus(s.id, val, s.project_id, Number(s.amount))}
                >
                  <SelectTrigger className="w-36 bg-slate-700 border-slate-600 text-white text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="paid">Pago</SelectItem>
                    <SelectItem value="confirmed">Confirmado</SelectItem>
                    <SelectItem value="rejected">Rejeitado</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {["pending", "approved", "all"].map(tabKey => (
          <TabsContent key={tabKey} value={tabKey} className="mt-4 space-y-3">
            {filtered.length === 0 ? (
              <p className="text-center text-slate-400 py-8">Nenhum projeto</p>
            ) : filtered.map(p => {
              const progress = Number(p.financial_goal) > 0 ? Math.min((Number(p.current_amount) / Number(p.financial_goal)) * 100, 100) : 0;
              return (
                <Card key={p.id} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <Badge variant={p.status === "approved" ? "default" : p.status === "rejected" ? "destructive" : "secondary"} className="text-xs">
                            {p.status === "pending" ? "Pendente" : p.status === "approved" ? "Aprovado" : p.status === "rejected" ? "Rejeitado" : p.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">{p.category}</Badge>
                          <Badge variant="outline" className="text-xs">
                            {p.support_type === "donation" ? "Doação" : p.support_type === "partnership" ? "Parceria" : "Ambos"}
                          </Badge>
                        </div>
                        <h3 className="font-bold text-white">{p.title}</h3>
                        <p className="text-xs text-slate-400 line-clamp-2">{p.short_description || p.description}</p>
                      </div>
                      {p.status === "pending" && (
                        <div className="flex gap-1 shrink-0">
                          <Button size="sm" variant="ghost" className="text-green-400 hover:bg-green-900/30" onClick={() => updateProjectStatus(p.id, "approved")}>
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-400 hover:bg-red-900/30" onClick={() => updateProjectStatus(p.id, "rejected")}>
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>{Number(p.current_amount).toLocaleString("pt-MZ")} MT</span>
                        <span>Meta: {Number(p.financial_goal).toLocaleString("pt-MZ")} MT</span>
                      </div>
                      <Progress value={progress} className="h-1.5" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ProjectsManager;
