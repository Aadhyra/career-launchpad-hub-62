import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, X, Send, Loader2, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string; route?: { path: string; label: string } };

const QUICK = [
  "Which course fits me?",
  "Tell me about internships",
  "How does placement work?",
  "Fees & scholarships?",
];

const parseRoute = (text: string): { clean: string; route?: { path: string; label: string } } => {
  const m = text.match(/\[ROUTE:([^|\]]+)(?:\|([^\]]+))?\]/);
  if (!m) return { clean: text };
  const path = m[1].trim();
  const LABELS: Record<string, string> = {
    "/courses": "Explore Courses",
    "/internships": "View Internships",
    "/placement": "See Placement Services",
    "/careers": "Open Positions",
    "/apply": "Apply Now",
    "/contact": "Contact Us",
    "/verify": "Verify a Certificate",
    "/employer/register": "Register as Employer",
  };
  const label = (m[2] || "").trim() || LABELS[path] || "View page";
  return { clean: text.replace(m[0], "").trim(), route: { path, label } };
};

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi 👋 I'm Aadhyra Assistant. Ask me about courses, internships, placements or jobs!" },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const payload = next.map((m) => ({ role: m.role, content: m.content }));
      const { data, error } = await supabase.functions.invoke("ai-assistant", { body: { messages: payload } });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      const { clean, route } = parseRoute(data.text || "");
      setMessages((prev) => [...prev, { role: "assistant", content: clean, route }]);
    } catch (e: any) {
      toast.error(e.message || "Chat failed");
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "fixed bottom-5 right-5 z-[100] h-14 w-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300",
          "bg-primary text-primary-foreground hover:scale-110",
          open && "scale-0 opacity-0"
        )}
        aria-label="Open chat assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Window */}
      <div
        className={cn(
          "fixed bottom-5 right-5 z-[100] w-[calc(100vw-2.5rem)] sm:w-96 h-[70vh] max-h-[600px] bg-background border rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right",
          open ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-sm">Aadhyra Assistant</div>
              <div className="text-[11px] opacity-80">Usually replies instantly</div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close" className="p-1 rounded hover:bg-white/10">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
          {messages.map((m, i) => (
            <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[85%] space-y-2")}>
                <div
                  className={cn(
                    "rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap",
                    m.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-background border rounded-bl-sm"
                  )}
                >
                  {m.content}
                </div>
                {m.route && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      navigate(m.route!.path);
                      setOpen(false);
                    }}
                  >
                    {m.route.label} →
                  </Button>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-background border rounded-2xl rounded-bl-sm px-3 py-2 text-sm flex items-center gap-2">
                <Loader2 className="h-3 w-3 animate-spin" /> Thinking...
              </div>
            </div>
          )}
          {messages.length <= 1 && !loading && (
            <div className="flex flex-wrap gap-2 pt-2">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-xs px-3 py-1.5 rounded-full border bg-background hover:bg-primary hover:text-primary-foreground transition"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="p-3 border-t flex gap-2 bg-background"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about courses, jobs..."
            disabled={loading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </>
  );
};

export default AIChatbot;