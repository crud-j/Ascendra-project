"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// ─── Wind canvas ─────────────────────────────────────────────────────────────

interface WindParticle {
  x: number;
  y: number;
  len: number;
  speed: number;
  opacity: number;
  width: number;
  angle: number; // slight downward drift in radians
}

function WindCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 90;
    const particles: WindParticle[] = Array.from({ length: COUNT }, () => ({
      x:       Math.random() * (canvas.width + 300) - 150,
      y:       Math.random() * canvas.height,
      len:     40 + Math.random() * 140,
      speed:   2.5 + Math.random() * 7,
      opacity: 0.04 + Math.random() * 0.13,
      width:   0.4 + Math.random() * 1.2,
      angle:   0.015 + Math.random() * 0.025, // 1–2.5° downward
    }));

    let rafId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        const dx = Math.cos(p.angle) * p.len;
        const dy = Math.sin(p.angle) * p.len;
        const x2 = p.x + dx;
        const y2 = p.y + dy;

        const grad = ctx.createLinearGradient(p.x, p.y, x2, y2);
        grad.addColorStop(0,    `rgba(255,255,255,0)`);
        grad.addColorStop(0.25, `rgba(255,255,255,${p.opacity})`);
        grad.addColorStop(0.75, `rgba(255,255,255,${p.opacity})`);
        grad.addColorStop(1,    `rgba(255,255,255,0)`);

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = p.width;
        ctx.stroke();

        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;

        if (p.x > canvas.width + p.len) {
          p.x = -p.len - Math.random() * 300;
          p.y = Math.random() * canvas.height;
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ zIndex: 6 }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const journeySteps = [
  {
    step: "1",
    title: "Join free",
    body: "Create your account. No credit card. No commitments. Your learning journey begins on lesson one.",
  },
  {
    step: "2",
    title: "Pick a track",
    body: "Choose from Data Science, Web Dev, AI, or CS. Follow a structured path or explore freely.",
  },
  {
    step: "3",
    title: "Earn as you grow",
    body: "Complete lessons for XP, answer questions for Reputation, solve bounties for Skill Coins.",
  },
  {
    step: "4",
    title: "Reach mastery",
    body: "Climb six reputation tiers from Learner to Master. Each tier unlocks new opportunities and privileges.",
  },
];

const tiers = [
  { tier: "Learner",     cls: "bg-slate-700/60   text-slate-200  border-slate-500/40" },
  { tier: "Contributor", cls: "bg-blue-900/60     text-blue-200   border-blue-500/40"  },
  { tier: "Trusted",     cls: "bg-emerald-900/60  text-emerald-200 border-emerald-500/40" },
  { tier: "Mentor",      cls: "bg-purple-900/60   text-purple-200 border-purple-500/40" },
  { tier: "Expert",      cls: "bg-orange-900/60   text-orange-200 border-orange-500/40" },
  { tier: "Master",      cls: "bg-amber-900/60    text-amber-200  border-amber-500/40"  },
];

// Mountain parallax layers — images from the public CDN used in the original snippet
const BASE = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/24650";
const LAYERS = [
  { id: "l6", img: "6",    speed: "120s", size: "222px", z: 1 },
  { id: "l5", img: "5",    speed: "95s",  size: "311px", z: 1 },
  { id: "l4", img: "4",    speed: "75s",  size: "468px", z: 1 },
  { id: "b1", img: "bike", speed: "10s",  size: "75px",  z: 2, bike: true, delay: "0s"  },
  { id: "b2", img: "bike", speed: "15s",  size: "75px",  z: 2, bike: true, delay: "-7s" },
  { id: "l3", img: "3",    speed: "55s",  size: "158px", z: 3 },
  { id: "l2", img: "2",    speed: "30s",  size: "145px", z: 4 },
  { id: "l1", img: "1",    speed: "20s",  size: "136px", z: 5 },
];

