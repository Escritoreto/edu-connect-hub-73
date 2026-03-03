import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Rocket, Send, Eye, Heart } from "lucide-react";

const MyProjects = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [myProjects, setMyProjects] = useState<any[]>([]);
  const [supportedProjects, setSupportedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updateText, setUpdateText] = useState<Record<string, string>>({});
  const [sendingUpdate, setSendingUpdate] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
    if (user) fetchData();
  }, [user, authLoading]);

  const fetchData = async () => {
    const [projectsRes, supportsRes] = await Promise.all([
      supabase.from("projects").select("*").eq("creator_id", user!.id).order("created_at", { ascending: false }),
      supabase.from("project_supports").select("*, projects(*)").eq("supporter_id", user!.id).order("created_at", { ascending: false }),
    ]);
    setMyProjects(projectsRes.data || []);
    setSupportedProjects(supportsRes.data || []);
    setLoading(false);
  };

  const sendUpdate = async (projectId: string) => {
    const text = updateText[projectId];
    if (!text?.trim()) return;
    setSendingUpdate(projectId);

    const { error } = await supabase.from("project_updates").insert({
      project_id: projectId,
      creator_id: user!.id,
      content: text,
    });

    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Atualização publicada!" });
      setUpdateText(prev => ({ ...prev, [projectId]: "" }));
      // Update last_update_at
      await supabase.from("projects").update({ last_update_at: new Date().toISOString() }).eq("id", projectId);
    }
    setSendingUpdate(null);
  };

  const statusLabel: Record<string, string> = { pending: "Pendente", approved: "Aprovado", rejected: "Rejeitado", completed: "Concluído", cancelled: "Cancelado" };
  const statusVariant = (s: string) => s === "approved" ? "default" : s === "rejected" ? "destructive" : "secondary";

  if (authLoading || loading) return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-8">
        <div className="container max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Meus Projetos</h1>
            <Button asChild><Link to="/projects/new"><Plus className="h-4 w-4 mr-2" />Novo Projeto</Link></Button>
          </div>

          <Tabs defaultValue="created">
            <TabsList>
              <TabsTrigger value="created"><Rocket className="h-4 w-4 mr-2" />Criados ({myProjects.length})</TabsTrigger>
              <TabsTrigger value="supported"><Heart className="h-4 w-4 mr-2" />Apoiados ({supportedProjects.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="created" className="mt-6 space-y-4">
              {myProjects.length === 0 ? (
                <div className="text-center py-12">
                  <Rocket className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">Você ainda não criou nenhum projeto</p>
                  <Button asChild className="mt-4"><Link to="/projects/new">Criar Projeto</Link></Button>
                </div>
              ) : myProjects.map(p => {
                const progress = Number(p.financial_goal) > 0 ? Math.min((Number(p.current_amount) / Number(p.financial_goal)) * 100, 100) : 0;
                return (
                  <Card key={p.id}>
                    <CardContent className="p-5 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={statusVariant(p.status) as any}>{statusLabel[p.status]}</Badge>
                            <Badge variant="outline">{p.category}</Badge>
                          </div>
                          <h3 className="font-bold text-lg">{p.title}</h3>
                          <p className="text-sm text-muted-foreground">{p.short_description}</p>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/projects/${p.id}`}><Eye className="h-4 w-4" /></Link>
                        </Button>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>{Number(p.current_amount).toLocaleString("pt-MZ")} MT</span>
                          <span>{Number(p.financial_goal).toLocaleString("pt-MZ")} MT</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      {p.status === "approved" && (
                        <div className="flex gap-2">
                          <Textarea
                            placeholder="Publique uma atualização sobre o progresso..."
                            value={updateText[p.id] || ""}
                            onChange={e => setUpdateText(prev => ({ ...prev, [p.id]: e.target.value }))}
                            className="h-16 text-sm"
                          />
                          <Button size="sm" onClick={() => sendUpdate(p.id)} disabled={sendingUpdate === p.id || !updateText[p.id]?.trim()}>
                            {sendingUpdate === p.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>

            <TabsContent value="supported" className="mt-6 space-y-4">
              {supportedProjects.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">Você ainda não apoiou nenhum projeto</p>
                  <Button asChild className="mt-4"><Link to="/projects">Explorar Projetos</Link></Button>
                </div>
              ) : supportedProjects.map((s: any) => (
                <Card key={s.id}>
                  <CardContent className="p-4 flex items-center justify-between gap-4">
                    <div>
                      <Link to={`/projects/${s.project_id}`} className="font-semibold hover:text-primary transition-colors">
                        {(s as any).projects?.title || "Projeto"}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={s.support_type === "donation" ? "secondary" : "default"} className="text-xs">
                          {s.support_type === "donation" ? "Doação" : "Parceria"}
                        </Badge>
                        <span className="text-sm font-medium">{Number(s.amount).toLocaleString("pt-MZ")} MT</span>
                        {s.support_type === "partnership" && <span className="text-xs text-muted-foreground">({Number(s.partnership_percent).toFixed(2)}%)</span>}
                      </div>
                    </div>
                    <Badge variant={s.payment_status === "confirmed" ? "default" : "outline"}>
                      {s.payment_status === "pending" ? "Pendente" : s.payment_status === "paid" ? "Pago" : s.payment_status === "confirmed" ? "Confirmado" : "Rejeitado"}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyProjects;
