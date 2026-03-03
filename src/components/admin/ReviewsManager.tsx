import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Star, CheckCircle2, XCircle, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const ReviewsManager = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_reviews")
      .select("*, profiles:user_id (full_name, email, avatar_url)")
      .order("created_at", { ascending: false });
    if (!error && data) setReviews(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("site_reviews").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: status === "approved" ? "Avaliação aprovada!" : "Avaliação rejeitada" });
      fetchReviews();
    }
  };

  const deleteReview = async (id: string) => {
    const { error } = await supabase.from("site_reviews").delete().eq("id", id);
    if (!error) {
      toast({ title: "Avaliação eliminada" });
      fetchReviews();
    }
  };

  if (loading) return <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin" /></div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Star className="h-5 w-5" />Avaliações dos Usuários</CardTitle>
        <CardDescription>Gerencie as avaliações enviadas pelos usuários para exibição na página inicial</CardDescription>
      </CardHeader>
      <CardContent>
        {reviews.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">Nenhuma avaliação recebida</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="p-4 border border-border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{review.profiles?.full_name || review.profiles?.email || "Usuário"}</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(review.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={review.status === "approved" ? "default" : review.status === "pending" ? "secondary" : "destructive"}>
                      {review.status === "approved" ? "Aprovada" : review.status === "pending" ? "Pendente" : "Rejeitada"}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-secondary text-secondary" : "text-muted-foreground/30"}`} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic">"{review.text}"</p>
                <div className="flex gap-2">
                  {review.status !== "approved" && (
                    <Button size="sm" variant="outline" className="text-green-600" onClick={() => updateStatus(review.id, "approved")}>
                      <CheckCircle2 className="h-4 w-4 mr-1" />Aprovar
                    </Button>
                  )}
                  {review.status !== "rejected" && (
                    <Button size="sm" variant="outline" className="text-destructive" onClick={() => updateStatus(review.id, "rejected")}>
                      <XCircle className="h-4 w-4 mr-1" />Rejeitar
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" className="text-destructive" onClick={() => deleteReview(review.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewsManager;
