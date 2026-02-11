import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Loader2, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

interface Props {
  currentUserId: string;
  targetUserId?: string;
  isAdmin?: boolean;
}

export const MessagesPanel = ({ currentUserId, targetUserId, isAdmin }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<{ userId: string; name: string; email: string; unread: number }[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(targetUserId || null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAdmin) {
      fetchConversations();
    } else {
      // Regular user — find an admin to talk to
      findAdmin();
    }

    const channel = supabase
      .channel("messages-" + currentUserId)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
        const msg = payload.new as Message;
        if (msg.sender_id === currentUserId || msg.receiver_id === currentUserId) {
          setMessages((prev) => [...prev, msg]);
          if (isAdmin) fetchConversations();
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [currentUserId]);

  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser);
  }, [selectedUser]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const findAdmin = async () => {
    const { data } = await supabase.from("user_roles").select("user_id").eq("role", "admin").limit(1);
    if (data?.[0]) {
      setSelectedUser(data[0].user_id);
    }
    setLoading(false);
  };

  const fetchConversations = async () => {
    const { data: msgs } = await supabase
      .from("messages")
      .select("sender_id, receiver_id, is_read")
      .or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`)
      .order("created_at", { ascending: false });

    if (!msgs) { setLoading(false); return; }

    const userIds = new Set<string>();
    msgs.forEach((m) => {
      if (m.sender_id !== currentUserId) userIds.add(m.sender_id);
      if (m.receiver_id !== currentUserId) userIds.add(m.receiver_id);
    });

    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name, email")
      .in("id", Array.from(userIds));

    const convos = Array.from(userIds).map((uid) => {
      const profile = profiles?.find((p) => p.id === uid);
      const unread = msgs.filter((m) => m.sender_id === uid && m.receiver_id === currentUserId && !m.is_read).length;
      return {
        userId: uid,
        name: profile?.full_name || "Usuário",
        email: profile?.email || "",
        unread,
      };
    });

    setConversations(convos);
    setLoading(false);
  };

  const fetchMessages = async (userId: string) => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .or(`and(sender_id.eq.${currentUserId},receiver_id.eq.${userId}),and(sender_id.eq.${userId},receiver_id.eq.${currentUserId})`)
      .order("created_at", { ascending: true });
    if (data) {
      setMessages(data);
      // Mark as read
      const unreadIds = data.filter((m) => m.receiver_id === currentUserId && !m.is_read).map((m) => m.id);
      if (unreadIds.length > 0) {
        await supabase.from("messages").update({ is_read: true }).in("id", unreadIds);
      }
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !selectedUser || sending) return;
    setSending(true);
    await supabase.from("messages").insert({
      sender_id: currentUserId,
      receiver_id: selectedUser,
      content: input.trim(),
    });
    // Create notification for the receiver
    const notifTitle = isAdmin ? "Nova mensagem do Admin" : "Nova mensagem";
    await supabase.from("notifications").insert({
      user_id: selectedUser,
      title: notifTitle,
      message: input.trim().slice(0, 100),
      link: isAdmin ? "/profile" : "/admin",
    }).then(() => {});
    setInput("");
    setSending(false);
  };

  if (loading) {
    return <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Mensagens
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 h-[400px]">
          {isAdmin && (
            <div className="w-48 border-r border-border pr-4 overflow-y-auto shrink-0">
              {conversations.length === 0 ? (
                <p className="text-xs text-muted-foreground">Sem conversas</p>
              ) : (
                conversations.map((c) => (
                  <button
                    key={c.userId}
                    onClick={() => setSelectedUser(c.userId)}
                    className={`w-full text-left p-2 rounded text-sm hover:bg-muted/50 transition-colors mb-1 ${selectedUser === c.userId ? "bg-muted" : ""}`}
                  >
                    <p className="font-medium truncate">{c.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{c.email}</p>
                    {c.unread > 0 && (
                      <span className="inline-block bg-destructive text-destructive-foreground text-xs rounded-full px-2 mt-1">
                        {c.unread}
                      </span>
                    )}
                  </button>
                ))
              )}
            </div>
          )}

          <div className="flex-1 flex flex-col min-w-0">
            {!selectedUser ? (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
                Selecione uma conversa
              </div>
            ) : (
              <>
                <ScrollArea className="flex-1 pr-2" ref={scrollRef}>
                  <div className="space-y-3 p-2">
                    {messages.length === 0 && (
                      <p className="text-center text-sm text-muted-foreground py-8">
                        Nenhuma mensagem ainda. Envie a primeira!
                      </p>
                    )}
                    {messages.map((m) => (
                      <div key={m.id} className={`flex ${m.sender_id === currentUserId ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${m.sender_id === currentUserId ? "bg-primary text-primary-foreground rounded-br-md" : "bg-muted text-foreground rounded-bl-md"}`}>
                          <p>{m.content}</p>
                          <p className="text-[10px] opacity-70 mt-1">
                            {format(new Date(m.created_at), "dd/MM HH:mm", { locale: ptBR })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="flex gap-2 mt-3">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                    placeholder="Digite sua mensagem..."
                    disabled={sending}
                  />
                  <Button onClick={sendMessage} disabled={!input.trim() || sending} size="icon">
                    {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">Mensagens são apagadas automaticamente após 30 dias</p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
