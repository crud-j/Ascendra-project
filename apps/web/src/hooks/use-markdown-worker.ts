"use client";

import { useCallback, useRef } from "react";
import { useWebWorker, workerId } from "./use-worker";
import type {
  MarkdownWorkerRequest,
  MarkdownWorkerResponse,
  MarkdownNode,
} from "@/workers/types";

/**
 * Exposes markdown parsing via a background worker so that converting lesson
 * explanations or AI responses to an AST never blocks the main thread.
 *
 * Example:
 *   const { parseMarkdown } = useMarkdownWorker();
 *   const nodes = await parseMarkdown(lesson.explanation);
 */
export function useMarkdownWorker() {
  const factoryRef = useRef(
    () =>
      new Worker(new URL("../workers/markdown.worker.ts", import.meta.url))
  );

  const send = useWebWorker<MarkdownWorkerRequest, MarkdownWorkerResponse>(
    factoryRef.current
  );

  const parseMarkdown = useCallback(
    async (markdown: string): Promise<MarkdownNode[]> => {
      const response = await send({
        id: workerId(),
        type: "PARSE_MARKDOWN",
        payload: { markdown },
      });
      if (response.type === "PARSE_MARKDOWN_RESULT") {
        return response.payload.nodes;
      }
      return [];
    },
    [send]
  );

  return { parseMarkdown };
}
