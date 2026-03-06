import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, Search, MessageSquare, Send, UserCheck, Eye } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  profile_edit_allowed: boolean;
}

export const UsersManager = ({ adminId }: { adminId: string }) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [messageUserId, setMessageUserId] = useState<string | null>(null);
  const [viewingUser, setViewingUser] = useState<UserProfile | null>(null);
  const [quickMessage, setQuickMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const { toast } = useToast();

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    if (data) setUsers(data.filter((u: any) => u.id !== adminId));
    setLoading(false);
  };

  const deleteUser = async (userId: string) => {
    setDeletingId(userId);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/delete-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token}` },
        body: JSON.stringify({ user_id: userId }),
      });
      const result = await resp.json();
      if (!resp.ok) throw new Error(result.error);
      toast({ title: "Conta eliminada" });
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err: any) {
      toast({ title: "Erro ao eliminar conta", description: err.message, variant: "destructive" });
    } finally { setDeletingId(null); }
  };

  const sendQuickMessage = async () => {
    if (!messageUserId || !quickMessage.trim()) return;
    setSendingMessage(true);
    await supabase.from("messages").insert({ sender_id: adminId, receiver_id: messageUserId, content: quickMessage.trim() });
    await supabase.from("notifications").insert({ user_id: messageUserId, title: "Nova mensagem do Admin", message: quickMessage.trim().slice(0, 100), link: "/profile?tab=messages" });
    toast({ title: "Mensagem enviada!" });
    setQuickMessage("");
    setMessageUserId(null);
    setSendingMessage(false);
  };

  const allowProfileEdit = async (userId: string) => {
    const { error } = await supabase.from("profiles").update({ profile_edit_allowed: true } as any).eq("id", userId);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      await supabase.from("notifications").insert({ user_id: userId, title: "Edição de perfil liberada", message: "O administrador liberou a edição do seu nome e número de celular. Acesse seu perfil para atualizar.", link: "/profile?tab=profile" });
      toast({ title: "Edição liberada!" });
      fetchUsers();
    }
  };

  const filtered = users.filter((u) =>
    (u.full_name || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.email || "").toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar usuários..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <span className="text-sm text-muted-foreground">{filtered.length} usuários</span>
      </div>

      <div className="space-y-3">
        {filtered.map((user) => (
          <Card key={user.id} className="bg-slate-800/50 border-slate-700">
            <CardContent className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar_url || ""} />
                  <AvatarFallback className="text-sm">{(user.full_name || user.email || "?").charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">{user.full_name || "Sem nome"}</p>
                  <p className="text-sm text-slate-400">{user.email}</p>
                  {user.phone && <p className="text-xs text-slate-500">{user.phone}</p>}
                </div>
                {user.profile_edit_allowed && <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-[10px]">Edição ativa</Badge>}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20" onClick={() => setViewingUser(user)} title="Ver perfil">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-900/20" onClick={() => allowProfileEdit(user.id)} title="Liberar edição de perfil">
                  <UserCheck className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white" onClick={() => setMessageUserId(user.id)}>
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300 hover:bg-red-900/20"><Trash2 className="h-4 w-4" /></Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Eliminar conta permanentemente?</AlertDialogTitle>
                      <AlertDialogDescription>Todos os dados de <strong>{user.full_name || user.email}</strong> serão apagados.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteUser(user.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90" disabled={deletingId === user.id}>
                        {deletingId === user.id ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Profile Dialog */}
      <Dialog open={!!viewingUser} onOpenChange={(open) => { if (!open) setViewingUser(null); }}>
        <DialogContent>
          <DialogHeader><DialogTitle>Perfil do Usuário</DialogTitle></DialogHeader>
          {viewingUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={viewingUser.avatar_url || ""} />
                  <AvatarFallback>{(viewingUser.full_name || "?").charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-lg">{viewingUser.full_name || "Sem nome"}</p>
                  <p className="text-sm text-muted-foreground">{viewingUser.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Telefone:</span><p className="font-medium">{viewingUser.phone || "Não informado"}</p></div>
                <div><span className="text-muted-foreground">Registrado em:</span><p className="font-medium">{new Date(viewingUser.created_at).toLocaleDateString("pt-BR")}</p></div>
                <div><span className="text-muted-foreground">Edição perfil:</span><p className="font-medium">{viewingUser.profile_edit_allowed ? "Liberada" : "Bloqueada"}</p></div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Quick message dialog */}
      <Dialog open={!!messageUserId} onOpenChange={(open) => { if (!open) setMessageUserId(null); }}>
        <DialogContent>
          <DialogHeader><DialogTitle>Enviar mensagem</DialogTitle></DialogHeader>
          <Textarea value={quickMessage} onChange={(e) => setQuickMessage(e.target.value)} placeholder="Digite sua mensagem..." rows={4} />
          <DialogFooter>
            <Button onClick={sendQuickMessage} disabled={!quickMessage.trim() || sendingMessage}>
              {sendingMessage ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}Enviar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
