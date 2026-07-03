"use client";

import { use, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/data/course-catalog";
import { useCurrentUser } from "@/features/auth/hooks/use-auth";
import { cn } from "@/lib/utils";

// ─── Certificate canvas constants ────────────────────────────────────────────
// Must match the SVG viewBox dimensions exactly.
const CERT_W = 1448;
const CERT_H = 1086;

// Text layout (pixel coords on the 1448×1086 canvas).
// Adjust these if you reposition elements in the template design.
const LAYOUT = {
  certifiesText: { x: CERT_W / 2, y: 390 },
  name:          { x: CERT_W / 2, y: 490 },
  completedText: { x: CERT_W / 2, y: 556 },
  course:        { x: CERT_W / 2, y: 628 },
  date:          { x: CERT_W / 2, y: 752 },
  certId:        { x: CERT_W / 2, y: 996 },
};

// ─── Canvas drawing ───────────────────────────────────────────────────────────

async function drawCertificate(
  name: string,
  courseTitle: string,
  date: string,
  certId: string,
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width  = CERT_W;
  canvas.height = CERT_H;
  const ctx = canvas.getContext("2d")!;

  // Draw the template image
  await new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => { ctx.drawImage(img, 0, 0, CERT_W, CERT_H); resolve(); };
    img.onerror = reject;
    img.src = "/CoursesCertificationTemplate.svg";
  });

  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";

  // "This is to certify that"
  ctx.font      = "italic 26px Georgia, 'Times New Roman', serif";
  ctx.fillStyle = "#6b4c1e";
  ctx.fillText("This is to certify that", LAYOUT.certifiesText.x, LAYOUT.certifiesText.y);

  // Student name — large, prominent
  ctx.font      = "bold 68px Georgia, 'Times New Roman', serif";
  ctx.fillStyle = "#1a0e00";
  ctx.fillText(name, LAYOUT.name.x, LAYOUT.name.y);

  // "has successfully completed"
  ctx.font      = "italic 26px Georgia, 'Times New Roman', serif";
  ctx.fillStyle = "#6b4c1e";
  ctx.fillText("has successfully completed", LAYOUT.completedText.x, LAYOUT.completedText.y);

  // Course title
  ctx.font      = "bold 38px Georgia, 'Times New Roman', serif";
  ctx.fillStyle = "#C19562";
  ctx.fillText(courseTitle, LAYOUT.course.x, LAYOUT.course.y);

  // Completion date
  ctx.font      = "22px Georgia, 'Times New Roman', serif";
  ctx.fillStyle = "#374151";
  ctx.fillText(date, LAYOUT.date.x, LAYOUT.date.y);

  // Certificate ID (small)
  ctx.font      = "13px 'Courier New', monospace";
  ctx.fillStyle = "#9ca3af";
  ctx.fillText(certId, LAYOUT.certId.x, LAYOUT.certId.y);

  return new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Canvas toBlob failed"))), "image/png"),
  );
}

// ─── Certificate overlay (display layer) ────────────────────────────────────

