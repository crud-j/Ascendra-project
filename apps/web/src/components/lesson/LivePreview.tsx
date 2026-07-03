"use client";

import { useEffect, useRef, useCallback } from "react";

interface LivePreviewProps {
  html: string;
  css: string;
}

// The worker code as a string — runs off the main thread.
// It receives { html, css } and returns the complete document string.
const WORKER_CODE = `
self.onmessage = function(e) {
  var html = e.data.html || "";
  var css  = e.data.css  || "";
  var doc  = "<!DOCTYPE html>\\n" +
    "<html lang=\\"en\\">\\n" +
    "<head>\\n" +
    "  <meta charset=\\"UTF-8\\">\\n" +
    "  <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\">\\n" +
    "  <style>\\n" +
    "    * { box-sizing: border-box; }\\n" +
    "    body { margin: 0; padding: 16px; font-family: system-ui, sans-serif; }\\n" +
    css + "\\n" +
    "  </style>\\n" +
    "</head>\\n" +
    "<body>\\n" +
    html + "\\n" +
    "</body>\\n</html>";
  self.postMessage(doc);
};
`;

export function LivePreview({ html, css }: LivePreviewProps) {
  const iframeRef   = useRef<HTMLIFrameElement>(null);
  const workerRef   = useRef<Worker | null>(null);
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef  = useRef<{ html: string; css: string } | null>(null);

  // Boot the worker once
  useEffect(() => {
    const blob = new Blob([WORKER_CODE], { type: "application/javascript" });
    const url  = URL.createObjectURL(blob);
    const worker = new Worker(url);

    worker.onmessage = (e: MessageEvent<string>) => {
      // Write the generated document into the iframe on the next animation frame
      requestAnimationFrame(() => {
        const doc = iframeRef.current?.contentDocument;
        if (!doc) return;
        doc.open();
        doc.write(e.data);
        doc.close();
      });
    };

    workerRef.current = worker;
    URL.revokeObjectURL(url); // safe to revoke after Worker is started

    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  // Debounced send to worker (300 ms after last keystroke)
  const scheduleUpdate = useCallback((h: string, c: string) => {
    pendingRef.current = { html: h, css: c };
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (workerRef.current && pendingRef.current) {
        workerRef.current.postMessage(pendingRef.current);
        pendingRef.current = null;
      }
    }, 300);
  }, []);

  useEffect(() => {
    scheduleUpdate(html, css);
  }, [html, css, scheduleUpdate]);

  // Flush immediately on unmount so the next mount sees the latest state
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      title="Live Preview"
      className="h-full w-full border-0 bg-white"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