const LAYER_CSS = `
${LAYERS.map(
  (l) => `
  .jrny-${l.id} {
    position: absolute;
    ${l.bike
      ? "left: 0; right: 0; width: 100%; bottom: 100px; height: 100%;"
      : "inset: 0; width: 100%; height: 100%;"}
    background-image: url(${BASE}/${l.img}.png);
    background-size: auto ${l.size};
    background-repeat: ${l.bike ? "no-repeat" : "repeat-x"};
    background-position: 0 100%;
    z-index: ${l.z};
    animation: ${l.bike ? "jrny_bike" : "jrny_fg"} ${l.speed} linear infinite;
    ${l.delay ? `animation-delay: ${l.delay};` : ""}
  }`
).join("\n")}

@keyframes jrny_fg {
  from { background-position: 2765px 100%; }
  to   { background-position: 550px 100%; }
}
@keyframes jrny_bike {
  from { background-position: -300px 100%; }
  to   { background-position: 2200px 100%; }
}
`;

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      data-section="journey"
      className="relative overflow-hidden px-6 py-28 lg:py-36"
      style={{ background: "linear-gradient(to bottom, #7FBDDA 0%, #9DCFE8 25%, #b0d8f0 55%, #f4c97a 100%)" }}
    >
      {/* Keyframe CSS for mountain layers */}
      <style dangerouslySetInnerHTML={{ __html: LAYER_CSS }} />

      {/* ── Mountain parallax background ── */}
      <div
        className="absolute inset-0 z-0"
      >
        {LAYERS.map((l) => (
          <div key={l.id} className={`jrny-${l.id}`} />
        ))}
      </div>

      {/* ── Wind streaks ── */}
      <WindCanvas />

      {/* ── Dark gradient overlay ── */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,20,40,0.0) 0%, rgba(10,20,40,0.12) 40%, rgba(5,10,20,0.38) 100%)",
        }}
      />

      {/* ── Top divider line ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

      {/* ── Bottom fade → hand off to FAQ (#041E37) ── */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-48"
        style={{ background: "linear-gradient(to bottom, transparent 0%, #041E37 100%)" }}
      />

      {/* ── Content ── */}
      <div className="relative z-20 mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="js-journey-header mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-[#8B6A3E]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B6A3E]">
              Your Journey
            </span>
            <div className="h-px w-8 bg-[#8B6A3E]" />
          </div>

          <h2 className="js-journey-header max-w-xl text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-[#0A1E2E] sm:text-5xl">
            From zero to master,
            <br />
            <span className="text-[#0A1E2E]/65">on your terms.</span>
          </h2>

          <p className="js-journey-header mt-6 max-w-md text-[15px] leading-[1.75] text-[#0A1E2E]/70">
            Ascendra&apos;s progression system has six reputation tiers. Each
            unlocks new privileges, higher-value bounties, and deeper
            community trust.
          </p>
        </div>

        {/* Steps — bare text, no card containers */}
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {journeySteps.map((step, i) => (
            <div key={step.step} className="js-journey relative">
              {/* Thin amber connector on desktop */}
              {i < journeySteps.length - 1 && (
                <div
                  className="absolute top-[0.6rem] left-[calc(100%+1.25rem)] hidden h-px w-[calc(100%-2.5rem)] lg:block"
                  style={{ background: "linear-gradient(90deg, rgba(193,149,98,0.5), transparent)" }}
                />
              )}

              <span className="mb-4 block font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8B6A3E]">
                0{step.step}
              </span>
              <div className="mb-3 h-px w-8 bg-[#0A1E2E]/25" />
              <h3 className="mb-3 text-[17px] font-bold tracking-tight text-[#0A1E2E] leading-snug">
                {step.title}
              </h3>
              <p className="text-[13px] leading-[1.8] text-[#0A1E2E]/70">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* Tier chips */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-2.5">
          {tiers.map((t) => (
            <div
              key={t.tier}
              className={cn(
                "js-tier rounded-full border px-4 py-1.5 text-[11px] font-bold backdrop-blur-sm",
                t.cls
              )}
            >
              {t.tier}
            </div>
          ))}
          <div className="js-tier rounded-full border border-dashed border-[#0A1E2E]/30 px-4 py-1.5 text-[11px] font-semibold text-[#0A1E2E]/55 backdrop-blur-sm">
            + Unlock more
          </div>
        </div>
      </div>
    </section>
  );
}
