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
          return (
            <code key={i} className="rounded-md bg-white/[0.08] px-1.5 py-0.5 text-[12.5px] font-mono text-amber-300 ring-1 ring-inset ring-white/[0.06]">
              {n.text}
            </code>
          );
        if (n.type === "bold")
          return <strong key={i} className="font-semibold text-white">{n.text}</strong>;
        if (n.type === "em")
          return <em key={i} className="italic text-white/60">{n.text}</em>;
        return <span key={i}>{n.text}</span>;
      })}
    </>
  );
}

/** Renders a single block-level AST node. */
function Block({ node, idx }: { node: MarkdownNode; idx: number }) {
  if (node.type === "heading") {
    const styles: Record<number, string> = {
      1: "mt-6 mb-3 text-[19px] font-bold leading-snug tracking-tight text-white",
      2: "mt-5 mb-2.5 text-[16px] font-bold leading-snug text-white",
      3: "mt-4 mb-2 text-[14px] font-semibold text-white/90",
    };
    const Tag = `h${node.level}` as "h1" | "h2" | "h3";
    return <Tag className={styles[node.level]}><Inline nodes={node.inline} /></Tag>;
  }

  if (node.type === "paragraph")
    return (
      <p className="text-[14px] leading-[1.8] text-white/65">
        <Inline nodes={node.inline} />
      </p>
    );

  if (node.type === "codeblock")
    return (
      <pre className="my-4 overflow-x-auto rounded-xl border border-white/[0.08] bg-[#111827] p-4 text-[12.5px] text-amber-200 leading-relaxed shadow-inner">
        <code>{node.code}</code>
      </pre>
    );

  if (node.type === "list")
    return (
      <ul className="my-1 space-y-1.5 pl-1">
        {node.items.map((item, ii) => (
          <li key={ii} className="flex items-start gap-2.5 text-[13.5px] leading-[1.75] text-white/65">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C19562]/60" />
            <span><Inline nodes={item} /></span>
          </li>
        ))}
      </ul>
    );

  if (node.type === "table")
    return (
      <div className="my-4 overflow-x-auto rounded-xl border border-white/[0.08]">
        <table className="w-full text-[13px]">
          {node.headers.length > 0 && (
            <thead>
              <tr>
                {node.headers.map((h, hi) => (
                  <th key={hi} className="border-b border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white/40">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {node.rows.map((row, ri) => (
              <tr key={ri} className="border-b border-white/[0.04] last:border-0">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-2.5 text-white/55">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  if (node.type === "spacer")
    return <div className="h-2" />;

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
        if (!(err instanceof WorkerTerminatedError)) {
          console.error("Markdown worker error:", err);
        }
      });
    return () => { cancelled = true; };
  }, [content, parseMarkdown]);

  if (nodes === null) {
    return (
      <div className="space-y-3 animate-pulse">
        {[88, 72, 95, 65, 80, 55, 70].map((w, i) => (
          <div key={i} className="h-3 rounded-full bg-white/[0.06]" style={{ width: `${w}%` }} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {nodes.map((node, i) => <Block key={i} node={node} idx={i} />)}
    </div>
  );
}
