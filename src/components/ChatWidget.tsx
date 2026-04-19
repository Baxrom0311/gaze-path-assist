import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Message { role: "user" | "assistant"; content: string }

export const ChatWidget = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestions = t("chat.suggestions", { returnObjects: true }) as string[];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: { messages: newMessages, language: i18n.language },
      });

      if (error) {
        const status = (error as any).context?.status;
        if (status === 429) toast.error(t("chat.rateLimit"));
        else if (status === 402) toast.error("AI credits exhausted. Please add funds.");
        else toast.error(t("chat.error"));
        setLoading(false);
        return;
      }

      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
        return;
      }

      setMessages([...newMessages, { role: "assistant", content: data.reply ?? "" }]);
    } catch (e) {
      console.error("Chat error:", e);
      toast.error(t("chat.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full gradient-teal text-primary-foreground shadow-glow flex items-center justify-center hover:scale-110 transition-bounce",
          open && "scale-90"
        )}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] sm:w-96 h-[32rem] max-h-[calc(100vh-8rem)] bg-card border border-border rounded-3xl shadow-card flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="gradient-teal text-primary-foreground p-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold">{t("chat.title")}</h3>
                <p className="text-xs opacity-80">{t("chat.subtitle")}</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <div className="space-y-4">
                  <div className="bg-secondary rounded-2xl rounded-tl-sm p-3 text-sm">
                    {t("chat.welcome")}
                  </div>
                  <div className="space-y-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="w-full text-left text-sm px-3 py-2 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-smooth"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((m, i) => (
                  <div
                    key={i}
                    className={cn(
                      "max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed whitespace-pre-wrap",
                      m.role === "user"
                        ? "ml-auto gradient-teal text-primary-foreground rounded-tr-sm"
                        : "bg-secondary rounded-tl-sm"
                    )}
                  >
                    {m.content}
                  </div>
                ))
              )}
              {loading && (
                <div className="bg-secondary rounded-2xl rounded-tl-sm p-3 inline-flex items-center gap-2 text-sm">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-muted-foreground">...</span>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="border-t border-border p-3 flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("chat.placeholder")}
                className="flex-1 px-3 py-2 rounded-xl bg-secondary border border-transparent focus:border-primary focus:outline-none text-sm"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="h-10 w-10 rounded-xl gradient-teal text-primary-foreground flex items-center justify-center disabled:opacity-50 hover:opacity-90 transition-smooth"
                aria-label={t("chat.send")}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
