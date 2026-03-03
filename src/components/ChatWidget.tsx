import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Loader2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-support`;

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
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

  // Initialize position and show hint after delay
  useEffect(() => {
    setPosition({
      x: window.innerWidth - 80,
      y: window.innerHeight - 80,
    });

    const hintKey = "upmentor_hint_shown";
    if (!sessionStorage.getItem(hintKey)) {
      const timer = setTimeout(() => {
        setShowHint(true);
        sessionStorage.setItem(hintKey, "1");
        // Auto-hide after 8 seconds
        setTimeout(() => setShowHint(false), 8000);
      }, 3000);
      return () => clearTimeout(timer);
    }
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
      setShowHint(false);
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
    {/* Hint bubble */}
    {showHint && !isOpen && (
      <div
        className="fixed z-50 animate-in fade-in slide-in-from-bottom-2 duration-500"
        style={{ left: position.x - 240, top: position.y - 60 }}
      >
        <div className="bg-card border border-border rounded-xl shadow-lg px-4 py-3 max-w-[220px] relative">
          <button
            onClick={() => setShowHint(false)}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors text-xs"
          >
            ✕
          </button>
          <p className="text-sm text-foreground font-medium">👋 Olá! Sou o assistente UpMentor</p>
          <p className="text-xs text-muted-foreground mt-1">
            Pergunte-me qualquer coisa sobre bolsas, cursos ou como usar a plataforma!
          </p>
          {/* Arrow pointing to button */}
          <div className="absolute -bottom-2 right-4 w-4 h-4 bg-card border-b border-r border-border rotate-45" />
        </div>
      </div>
    )}

    {/* Draggable Chat Button */}
    <div
      className={`fixed z-50 touch-none select-none ${isOpen ? "hidden" : ""}`}
      style={{ left: position.x - 28, top: position.y - 28 }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform flex items-center justify-center cursor-grab active:cursor-grabbing relative">
        <MessageCircle className="w-6 h-6" />
        {showHint && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse" />
        )}
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
