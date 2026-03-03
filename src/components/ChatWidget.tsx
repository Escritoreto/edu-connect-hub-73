import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Loader2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-support`;

// Notify admin about a new visitor (once per session)
const notifyAdminVisitor = async () => {
  const sessionKey = "upmentor_visitor_notified";
  if (sessionStorage.getItem(sessionKey)) return;
  sessionStorage.setItem(sessionKey, "1");

  try {
    // Get admin user ids
    const { data: admins } = await supabase
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin");

    if (!admins || admins.length === 0) return;

    const now = new Date();
    const timeStr = now.toLocaleString("pt-MZ", { dateStyle: "short", timeStyle: "short" });
    const page = window.location.pathname;

    for (const admin of admins) {
      await supabase.from("notifications").insert({
        user_id: admin.user_id,
        title: "Novo visitante no site",
        message: `Um dispositivo acessou o site em ${timeStr} na página ${page}`,
        link: "/admin",
      });
    }
  } catch (e) {
    console.error("Visitor notification error:", e);
  }
};

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    role: "assistant",
    content: "Olá! 👋 Precisa de ajuda? Posso responder sobre bolsas de estudo, cursos, ou como usar nosso site."
  }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Dragging state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number } | null>(null);

  // Initialize position (bottom-right) and send visitor notification
  useEffect(() => {
    setPosition({
      x: window.innerWidth - 80,
      y: window.innerHeight - 80,
    });
    notifyAdminVisitor();
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: position.x,
      startPosY: position.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [position]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || !dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    const newX = Math.max(28, Math.min(window.innerWidth - 28, dragRef.current.startPosX + dx));
    const newY = Math.max(28, Math.min(window.innerHeight - 28, dragRef.current.startPosY + dy));
    setPosition({ x: newX, y: newY });
  }, [isDragging]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = Math.abs(e.clientX - dragRef.current.startX);
    const dy = Math.abs(e.clientY - dragRef.current.startY);
    setIsDragging(false);
    if (dx < 5 && dy < 5 && !isOpen) {
      setIsOpen(true);
    }
    dragRef.current = null;
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    let assistantContent = "";
    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });
      if (!resp.ok || !resp.body) throw new Error("Falha ao conectar");
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: assistantContent };
                return updated;
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Desculpe, ocorreu um erro. Por favor, tente novamente ou deixe seu WhatsApp/email para contato."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const chatWindowStyle = (): React.CSSProperties => {
    const windowW = window.innerWidth;
    const windowH = window.innerHeight;
    const chatW = Math.min(350, windowW - 32);
    const chatH = Math.min(500, windowH - 96);

    let left = position.x - chatW + 28;
    let top = position.y - chatH - 20;

    if (left < 16) left = 16;
    if (left + chatW > windowW - 16) left = windowW - chatW - 16;
    if (top < 16) {
      top = position.y + 40;
    }
    if (top + chatH > windowH - 16) top = windowH - chatH - 16;

    return { left, top, width: chatW, height: chatH };
  };

  return <>
    {/* Draggable Chat Button */}
    <div
      className={`fixed z-50 touch-none select-none ${isOpen ? "hidden" : ""}`}
      style={{ left: position.x - 28, top: position.y - 28 }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform flex items-center justify-center cursor-grab active:cursor-grabbing">
        <MessageCircle className="w-6 h-6" />
      </div>
    </div>

    {/* Chat Window */}
    {isOpen && (
      <div
        className="fixed z-50 bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        style={chatWindowStyle()}
      >
        <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between cursor-grab active:cursor-grabbing"
          onPointerDown={(e) => {
            setIsDragging(true);
            dragRef.current = {
              startX: e.clientX,
              startY: e.clientY,
              startPosX: position.x,
              startPosY: position.y,
            };
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
          }}
          onPointerMove={handlePointerMove}
          onPointerUp={(e) => {
            setIsDragging(false);
            dragRef.current = null;
          }}
        >
          <div className="flex items-center gap-2">
            <GripVertical className="w-4 h-4 opacity-60" />
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="font-medium">Assistente UpMentor</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-primary-foreground/20 rounded-full p-1 transition-colors" aria-label="Fechar chat">
            <X className="w-5 h-5" />
          </button>
        </div>

        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-md" : "bg-muted text-foreground rounded-bl-md"}`}>
                  {msg.content || (isLoading && i === messages.length - 1 ? <Loader2 className="w-4 h-4 animate-spin" /> : null)}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Digite sua mensagem..." disabled={isLoading} className="flex-1" />
            <Button onClick={sendMessage} disabled={!input.trim() || isLoading} size="icon" className="shrink-0">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    )}
  </>;
};
