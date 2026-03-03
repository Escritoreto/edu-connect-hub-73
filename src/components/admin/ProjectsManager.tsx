import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Check, X, Eye } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const ProjectsManager = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("pt-MZ", { style: "currency", currency: "MZN" }).format(val);

  if (loading) return <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-4">
      {projects.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">Nenhum projeto submetido</p>
      ) : (
        projects.map((p) => (
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
                    <span>Arrecadado: {formatMoney(Number(p.current_amount))}</span>
                    <span>•</span>
                    <span>{format(new Date(p.created_at), "dd/MM/yyyy", { locale: ptBR })}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={p.status === "approved" ? "default" : p.status === "pending" ? "secondary" : "destructive"}>
                    {p.status === "pending" ? "Pendente" : p.status === "approved" ? "Aprovado" : "Rejeitado"}
                  </Badge>
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
        ))
      )}
    </div>
  );
};
