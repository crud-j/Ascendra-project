"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-[#1e1e1e]">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#C19562] border-t-transparent" />
    </div>
  ),
});

type Tab = "html" | "css";

interface CodeEditorProps {
  html: string;
  css: string;
  onHtmlChange: (v: string) => void;
  onCssChange: (v: string) => void;
}

export function CodeEditor({ html, css, onHtmlChange, onCssChange }: CodeEditorProps) {
  const [tab, setTab] = useState<Tab>("html");

  return (
    <div className="flex h-full flex-col bg-[#1e1e1e]">
      {/* Tab bar */}
      <div className="flex items-center border-b border-white/[0.08] bg-[#252526]">
        {(["html", "css"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2.5 text-[12px] font-medium transition-all border-b-2",
              tab === t
                ? "border-[#C19562] text-white bg-[#1e1e1e]"
                : "border-transparent text-white/40 hover:text-white/70"
            )}
          >
            <span className={cn(
              "h-2 w-2 rounded-full",
              t === "html" ? "bg-orange-400" : "bg-blue-400"
            )} />
            {t.toUpperCase()}
          </button>
        ))}
        <div className="ml-auto px-3 text-[10px] font-medium uppercase tracking-wider text-white/20">
          Editor
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <MonacoEditor
          height="100%"
          language={tab === "html" ? "html" : "css"}
          value={tab === "html" ? html : css}
          onChange={(v) => (tab === "html" ? onHtmlChange : onCssChange)(v ?? "")}
          theme="vs-dark"
          options={{
            fontSize: 13,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontLigatures: true,
            lineNumbers: "on",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: "on",
            padding: { top: 12, bottom: 12 },
            renderLineHighlight: "gutter",
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            tabSize: 2,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
