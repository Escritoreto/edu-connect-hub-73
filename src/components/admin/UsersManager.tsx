import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, Search, MessageSquare, Send } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { MessagesPanel } from "@/components/MessagesPanel";

interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  created_at: string;
}

export const UsersManager = ({ adminId }: { adminId: string }) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [messageUserId, setMessageUserId] = useState<string | null>(null);
  const [quickMessage, setQuickMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) {
      // Filter out the admin themselves
      setUsers(data.filter((u) => u.id !== adminId));
    }
    setLoading(false);
  };

  const deleteUser = async (userId: string) => {
    setDeletingId(userId);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/delete-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ user_id: userId }),
      });
      const result = await resp.json();
      if (!resp.ok) throw new Error(result.error);

      toast({ title: "Conta eliminada", description: "A conta do usuário foi removida permanentemente." });
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err: any) {
      toast({ title: "Erro ao eliminar conta", description: err.message, variant: "destructive" });
    } finally {
      setDeletingId(null);
    }
  };

  const sendQuickMessage = async () => {
    if (!messageUserId || !quickMessage.trim()) return;
    setSendingMessage(true);
    await supabase.from("messages").insert({
      sender_id: adminId,
      receiver_id: messageUserId,
      content: quickMessage.trim(),
    });
    // Also send a notification
    const user = users.find((u) => u.id === messageUserId);
    await supabase.from("notifications").insert({
      user_id: messageUserId,
      title: "Nova mensagem do Admin",
      message: quickMessage.trim().slice(0, 100),
      link: "/profile?tab=messages",
    });
    toast({ title: "Mensagem enviada!" });
    setQuickMessage("");
    setMessageUserId(null);
    setSendingMessage(false);
  };

  const filtered = users.filter((u) =>
    (u.full_name || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.email || "").toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar usuários..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <span className="text-sm text-muted-foreground">{filtered.length} usuários</span>
      </div>

      <div className="space-y-3">
        {filtered.map((user) => (
          <Card key={user.id} className="bg-slate-800/50 border-slate-700">
            <CardContent className="flex items-center justify-between py-4">
              <div>
                <p className="font-medium text-white">{user.full_name || "Sem nome"}</p>
                <p className="text-sm text-slate-400">{user.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-300 hover:text-white"
                  onClick={() => setMessageUserId(user.id)}
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Eliminar conta permanentemente?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação é irreversível. Todos os dados do usuário <strong>{user.full_name || user.email}</strong> serão apagados permanentemente.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteUser(user.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        disabled={deletingId === user.id}
                      >
                        {deletingId === user.id ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        Eliminar Permanentemente
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick message dialog */}
      <Dialog open={!!messageUserId} onOpenChange={(open) => { if (!open) setMessageUserId(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar mensagem</DialogTitle>
          </DialogHeader>
          <Textarea
            value={quickMessage}
            onChange={(e) => setQuickMessage(e.target.value)}
            placeholder="Digite sua mensagem para o usuário..."
            rows={4}
          />
          <DialogFooter>
            <Button onClick={sendQuickMessage} disabled={!quickMessage.trim() || sendingMessage}>
              {sendingMessage ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
              Enviar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
