"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface HintPanelProps {
  hints: string[];
  onViewSolution: () => void;
}

export function HintPanel({ hints, onViewSolution }: HintPanelProps) {
  const [revealed, setRevealed] = useState(0);

  const revealNext = () => {
    if (revealed < hints.length) setRevealed((r) => r + 1);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <svg className="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <span className="text-[13px] font-semibold text-gray-700">Hints</span>
        <span className="text-[11px] text-gray-400">({revealed}/{hints.length} revealed)</span>
      </div>

      {revealed === 0 && (
        <p className="text-[12px] text-gray-500 italic">
          Stuck? Hints are here to help — try a bit longer first!
        </p>
      )}

      <div className="space-y-2">
        {hints.slice(0, revealed).map((hint, i) => (
          <div
            key={i}
            className="rounded-lg border border-amber-100 bg-amber-50 p-3"
          >
            <div className="flex items-start gap-2">
              <span className="shrink-0 rounded-full bg-amber-200 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                {i + 1}
              </span>
              <p className="text-[12px] leading-relaxed text-amber-900">{hint}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {revealed < hints.length && (
          <button
            onClick={revealNext}
            className="rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2 text-[12px] font-semibold text-amber-700 transition-all hover:bg-amber-100"
          >
            {revealed === 0 ? "Show first hint" : "Next hint"}
          </button>
        )}
        {revealed >= hints.length && (
          <button
            onClick={onViewSolution}
            className="rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-[12px] font-semibold text-gray-600 transition-all hover:border-gray-300 hover:text-gray-900"
          >
            View solution
          </button>
        )}
      </div>
    </div>
  );
}
