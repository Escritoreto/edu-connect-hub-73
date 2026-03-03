import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Lightbulb, TrendingUp, Send, Banknote, Heart } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface MyProjectsSectionProps {
  userId: string;
}

export const MyProjectsSection = ({ userId }: MyProjectsSectionProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [myProjects, setMyProjects] = useState<any[]>([]);
  const [mySupports, setMySupports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updateContent, setUpdateContent] = useState<Record<string, string>>({});
  const [postingUpdate, setPostingUpdate] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    setLoading(true);
    const [projectsRes, supportsRes] = await Promise.all([
      supabase.from("projects").select("*").eq("creator_id", userId).order("created_at", { ascending: false }),
      supabase.from("project_supports").select("*, projects:project_id(title, status)").eq("supporter_id", userId).order("created_at", { ascending: false }),
    ]);
    if (projectsRes.data) setMyProjects(projectsRes.data);
    if (supportsRes.data) setMySupports(supportsRes.data);
    setLoading(false);
  };

  const postUpdate = async (projectId: string) => {
    const content = updateContent[projectId]?.trim();
    if (!content) return;
    setPostingUpdate(projectId);
    const { error } = await supabase.from("project_updates").insert({
      project_id: projectId,
      creator_id: userId,
      content,
    });
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Atualização publicada!" });
      setUpdateContent((prev) => ({ ...prev, [projectId]: "" }));
    }
    setPostingUpdate(null);
  };

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("pt-MZ", { style: "currency", currency: "MZN" }).format(val);

  if (loading) {
    return <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  }

  return (
    <>
      {/* My Projects */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary" />Meus Projetos</CardTitle>
              <CardDescription>Projetos de inovação/negócio que você submeteu</CardDescription>
            </div>
            <Button size="sm" onClick={() => navigate("/projects/new")}>
              <Plus className="h-4 w-4 mr-1" />Novo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {myProjects.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Você ainda não submeteu nenhum projeto</p>
              <Button variant="outline" className="mt-4" onClick={() => navigate("/projects/new")}>Submeter Ideia</Button>
            </div>
          ) : (
            <div className="space-y-6">
              {myProjects.map((p) => (
                <div key={p.id} className="border border-border rounded-lg p-4 space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="cursor-pointer" onClick={() => navigate(`/projects/${p.id}`)}>
                      <h3 className="font-semibold text-foreground hover:text-primary transition-colors">{p.title}</h3>
                      <p className="text-sm text-muted-foreground">{p.short_description}</p>
                    </div>
                    <Badge variant={p.status === "approved" ? "default" : p.status === "pending" ? "secondary" : "destructive"} className="shrink-0">
                      {p.status === "pending" ? "Pendente" : p.status === "approved" ? "Aprovado" : "Rejeitado"}
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{formatMoney(Number(p.current_amount))}</span>
                      <span>{formatMoney(Number(p.financial_goal))}</span>
                    </div>
                    <Progress value={Number(p.financial_goal) > 0 ? Math.min((Number(p.current_amount) / Number(p.financial_goal)) * 100, 100) : 0} className="h-2" />
                  </div>

                  {/* Post update */}
                  {p.status === "approved" && (
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />Publicar atualização
                      </p>
                      <Textarea
                        placeholder="Partilhe o progresso do seu projeto..."
                        value={updateContent[p.id] || ""}
                        onChange={(e) => setUpdateContent((prev) => ({ ...prev, [p.id]: e.target.value }))}
                        rows={2}
                      />
                      <Button
                        size="sm"
                        onClick={() => postUpdate(p.id)}
                        disabled={postingUpdate === p.id || !updateContent[p.id]?.trim()}
                      >
                        {postingUpdate === p.id ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Send className="h-3 w-3 mr-1" />}
                        Publicar
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* My Supports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5 text-primary" />Meus Apoios</CardTitle>
          <CardDescription>Projetos que você apoiou financeiramente</CardDescription>
        </CardHeader>
        <CardContent>
          {mySupports.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Heart className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Você ainda não apoiou nenhum projeto</p>
              <Button variant="outline" className="mt-4" onClick={() => navigate("/projects")}>Explorar Projetos</Button>
            </div>
          ) : (
            <div className="space-y-3">
              {mySupports.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => navigate(`/projects/${s.project_id}`)}>
                  <div>
                    <p className="font-medium text-sm text-foreground">{(s.projects as any)?.title || "Projeto"}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {s.support_type === "donation" ? "Doação" : `Participação ${s.partnership_percent}%`}
                      </Badge>
                      <Badge variant={s.payment_status === "confirmed" ? "default" : "secondary"} className="text-xs">
                        {s.payment_status === "confirmed" ? "Confirmado" : "Pendente"}
                      </Badge>
                    </div>
                  </div>
                  <span className="font-semibold text-primary">{formatMoney(Number(s.amount))}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};
