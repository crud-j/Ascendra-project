"use client";

import { use, useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { HTML_CSS_LESSONS, getHtmlCssLesson } from "@/data/lessons/html-css";
import { LivePreview } from "@/components/lesson/LivePreview";
import { HintPanel } from "@/components/lesson/HintPanel";
import { AiChat } from "@/components/lesson/AiChat";
import { WorkerMarkdown } from "@/components/lesson/WorkerMarkdown";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

const CodeEditor = dynamic(
  () => import("@/components/lesson/CodeEditor").then((m) => m.CodeEditor),
  { ssr: false }
);

type Panel = "hints" | "ai" | null;
type PreviewMode = "split" | "expanded" | "fullscreen";

export default function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  // ✅ Unwrap the Promise — required in Next.js 15+/16
  const { courseId, lessonId } = use(params);

  const lesson = getHtmlCssLesson(lessonId);
  if (!lesson) notFound();

  const lessonIndex = HTML_CSS_LESSONS.findIndex((l) => l.slug === lessonId);
  const prevLesson = HTML_CSS_LESSONS[lessonIndex - 1];
  const nextLesson = HTML_CSS_LESSONS[lessonIndex + 1];

  const [html, setHtml] = useState(lesson.exercise?.startCode.html ?? "");
  const [css, setCss] = useState(lesson.exercise?.startCode.css ?? "");
  const [activePanel, setActivePanel] = useState<Panel>(null);
  const [solved, setSolved] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Sidebar integration
  const sidebarOpen    = useUIStore((s) => s.sidebarOpen);
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen);
  const toggleSidebar  = useUIStore((s) => s.toggleSidebar);
  const prevSidebarRef = useRef<boolean>(sidebarOpen);

  // Auto-collapse the sidebar when entering the IDE for more workspace.
  // Restore the previous state when navigating away.
  useEffect(() => {
    prevSidebarRef.current = useUIStore.getState().sidebarOpen;
    setSidebarOpen(false);
    return () => setSidebarOpen(prevSidebarRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset editor state when navigating between lessons
  useEffect(() => {
    setHtml(lesson.exercise?.startCode.html ?? "");
    setCss(lesson.exercise?.startCode.css ?? "");
    setSolved(false);
    setSuccessMsg("");
    setActivePanel(null);
  }, [lessonId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleViewSolution = useCallback(() => {
    if (!lesson.exercise) return;
    setHtml(lesson.exercise.solution.html);
    setCss(lesson.exercise.solution.css);
    setActivePanel(null);
  }, [lesson]);

  const checkSolution = useCallback(() => {
    if (!lesson.exercise) return;
    const checks = lesson.exercise.checks ?? [];

    if (checks.length === 0) {
      setSolved(true);
      setSuccessMsg(lesson.exercise.successMessage);
      return;
    }

    const failed = checks.find((c) => {
      if (c.type === "html-contains") return !html.includes(c.value);
      if (c.type === "css-contains") return !css.includes(c.value);
      return false;
    });

    if (!failed) {
      setSolved(true);
      setSuccessMsg(lesson.exercise.successMessage);
    } else {
      setSolved(false);
      setSuccessMsg(`Not quite — make sure your code includes: \`${failed.value}\``);
    }
  }, [html, css, lesson]);

  const togglePanel = (panel: Panel) =>
    setActivePanel((prev) => (prev === panel ? null : panel));

  // ── Preview modes ────────────────────────────────────────────────
  const [previewMode, setPreviewMode] = useState<PreviewMode>("split");
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Toggle between split ↔ expanded
  const toggleExpanded = useCallback(() => {
    setPreviewMode((m) => (m === "split" ? "expanded" : "split"));
  }, []);

  // Native browser fullscreen on the preview container
  const toggleBrowserFullscreen = useCallback(async () => {
    const el = previewContainerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      await el.requestFullscreen();
      setPreviewMode("fullscreen");
    } else {
      await document.exitFullscreen();
    }
  }, []);

  // Sync state when the user presses Escape to exit native fullscreen
  useEffect(() => {
    const onFsChange = () => {
      if (!document.fullscreenElement) {
        setPreviewMode((m) => (m === "fullscreen" ? "split" : m));
      }
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // Keyboard shortcut: Escape exits expanded mode (not fullscreen — that's handled above)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && previewMode === "expanded") setPreviewMode("split");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [previewMode]);

  // Open preview in a new browser tab as a standalone HTML page.
  // Uses document.write() into an about:blank window — the same technique
  // LivePreview uses for the iframe — so no blob URL is needed and no popup
  // blocker can intercept it. Falls back to blob URL only if the window handle
  // comes back null (e.g. the user has all popups blocked entirely).
  const openInNewTab = useCallback(() => {
    const isEmpty = !html.trim() && !css.trim();

    const doc = isEmpty
      ? `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${lesson.title} — Preview</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; display: flex; align-items: center; justify-content: center;
           min-height: 100vh; font-family: system-ui, sans-serif; background: #f9fafb; }
    .msg { text-align: center; color: #9ca3af; }
    .msg h2 { font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; color: #374151; }
    .msg p  { font-size: 0.85rem; }
  </style>
</head>
<body>
  <div class="msg">
    <h2>Nothing to preview yet</h2>
    <p>Write some HTML or CSS in the editor, then open this tab again.</p>
  </div>
</body>
</html>`
      : `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${lesson.title} — Preview</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 16px; font-family: system-ui, sans-serif; }
    ${css}
  </style>
</head>
<body>
${html}
</body>
</html>`;

    // Primary: open a blank window and write directly — avoids blob URL
    // restrictions and popup blockers that filter on non-http(s) URLs.
    const win = window.open("", "_blank");
    if (win) {
      win.document.open();
      win.document.write(doc);
      win.document.close();
      win.focus();
      return;
    }

    // Fallback: blob URL (user has all popups blocked; nothing we can do
    // except try — they will need to allow it in their browser settings).
    const blob = new Blob([doc], { type: "text/html" });
    const url  = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }, [html, css, lesson.title]);

  return (
    <div className="flex h-screen flex-col bg-[#1a1a2e] text-white overflow-hidden">

      {/* ── Header bar ── */}
      <header className="flex h-12 shrink-0 items-center gap-3 border-b border-white/[0.08] bg-[#16213e] px-4">

        {/* Sidebar toggle — communicates with the dashboard sidebar */}
        <button
          onClick={toggleSidebar}
          title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-all duration-200 hover:bg-white/10 hover:text-white"
        >
          {sidebarOpen ? (
            /* Panel-left-close icon */
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7M21 12H9" />
            </svg>
          ) : (
            /* Panel-left icon */
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 12h12" />
            </svg>
          )}
        </button>

        <div className="h-4 w-px bg-white/10" />

        <Link
          href={`/learn/${courseId}`}
          className="flex items-center gap-1.5 text-[11px] font-medium text-white/40 hover:text-white/70 transition-colors"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          HTML &amp; CSS
        </Link>
        <span className="text-white/20">/</span>
        <span className="text-[13px] font-semibold text-white truncate">
          {lessonIndex + 1}. {lesson.title}
        </span>

        <div className="ml-auto flex items-center gap-2">
          {/* Active preview mode indicator */}
          {previewMode !== "split" && (
            <button
              onClick={() => setPreviewMode("split")}
              className="flex items-center gap-1.5 rounded-full border border-[#C19562]/30 bg-[#C19562]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#FCE8C0] transition-all hover:bg-[#C19562]/20"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M15 9h4.5M15 9V4.5M15 15h4.5M15 15v4.5M9 15H4.5M9 15v4.5" />
              </svg>
              {previewMode === "fullscreen" ? "Fullscreen" : "Full Preview"} · Esc
            </button>
          )}

          {prevLesson && (
            <Link
              href={`/learn/${courseId}/lessons/${prevLesson.slug}`}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all"
            >
              ← Prev
            </Link>
          )}
          <span className="text-[11px] text-white/30">
            {lessonIndex + 1} / {HTML_CSS_LESSONS.length}
          </span>
          {nextLesson && (
            <Link
              href={`/learn/${courseId}/lessons/${nextLesson.slug}`}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all"
            >
              Next →
            </Link>
          )}
        </div>
      </header>

      {/* ── 3-panel layout ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Panel 1 — Instructions (collapses when preview is expanded) */}
        <div className={cn(
          "flex shrink-0 flex-col border-r border-white/[0.08] bg-[#0f172a] overflow-hidden",
          "transition-[width] duration-300 ease-in-out",
          previewMode === "split" ? "w-80" : "w-0"
        )}>
          <div className="flex-1 overflow-y-auto p-5 space-y-1">
            <WorkerMarkdown content={lesson.explanation} />

            {lesson.exercise && (
              <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                <h3 className="mb-3 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.15em] text-amber-400">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Exercise
                </h3>
                <WorkerMarkdown content={lesson.exercise.instructions} />
              </div>
            )}
          </div>

          {/* Hints + Check toolbar */}
          {lesson.exercise && (
            <div className="shrink-0 border-t border-white/[0.08] bg-[#0f172a]">
              {activePanel === "hints" && (
                <div className="border-b border-white/[0.08] bg-[#16213e] p-4">
                  <HintPanel
                    hints={lesson.exercise.hints}
                    onViewSolution={handleViewSolution}
                  />
                </div>
              )}

              {successMsg && (
                <div className={cn(
                  "border-b border-white/[0.08] px-4 py-3 text-[12px] font-medium",
                  solved
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                )}>
                  {solved ? "✓ " : "✗ "}{successMsg}
                </div>
              )}

              <div className="flex gap-2 p-3">
                <button
                  onClick={() => togglePanel("hints")}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-semibold transition-all",
                    activePanel === "hints"
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : "border border-white/10 bg-white/5 text-white/50 hover:text-white/80"
                  )}
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Hints
                </button>
                <button
                  onClick={checkSolution}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-[11px] font-semibold text-emerald-400 transition-all hover:bg-emerald-500/20"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Check
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Panel 2 — Code Editor (collapses when preview is expanded) */}
        <div className={cn(
          "flex flex-col overflow-hidden border-r border-white/[0.08]",
          "transition-[width,flex-grow] duration-300 ease-in-out",
          previewMode === "split" ? "flex-1" : "w-0 flex-none"
        )}>
          <CodeEditor
            html={html}
            css={css}
            onHtmlChange={setHtml}
            onCssChange={setCss}
          />
        </div>

        {/* Panel 3 — Preview + AI (expands to fill when in expanded/fullscreen mode) */}
        <div className={cn(
          "flex flex-col overflow-hidden",
          "transition-[width,flex-grow] duration-300 ease-in-out",
          previewMode === "split" ? "w-[400px] shrink-0" : "flex-1 w-auto"
        )}>

          {/* Live preview — wraps the iframe + fullscreen container */}
          <div
            ref={previewContainerRef}
            className={cn(
              "flex flex-col overflow-hidden bg-white",
              activePanel === "ai" && previewMode === "split" ? "flex-[0_0_45%]" : "flex-1",
              // When in native fullscreen, fill the entire screen
              "fullscreen:fixed fullscreen:inset-0 fullscreen:z-[9999]"
            )}
          >
            {/* Toolbar */}
            <div className="flex h-9 shrink-0 items-center gap-2 border-b border-black/[0.07] bg-[#f5f5f5] px-3">
              {/* Traffic-light dots */}
              <div className="flex items-center gap-1.5 mr-1">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>

              <span className="flex-1 text-[11px] font-semibold uppercase tracking-wider text-black/30 select-none">
                Preview
              </span>

              {/* ── Preview controls ── */}

              {/* Pop out — opens in a real browser tab */}
              <button
                onClick={openInNewTab}
                title="Open in new tab"
                className="flex h-6 w-6 items-center justify-center rounded text-black/30 transition-colors hover:bg-black/[0.07] hover:text-black/70"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>

              {/* Expand/collapse within the IDE */}
              <button
                onClick={toggleExpanded}
                title={previewMode !== "split" ? "Exit expanded preview (Esc)" : "Expand preview"}
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded transition-colors",
                  previewMode !== "split"
                    ? "bg-[#C19562]/20 text-[#C19562] hover:bg-[#C19562]/30"
                    : "text-black/30 hover:bg-black/[0.07] hover:text-black/70"
                )}
              >
                {previewMode !== "split" ? (
                  /* Compress icon */
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                  </svg>
                ) : (
                  /* Expand icon */
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                )}
              </button>

              {/* Native browser fullscreen */}
              <button
                onClick={toggleBrowserFullscreen}
                title={previewMode === "fullscreen" ? "Exit fullscreen" : "Fullscreen (native)"}
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded transition-colors",
                  previewMode === "fullscreen"
                    ? "bg-[#C19562]/20 text-[#C19562] hover:bg-[#C19562]/30"
                    : "text-black/30 hover:bg-black/[0.07] hover:text-black/70"
                )}
              >
                {previewMode === "fullscreen" ? (
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                )}
              </button>
            </div>

            {/* The iframe */}
            <div className="flex-1 overflow-hidden">
              <LivePreview html={html} css={css} />
            </div>
          </div>

          {/* AI Chat panel */}
          <div className={cn(
            "flex flex-col border-t border-white/[0.08] bg-[#0f172a] overflow-hidden transition-all duration-300",
            activePanel === "ai" ? "flex-[0_0_55%]" : "h-0"
          )}>
            {activePanel === "ai" && (
              <AiChat
                lessonTitle={lesson.title}
                lessonContext={lesson.explanation}
                currentCode={{ html, css }}
              />
            )}
          </div>

          {/* AI toggle */}
          <div className="shrink-0 border-t border-white/[0.08] bg-[#16213e] px-3 py-2">
            <button
              onClick={() => togglePanel("ai")}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-[12px] font-semibold transition-all",
                activePanel === "ai"
                  ? "bg-gradient-to-r from-[#FCE8C0]/20 to-[#C19562]/20 text-[#FCE8C0] border border-[#C19562]/30"
                  : "border border-white/10 bg-white/5 text-white/50 hover:text-white/80"
              )}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.7-1.388 2.43l-3.107-.62a.75.75 0 01-.424-.28L12 15m0 0l-4.283 3.832a.75.75 0 01-.424.28l-3.107.62C2.768 20 1.8 18.3 2.8 17.3L5 14.5" />
              </svg>
              {activePanel === "ai" ? "Close AI Tutor" : "Ask AI Tutor"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

