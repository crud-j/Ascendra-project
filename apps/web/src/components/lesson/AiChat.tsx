"use client";

import { useState, useRef, useEffect } from "react";
import { AiChatMarkdown } from "@/components/lesson/AiChatMarkdown";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
  /** True while the assistant is still streaming this message. */
  streaming?: boolean;
}

interface AiChatProps {
  lessonTitle: string;
  lessonContext: string;
  currentCode: { html: string; css: string };
}

export function AiChat({ lessonTitle, lessonContext, currentCode }: AiChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I'm your AI tutor for this lesson on **${lessonTitle}**. Ask me anything — about the concept, your code, or if you're stuck. I'm here to guide you, not just give answers!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number | null>(null);
  const bufferRef  = useRef("");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonTitle,
          lessonContext,
          code: currentCode,
          messages: [...messages, userMessage],
        }),
      });

      if (!res.ok) throw new Error("API error");

      const reader  = res.body?.getReader();
      const decoder = new TextDecoder();

      // Insert the streaming placeholder
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "", streaming: true },
      ]);

      bufferRef.current = "";

      // Flush accumulated text to state via requestAnimationFrame so we
      // render at most once per frame (~60fps) instead of on every chunk.
      const flushFrame = () => {
        rafRef.current = null;
        const text = bufferRef.current;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: text,
            streaming: true,
          };
          return updated;
        });
      };

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        bufferRef.current += decoder.decode(value, { stream: true });

        if (rafRef.current === null) {
          rafRef.current = requestAnimationFrame(flushFrame);
        }
      }

      // Cancel any pending frame and do a final synchronous flush
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      const finalText = bufferRef.current;
      // Mark streaming complete → triggers react-markdown render
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: finalText,
          streaming: false,
        };
        return updated;
      });
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't connect right now. Make sure `OPENAI_API_KEY` is set in your environment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "flex gap-2",
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
          >
            <div
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                msg.role === "user"
                  ? "bg-gray-900 text-white"
                  : "bg-gradient-to-br from-[#FCE8C0] to-[#C19562] text-[#1A0E00]"
              )}
            >
              {msg.role === "user" ? "You" : "AI"}
            </div>

            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
                msg.role === "user"
                  ? "rounded-tr-sm bg-gray-900 text-white whitespace-pre-wrap"
                  : "rounded-tl-sm border border-gray-100 bg-white text-gray-800"
              )}
            >
              {msg.role === "user" ? (
                msg.content
              ) : msg.streaming ? (
                /* While streaming: raw text, updated every animation frame */
                <span className="whitespace-pre-wrap">
                  {msg.content || (
                    <span className="animate-pulse text-gray-400">Thinking…</span>
                  )}
                </span>
              ) : (
                /* Completed: parse markdown in a background worker */
                <AiChatMarkdown content={msg.content} />
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Suggested prompts (shown only before the user sends anything) */}
      {messages.length === 1 && (
        <div className="px-3 pb-2 flex flex-wrap gap-1.5">
          {[
            "Explain this concept",
            "What am I doing wrong?",
            "Give me a hint",
            "Show me an example",
          ].map((prompt) => (
            <button
              key={prompt}
              onClick={() => setInput(prompt)}
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-[11px] text-gray-600 transition-all hover:border-[#C19562] hover:text-[#C19562]"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-100 p-3">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask the AI tutor… (Enter to send)"
            rows={2}
            className="flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-[13px] text-gray-900 placeholder:text-gray-400 focus:border-[#C19562] focus:outline-none focus:ring-2 focus:ring-[#C19562]/20 focus:bg-white"
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FCE8C0] to-[#C19562] text-[#1A0E00] shadow-sm transition-all hover:scale-105 disabled:opacity-40"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
