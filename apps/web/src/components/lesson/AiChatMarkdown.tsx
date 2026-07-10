"use client";

import { useEffect, useState } from "react";
import { useMarkdownWorker } from "@/hooks/use-markdown-worker";
import { WorkerTerminatedError } from "@/hooks/use-worker";
import type { InlineNode, MarkdownNode } from "@/workers/types";

function Inline({ nodes }: { nodes: InlineNode[] }) {
  return (
    <>
      {nodes.map((n, i) => {
        if (n.type === "code")
          return (
            <code key={i} className="rounded bg-gray-100 px-1.5 py-0.5 text-[11px] font-mono text-gray-800">
              {n.text}
            </code>
          );
        if (n.type === "bold")
          return <strong key={i} className="font-semibold text-gray-900">{n.text}</strong>;
        if (n.type === "em")
          return <em key={i} className="italic text-gray-600">{n.text}</em>;
        return <span key={i}>{n.text}</span>;
      })}
    </>
  );
}

function Block({ node, idx }: { node: MarkdownNode; idx: number }) {
  if (node.type === "heading") {
    const cls: Record<number, string> = {
      1: "mb-2 mt-3 text-[15px] font-bold text-gray-900",
      2: "mb-2 mt-3 text-[14px] font-bold text-gray-900",
      3: "mb-1 mt-2 text-[13px] font-semibold text-gray-800",
    };
    const Tag = `h${node.level}` as "h1" | "h2" | "h3";
    return <Tag className={cls[node.level]}><Inline nodes={node.inline} /></Tag>;
  }

  if (node.type === "paragraph")
    return (
      <p className="mb-2 last:mb-0 text-[13px] leading-relaxed text-gray-700">
        <Inline nodes={node.inline} />
      </p>
    );

  if (node.type === "codeblock")
    return (
      <pre className="my-2 overflow-x-auto rounded-lg bg-gray-900 p-3">
        <code className="block text-[11px] text-amber-200 leading-relaxed">{node.code}</code>
      </pre>
    );

  if (node.type === "list")
    return (
      <ul className="mb-2 ml-4 list-disc space-y-0.5">
        {node.items.map((item, ii) => (
          <li key={ii} className="text-[13px] text-gray-700">
            <Inline nodes={item} />
          </li>
        ))}
      </ul>
    );

  if (node.type === "table")
    return (
      <div className="my-2 overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-[12px]">
          {node.headers.length > 0 && (
            <thead>
              <tr>
                {node.headers.map((h, hi) => (
                  <th key={hi} className="border-b border-gray-200 bg-gray-50 px-3 py-2 text-left font-semibold text-gray-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {node.rows.map((row, ri) => (
              <tr key={ri} className="border-b border-gray-100 last:border-0">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-3 py-2 text-gray-600">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  if (node.type === "spacer")
    return <div className="h-1" />;

  return null;
}

/**
 * Parses markdown in a background worker and renders with light-theme classes
 * suited to the AI chat panel. Replaces ReactMarkdown to keep the main thread
 * free when a long AI response finishes streaming.
 */
export function AiChatMarkdown({ content }: { content: string }) {
  const { parseMarkdown } = useMarkdownWorker();
  const [nodes, setNodes] = useState<MarkdownNode[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    parseMarkdown(content)
      .then((parsed) => { if (!cancelled) setNodes(parsed); })
      .catch((err) => {
        if (!(err instanceof WorkerTerminatedError)) {
          console.error("Markdown worker error:", err);
        }
      });
    return () => { cancelled = true; };
  }, [content, parseMarkdown]);

  if (nodes === null) {
    return (
      <div className="space-y-1.5 animate-pulse">
        {[85, 70, 90, 60].map((w, i) => (
          <div key={i} className="h-2.5 rounded bg-gray-200" style={{ width: `${w}%` }} />
        ))}
      </div>
    );
  }

  return (
    <div>
      {nodes.map((node, i) => <Block key={i} node={node} idx={i} />)}
    </div>
  );
}