function CertOverlay({
  name,
  courseTitle,
  date,
  certId,
}: {
  name: string;
  courseTitle: string;
  date: string;
  certId: string;
}) {
  // Positions are expressed as percentages of the 1448×1086 template.
  const pct = (px: number, axis: "x" | "y") =>
    `${((px / (axis === "x" ? CERT_W : CERT_H)) * 100).toFixed(4)}%`;

  const textBase =
    "absolute left-0 w-full text-center leading-none select-none pointer-events-none";

  return (
    <>
      {/* "This is to certify that" */}
      <span
        className={cn(textBase, "italic text-[#6b4c1e]")}
        style={{
          top: pct(LAYOUT.certifiesText.y, "y"),
          fontSize: `${(26 / CERT_H) * 100}%`,
          transform: "translateY(-50%)",
        }}
      >
        This is to certify that
      </span>

      {/* Student name */}
      <span
        className={cn(textBase, "font-bold text-[#1a0e00]")}
        style={{
          top: pct(LAYOUT.name.y, "y"),
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: `${(68 / CERT_H) * 100}%`,
          transform: "translateY(-50%)",
        }}
      >
        {name || <span className="opacity-30">Your Name</span>}
      </span>

      {/* "has successfully completed" */}
      <span
        className={cn(textBase, "italic text-[#6b4c1e]")}
        style={{
          top: pct(LAYOUT.completedText.y, "y"),
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: `${(26 / CERT_H) * 100}%`,
          transform: "translateY(-50%)",
        }}
      >
        has successfully completed
      </span>

      {/* Course name */}
      <span
        className={cn(textBase, "font-bold text-[#C19562]")}
        style={{
          top: pct(LAYOUT.course.y, "y"),
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: `${(38 / CERT_H) * 100}%`,
          transform: "translateY(-50%)",
        }}
      >
        {courseTitle}
      </span>

      {/* Date */}
      <span
        className={cn(textBase, "text-gray-600")}
        style={{
          top: pct(LAYOUT.date.y, "y"),
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: `${(22 / CERT_H) * 100}%`,
          transform: "translateY(-50%)",
        }}
      >
        {date}
      </span>

      {/* Certificate ID */}
      <span
        className={cn(textBase, "text-gray-400 font-mono")}
        style={{
          top: pct(LAYOUT.certId.y, "y"),
          fontSize: `${(13 / CERT_H) * 100}%`,
          transform: "translateY(-50%)",
        }}
      >
        {certId}
      </span>
    </>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function makeCertId(courseId: string) {
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `ASC-${courseId.toUpperCase().slice(0, 6)}-${rand}`;
}

export default function CertificatePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = use(params);
  const course = getCourseBySlug(courseId);
  if (!course) notFound();

  const { data: user } = useCurrentUser();

  const [studentName, setStudentName] = useState(user?.display_name ?? "");
  const [downloading, setDownloading]  = useState(false);
  const [certId]                       = useState(() => makeCertId(courseId));
  const completionDate                  = formatDate(new Date());

  const displayName = studentName.trim() || (user?.display_name ?? "");

  const handleDownload = useCallback(async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      const blob = await drawCertificate(
        displayName || "Student",
        course.title,
        completionDate,
        certId,
      );
      const url = URL.createObjectURL(blob);
      const a   = document.createElement("a");
      a.href     = url;
      a.download = `ascendra-certificate-${courseId}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } catch (err) {
      console.error("Certificate download failed:", err);
    } finally {
      setDownloading(false);
    }
  }, [downloading, displayName, course.title, completionDate, certId, courseId]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">

      {/* ── Header ── */}
      <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b border-gray-200 bg-white px-6 shadow-sm">
        <Link
          href={`/learn/${courseId}`}
          className="flex items-center gap-1.5 text-[12px] font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to course
        </Link>

        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2 text-[13px] font-semibold transition-all",
              downloading
                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                : "bg-gradient-to-br from-[#FCE8C0] to-[#C19562] text-[#1A0E00] shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
            )}
          >
            {downloading ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating…
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PNG
              </>
            )}
          </button>
        </div>
      </header>

      {/* ── Body ── */}
      <main className="flex flex-1 flex-col items-center gap-8 px-4 py-10">

        {/* Congratulations banner */}
        <div className="text-center">
          <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FCE8C0] to-[#C19562] shadow-lg">
            <svg className="h-7 w-7 text-[#1A0E00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Congratulations!
          </h1>
          <p className="mt-1 text-[14px] text-gray-500">
            You&apos;ve completed <span className="font-semibold text-gray-700">{course.title}</span>.
            Your certificate is ready.
          </p>
        </div>

        {/* Name input */}
        <div className="w-full max-w-sm">
          <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.12em] text-gray-400">
            Name on certificate
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder={user?.display_name ?? "Enter your full name"}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[14px] text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-[#C19562] focus:outline-none focus:ring-2 focus:ring-[#C19562]/20"
          />
          <p className="mt-1.5 text-[11px] text-gray-400">
            This name will be printed on the certificate.
          </p>
        </div>

        {/* ── Certificate preview ── */}
        <div className="w-full max-w-5xl">
          {/* Shadow + border wrapper */}
          <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
            {/* Maintains 1448:1086 aspect ratio */}
            <div
              className="relative w-full"
              style={{ paddingBottom: `${(CERT_H / CERT_W) * 100}%` }}
            >
              {/* Background template */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/CoursesCertificationTemplate.svg"
                alt="Certificate template"
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />

              {/* Text overlays */}
              <CertOverlay
                name={displayName}
                courseTitle={course.title}
                date={completionDate}
                certId={certId}
              />
            </div>
          </div>

          {/* Cert ID below */}
          <p className="mt-3 text-center font-mono text-[11px] text-gray-400">
            Certificate ID: {certId}
          </p>
        </div>

        {/* Download CTA */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          className={cn(
            "flex items-center gap-2.5 rounded-2xl px-8 py-3.5 text-[14px] font-bold transition-all",
            downloading
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-gradient-to-br from-[#FCE8C0] to-[#C19562] text-[#1A0E00] shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.97]",
          )}
        >
          {downloading ? (
            <>
              <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating certificate…
            </>
          ) : (
            <>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Certificate
            </>
          )}
        </button>

        <p className="text-center text-[11px] text-gray-400 max-w-xs">
          Downloads as a high-resolution PNG (1448 × 1086 px), ready to share on LinkedIn or print.
        </p>
      </main>
    </div>
  );
}
