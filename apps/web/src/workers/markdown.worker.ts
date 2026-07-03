/**
 * Markdown Worker — parses markdown strings into a JSON AST on a background
 * thread so the main thread is never blocked by parsing, even for long lesson
 * explanations or large AI responses.
 */
import type {
  InlineNode,
  MarkdownNode,
  MarkdownWorkerRequest,
  MarkdownWorkerResponse,
} from "./types";

function parseInline(text: string): InlineNode[] {
  const nodes: InlineNode[] = [];
  const re = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push({ type: "text", text: text.slice(last, m.index) });
    const tok = m[0];
    if (tok.startsWith("**"))      nodes.push({ type: "bold", text: tok.slice(2, -2) });
    else if (tok.startsWith("`"))  nodes.push({ type: "code", text: tok.slice(1, -1) });
    else                           nodes.push({ type: "em",   text: tok.slice(1, -1) });
    last = m.index + tok.length;
  }
  if (last < text.length) nodes.push({ type: "text", text: text.slice(last) });
  return nodes;
}

function parseMarkdown(markdown: string): MarkdownNode[] {
  const lines  = markdown.split("\n");
  const result: MarkdownNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        code.push(lines[i]);
        i++;
      }
      result.push({ type: "codeblock", lang, code: code.join("\n") });
      i++;
      continue;
    }

    // Headings
    if (line.startsWith("### "))
      { result.push({ type: "heading", level: 3, inline: parseInline(line.slice(4)) }); i++; continue; }
    if (line.startsWith("## "))
      { result.push({ type: "heading", level: 2, inline: parseInline(line.slice(3)) }); i++; continue; }
    if (line.startsWith("# "))
      { result.push({ type: "heading", level: 1, inline: parseInline(line.slice(2)) }); i++; continue; }

    // Unordered list — collect consecutive items
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: InlineNode[][] = [];
      while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("* "))) {
        items.push(parseInline(lines[i].slice(2)));
        i++;
      }
      result.push({ type: "list", items });
      continue;
    }

    // Table separator — skip
    if (/^\|[-| :]+\|$/.test(line)) { i++; continue; }

    // Table
    if (line.startsWith("|") && line.endsWith("|")) {
      const parseRow = (l: string) => l.slice(1, -1).split("|").map((c) => c.trim());
      const isHeader = /^\|[-| :]+\|$/.test(lines[i + 1] ?? "");
      const headers  = isHeader ? parseRow(line) : [];
      if (isHeader) i += 2; else i++;

      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|") && lines[i].endsWith("|")) {
        if (!/^\|[-| :]+\|$/.test(lines[i])) rows.push(parseRow(lines[i]));
        i++;
      }
      result.push({ type: "table", headers, rows });
      continue;
    }

    // Empty line → spacer
    if (line.trim() === "") {
      result.push({ type: "spacer" });
      i++;
      continue;
    }

    // Paragraph
    result.push({ type: "paragraph", inline: parseInline(line) });
    i++;
  }

  return result;
}

self.addEventListener("message", (e: MessageEvent<MarkdownWorkerRequest>) => {
  const req = e.data;
  if (req.type === "PARSE_MARKDOWN") {
    const nodes = parseMarkdown(req.payload.markdown);
    const response: MarkdownWorkerResponse = {
      id: req.id,
      type: "PARSE_MARKDOWN_RESULT",
      payload: { nodes },
    };
    self.postMessage(response);
  }
});
