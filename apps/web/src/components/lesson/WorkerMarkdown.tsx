"use client";

import { useEffect, useState } from "react";
import { useMarkdownWorker } from "@/hooks/use-markdown-worker";
import { WorkerTerminatedError } from "@/hooks/use-worker";
import type { InlineNode, MarkdownNode } from "@/workers/types";

/** Renders inline AST nodes (bold, code, em, plain text). */
function Inline({ nodes }: { nodes: InlineNode[] }) {
  return (
    <>
      {nodes.map((n, i) => {
        if (n.type === "code")
          return <code key={i} className="rounded bg-white/10 px-1.5 py-0.5 text-[11px] font-mono text-amber-300">{n.text}</code>;
        if (n.type === "bold")
          return <strong key={i} className="font-semibold text-white">{n.text}</strong>;
        if (n.type === "em")
          return <em key={i} className="italic text-white/80">{n.text}</em>;
        return <span key={i}>{n.text}</span>;
      })}
    </>
  );
}

/** Renders a single block-level AST node. */
function Block({ node, idx }: { node: MarkdownNode; idx: number }) {
  if (node.type === "heading") {
    const cls: Record<number, string> = {
      1: "mt-2 mb-2 text-[17px] font-bold text-white",
      2: "mt-5 mb-2 text-[15px] font-bold text-white",
      3: "mt-4 mb-1.5 text-[13px] font-bold text-white",
    };
    const Tag = `h${node.level}` as "h1" | "h2" | "h3";
    return <Tag key={idx} className={cls[node.level]}><Inline nodes={node.inline} /></Tag>;
  }

  if (node.type === "paragraph")
    return <p key={idx} className="text-[13px] leading-relaxed text-white/70"><Inline nodes={node.inline} /></p>;

  if (node.type === "codeblock")
    return (
      <pre key={idx} className="my-3 overflow-x-auto rounded-lg border border-white/10 bg-[#1e293b] p-3 text-[12px] text-amber-200 leading-relaxed">
        <code>{node.code}</code>
      </pre>
    );

  if (node.type === "list")
    return (
      <ul key={idx}>
        {node.items.map((item, ii) => (
          <li key={ii} className="ml-4 list-disc text-[12px] text-white/70 leading-relaxed marker:text-white/30">
            <Inline nodes={item} />
          </li>
        ))}
      </ul>
    );

  if (node.type === "table")
    return (
      <div key={idx} className="my-3 overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full text-[12px]">
          {node.headers.length > 0 && (
            <thead>
              <tr>
                {node.headers.map((h, hi) => (
                  <th key={hi} className="border-b border-white/10 bg-white/5 px-3 py-2 text-left font-semibold text-white/80">{h}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {node.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} className="border-b border-white/5 px-3 py-2 text-white/60">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  if (node.type === "spacer")
    return <div key={idx} className="h-1.5" />;

  return null;
}

interface WorkerMarkdownProps {
  content: string;
}

/**
 * Parses `content` (markdown) in a background worker and renders the resulting
 * AST. The main thread is never blocked by parsing, even for long lesson
 * explanations. Shows a shimmer skeleton until the first parse completes.
 */
export function WorkerMarkdown({ content }: WorkerMarkdownProps) {
  const { parseMarkdown } = useMarkdownWorker();
  const [nodes, setNodes] = useState<MarkdownNode[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    parseMarkdown(content)
      .then((parsed) => {
        if (!cancelled) setNodes(parsed);
      })
      .catch((err) => {
        // WorkerTerminatedError is expected when the component unmounts
        // mid-parse (e.g. lesson navigation). All other errors are real.
        if (!(err instanceof WorkerTerminatedError)) {
          console.error("Markdown worker error:", err);
        }
      });
    return () => { cancelled = true; };
  }, [content, parseMarkdown]);

  if (nodes === null) {
    return (
      <div className="space-y-2 animate-pulse">
        {[90, 70, 80, 60, 75].map((w, i) => (
          <div key={i} className="h-3 rounded bg-white/10" style={{ width: `${w}%` }} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-0.5">
      {nodes.map((node, i) => <Block key={i} node={node} idx={i} />)}
    </div>
  );
}
